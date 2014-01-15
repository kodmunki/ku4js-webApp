$(function() {

    module("$.ku4webApp.formFactory");

    var config = $.tests.config.forms;

    test("new", function() {
        expect(1);
        ok($.tests.stubs.formFactory(config));
    });

    test("create", function() {
        var formFactory = $.tests.stubs.formFactory(config),
            form = formFactory.create(),
            data = form.read().toObject();
        expect(0);
    });

});