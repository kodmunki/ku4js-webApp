$(function() {

    module("$.ku4webApp.template");

    var templates = $.tests.config.templates;

    test("new", function() {
        expect(1);
        ok($.tests.stubs.template(templates));
    });

    test("render", function() {
        var data = {
            id: "myId",
            className: "myClassName",
            content: "myContent"
        }
        expect(1);
        equal($.tests.stubs.template(templates).renderDiv(data), '<div id="myId" class="myClassName">myContent</div>');
    });
});