$(function() {

    module("$.ku4webApp.controller");

    var mediator = $.mediator(),
        serviceFactory = $.tests.stubs.serviceFactory(mediator, $.tests.config.services) ,
        formFactory = $.tests.stubs.formFactory($.tests.config.forms);

    test("new", function() {
        expect(1);
        ok($.tests.stubs.controller(mediator, serviceFactory, formFactory));
    });

    test("mediator", function() {
        expect(1);
        ok($.tests.stubs.controller(mediator, serviceFactory, formFactory).mediator());
    });

    test("serviceFactory", function() {
        expect(1);
        ok($.tests.stubs.controller(mediator, serviceFactory, formFactory).serviceFactory);
    });

    test("formFactory", function() {
        expect(1);
        ok($.tests.stubs.controller(mediator, serviceFactory, formFactory).formFactory);
    });

});