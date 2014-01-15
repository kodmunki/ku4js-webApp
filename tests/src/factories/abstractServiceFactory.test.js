$(function() {

    module("$.ku4webApp.serviceFactory");

    var mediator = $.mediator(),
        config;

    test("new", function() {
        expect(1);
        ok($.tests.stubs.serviceFactory(mediator, config));
    });

    test("create", function() {
        expect(1);
        ok($.tests.stubs.serviceFactory(mediator, config).create());
    });

});