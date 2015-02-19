$(function() {

    module("$.ku4webApp.socketFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.socketFactory($.mediator(), $.ku4webApp.config.sockets));
    });

    test("create", function() {
        expect(1);
        ok($.ku4webApp.socketFactory($.mediator(), $.ku4webApp.config.sockets).create("test"));
    });

});