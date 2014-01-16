$.ku4webApp.controller("testController", {
    mediator: function() { return this.$mediator(); },
    service: function() { return this.$service("test"); },
    validate: function() { return this.$validate("test"); },
    read: function() { return this.$read("test"); },
    clear: function() { return this.$clear("test"); }
});