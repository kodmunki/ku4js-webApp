$.ku4webApp.template("example", {
    renderForm: function() {
        return this.$render(this.$forms("example"));
    },
    renderValidation: function(data) {
        return this.$render(this.$views("example"), data);
    },
    renderAccountList: function(data) {
        return this.$renderList(this.$views("account"), data)
    }
});