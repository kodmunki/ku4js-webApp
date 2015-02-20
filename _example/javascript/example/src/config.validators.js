$.ku4webApp.config.validators = {
    card: [
        {
            name: "name",
            spec: $.spec(function(value) { return /^\w{1,140}$/.test(value); }),
            message: "Username is invalid."
        },
        {
            name: "description",
            spec: $.spec(function(value) { return /.{1,140}/.test(value) }),
            message: "Invalid description."
        },
        {
            name: "value",
            spec: $.spec(function(value) { return $.money.canParse(value); }),
            message: "Invalid value."
        }
    ]
};