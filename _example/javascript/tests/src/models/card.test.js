$(function() {

    module("model.card");

    var cardList = [{
        "id": "id1",
        "name": "card1",
        "description": "description1",
        "value": 1.00
    },
    {
        "id": "id2",
        "name": "card2",
        "description": "description2",
        "value": 2.00
    }];

    test("listCards", function() {
        expect(1);

        function onCardsListed(data) {
            deepEqual(data, cardList);
        }

        var bundle = $.ku4webAppUT.bundle()
            .initCollection("card", cardList)
            .onServiceCall("card.list", function() { return cardList; })
            .subscribe("onCardsListed", onCardsListed)
            .model("card").listCards();
    });

    test("createCard", function() {
        expect(1);
        function onCreateCard() {
            equal(arguments.length, 0);
        }

        $.ku4webAppUT.bundle()
            .initCollection("card", cardList)
            .subscribe("onCreateCard", onCreateCard)
            .model("card").createCard();
    });

    test("addCard", function() {
        var card = $.dto({
                "name": "card 1",
                "description": "description1",
                "value": 1.00
            });

        expect(1);
        function onCardAdded(data) {
            deepEqual(data, cardList.concat([card.toObject()]));
        }

        $.ku4webAppUT.bundle()
            .initCollection("card", cardList)
            .subscribe("onCardAdded", onCardAdded)
            .model("card").addCard(card);
    });
    test("editCard", function() {
        expect(1);
        function onEditCard(data) {
            deepEqual(data, cardList[0]);
        }

        $.ku4webAppUT.bundle()
            .initCollection("card", cardList)
            .subscribe("onEditCard", onEditCard)
            .model("card").editCard("id1");
    });

    test("updateCard", function() {
        expect(1);
        function onCardUpdated(data) {
            deepEqual(data, [{
                "id": "id1",
                "name": "card1",
                "description": "description1",
                "value": 20.15
            },
            {
                "id": "id2",
                "name": "card2",
                "description": "description2",
                "value": 2.00
            }]);
        }

        $.ku4webAppUT.bundle()
            .initCollection("card", cardList)
            .subscribe("onCardUpdated", onCardUpdated)
            .model("card").updateCard($.dto({"id":"id1", "value": 20.15}));
    });
});