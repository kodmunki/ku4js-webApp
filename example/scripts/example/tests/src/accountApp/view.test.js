$(function() {

    module("model.example");

    test("new", function() {
        var app = $.ku4webApp_testBundle.app();

        expect(1);
        ok($.ku4webApp.views.example(app));
    });

    test("accountFormRequested", function() {
        var app = $.ku4webApp_testBundle.app(),
            view = $.ku4webApp.views.example(app),
            data = {
                username: "john",
                password: "password",
                firstName: "john",
                lastName: "doe",
                email: "john.doe@email.com"
            };

        expect(5);
        view.accountFormRequested(data);
        var $dom = $(".js-responsebox");

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