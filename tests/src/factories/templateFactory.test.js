$(function() {

    module("$.ku4webApp.templateFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.templateFactory($.mediator(), $.ku4webApp.config.templates));
    });

    test("create", function() {
        expect(1);
        ok($.ku4webApp.templateFactory($.mediator(), $.ku4webApp.config.templates).create("test"));
    });

});