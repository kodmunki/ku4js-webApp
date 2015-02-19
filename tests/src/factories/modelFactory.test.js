$(function() {

    module("$.ku4webApp.modelFactory");

    var mediator = $.mediator(),
        serviceFactory = $.ku4webApp.serviceFactory(mediator, $.ku4webApp.config.services),
        socketFactory = $.ku4webApp.socketFactory(mediator, $.ku4webApp.config.sockets),
        storeFactory = $.ku4webApp.storeFactory(mediator, $.ku4webApp.config.collections),
        validatorFactory = $.ku4webApp.validatorFactory($.ku4webApp.config.validators);

    test("new", function() {
        expect(1);
        ok($.ku4webApp.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory));
    });

    test("create", function() {
        var modelFactory = $.ku4webApp.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);

        expect(1);
        ok(modelFactory.create("test"));
    });

    test("createAndNotify", function() {
        var modelFactory = $.ku4webApp.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory),
            model = modelFactory.create("test");

        modelFactory.create("test");
        modelFactory.create("test");

        expect(2);
        ok(modelFactory.create("test"));
        mediator.subscribe("executed", function(data) { equal(data, 1); });

        model.execute(1);
    });

});