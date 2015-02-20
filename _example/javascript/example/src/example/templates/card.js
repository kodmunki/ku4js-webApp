$.ku4webApp.template("card", {
    renderForm: function() {
        return this.$render(this.$forms("card"));
    },
    renderCardList: function(data) {
        return this.$renderList(this.$views("card"), data)
    }
});