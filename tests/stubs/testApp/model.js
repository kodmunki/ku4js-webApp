$.ku4webApp.model("test", {
    service: function() { return this.$service("test"); },
    collection: function() { return this.$collection("test"); },
    validate: function(dto) { return this.$validate("test", dto); },
    notify: function(data) { this.$notify(data); return this; },
    modelTested: function(data) {
        this.testData = data;
    }
},
{
    "modelTested": "modelTested"
});