$(function() {

    module("$.ku4webApp.modelFactory");

    var mediator = $.mediator(),
        serviceFactory = $.ku4webApp.serviceFactory(mediator, $.ku4webApp.config.services),
        storeFactory = $.ku4webApp.storeFactory(mediator, $.ku4webApp.config.collections),
        validatorFactory = $.ku4webApp.validatorFactory($.ku4webApp.config.validators);

    test("new", function() {
        expect(1);
        ok($.ku4webApp.modelFactory(mediator, serviceFactory, storeFactory, validatorFactory));
    });

    test("create", function() {
        var modelFactory = $.ku4webApp.modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);

        expect(1);
        ok(modelFactory.create("test"));
    });

});