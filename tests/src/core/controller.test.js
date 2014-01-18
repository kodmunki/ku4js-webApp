$(function() {

    module("$.ku4webApp.controllers");

    var app = $.ku4webApp.app();

    test("new", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app));
    });

    test("model", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app).model());
    });

    test("form", function() {
        expect(1);
        ok($.ku4webApp.controllers.test(app).form());
    });
});