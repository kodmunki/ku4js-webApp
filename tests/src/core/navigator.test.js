$(function() {

    module("$.ku4webApp.navigator");

    QUnit.config.reorder = false;

    var modelFactory = $.ku4webApp.app().modelFactory,
        navigator = $.ku4webApp.navigator(modelFactory, $.ku4webApp.config);

    test("new", function () {
        expect(1);
        ok(navigator);
    });

    test("hashEquals", function () {
        expect(1);
        navigator.clear();
        ok(navigator.hashEquals(""));
    });

    test("hash", function () {
        expect(1);
        navigator.hash("test.hash");
        ok(navigator.hashEquals("test.hash"));
    });

    test("read", function () {
        expect(1);
        navigator.hash("test.hash");
        equal(navigator.read(), "test.hash");
    });

    test("write", function () {
        expect(2);
        navigator.write("test.hash", 1, 2, 3, 4, 5, 6);
        ok(navigator.hashContainsArguments());
        equal(navigator.read(), "test.hash_ku4_WzEsMiwzLDQsNSw2XQ==");
    });

    test("execute", function () {
        expect(0);
        navigator.execute("test.hash3");
    });

    test("executeOrDefault", function () {
        expect(0);
        navigator.execute("test.hash3", "test.hash1");
    });

    asyncTest("forward/back", function () {
        expect(4);
        navigator.write("test.hash1");
        navigator.write("test.hash2");
        navigator.write("test.hash1");
        navigator.back(function() {
            ok(navigator.hashEquals("test.hash2"));
            equal(navigator.read(), "test.hash2");
            navigator.forward(function() {
                ok(navigator.hashEquals("test.hash1"));
                equal(navigator.read(), "test.hash1");
                start();
            });
        });
    });

});