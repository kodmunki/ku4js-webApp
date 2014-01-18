$(function() {

    module("$.ku4webApp.controllers");

    var app = $.ku4webApp.app();

    test("new", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app));
    });

    test("read", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app).read());
    });

    test("clear", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app).clear().read());
    });
});