$(function() {

    module("$.ku4webApp.templates");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.templates.test($.ku4webApp.config.templates));
    });

    test("config", function() {
        expect(1);
        ok($.ku4webApp.templates.test($.ku4webApp.config.templates).config());
    });

    test("forms", function() {
        expect(1);
        ok($.ku4webApp.templates.test($.ku4webApp.config.templates).forms());
    });

    test("views", function() {
        expect(1);
        ok($.ku4webApp.templates.test($.ku4webApp.config.templates).views());
    });

    test("render", function() {
        var data = {
                id: "myId",
                className: "myClassName",
                content: "myContent"
            },
            testValue = '<div id="myId" class="myClassName">myContent</div>';
        expect(1);
        equal($.ku4webApp.templates.test($.ku4webApp.config.templates).render(data), testValue);
    });

    test("renderList", function() {
        var data = [{
                id: "myId",
                className: "myClassName",
                content: "myContent"
            },
            {
                id: "myId2",
                className: "myClassName2",
                content: "myContent2"
            }],
            testValue = '<div id="myId" class="myClassName">myContent</div>' +
                        '<div id="myId2" class="myClassName2">myContent2</div>';
        expect(1);
        equal($.ku4webApp.templates.test($.ku4webApp.config.templates).renderList(data), testValue);
    });

    test("renderListWithAction", function() {
        var template = $.ku4webApp.templates.test($.ku4webApp.config.templates),
            data = [{
                id: "myId",
                className: "myClassName",
                content: "myContent"
            },
            {
                id: "myId2",
                className: "myClassName2",
                content: "myContent2"
            }],
            testValue = '<div id="myId" class="myClassName">myContent</div><span>Extra</span>' +
                        '<div id="myId2" class="myClassName2">myContent2</div><span>Extra</span>';

        function action(entity) {
            return template.render(entity) + '<span>Extra</span>';
        }
        expect(1);
        equal(template.renderListWithAction(data, action), testValue);
    });
});