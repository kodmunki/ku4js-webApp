$(function() {

    module("$.ku4webApp.service");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.service($.mediator(), "name", $.ku4webApp.config.services.test));
    });

});