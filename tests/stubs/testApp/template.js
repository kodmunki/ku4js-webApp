$.ku4webApp.template("test", {
    config: function() { return this.$config("test"); },
    forms: function() { return this.$forms("test"); },
    views: function() { return this.$views("test"); },
    render: function(data) { return this.$render(this.$views("test"), data); },
    renderList: function(dataList) { return this.$renderList(this.$views("test"), dataList); },
    renderListWithAction: function(dataList, action) { return this.$renderListWithAction(dataList, action); }
});