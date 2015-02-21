$(function() {

    module("model.NAME");

    var bundle = $.ku4webAppUT.bundle(),
        view = bundle.view("NAME");

    test("new", function() {
        expect(1);
        ok(view);
    });

    test("UNIT TEST NAME", function() {
        var DOM = $("SELECTOR"),
            EXPECTED_DATA = {
                KEY: "VALUE"
            };

        expect(1);
        view.METHOD(data);
        equal(dom.find("SELECTOR").val(), EXPECTED_DATA.PROPERTY);
    });
});