$(function() {

    module("$.ku4webApp.view");

    var mediator = $.mediator(),
        responsebox = $.ku4webApp.responsebox(".js-responsebox"),
        templateFactory = $.tests.stubs.template($.tests.config.templates);

    test("new", function() {
        expect(1);
        ok($.tests.stubs.view(mediator, responsebox, templateFactory));
    });

});