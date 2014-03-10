$.ku4webApp.model("example", {
    requestForm: function(username) {
        var data = this.$collection("example").find({"username": username})[0];
        this.$notify(data, "accountFormRequested");
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
        console.log("_accountCreated - ", dto)
        this.$collection("example").insert(dto);
        this.$notify(dto, "accountCreated");
    },
    _accountsListed: function() {
        var accounts = this.$collection("example").find();
        this.$notify(accounts, "accountsListed");
    }
},
{
    "svc+accountCreated": "_accountCreated",
    "svc-accountCreated": "_accountCreated",
    "svc+accountsListed": "_accountsListed",
    "svc-accountsListed": "_accountsListed"
});