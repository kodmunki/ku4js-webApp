$(function() {

    module("$.ku4webApp.validator");

    test("new", function() {
        expect(1);
        ok($.ku4webApp.validator($.ku4webApp.config.validators.test));
    });

    test("validate invalid", function() {
        var dto = $.ku4webApp.form($.ku4webApp.config.forms.test).clear().read(),
            validation = $.ku4webApp.validator($.ku4webApp.config.validators.test).validate(dto);
        expect(9);
        ok(!validation.isValid);
        equal(validation.messages.alpha, "Alpha is invalid.");
        equal(validation.messages.numeric, "Numeric is invalid.");
        equal(validation.messages.alphaNumeric, "AlphaNumeric is invalid.");
        equal(validation.messages.email, "Email is invalid.");
        equal(validation.messages.phone, "Phone is invalid.");
        equal(validation.messages.custom, "Custom is invalid.");
        equal(validation.messages.select, "Select is invalid.");
        equal(validation.messages.checkbox, "Checkbox is invalid.");
    });

     test("validate valid", function() {

        $(".js-test-alpha").val("a");
        $(".js-test-numeric").val("1");
        $(".js-test-alphaNumeric").val("a1");
        $(".js-test-email").val("email@email.com");
        $(".js-test-phone").val("1112223333");
        $(".js-test-custom").val("custom");
        $(".js-test-select").val("0");
        $(".js-test-checkbox")[0].checked = true;

        var dto = $.ku4webApp.form($.ku4webApp.config.forms.test).read(),
            validation = $.ku4webApp.validator($.ku4webApp.config.validators.test).validate(dto);

        expect(9);
        ok(validation.isValid);
        ok($.isNullOrEmpty(validation.messages.alpha));
        ok($.isNullOrEmpty(validation.messages.numeric));
        ok($.isNullOrEmpty(validation.messages.alphaNumeric));
        ok($.isNullOrEmpty(validation.messages.email));
        ok($.isNullOrEmpty(validation.messages.phone));
        ok($.isNullOrEmpty(validation.messages.custom));
        ok($.isNullOrEmpty(validation.messages.select));
        ok($.isNullOrEmpty(validation.messages.checkbox));
    });
});