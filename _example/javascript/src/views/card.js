$.ku4webApp.view("card", {
    displayCardList: function(data) {
        this._clearSite();
        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
    },
    displayCardAdded: function(data) {
        this._clearSite();
        var card = this.$template("card").renderCard(data);
        $("#site").append(card);
    },
    displayAddCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
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
    displayError: function(data) {
        console.log("ERROR", data);
    },
    _clearSite: function() {
        $("#site").html("");
    }
},
{
    "onCardsListed":        "displayCardList",
    "onCardAdded":          "displayCardAdded",
    "onAddCard":            "displayAddCard",
    "onEditCard":           "displayEditCard",
    "onCardsListedError":   "displayCardListError",
    "onError":              "displayError"
});