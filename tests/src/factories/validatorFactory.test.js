$(function() {

    module("$.ku4webApp.validatorFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.validatorFactory($.ku4webApp.config.validators));
    });

    test("create", function() {
        var form = $.ku4webApp.formFactory($.ku4webApp.config.forms).create("test").clear(),
            validatorFactory = $.ku4webApp.validatorFactory($.ku4webApp.config.validators),
            validator = validatorFactory.create("test"),
            validation = validator.validate(form);
        expect(1);
        ok(!validation.isValid);
    });

});