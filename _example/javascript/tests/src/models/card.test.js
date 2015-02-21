$(function() {

    module("model.card");

    var bundle = $.ku4webAppUT.bundle().throwErrors(),
        mediator = bundle.mediator(),
        model = bundle.model("card");

    test("new", function() {
        expect(1);
        ok(model);
    });

    test("listCards", function() {
        var cardList = [{
                "id": "id1",
                "name": "card1",
                "description": "description1",
                "value": 1.00,
                "photo": "photo1"
            },
            {
                "id": "id2",
                "name": "card2",
                "description": "description2",
                "value": 2.00,
                "photo": "photo2"
            }];

        expect(1);
        function assertion(data) {
            deepEqual(cardList, data);
            mediator.unsubscribe("onCardsListed", 1);
        }
        bundle.callback(function() { return cardList; });
        mediator.subscribe("onCardsListed", assertion, null, 1);
        model.listCards();
    });

    test("createCard", function() {
        expect(1);
        function assertion() {
            equal(arguments.length, 0);
            mediator.unsubscribe("onCreateCard", 1);
        }
        mediator.subscribe("onCreateCard", assertion, null, 1);
        model.createCard();
    });

    test("addCard", function() {
        var card = {
                "id": "id1",
                "name": "card   1",
                "description": "description1",
                "value": 1.00,
                "photo": "photo1"
            };

        expect(1);
        function assertion(data) {
            deepEqual(card, data);
            mediator.unsubscribe("onCardAdded", 1);
        }
        mediator.subscribe("onCardAdded", assertion, null, 1);
        model.addCard();
    });

    test("editCard", function() {
        expect(1);
        function assertion(data) {
            equal(data, null);
            mediator.unsubscribe("NOTIFICATION", 1);
        }
        mediator.subscribe("NOTIFICATION", assertion, null, 1);
        model.editCard();
    });

    test("updateCard", function() {
        expect(1);
        function assertion(data) {
            equal(data, null);
            mediator.unsubscribe("NOTIFICATION", 1);
        }
        mediator.subscribe("NOTIFICATION", assertion, null, 1);
        model.updateCard();
    });
});