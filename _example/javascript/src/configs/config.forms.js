$.ku4webApp.config.forms = {
    card: [
        {
            selector: "#name",
            type: "field",
            required:true
        },
        {
            selector: "#photo",
            type: "imageFileField",
            maxDims: [100,100]
        },
        {
            selector: "#description",
            type: "field",
            required:true
        },
        {
            selector: "#value",
            type: "field",
            required:true
        }
    ]
};