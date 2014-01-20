$.ku4webApp.model("example", {
    requestForm: function() {
        var data = this.$collection("example").find({"firstName": "John"})[0];
        this.$notify(data, "accountFormRequested");
    },
    cancelForm: function() {
        this.$notify("createAccountCanceled");
    },
    createAccount: function(dto) {
        var validation = this.$validator("example").validate(dto);
        if(validation.isValid)  this.$collection("example").insert(dto);
        else this.$notify(validation, "accountInvalid");
    },
    listAccounts: function() {
        var accounts = this.$collection("example").find();
        this.$notify(accounts, "accountsListed");
    }
},
{
    "" : ""
});