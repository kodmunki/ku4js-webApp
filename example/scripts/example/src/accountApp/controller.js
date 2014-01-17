$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$notify("accountFormRequested");
    },
    create: function() {
        var validation = this.$validate("example");
        if(!validation.isValid) this.$notify(validation, "accountInvalid");
        else this.$store().create("example", this.$read("example"));
    },
    cancel: function() {
        this.$notify("createAccountCanceled");
    },
    listAccounts: function() {
        var accounts = this.$store().read("example");
        this.$notify(accounts, "accountsListed");
    }
});