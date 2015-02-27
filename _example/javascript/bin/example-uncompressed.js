(function(l){
$.exampleErrorMessage = function(messageObject) {
    var message = "";
    $.hash(messageObject).each(function(obj) {
        message += $.str.format("* Field: {0} -- {1}\n", obj.key, obj.value);
    });
    return message;
};

$.ku4webApp.config.collections = {
    "ku4StoreType": "localStorage",

    card: {
        name: "card"
    }
};

$.ku4webApp.config.forms = {
    card: [
        {
            selector: '#cardId',
            type: "field",
            required:true
        },
        {
            selector: '#cardNameField',
            type: "field",
            required:true
        },
        {
            selector: '#cardPhotoField',
            type: "imageFileField",
            maxDims: [100,100]
        },
        {
            selector: '#cardValueField',
            type: "field",
            required:true,
            format: function(value) {
                var value = $.money.tryParse(value);
                return $.money.isMoney(value) ? value.value() : "";
            }
        },
        {
            selector: '#cardDescriptionField',
            type: "field",
            required:true
        }
    ]
};

$.ku4webApp.config.navigator = {
    "ku4routes": {
        "card.edit*":   "card.edit",
        "ku4default":   "card.list"
    },
    "card.list": {
        model: "card",
        method: "listCards"
    },
    "card.add": {
        model: "card",
        method: "createCard"
    },
    "card.edit": {
        model: "card",
        method: "editCard"
    }
};

$.ku4webApp.config.services = {
    "card.list": {
        verb: "GET",
        uri: "./_serverStub/cardList.json",
        contentType: "text/json",
        success: "svc+cardsListed",
        error: "svc-cardsListed"
    },
    "card.add": {
        verb: "POST",
        uri: "./_serverStub/cardAdd.json",
        contentType: "text/json",
        success: "svc+cardAdded",
        error: "svc-cardAdded"
    }
};

$.ku4webApp.config.sockets = {
    //Add Sockets Here
};

$.ku4webApp.config.templates.forms = {
    card:   '<form id="cardForm" class="card-form" action="">' +
                '<fieldset>' +
                    '<legend>Card Info</legend>' +
                    '<input id="cardId" name="id" type="hidden" />' +
                    '<div class="card-photo-container"><img src="{{photo}}" class="card-photo js-card-photo"/></div>' +
                    '<input id="cardPhotoField" name="photo" class="card-photo-field" type="file" accept="image/*" capture="camera" />' +
                    '<input id="cardNameField" name="name" class="card-name-field" type="text" placeholder="Card Name"/>' +
                    '<input id="cardValueField" name="value" class="card-value-field" type="number" placeholder="999.99"/>' +
                    '<textarea id="cardDescriptionField" name="description" class="card-description-field" placeholder="Description"></textarea></fieldset>' +
                '<div class="card-form-controls">{{controls}}</div></form>',

    cardAddControl:   '<button class="card-add-control" onclick="cardController.add(); return false;">Add</button>',
    cardEditControl:  '<button class="card-update-control" onclick="cardController.update(); return false;">Update</button>'
};

$.ku4webApp.config.templates.views = {
    cardList: '<div class="card-list js-card-list">{{cardList}}' +
              '<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button></div>',

    card:   '<div class="card js-card js-{{id}}">' +
                '<div class="card-photo-container"><img src="{{photo}}" class="card-photo js-card-photo"/></div>' +
                '<span class="card-name js-card-name">{{name}}</span>' +
                '<span class="card-value js-card-value">{{value}}</span>' +
                '<span class="card-description js-card-description">{{description}}</span>' +
                '<button class="card-edit-control" onclick="cardController.edit(\'{{id}}\');">Edit</button></div>'
};

$.ku4webApp.config.validators = {
    card: [
        {
            name: "name",
            spec: $.spec(function(value) { return /^.{1,140}$/.test(value); }),
            message: "Name is invalid."
        },
        {
            name: "description",
            spec: $.spec(function(value) { return /^.{1,140}$/.test(value) }),
            message: "Invalid description."
        },
        {
            name: "value",
            spec: $.spec(function(value) { return $.money.canParse(value); }),
            message: "Invalid value."
        }
    ]
};

$.ku4webApp.controller("card", {
    list: function() {
        this.$model("card").listCards();
        return this;
    },
    create: function() {
        this.$model("card").createCard();
        return this;
    },
    add: function() {
        this.$model("card").addCard(this.$form("card").read().remove("id"));
        return this;
    },
    edit: function(id) {
        this.$model("card").editCard(id);
        return this;
    },
    update: function() {
        this.$model("card").updateCard(this.$form("card").read());
        return this;
    }
});

$.ku4webApp.model("card", {
    listCards: function() {
        if(this.$state().is("cardsListed"))
            this.$collection("card").find({}, function(err, results) {
                if($.exists(err)) this.$notify("onCardsListedError", err);
                else this.$notify("onCardsListed", results);
            }, this);
        else this.$service("card.list").call();
        return this;
    },

    createCard: function() {
        this.$notify("onCreateCard");
        return this;
    },

    addCard: function(dto) {
        var validation = this.$validator("card").validate(dto);
        if(validation.isValid()) {

            function save(dto) {
                var card = dto.update("id", $.uid()).toObject(),
                    collection = this.$collection("card");

                collection.insert(card, function (err) {
                    if ($.exists(err)) this.$notify("addCardError", err);
                    else collection.find({}, function (err, results) {
                        if ($.exists(err) || !($.isArray(results) && results.length > 0))
                            this.$notify("onCardAddedError", new Error("Card collection add failed."));
                        else this.$notify("onCardAdded", results);

                    }, this);
                }, this);
            }

            if(!dto.containsKey("photo")) save.call(this, dto);
            else $.image.dataUrlFromFile(dto.find("photo"), function (dataUrl) {
                dto.update("photo", dataUrl);
                save.call(this, dto);
            }, this, { maxDims: [200, 200] });
        }
        else this.$notify("onCardInvalid", validation.messages());
        return this;
    },

    editCard: function(id) {
        this.$collection("card").find({"id": id}, function(err, results) {
            if($.exists(err)) this.$notify("onEditCardError", err);
            else {
                if(!($.isArray(results) && results.length == 1))
                    this.$notify("onEditCardError", new Error("Card collection corrupted."));
                else this.$notify("onEditCard", results[0]);
            }
        }, this);
        return this;
    },

    updateCard: function(dto) {
        var validation = this.$validator("card").validate(dto);
        if(validation.isValid()) {
            var card = dto.toObject(),
                photo = dto.find("photo"),
                collection = this.$collection("card");

            function update() {
                collection.update({"id": card.id}, card, function (err) {
                    if ($.exists(err)) this.$notify("onCardUpdatedError", err);
                    else collection.find({}, function (err, results) {
                        if ($.exists(err) || !($.isArray(results) && results.length > 0))
                            this.$notify("onCardUpdatedError", new Error("Card collection update failed."));
                        else this.$notify("onCardUpdated", results);
                    }, this);
                }, this);
            }

            if (!$.exists(photo)) update.call(this);
            else $.image.dataUrlFromFile(photo, function (dataUrl) {
                dto.update("photo", dataUrl);
                update.call(this);
            }, this, { maxDims: [200, 200] });
        }
        else this.$notify("onCardInvalid", validation.messages());
        return this;
    },

    onCardsListed: function(serverResponse) {
        var cardList = $.dto.parseJson(serverResponse).toObject(),
            collection = this.$collection("card");

        collection.find({}, function(err, results) {
            if(results.length > 0) {
                this.$state().set("cardsListed");
                this.$notify("onCardsListed", results);
            }
            else collection.init(cardList, function(err) {
                if($.exists(err)) this.$notify("onCardsListedError", err);
                else {
                    this.$state().set("cardsListed");
                    this.$notify("onCardsListed", cardList);
                }
            }, this);
        }, this);

    },

    onCardAdded: function(serverResponse) {
        var card = $.dto.parseJson(serverResponse).toObject();

        this.$collection("card").insert(card, function(err) {
            if($.exists(err)) this.$notify("onCardAddedError", err);
            else this.$notify("onCardAdded", card);
        });
    },

    onCardsListedError: function(serverResponse) {
        this.$notify("onCardListedError, onError", new Error("Card listing exception."));
    }
},
{
    "svc+cardsListed": "onCardsListed",
    "svc-cardsListed": "onCardsListedError"
});

$.ku4webApp.template("card", {
    renderAddCardForm: function() {
        var controls = this.$forms("cardAddControl");
        return this.$render(this.$forms("card"), {
            controls: controls
        }, "");
    },
    renderEditCardForm: function(card) {
        var controls = this.$forms("cardEditControl");
        return this.$render(this.$forms("card"), {
            photo: card.photo,
            controls: controls
        }, "");
    },
    renderCard: function(data) {
        return this.$render(this.$views("card"), data, "", function(data) {
            data.value = $.money.parse(data.value).toString();
            return data;
        })
    },
    renderCardList: function(data) {
        var cardList = this.$renderList(this.$views("card"), data, "", function(data) {
            data.value = $.money.parse(data.value).toString();
            return data;
        });

        return this.$render(this.$views("cardList"), { "cardList": cardList });
    }
});

$.ku4webApp.view("card", {
    displayCardList: function(data) {
        this._clearSite();
        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
        this.$navigator().write("card.list");
    },
    displayCreateCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.add");

         $("#cardPhotoField").on("change", function() {
            $.image.dataUrlFromFile(this.files[0], function(dataUrl){
                $(".js-card-photo").attr("src", dataUrl);
            }, this, { maxDims: [200, 200] });
        });
    },
    displayAddCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.list");
    },
    displayEditCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderEditCardForm(card);
        $("#site").append(cardForm);
        this.$form("card").write(card);
        this.$navigator().write("card.edit", card.id);

        $("#cardPhotoField").on("change", function() {
            $.image.dataUrlFromFile(this.files[0], function(dataUrl){
                $(".js-card-photo").attr("src", dataUrl);
            }, this, { maxDims: [200, 200] });
        });
    },
    displayCardInvalid: function(messages) {
        alert($.exampleErrorMessage(messages));
    },
    displayCardListError: function(data) {
        console.log("displayCardListError", data);
    },
    displayEditCardError: function() {
        this.$navigator().route();
    },
    displayCardUpdatedError: function(data) {
        console.log("displayCardUpdatedError", data);
    },
    displayError: function(data) {
        console.log("displayError", data);
    },
    _clearSite: function() {
        $("#site").html("");
    }
},
{
    "onCardsListed":        "displayCardList",
    "onCardAdded":          "displayCardList",
    "onCreateCard":         "displayCreateCard",
    "onAddCard":            "displayAddCard",
    "onEditCard":           "displayEditCard",
    "onCardUpdated":        "displayCardList",

    "onCardInvalid":        "displayCardInvalid",

    "onCardsListedError":   "displayCardListError",
    "onEditCardError":      "displayEditCardError",
    "onCardUpdatedError":   "displayCardUpdatedError",
    "onError":              "displayError"
});

})();
