$(function() {

    module("templates.NAME");

    var bundle = $.ku4webAppUT.bundle(),
        template = bundle.template("NAME");

    test("new", function() {
        expect(1);
        ok(template);
    });

    test("UNIT TEST NAME", function() {
        var result = 'RENDERD RESULT EXPECTATION';
        expect(1);
        equal(template.METHOD(), result);
    });
});