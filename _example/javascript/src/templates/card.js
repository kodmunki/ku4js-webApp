$.ku4webApp.template("card", {
    renderCardForm: function() {
        return this.$render(this.$forms("card"));
    },
    renderCardList: function(data) {
        return this.$renderList(this.$views("card"), data, "", function(data) {
            data.value = $.money.parse(data.value).toString();
            return data;
        })
    }
});