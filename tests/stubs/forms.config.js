$.tests.config.forms = {
    test: [
        {
            selector: ".js-test-alpha",
            type: "field",
            spec: $.fields.specs.alphaNumeric,
            required:true
        },
        {
            selector: ".js-test-numeric",
            type: "field",
            spec: $.fields.specs.alphaNumeric,
            required:true
        },
        {
            selector: ".js-test-alphaNumeric",
            type: "field",
            spec: $.fields.specs.alphaNumeric,
            required:true
        },
        {
            selector: ".js-test-email",
            type: "field",
            spec: $.fields.specs.email,
            required:true
        },
        {
            selector: ".js-test-phone",
            type: "field",
            spec: $.fields.specs.phone,
            required:true
        },
        {
            selector: ".js-test-custom",
            type: "field",
            spec: $.spec(function(value){ return /^custom$/.test(value); }),
            required:true
        },
        {
            selector: ".js-test-select",
            type: "select",
            spec: $.spec(function(value){ return !$.isNullOrEmpty(value); }),
            required:true
        },
        {
            selector: ".js-test-checkbox",
            type: "checkbox",
            spec: $.spec(function(value){ console.log("value", value); return !$.isNullOrEmpty(value); }),
            required:true
        }
    ]
};