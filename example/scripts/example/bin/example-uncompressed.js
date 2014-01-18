(function(l){ $=l;
$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$model("example").requestForm();
    },
    cancel: function() {
        this.$model("example").cancelForm();
    },
    create: function() {
        this.$model("example").createAccount(this.$read("example"));
    },
    listAccounts: function() {
        this.$model("example").listAccounts();
    }
});

$.ku4webApp.model("example", {
    requestForm: function() {
        var data = this.$collection("example").find({"firstName": "John"})[0];
        this.$notify(data, "accountFormRequested");
    },
    cancelForm: function() {
        this.$notify("createAccountCanceled");
    },
    createAccount: function(dto) {
        var validation = this.$validate(dto);
        if(!validation.isValid) this.$notify(validation, "accountInvalid");
        else this.$collection("example").insert(dto);
    },
    listAccounts: function() {
        var accounts = this.$collection("example").find();
        this.$notify(accounts, "accountsListed");
    }
});

$.ku4webApp.template("example", {
    renderForm: function() {
        return this.$render(this.$forms("example"));
    },
    renderValidation: function(data) {
        return this.$render(this.$views("example"), data);
    },
    renderAccountList: function(data) {
        return this.$renderList(this.$views("account"), data)
    }
});

$.ku4webApp.view("example", {
    accountFormRequested: function(data) {
        var template = this.$template("example");
        $(".js-responsebox").html(template.renderForm());
        this.$write("example", data);
    },
    accountCreated: function(data) {
        $(".js-validationMessages").html("Account created");
    },
    accountInvalid: function(data) {
        var template = this.$template("example");
        $(".js-validationMessages").html(template.renderValidation(data.messages));
    },
    createAccountCanceled: function(data) {
        $(".js-responsebox").html("");
    },
    accountsListed: function(data) {
        var template = this.$template("example");
        $(".js-accountList").html(template.renderAccountList(data));
    }
},
{
    "accountFormRequested": "accountFormRequested",
    "accountCreated": "accountCreated",
    "accountInvalid": "accountInvalid",
    "createAccountCanceled": "createAccountCanceled",
    "accountsListed": "accountsListed"
});

$.ku4webApp.config.collections = {
    example: {
        name: "accounts",
        create: "accountCreated",
        read: "accountRead",
        update: "accountUpdated",
        remove: "accountRemoved"
    }
}

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

$.ku4webApp.config.services = {
    example: {
        verb: "GET",
        uri: "./response.json",
        success: "exampleSuccess",
        error: "exampleError"
    }
}

$.ku4webApp.config.templates.forms = {
    example: '<div class="js-validationMessages"></div>' +
             '<form class="js-example-form css-example-form">' +
             '<div class="css-field">' +
             '<label for="username">Username</label>' +
             '<input id="username" name="username" type="text" value=""/></div>' +

             '<div class="css-field">' +
             '<label for="password">Password</label>' +
             '<input id="password" name="password" type="password" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="firstName">First name</label>' +
             '<input id="firstName" name="firstName" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="lastName">Last name</label>' +
             '<input id="lastName" name="lastName" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="email">Email</label>' +
             '<input id="email" name="email" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="reco">Who recommended this site?</label>' +
             '<select id="reco" name="reco">' +
             '<optgroup label="Desire">' +
             '<option value="0">Advertisement.</option>' +
             '<option value="1">Google.</option>' +
             '<option value="2">Friend.</option>' +
             '<option value="3">I stumbled onto it.</option></optgroup></select>' +
             '</div>' +

             '<button href="#" onclick=\"controller.create(); return false;\">Create Account</button>' +
             '<button href="#" onclick=\"controller.cancel(); return false;\">Cancel</button>' +

             '</form>'
}

$.ku4webApp.config.templates.views = {
    example: '<ul class="css-example-error">' +
             '<li class="css-example-error">{{username}}</li>' +
             '<li class="css-example-error">{{password}}</li>' +
             '<li class="css-example-error">{{firstName}}</li>' +
             '<li class="css-example-error">{{lastName}}</li>' +
             '<li class="css-example-error">{{email}}</li>' +
             '</ul>',

    account: '<div>' +
                '<div><h4>Account Data</h4></div>' +
                '<ul class="css-example-error">' +
                 '<li class="css-example-error">{{username}}</li>' +
                 '<li class="css-example-error">{{password}}</li>' +
                 '<li class="css-example-error">{{firstName}}</li>' +
                 '<li class="css-example-error">{{lastName}}</li>' +
                 '<li class="css-example-error">{{email}}</li>' +
             '</ul>' +
             '</div>'
}

$.ku4webApp.config.validators = {
    example: [
        {
            name: "username",
            message: "Username is Jacob."
        },
        {
            name: "password",
            message: "Password is invalid."
        },
        {
            name: "firstName",
            message: "First name is invalid."
        },
        {
            name: "lastName",
            message: "Last name is invalid."
        },
        {
            name: "email",
            message: "Email is invalid."
        }
    ]
}

})(jQuery);
