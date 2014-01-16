$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$notify("accountFormRequested");
    },
    create: function() {
        var validation = this.$validate("example");
        if(!validation.isValid) this.$notify(validation, "accountInvalid");
        else this.$notify("accountCreated");
    },
    cancel: function() {
        this.$notify("createAccountCanceled");
    }
});