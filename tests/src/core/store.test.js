$(function() {

    module("$.ku4webApp.store");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.store($.mediator(), $.ku4webApp.config.collections.test));
    });

    test("insert", function() {
        var data = {
            name: "test",
            value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections.test);
        store.insert(data);

        expect(2);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);
        store.remove();
    });

    test("find", function() {
        var data = {
            name: "test",
            value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections.test);
        store.insert(data);

        expect(2);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);
        store.remove();
    });

    test("update", function() {
        var data = {
                name: "test",
                value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections.test);
        store.insert(data);

        expect(4);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);

        testData.name = "newTester";

        store.update({"_ku4Id": testData._ku4Id}, testData);
        var updateData = store.find({"_ku4Id": testData._ku4Id})[0];
        equal(updateData.name, "newTester");
        equal(updateData.value, data.value);
    });

    test("remove", function() {
        var data = {
            name: "test",
            value: "data"
            },
            store = $.ku4webApp.store($.mediator(), $.ku4webApp.config.collections.test);
        store.insert(data);

        expect(3);
        var testData = store.find({name: "test"})[0];
        equal(testData.name, data.name);
        equal(testData.value, data.value);
        store.remove();
        equal(store.find().length, 0);
    });


});