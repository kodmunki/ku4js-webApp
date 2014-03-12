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