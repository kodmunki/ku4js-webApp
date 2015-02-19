$.ku4webApp.template("example", {
    renderForm: function() {
        return this.$render(this.$forms("example"));
    },
    renderValidation: function(data) {
        var messages = "";
        $.hash(data).each(function(message) {
            messages += this.$render(this.$views("validation").message, {message: message.value})
        }, this);
        return this.$render(this.$views("validation").container, {messages: messages});
    },
    renderAccountList: function(data) {
        return this.$renderList(this.$views("account"), data)
    }
});