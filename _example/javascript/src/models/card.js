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