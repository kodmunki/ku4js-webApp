$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$model("example").requestForm();
        return this;
    },
    cancel: function() {
        this.$model("example").cancelForm();
        return this;
    },
    create: function() {
        this.$model("example").createAccount(this.$form("example").read());
        return this;
    },
    clear: function() {
        this.$form("example").clear();
        return this;
    },
    listAccounts: function() {
        this.$model("example").listAccounts();
        return this;
    }
});