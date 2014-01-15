$(function() {

    module("$.ku4webApp.form");

    var config = $.tests.config.forms.test;

    test("new", function() {
        expect(1);
        ok($.ku4webApp.form(config));
        console.log($.ku4webApp.form(config))
    });

});