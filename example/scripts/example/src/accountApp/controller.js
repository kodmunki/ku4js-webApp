$.ku4webApp.controller("example", {
    requestForm: function() {
        this.$model("example").requestForm();
    },
    cancel: function() {
        this.$model("example").cancelForm();
    },
    create: function() {
        this.$model("example").createAccount(this.$form("example").read());
    },
    listAccounts: function() {
        this.$model("example").listAccounts();
    }
});