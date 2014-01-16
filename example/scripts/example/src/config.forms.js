$.ku4webApp.config.forms = {
    example: [
        {
            selector: "#username",
            type: "field",
            spec: $.fields.specs.alphaNumeric,
            required:true
        },
        {
            selector: "#password",
            type: "field",
            spec: $.fields.specs.alphaNumeric,
            required:true
        },
        {
            selector: "#firstName",
            type: "field",
            spec: $.fields.specs.alpha,
            required:true
        },
        {
            selector: "#lastName",
            type: "field",
            spec: $.fields.specs.alpha,
            required:true
        },
        {
            selector: "#email",
            type: "field",
            spec: $.fields.specs.email,
            required:true
        },
        {
            selector: "#reco",
            type: "select",
            required:false
        }
    ]
}