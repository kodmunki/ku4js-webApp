$(function() {

    module("$.ku4webApp.store");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test"));
    });

    asyncTest("find", function() {
        var data1 = {
                name: "test",
                value: "data"
            },
            data2 = {
                name: "test",
                value: "data"
            };

        expect(5);
        $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
            .init([data1, data2], function(err, store) {
                store.find({name: "test"}, function(err, results) {
                    equal(results.length, 2);
                    equal(results[0].name, data1.name);
                    equal(results[0].value, data1.value);
                    equal(results[1].name, data2.name);
                    equal(results[1].value, data2.value);

                    store.remove(function() {
                        start();
                    });
                });
            });
    });

    asyncTest("insert", function() {
        var data = {
                name: "test",
                value: "data"
            };

        expect(3);
        $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
            .insert(data, function(err, store) {
                store.find({name: "test"}, function(err, results) {
                    equal(results.length, 1);
                    equal(results[0].name, data.name);
                    equal(results[0].value, data.value);
                    store.remove(function() { start(); });
                });
            });
    });

    asyncTest("find in", function() {
        var data = [{
                name: "test",
                value: "data"
            },
            {
                name: "otherTest",
                value: "otherData"
            },
            {
                name: "testToo",
                value: "moreData"
            }];

        expect(3);
        $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
            .insertList(data, function(err, store) {
                store.find({$in: {name: ["test", "testToo"]}, $orderby: {value: -1}},
                            function(err, results) {
                                equal(results.length, 2);
                                equal(results[0].value, data[2].value);
                                equal(results[1].value, data[0].value);
                                store.remove(function() { start(); });
                            });
            });
    });

    asyncTest("update", function() {
        var data = {
                name: "test",
                value: "data"
            };

        expect(4);
        $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
            .insert(data, function(err, store) {
                store.find({name: "test"}, function(err, results) {
                    var result = results[0];
                    equal(result.name, data.name);
                    equal(result.value, data.value);
                    result.name = "newTester";

                    store.update({"value": result.value}, result, function(err, store) {
                        store.find({"value": data.value}, function(err, results) {
                            var result = results[0];
                            equal(result.name, "newTester");
                            equal(result.value, data.value);
                            store.remove(function() { start(); });
                        });
                    });
                });
            });
    });

    asyncTest("remove", function() {
        var data = [{
                name: "test",
                value: "data"
            },
            {
                name: "otherTest",
                value: "otherData"
            },
            {
                name: "testToo",
                value: "moreData"
            }];
        expect(2);
        $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
            .insertList(data, function(err, store) {
                store.find({}, function(err, results) {
                    equal(results.length, 3);
                    store.remove(data[0], function(err, store) {
                        store.find({}, function(err, results) {
                            equal(results.length, 2);
                            store.remove(function () {
                                start();
                            });
                        });
                    });
                });
            });
    });

    asyncTest("join", function() {
        var collection1 = $.ku4collection("collection1", {
                "kuid1": {
                    "id": 100,
                    "name": "myName1"
                },
                "kuid2": {
                    "id": 200,
                    "name": "myName2"
                },
                "kuid3": {
                    "id": 300,
                    "name": "myName3"
                }
            }),
            collection2 = $.ku4collection("collection2", {
                "kuid1": {
                    "id": 110,
                    "cid": 100,
                    "name": "otherName1"
                },
                "kuid2": {
                    "id": 120,
                    "cid": 200,
                    "name": "otherName1"
                },
                "kuid3": {
                    "id": 130,
                    "cid": 300,
                    "name": "otherName3"
                }
            });

        $.ku4store().write(collection1).write(collection2);

        var config = {
                test1: { name: "collection1" },
                test2: { name: "collection2" }
            };

        expect(5);
        $.ku4webApp.store($.mediator(), config, "test1")
            .join("test2", "id", "cid", function(err, store) {
                store.find({}, function(err, results) {
                    equal(results.length, 3);

                    var result0 = results[0];

                    equal(result0["collection1.id"], 100);
                    equal(result0["collection2.id"], 110);
                    equal(result0["collection1.name"], "myName1");
                    equal(result0["collection2.name"], "otherName1");

                    store.remove(function() { start(); });
                });
            });
    });

    test("exec", function() {
        var data1 = {
                name: "test",
                value: "data"
            },
            data2 = {
                name: "test",
                value: "data"
            };
        var store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections, "test")
                        .insertList([data1, data2]).exec(function(item) { return {"id": item.name, "value": 1}});

        var results = store.find();

        expect(5);
        equal(results.length, 2);
        equal(results[0].id, data1.name);
        equal(results[0].value, 1);
        equal(results[1].id, data2.name);
        equal(results[1].value, 1);
        store.remove();
    });
});