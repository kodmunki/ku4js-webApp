$(function() {

    module("controller.NAME");

    var bundle = $.ku4webAppUT.bundle().throwErrors(),
        controller = bundle.controller("NAME");

    test("new", function() {
        expect(1);
        ok(controller);
    });

    test("UNIT TEST NAME", function() {
        expect(1);
        bundle.onModelCall(function (data) {
            equal(data, null);
        });
        controller.METHOD();
    });
});