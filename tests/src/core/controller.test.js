$(function() {

    module("$.ku4webApp.controllers");

    var app = $.ku4webApp.app();

    test("new", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app));
    });

    test("mediator", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app).mediator());
    });

    test("service", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app).service());
    });

    test("validate", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app).validate());
    });

    test("read", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app).read());
    });

    test("clear", function() {
        expect(1);
        ok($.ku4webApp.controllers.testController(app).clear().read());
    });
});