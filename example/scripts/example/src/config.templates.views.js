$.ku4webApp.config.templates.views = {
    validation: {
        container: '<ul class="css-validation-error">{{messages}}</ul>',
        message: '<li class="css-validation-error">{{message}}</li>'
    },

    account: '<div>' +
                '<div><h4>Account Data</h4></div>' +
                '<ul class="css-account-error">' +
                    '<li class="css-account-error">{{username}}</li>' +
                    '<li class="css-account-error">{{password}}</li>' +
                    '<li class="css-account-error">{{firstName}}</li>' +
                    '<li class="css-account-error">{{lastName}}</li>' +
                    '<li class="css-account-error">{{email}}</li>' +
                '</ul>' +
             '</div>'
}