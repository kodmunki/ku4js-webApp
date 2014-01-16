$.ku4webApp.view("example", {
    accountFormRequested: function() {
        var template = this.$template("example");
        this.$responsebox().show(template.renderForm());
    },
    accountCreated: function(data) {
        $(".js-validationMessages").html("Account created");
    },
    accountInvalid: function(data) {
        var template = this.$template("example");
        $(".js-validationMessages").html(template.renderValidation(data.messages));
    },
    createAccountCanceled: function(data) {
        this.$responsebox().hide();
    }
},
{
    "accountFormRequested": "accountFormRequested",
    "accountCreated": "accountCreated",
    "accountInvalid": "accountInvalid",
    "createAccountCanceled": "createAccountCanceled"
});