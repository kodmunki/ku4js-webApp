$.ku4webApp.view("card", {
    displayCardList: function(data) {
        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
    },
    displayCardAdded: function(data) {
        console.log(data);
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

    "onCardsListedError":   "displayCardListError",
    "onError":              "displayError"
});