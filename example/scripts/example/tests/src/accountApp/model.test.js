$(function() {

    module("model.example");

    test("new", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            serviceFactory = app.serviceFactory,
            storeFactory = app.storeFactory,
            validatorFactory = app.validatorFactory;
        expect(1);
        ok($.ku4webApp.models.example(mediator, serviceFactory, storeFactory, validatorFactory));
    });

    test("requestForm", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            serviceFactory = app.serviceFactory,
            storeFactory = app.storeFactory,
            validatorFactory = app.validatorFactory,
            model = $.ku4webApp.models.example(mediator, serviceFactory, storeFactory, validatorFactory);

        expect(1);
        function assertion(data) { equal(data, null); }
        mediator.clear().subscribe("accountFormRequested", assertion);
        model.requestForm();
    });

    test("cancelForm", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            serviceFactory = app.serviceFactory,
            storeFactory = app.storeFactory,
            validatorFactory = app.validatorFactory,
            model = $.ku4webApp.models.example(mediator, serviceFactory, storeFactory, validatorFactory);

        expect(1);
        function assertion(data) { equal(data, null); }
        mediator.clear().subscribe("createAccountCanceled", assertion);
        model.cancelForm();
    });

    test("createAccount", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            serviceFactory = app.serviceFactory,
            storeFactory = app.storeFactory,
            validatorFactory = app.validatorFactory,
            model = $.ku4webApp.models.example(mediator, serviceFactory, storeFactory, validatorFactory),
            result = {
                "isValid": false,
                "messages": {
                    "email": "Email is invalid."
                }
            };
        expect(1);
        function assertion(data) { deepEqual(data, result); }
        mediator.clear().subscribe("accountInvalid", assertion);
        model.createAccount($.dto());
    });

    test("listAccounts", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            serviceFactory = app.serviceFactory,
            storeFactory = app.storeFactory,
            validatorFactory = app.validatorFactory,
            model = $.ku4webApp.models.example(mediator, serviceFactory, storeFactory, validatorFactory);

        expect(1);
        function assertion(data) { deepEqual(data, []); }
        mediator.clear().subscribe("accountsListed", assertion);
        model.listAccounts();
    });
});