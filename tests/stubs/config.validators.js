$.ku4webApp.config.validators = {
    test: [
        {
            name: "alpha",
            spec: $.fields.specs.alphaNumeric,
            message: "Alpha is invalid."
        },
        {
            name: "numeric",
            spec: $.fields.specs.alphaNumeric,
            message: "Numeric is invalid."
        },
        {
            name: "alphaNumeric",
            spec: $.fields.specs.alphaNumeric,
            message: "AlphaNumeric is invalid."
        },
        {
            name: "email",
            spec: $.fields.specs.email,
            message: "Email is invalid."
        },
        {
            name: "phone",
            spec: $.fields.specs.phone,
            message: "Phone is invalid."
        },
        {
            name: "custom",
            spec: $.spec(function(value){ return /^custom$/.test(value); }),
            message: "Custom is invalid."
        },
        {
            name: "select",
            spec: $.spec(function(value){ return !$.isNullOrEmpty(value); }),
            message: "Select is invalid."
        },
        {
            name: "checkbox",
            spec: $.spec(function(value){ return !$.isNullOrEmpty(value); }),
            message: "Checkbox is invalid."
        }
    ]
}