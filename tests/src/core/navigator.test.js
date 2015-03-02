$(function() {

    module("$.ku4webApp.navigator");

    var app = $.ku4webApp_testBundle.app(),
        mediator = $.mediator(),
        serviceFactory = app.serviceFactory,
        socketFactory = app.socketFactory,
        storeFactory = app.storeFactory,
        validatorFactory = app.validatorFactory,
        modelFactory = $.ku4webApp.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory),
        navigator = $.ku4webApp.navigator(modelFactory, $.ku4webApp.config.navigator).throwErrors();

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
        expect(1);

        function assert1() {
            deepEqual($.list(arguments).toArray(), [1,2,3,4,5,6]);
            mediator.unsubscribe("onMethod2", 1);
        }
        mediator.subscribe("onMethod2", assert1, null, 1);
        navigator.execute("test.hash2_ku4_WzEsMiwzLDQsNSw2XQ==");

        //raises(function() { navigator.execute("test.hash2_ku4_WzEsMiwzLDQs") });
    });

    test("executeOrDefault", function () {
        expect(1);

        function assert() {
            deepEqual($.list(arguments).toArray(), []);
            mediator.unsubscribe("onMethod1", 1);
        }
        mediator.subscribe("onMethod1", assert, null, 1);
        navigator.executeOrDefault("test.hash3", "test.hash1");
    });

    test("route", function() {
        expect(2);

        function assert1() {
            deepEqual($.list(arguments).toArray(), [1,2,3,4,5,6]);
            mediator.unsubscribe("onMethod2", 1);
        }
        mediator.subscribe("onMethod2", assert1, null, 1);

        navigator.write("test.hash2", 1, 2, 3, 4, 5, 6);
        navigator.route();


        function assert2() {
            deepEqual($.list(arguments).toArray(), []);
            mediator.unsubscribe("onMethod0", 2);
        }
        mediator.subscribe("onMethod0", assert2, null, 2);

        navigator.write("test.hash3", 1, 2, 3, 4, 5, 6);
        navigator.route();
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