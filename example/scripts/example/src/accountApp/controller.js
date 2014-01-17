$.ku4webApp.controller("example", {
    requestForm: function() {
        var account = this.$store().read("example")[0];
        this.$notify(account, "accountFormRequested");
    },
    create: function() {
        var validation = this.$validate("example");
        if(!validation.isValid) this.$notify(validation, "accountInvalid");
        else this.$store().create("example", this.$read("example"));
    },
    cancel: function() {
        this.$notify("createAccountCanceled");
    }
});