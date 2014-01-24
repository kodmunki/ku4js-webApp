$(function() {

    module("controller.example");

    test("new", function() {
        var app = $.ku4webApp_testBundle.app();
        expect(1);
        ok($.ku4webApp.controllers.example(app));
    });

    test("requestForm", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            controller = $.ku4webApp.controllers.example(app);
        expect(1);
        function assertion(data) { equal(data, null); }
        mediator.clear().subscribe("accountFormRequested", assertion);
        controller.requestForm();
    });

    test("cancel", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            controller = $.ku4webApp.controllers.example(app);
        expect(1);
        function assertion(data) { equal(data, null); }
        mediator.clear().subscribe("createAccountCanceled", assertion);
        controller.cancel();
    });

    test("create", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            controller = $.ku4webApp.controllers.example(app),
            result = {
              "isValid": false,
              "messages": {
                "email": "Email is invalid.",
                "firstName": "First name is invalid.",
                "lastName": "Last name is invalid.",
                "password": "Password is invalid.",
                "username": "Username is invalid."
              }
            };
        expect(1);
        function assertion(data) { deepEqual(data, result); }
        mediator.clear().subscribe("accountInvalid", assertion);
        controller.create();
    });

    test("listAccounts", function() {
        var app = $.ku4webApp_testBundle.app(),
            mediator = app.mediator,
            controller = $.ku4webApp.controllers.example(app);
        expect(1);
        function assertion(data) { deepEqual(data, []); }
        mediator.clear().subscribe("accountsListed", assertion);
        controller.listAccounts();
    });
});