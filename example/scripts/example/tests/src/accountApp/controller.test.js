$(function() {

    module("controller.example");

    var bundle = $.ku4webAppUT.bundle().throwErrors(),
        mediator = bundle.mediator(),
        controller = bundle.controller("example");

    test("new", function() {
        expect(1);
        ok(controller);
    });

    test("requestForm", function() {
        expect(1);
        function assertion(data) {
            equal(data, null);
            mediator.unsubscribe("accountFormRequested", 1);
        }
        mediator.subscribe("accountFormRequested", assertion, null, 1);
        controller.requestForm();
    });

    test("cancel", function() {
        expect(1);
        function assertion(data) {
            equal(data, null);
            mediator.unsubscribe("createAccountCanceled", 1);
        }
        mediator.subscribe("createAccountCanceled", assertion, null, 1);
        controller.cancel();
    });

    test("create Invalid", function() {
        expect(6);
        function assertion(data) {
            equal(data.isValid, false);
            equal(data.messages.username, "Username is invalid.");
            equal(data.messages.password, "Password is invalid.");
            equal(data.messages.firstName, "First name is invalid.");
            equal(data.messages.lastName, "Last name is invalid.");
            equal(data.messages.email, "Email is invalid.");
            mediator.unsubscribe("accountInvalid", 1);
        }
        mediator.subscribe("accountInvalid", assertion, null, 1);
        controller.create();
    });

    test("listAccounts", function() {
        expect(5);
        function assertion(data) {
            var user = data[0];
            equal(user.username, "username");
            equal(user.password, "1234567");
            equal(user.firstName, "John");
            equal(user.lastName, "Doe");
            equal(user.email, "john.doe@email.com");
            mediator.unsubscribe("accountsListed", 1);
        }
        mediator.subscribe("accountsListed", assertion, null, 1);
        controller.listAccounts();
    });

});