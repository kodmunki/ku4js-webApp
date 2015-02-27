$(function() {

    module("model.card");

    var bundle = $.ku4webAppUT.bundle().throwErrors(),
        mediator = bundle.mediator(),
        model = bundle.model("card"),
        cardList = [{
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

    test("new", function() {
        expect(1);
        ok(model);
    });

    test("listCards", function() {
        expect(1);
        function assertion(data) {
            deepEqual(data, cardList);
            mediator.unsubscribe("onCardsListed", 1);
        }
        bundle.collection("card").init(cardList);
        bundle.onServiceCall("card.list", function() { return cardList; }, null, 1);
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

//    test("addCard", function() {
//        var card = $.dto({
//                "name": "card 1",
//                "description": "description1",
//                "value": 1.00
//            });
//
//        expect(1);
//        function assertion(data) {
//            deepEqual(data, [card.toObject()]);
//            mediator.unsubscribe("onCardAdded", 1);
//        }
//        mediator.subscribe("onCardAdded", assertion, null, 1);
//        model.addCard(card);
//    });

//
//    test("editCard", function() {
//        expect(1);
//        function assertion(data) {
//            deepEqual(data, cardList[0]);
//            mediator
//                .unsubscribe("onCardsListed", 1)
//                .unsubscribe("onEditCard", 1);
//        }
//        mediator
//            .subscribe("onCardsListed", function() { }, null, 1)
//            .subscribe("onEditCard", assertion, null, 1);
//        model.listCards().editCard("id1");
//    });

//    test("updateCard", function() {
//        expect(1);
//        function onCardUpdated(data) {
//            deepEqual(data, [{
//                "id": "id1",
//                "name": "card1",
//                "description": "description1",
//                "value": 20.15
//            },
//            {
//                "id": "id2",
//                "name": "card2",
//                "description": "description2",
//                "value": 2.00
//            }]);
//            mediator.unsubscribe("onCardUpdated", 1);
//        }
//        mediator.subscribe("onCardUpdated", onCardUpdated, null, 1);
//        model.updateCard($.dto({"id":"id1", "value": 20.15}));
//    });
});