$.ku4webApp.config.forms = {
    card: [
        {
            selector: '#cardId',
            type: "field",
            required:true
        },
        {
            selector: '#cardNameField',
            type: "field",
            required:true
        },
        {
            selector: '#cardPhotoField',
            type: "imageFileField",
            maxDims: [100,100]
        },
        {
            selector: '#cardValueField',
            type: "field",
            required:true,
            format: function(value) { return $.money.parse(value).value(); }
        },
        {
            selector: '#cardDescriptionField',
            type: "field",
            required:true
        }
    ]
};