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

        var bundle = $.ku4webAppUT.bundle().throwErrors(),
            model = bundle.model("card");

        bundle
            .onServiceCall("card.list", function() { return cardList; })
            .subscribe("onCardsListed", onCardsListed)
            .collection("card").init(cardList);

        model.listCards();
    });

    test("createCard", function() {
        expect(1);
        function onCreateCard() {
            equal(arguments.length, 0);
        }

        var bundle = $.ku4webAppUT.bundle().throwErrors(),
            model = bundle.model("card");

        bundle
            .subscribe("onCreateCard", onCreateCard)
            .collection("card").init(cardList);

        model.createCard();
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

        var bundle = $.ku4webAppUT.bundle().throwErrors(),
            model = bundle.model("card");

        bundle
            .subscribe("onCardAdded", onCardAdded)
            .collection("card").init(cardList);

        model.addCard(card);
    });
    test("editCard", function() {
        expect(1);
        function onEditCard(data) {
            deepEqual(data, cardList[0]);
        }

        var bundle = $.ku4webAppUT.bundle().throwErrors(),
            model = bundle.model("card");

        bundle
            .subscribe("onEditCard", onEditCard)
            .collection("card").init(cardList);

        model.listCards().editCard("id1");
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

        var bundle = $.ku4webAppUT.bundle().throwErrors(),
            model = bundle.model("card");

        bundle
            .subscribe("onCardUpdated", onCardUpdated)
            .collection("card").init(cardList);

        model.updateCard($.dto({"id":"id1", "value": 20.15}));
    });
});