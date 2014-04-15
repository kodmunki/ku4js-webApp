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
        console.log(this.$collection("example")
                        .join("example2", "username", "username"));
        this.$service("account.list").call();
        return this;
    },
    clearAccounts: function() {
        this.$collection("example").remove();
        return this;
    },
    _accountCreated: function(response) {
        var dto = $.dto.parseJson(response);
        this.$collection("example").insert(dto);
        this.$collection("example2").insert(dto);
        this.$collection("example3").insert(dto);
        this.$notify(dto, "accountCreated");
    },
    _accountsListed: function(response) {
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