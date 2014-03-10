$(function() {

    module("model.example");

    var bundle = $.ku4webAppUT.bundle(),
        mediator = bundle.mediator(),
        model = bundle.model("example");

    test("new", function() {
        expect(1);
        ok(model);
    });

    test("requestForm", function() {
        expect(5);
        function assertion(data) {
            equal(data.username, "username");
            equal(data.password, "1234567");
            equal(data.firstName, "John");
            equal(data.lastName, "Doe");
            equal(data.email, "john.doe@email.com");
            mediator.unsubscribe("accountFormRequested", 1);
        }
        mediator.subscribe("accountFormRequested", assertion, null, 1);
        model.requestForm();
    });

    test("cancelForm", function() {
        expect(1);
        function assertion(data) {
            equal(data, null);
            mediator.unsubscribe("createAccountCanceled", 1);
        }
        mediator.subscribe("createAccountCanceled", assertion, null, 1);
        model.cancelForm();
    });

    test("createAccount Valid", function() {
        expect(5);
        function assertion(data) {
            equal(data.username, "username");
            equal(data.password, "1234567");
            equal(data.firstName, "John");
            equal(data.lastName, "Doe");
            equal(data.email, "john.doe@email.com");
            mediator.unsubscribe("accountCreated", 1);
        }
        mediator.subscribe("accountCreated", assertion, null, 1);
        model.clearAccounts().createAccount($.dto({
            username: "username",
            password: "1234567",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            success: {
                username: "username",
                password: "1234567",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@email.com"
            }
        }));
    });

    test("createAccount Invalid", function() {
        expect(2);
        function assertion(data) {
            equal(data.isValid, false);
            equal(data.messages.email, "Email is invalid.");
            mediator.unsubscribe("accountInvalid", 1);
        }
        mediator.subscribe("accountInvalid", assertion, null, 1);
        model.createAccount();
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
        model.listAccounts();
    });
});