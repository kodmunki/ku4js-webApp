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