$.ku4webApp.model("test", {
    service: function() { return this.$service("test"); },
    collection: function() { return this.$collection("test"); },
    validator: function(dto) { return this.$validator("test"); },
    notify: function(data) { this.$notify(data); return this; },
    modelTested: function(data) { this.testData = data; }
},
{
    "modelTested": "modelTested"
});