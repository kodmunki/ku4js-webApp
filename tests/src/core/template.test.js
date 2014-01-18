$(function() {

    module("$.ku4webApp.templates");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.templates.test($.ku4webApp.config.templates));
    });

    test("render", function() {
        var data = {
                id: "myId",
                className: "myClassName",
                content: "myContent"
            },
            testValue = '<div id="myId" class="myClassName">myContent</div>';
        expect(1);

        equal($.ku4webApp.templates.test($.ku4webApp.config.templates).renderDiv(data), testValue);
    });
});