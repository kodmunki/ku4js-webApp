$.ku4webApp.config.templates.views = {
    validation: {
        container: '<ul class="css-validation-error">{{messages}}</ul>',
        message: '<li class="css-validation-error">{{message}}</li>'
    },

    account: '<div><h4>{{firstName}} {{lastName}}</h4>' +
                '<ul class="css-account-error">' +
                    '<li class="css-account-data">' +
                        '<span class="css-label">Username: </span>' +
                        '<span class="css-value">{{username}}</span></li>' +
                    '<li class="css-account-data">' +
                        '<span class="css-label">Password: </span>' +
                        '<span class="css-value">{{password}}</span></li>' +
                    '<li class="css-account-data">' +
                        '<span class="css-label">Email: </span>' +
                        '<span class="css-value">{{email}}</span></li></ul></div>'
};