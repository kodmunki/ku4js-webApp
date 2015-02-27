$(function() {

    module("view.card", {
        setup: function() { $('#qunit-fixture').html('<div id="site"></div>'); }
    });

    var bundle = $.ku4webAppUT.bundle(),
        view = bundle.view("card");

    test("new", function() {
        expect(1);
        ok(view);
    });

    test("displayCardList", function() {
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

        expect(10);
        view.displayCardList(cardList);

        var cardDoms = $("#site").find(".js-card");
        equal(cardDoms.length, 2);
        equal($(".js-card-form").length, 0);

        var cardDom0 = $(cardDoms[0]),
            card0 = cardList[0];
        equal(cardDom0.find(".js-card-name").text(), card0.name);
        equal(cardDom0.find(".js-card-description").text(), card0.description);
        equal(cardDom0.find(".js-card-value").text(), card0.value);
        equal(cardDom0.find(".js-card-photo").attr("src"), card0.photo);

        var cardDom1 = $(cardDoms[1]),
            card1 = cardList[1];
        equal(cardDom1.find(".js-card-name").text(), card1.name);
        equal(cardDom1.find(".js-card-description").text(), card1.description);
        equal(cardDom1.find(".js-card-value").text(), card1.value);
        equal(cardDom1.find(".js-card-photo").attr("src"), card1.photo);
    });

    test("displayEditCard", function() {

        var card = {
            "id": "id3",
            "name": "card3",
            "description": "description3",
            "value": 3.00,
            "photo": "photo3"
        };

        expect(3);
        view.displayEditCard(card);

        var cardForm = $("#site").find("#cardForm");
        equal(cardForm.find("#cardNameField").val(), card.name);
        equal(cardForm.find("#cardValueField").val(), card.value);
        equal(cardForm.find("#cardDescriptionField").val(), card.description);
    });
});