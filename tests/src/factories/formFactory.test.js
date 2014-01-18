$(function() {

    module("$.ku4webApp.formFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.formFactory($.ku4webApp.config.forms));
    });

    test("create", function() {
        var formFactory = $.ku4webApp.formFactory($.ku4webApp.config.forms);

        expect(1);
        ok(formFactory.create("test"))
    });

});