$.ku4webApp.config.validators = {
    example: [
        {
            name: "username",
            spec: $.fields.specs.alphaNumeric,
            message: "Username is invalid."
        },
        {
            name: "password",
            spec: $.fields.specs.alphaNumeric,
            message: "Password is invalid."
        },
        {
            name: "firstName",
            spec: $.fields.specs.alpha,
            message: "First name is invalid."
        },
        {
            name: "lastName",
            spec: $.fields.specs.alpha,
            message: "Last name is invalid."
        },
        {
            name: "email",
            spec: $.fields.specs.email,
            message: "Email is invalid."
        }
    ]
}