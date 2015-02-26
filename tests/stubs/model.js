$.ku4webApp.model("test", {
    service: function() { return this.$service("test"); },
    socket: function() { return this.$socket("test"); },
    collection: function() { return this.$collection("test"); },
    validator: function() { return this.$validator("test"); },
    notify: function(data) { this.$notify.apply(this, arguments); return this; },
    modelTested: function(data) { this.testData = data; },
    execute: function(data) { this.$notify("executed", data); },

    method0: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift("onMethod0");
        this.$notify.apply(this, args);
        return this;
     },
    method1: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift("onMethod1");
        this.$notify.apply(this, args);
        return this;
     },
    method2: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift("onMethod2");
        this.$notify.apply(this, args);
        return this;
     }
},
{
    "modelTested": "modelTested"
});