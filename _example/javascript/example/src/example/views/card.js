$.ku4webApp.view("card", {
    displayCardList: function(data) {
        $(".js-card-form").remove();

        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
    },
    displayCardAdded: function(data) {
        console.log(data);
    },
    displayEditCard: function(card) {
        $(".js-card").remove();

        var cardForm = this.$template("card").renderCardForm();
        $("#site").append(cardForm);

        //this.$form("card").write(card);
    },
    displayCardListError: function(data) {
        console.log(data);
    },
    displayError: function(data) {
        console.log(data);
    }
},
{
    "onCardsListed":        "displayCardList",
    "onCardAdded":          "displayCardAdded",

    "onEditCard":           "displayEditCard",

    "onCardsListedError":   "displayCardListError",
    "onError":              "displayError"
});