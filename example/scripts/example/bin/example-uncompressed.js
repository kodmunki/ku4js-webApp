(function(l){ $=l;
$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$model("example").requestForm();
    },
    cancel: function() {
        this.$model("example").cancelForm();
    },
    create: function() {
        this.$model("example").createAccount(this.$form("example").read());
    },
    listAccounts: function() {
        this.$model("example").listAccounts();
    }
});

$.ku4webApp.model("example", {
    requestForm: function() {
        this.$notify("accountFormRequested");
        return this;
    },
    cancelForm: function() {
        this.$notify("createAccountCanceled");
        return this;
    },
    createAccount: function(dto) {
        var validation = this.$validator("example").validate(dto);
        if(validation.isValid) this.$service("account.create").call(dto.toQueryString());
        else this.$notify(validation, "accountInvalid");
        return this;
    },
    listAccounts: function() {
        this.$service("account.list").call();
        return this;
    },
    clearAccounts: function() {
        this.$collection("example").remove();
        return this;
    },
    _accountCreated: function(dto) {
        this.$collection("example").insert(dto);
        this.$notify(dto, "accountCreated");
    },
    _accountsListed: function(dto) {
        var accounts = this.$collection("example").find();
        this.$notify(accounts, "accountsListed");
    },
    _error: function() {
        throw new Error("Service Exception")
    }
},
{
    "svc+accountCreated": "_accountCreated",
    "svc-accountCreated": "_error",
    "svc+accountsListed": "_accountsListed",
    "svc-accountsListed": "_error"
});

$.ku4webApp.view("otherView", {
    accountFormRequested: function(data) {
        console.log(data);
    },
    accountCreated: function(data) {
        console.log(data);
    },
    accountInvalid: function(data) {
        console.log(data);
    },
    accountsListed: function(data) {
        console.log(data);
    }
},
{
    "accountFormRequested": "accountFormRequested",
    "accountCreated": "accountCreated",
    "accountInvalid": "accountInvalid",
    "accountsListed": "accountsListed"
});

$.ku4webApp.template("example", {
    renderForm: function() {
        return this.$render(this.$forms("example"));
    },
    renderValidation: function(data) {
        var messages = "";
        $.hash(data).each(function(message) {
            messages += this.$render(this.$views("validation").message, {message: message.value})
        }, this);
        return this.$render(this.$views("validation").container, {messages: messages});
    },
    renderAccountList: function(data) {
        return this.$renderList(this.$views("account"), data)
    }
});

$.ku4webApp.view("example", {
    show: function(html) { $(".js-responsebox").addClass("css-show").html(html); return this; },
    hide: function() { $(".js-responsebox").addClass("css-show").html("");  return this; },
    displayList: function(accounts) { $(".js-accountList").html(accounts);  return this; },
    hideList: function() { $(".js-accountList").html("");  return this; },

    accountFormRequested: function(data) {
        var template = this.$template("example");
        this.show(template.renderForm()).hideList();
        this.$form("example").write(data);
    },
    accountCreated: function(data) {
        this.show("Account created");
    },
    accountInvalid: function(data) {
        var template = this.$template("example");
        $(".js-validationMessages").html(template.renderValidation(data.messages));
    },
    accountsListed: function(data) {
        var template = this.$template("example");
        this.displayList(template.renderAccountList(data)).hide();
    },
    logComplete: function(data) {
        console.log(data);
    }
},
{
    "accountFormRequested": "accountFormRequested",
    "createAccountCanceled": "hide",
    "accountCreated": "accountCreated",
    "accountInvalid": "accountInvalid",
    "accountsListed": "accountsListed",
    "serviceComplete": "logComplete"
});

$.ku4webApp.config.collections = {
    example: {
        name: "accounts"
        //insert: "accountCreated",
        //find: "accountRead",
        //update: "accountUpdated",
        //remove: "accountRemoved"
    }
}

$.ku4webApp.config.forms = {
    example: [
        {
            selector: "#username",
            type: "field",
            required:true
        },
        {
            selector: "#password",
            type: "field",
            required:true
        },
        {
            selector: "#firstName",
            type: "field",
            required:true
        },
        {
            selector: "#lastName",
            type: "field",
            required:true
        },
        {
            selector: "#email",
            type: "field",
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
    "account.create": {
        verb: "POST",
        uri: "./response.create.json",
        contentType: "text/json",
        success: "svc+accountCreated",
        error: "svc-accountCreated"
    },
    "account.list": {
        verb: "GET",
        uri: "./response.list.json",
        contentType: "text/json",
        success: "svc+accountsListed",
        error: "svc-accountsListed"
    }
};

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
}

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

})(jQuery);
