$.ku4webApp.config.validators = {
    employee: [
        {
            name: "firstName",
            spec: $.fields.specs.alphaNumeric,
            message: "Username is invalid."
        },
        {
            name: "lastName",
            spec: $.fields.specs.alphaNumeric,
            message: "Password is invalid."
        },
        {
            name: "departmentId",
            spec: $.fields.specs.alpha,
            message: "First name is invalid."
        },
        {
            name: "salary",
            spec: $.fields.specs.alpha,
            message: "Last name is invalid."
        },
        {
            name: "email",
            spec: $.fields.specs.email,
            message: "Email is invalid."
        }
    ],
    department: [
        {
            name: "departmentId",
            spec: $.fields.specs.alphaNumeric,
            message: "Username is invalid."
        },
        {
            name: "name",
            spec: $.fields.specs.alphaNumeric,
            message: "Password is invalid."
        },
    ]
};