$(function() {

    module("$.ku4webApp.model");

    var app = $.ku4webApp_testBundle.app()  ,
        mediator = $.mediator(),
        serviceFactory = app.serviceFactory,
        storeFactory = app.storeFactory,
        validatorFactory = app.validatorFactory;

    test("new", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory));
    });

    test("service", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory).service());
    });

    test("collection", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory).collection());
    });

    test("validate", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory).validator());
    });

    test("notify", function() {
        var model = $.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory);
        model.notify("DATA")
        expect(1);
        ok(model.testData, "DATA");
    });
});