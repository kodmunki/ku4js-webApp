$.ku4webApp.controller("card", {
    list: function() {
        this.$stateMachine().listCards();
        return this;
    },
    create: function() {
        this.$stateMachine().createCard();
        return this;
    },
    add: function() {
        this.$stateMachine().addCard(this.$form("card").read().remove("id"));
        return this;
    },
    edit: function(id) {
        this.$stateMachine().editCard(id);
        return this;
    },
    update: function() {
        this.$stateMachine().updateCard(this.$form("card").read());
        return this;
    }
});