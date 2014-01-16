$(function() {

    module("$.ku4webApp.serviceFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.serviceFactory($.mediator(), $.ku4webApp.config.services));
    });

    test("create", function() {
        expect(1);
        ok($.ku4webApp.serviceFactory($.mediator(), $.ku4webApp.config.services).create("test"));
    });

});