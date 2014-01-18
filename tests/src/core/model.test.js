$(function() {

    module("$.ku4webApp.model");

    var mediator = $.mediator(),
        serviceFactory = $.ku4webApp.serviceFactory(mediator, $.ku4webApp.config.services),
        storeFactory = $.ku4webApp.storeFactory(mediator, $.ku4webApp.config.collections),
        validatorFactory = $.ku4webApp.validatorFactory($.ku4webApp.config.validators);

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
        ok($.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory).validate($.dto()));
    });

    test("notify", function() {
        var model = $.ku4webApp.models.test(mediator, serviceFactory, storeFactory, validatorFactory);
        model.notify("DATA")
        expect(1);
        ok(model.testData, "DATA");
    });
});