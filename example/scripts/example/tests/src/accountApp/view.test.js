$(function() {

    module("model.example");

    var bundle = $.ku4webAppUT.bundle(),
        view = bundle.view("example");

    test("new", function() {
        expect(1);
        ok(view);
    });

    test("accountFormRequested", function() {
        var $dom = $(".js-responsebox"),
            data = {
                username: "john",
                password: "password",
                firstName: "john",
                lastName: "doe",
                email: "john.doe@email.com"
            };

        expect(5);
        view.accountFormRequested(data);
        equal($dom.find("#username").val(), data.username);
        equal($dom.find("#password").val(), data.password);
        equal($dom.find("#firstName").val(), data.firstName);
        equal($dom.find("#lastName").val(), data.lastName);
        equal($dom.find("#email").val(), data.email);

        $dom.remove();
    });

    //test("accountCreated", function() { });
    //test("accountInvalid", function() { });
    //test("accountListed", function() { });
});