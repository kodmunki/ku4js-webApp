$(function() {

    module("$.ku4webApp.formFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.formFactory($.ku4webApp.config.forms));
    });

    test("create", function() {
        var formFactory = $.ku4webApp.formFactory($.ku4webApp.config.forms),
            form = formFactory.create("test"),
            data = form.read().toObject();
        expect(0);
    });

});