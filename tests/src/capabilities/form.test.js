$(function() {

    module("$.ku4webApp.form");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.form($.ku4webApp.config.forms.test));
    });

});