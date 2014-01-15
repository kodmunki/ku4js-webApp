$(function() {

    module("$.ku4webApp.service");

    var mediator = $.mediator(),
        config;

    test("new", function() {
        expect(1);
        ok($.tests.stubs.service(mediator, config));
    });

});