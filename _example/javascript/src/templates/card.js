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