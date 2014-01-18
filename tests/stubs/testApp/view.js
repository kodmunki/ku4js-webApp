$.ku4webApp.view("test", {
    template: function() { return this.$template("test"); },
    form: function() { return this.$form("test");},
    viewTested: function(data) { this.testData = data; }
},
{
    "viewTested": "viewTested"
});