$.ku4webApp.model("test", {
    service: function() { return this.$service("test"); },
    socket: function() { return this.$socket("test"); },
    collection: function() { return this.$collection("test"); },
    validator: function() { return this.$validator("test"); },
    notify: function(data) { this.$notify.apply(this, arguments); return this; },
    modelTested: function(data) { this.testData = data; },
    execute: function(data) { this.$notify("executed", data); }
},
{
    "modelTested": "modelTested"
});