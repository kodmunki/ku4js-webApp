$.ku4webApp.stateMachine({
    listCards: function() {
        if(this.is("CardsListed")) return this;

        this.$model("card").listCards();
        this.set("CardsListed");
        return this;
    },
    createCard:  function() {
        if(this.is("CreateCard")) return this;

        this.$model("card").createCard();
        this.set("CreateCard");
        return this;
    },
    addCard: function(dto) {
        if(this.is("AddCard")) return this;

        this.$model("card").addCard(dto);
        this.set("AddCard");
        return this;
    },
    editCard: function(id) {
        if(this.is("EditCard")) return this;

        this.$model("card").editCard(id);
        this.set("EditCard");
        return this;
    },
    updateCard: function(dto) {
        if(!(this.is("AddCard") || this.is("EditCard"))) return this;

        this.$model("card").updateCard(dto);
        this.set("CardsListed");
        return this;
    }
});