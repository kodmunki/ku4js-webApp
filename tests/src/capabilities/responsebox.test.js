$(function() {

    module("$.ku4webApp.responsebox");

    var query =".js-responsebox"

    test("new", function() {
        expect(1);
        ok($.ku4webApp.responsebox(query));
    });

    test("show", function() {
        $.ku4webApp.responsebox(query).show("data");
        expect(2);
        ok(/css\-responsebox\-show/.test($(query)[0].className));
        equal($(query).html(), "data");
    });

    test("hide", function() {
        $.ku4webApp.responsebox(query).hide();
        expect(1);
        ok(!/css\-responsebox\-show/.test($(query)[0].className));
    });

});