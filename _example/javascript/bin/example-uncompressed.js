(function(l){
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
            format: function(value) { return $.money.parse(value).value(); }
        },
        {
            selector: '#cardDescriptionField',
            type: "field",
            required:true
        }
    ]
};

$.ku4webApp.config.navigator = {
    "ku4OnAppLoad": function(navigator) {
            if (navigator.hashContainsArguments() &&
                navigator.hashEquals("card.edit")) {
                navigator.execute(navigator.read())
            }
            else navigator.execute("card.list");
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
            spec: $.spec(function(value) { return /^\w{1,140}$/.test(value); }),
            message: "Username is invalid."
        },
        {
            name: "description",
            spec: $.spec(function(value) { return /.{1,140}/.test(value) }),
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
        this.$model("card").addCard(this.$form("card").read());
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

        //this.$state().write("addCard", dto);
        //this.$service("card.add").call(dto.toFormData)

        //NOTE: Bypassing the service call above as there is no real server in this example
        //      In a real world app, you would likely call a service here and add to your
        //      collection on a successful response either getting the data in a response
        //      from the server or persisting it in state, as depicted above, until you
        //      received a response;

        var me  = this;
        function save(dto) {
            var card = dto.update("id", $.uid()).toObject();
            me.$collection("card").insert(card, function(err) {
                if($.exists(err)) this.$notify("addCardError", err);
                else this.$collection("card").find({}, function(err, results) {
                    if($.exists(err) || !($.isArray(results) && results.length > 0))
                        this.$notify("onCardAddedError", new Error("Card collection add failed."));
                    else this.$notify("onCardAdded", results);
                }, this);
            }, me);
        }

        if(dto.containsKey("photo"))
            $.image.dataUrlFromFile(dto.find("photo"), function(dataUrl){
                dto.update("photo", dataUrl);
                save(dto);
            }, this, { maxDims: [300, 300] });
        else save(dto);
        return this;
    },
    editCard: function(id) {
        this.$collection("card").find({"id": id}, function(err, results) {
            if($.exists(err)) this.$notify("editCardError", err);
            else {
                if(!($.isArray(results) && results.length == 1))
                    this.$notify("onError", new Error("Card collection corrupted."));
                else this.$notify("onEditCard", results[0]);
            }
        }, this);
        return this;
    },
    updateCard: function(dto) {
        var card = dto.toObject(),
            photo = dto.find("photo");

        function update() {
            this.$collection("card").update({"id": card.id}, card, function(err) {
                if($.exists(err)) this.$notify("onCardUpdatedError", err);
                else this.$collection("card").find({}, function(err, results) {
                    if($.exists(err) || !($.isArray(results) && results.length > 0))
                        this.$notify("onCardUpdatedError", new Error("Card collection update failed."));
                    else this.$notify("onCardUpdated", results);
                }, this);
            }, this);
        }


        if($.exists(photo)) $.image.dataUrlFromFile(photo, function(dataUrl){
            dto.update("photo", dataUrl);
            update.call(this);
        }, this, { maxDims: [300, 300] });
        else update.call(this);

        return this;
    },
    onCardsListed: function(serverResponse) {
        var cardList = $.dto.parseJson(serverResponse).toObject();
        this.$collection("card").find({}, function(err, results) {
            if(results.length > 0) {
                this.$state().set("cardsListed");
                this.$notify("onCardsListed", results);
            }
            else this.$collection("card").init(cardList, function(err) {
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
        //var card = this.$state().read("addCard")

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
        return this.$render(this.$forms("card"), { controls: controls });
    },
    renderEditCardForm: function() {
        var controls = this.$forms("cardEditControl");
        return this.$render(this.$forms("card"), { controls: controls });
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
    },
    displayAddCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.list");
    },
    displayEditCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderEditCardForm();
        $("#site").append(cardForm);
        this.$form("card").write(card);
        this.$navigator().write("card.edit", card.id);
    },
    displayCardListError: function(data) {
        console.log("ERROR", data);
    },
    displayCardUpdatedError: function(data) {
        console.log("ERROR", data);
    },
    displayError: function(data) {
        console.log("ERROR", data);
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
    "onCardsListedError":   "displayCardListError",
    "onCardUpdatedError":   "displayCardUpdatedError",
    "onError":              "displayError"
});

})();
