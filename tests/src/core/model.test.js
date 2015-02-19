$(function() {

    module("$.ku4webApp.model");

    var app = $.ku4webApp_testBundle.app()  ,
        mediator = $.mediator(),
        serviceFactory = app.serviceFactory,
        socketFactory = app.socketFactory,
        storeFactory = app.storeFactory,
        validatorFactory = app.validatorFactory;

    test("new", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory));
    });

    test("service", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory).service());
    });

    test("collection", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory).collection());
    });

    test("validate", function() {
        expect(1);
        ok($.ku4webApp.models.test(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory).validator());
    });

    test("notify", function() {
        var model = $.ku4webApp.models.test(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
        model.notify(null, "DATA");
        expect(1);

        ok(model.testData, "DATA");
    });
});