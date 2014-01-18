$(function() {

    module("$.ku4webApp.validatorFactory");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.validatorFactory($.ku4webApp.config.validators));
    });

    test("create", function() {
        var dto = $.ku4webApp.formFactory($.ku4webApp.config.forms).create("test").clear().read(),
            validatorFactory = $.ku4webApp.validatorFactory($.ku4webApp.config.validators),
            validator = validatorFactory.create("test"),
            validation = validator.validate(dto);
        expect(1);
        ok(!validation.isValid);
    });

});