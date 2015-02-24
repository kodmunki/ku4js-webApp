$.ku4webApp.view("card", {
    displayCardList: function(data) {
        this._clearSite();
        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
        this.$navigator().write("card.list");
    },
    displayCreateCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.add");
    },
    displayAddCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.list");
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
    displayCardUpdatedError: function(data) {
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
    "onCardAdded":          "displayCardList",
    "onCreateCard":         "displayCreateCard",
    "onAddCard":            "displayAddCard",
    "onEditCard":           "displayEditCard",
    "onCardUpdated":        "displayCardList",
    "onCardsListedError":   "displayCardListError",
    "onCardUpdatedError":   "displayCardUpdatedError",
    "onError":              "displayError"
});