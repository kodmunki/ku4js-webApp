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