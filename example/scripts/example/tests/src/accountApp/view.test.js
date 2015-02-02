$(function() {

    module("view.example");

    var bundle = $.ku4webAppUT.bundle(),
        view = bundle.view("example");

    test("new", function() {
        expect(1);
        ok(view);
    });

    test("accountFormRequested", function() {
        var data = {
                username: "john",
                password: "password",
                firstName: "john",
                lastName: "doe",
                email: "john.doe@email.com"
            };

        expect(5);
        view.accountFormRequested(data);
        equal(data.username, $("#username").val());
        equal(data.password, $("#password").val());
        equal(data.firstName, $("#firstName").val());
        equal(data.lastName, $("#lastName").val());
        equal(data.email, $("#email").val());
    });

    //test("accountCreated", function() { });
    //test("accountInvalid", function() { });
    //test("accountListed", function() { });
});