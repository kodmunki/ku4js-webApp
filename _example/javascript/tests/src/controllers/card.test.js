$(function() {

    module("controller.card");

    var bundle = $.ku4webAppUT.bundle(),
        controller = bundle.controller("card");

    test("new", function() {
        expect(1);
        ok(controller);
    });

    test("list", function() {
        expect(1);
        bundle.onModelCall("listCards", function () {
            equal(arguments.length, 0);
        });
        controller.list();
    });

    test("create", function() {
        expect(1);
        bundle.onModelCall("createCard", function () {
            equal(arguments.length, 0);
        });
        controller.create();
    });

    test("add", function() {
        $("#qunit-fixture").append(bundle.template("card").renderAddCardForm());

        var card = {
            "description": "description1",
            "name": "card1",
            "value": 1.00
        };
        expect(1);
        bundle.form("card").write(card);
        bundle.onModelCall("addCard", function (dto) {
            deepEqual(dto.toObject(), card);
        });
        controller.add();
    });

    test("edit", function() {
        expect(1);
        bundle.onModelCall("editCard", function (id) {
            equal(id, "id1");
        });
        controller.edit("id1");
    });
});