$(function() {

    module("controller.example");

    var bundle = $.ku4webAppUT.bundle().throwErrors(),
        controller = bundle.controller("example");

    test("new", function() {
        expect(1);
        ok(controller);
    });

    test("requestForm", function() {
        expect(1);
        bundle.onModelCall(function (dto) {
            equal(dto, null);
        });
        controller.requestForm();

    });

    test("cancel", function() {
        expect(1);
        bundle.onModelCall(function (dto) {
            equal(dto, null);
        });
        controller.cancel();
    });

    test("create Invalid", function() {
        expect(6);
        bundle.onModelCall(function (dto) {
            equal(dto.find("username"), "");
            equal(dto.find("password"), "");
            equal(dto.find("firstName"), "");
            equal(dto.find("lastName"), "");
            equal(dto.find("email"), "");
            equal(dto.find("reco"), "");
        });
        controller.clear().create();
    });

    test("listAccounts", function() {
        expect(1);
        bundle.onModelCall(function (dto) {
            equal(dto, null);
        });
        controller.listAccounts();
    });

});