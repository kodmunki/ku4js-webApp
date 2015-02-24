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
                this.$notify("onCardAdded", card);
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