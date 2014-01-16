$.ku4webApp.template("example", {
    renderForm: function(data) {
        return this.$render(this.$forms("example"), data);
    },
    renderValidation: function(data) {
        return this.$render(this.$views("example"), data);
    }
});