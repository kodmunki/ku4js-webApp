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