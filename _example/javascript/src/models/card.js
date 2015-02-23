$.ku4webApp.model("card", {
    listCards: function() {
        if(this.$state().is("cardsListed"))
            this.$notify("onCardsListed", this.$collection("card").find());
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

        try {
            dto.update("photo", $.image.dataUrlFromFile(dto.find("photo")));
        }
        catch(e) { /*Fail Silently*/ }

        var card = dto.add("id", $.uid()).toObject();
        this.$collection("card").insert(card);
        this.$notify("onCardAdded", card);
        return this;
    },
    editCard: function(id) {
        var cards = this.$collection("card").find({"id": id});
        if(!($.isArray(cards) && cards.length == 1)) this.$notify("onError", new Error("Card collection corrupted."));
        else this.$notify("onEditCard", cards[0]);
        return this;
    },
    updateCard: function(dto) {
        var card = dto.toObject();
        this.$collection("card").update({"id": card.id}, card);
        this.$notify("onCardUpdated", card);
        return this;
    },
    onCardsListed: function(serverResponse) {
        var cardList = $.dto.parseJson(serverResponse).toObject();
        this.$collection("card").init(cardList);

        this.$state().set("cardsListed");
        this.$notify("onCardsListed", cardList);
    },
    onCardAdded: function(serverResponse) {
        var card = $.dto.parseJson(serverResponse).toObject();
        //var card = this.$state().read("addCard")

        this.$collection("card").insert(card);
    },

    onCardsListedError: function(serverResponse) {
        this.$notify("onCardListedError, onError", new Error("Card listing exception."));
    }
},
{
    "svc+cardsListed": "onCardsListed",
    "svc-cardsListed": "onCardsListedError"
});