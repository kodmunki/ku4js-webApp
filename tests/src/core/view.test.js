$(function() {

    module("$.ku4webApp.view");

   var app = $.ku4webApp.app();

    test("new", function() {
        expect(1);
        ok($.ku4webApp.views.test(app));
    });

    test("template", function() {
        expect(1);
        ok($.ku4webApp.views.test(app).template());
    });

    test("form", function() {
        expect(1);
        ok($.ku4webApp.views.test(app).form());
    });

});