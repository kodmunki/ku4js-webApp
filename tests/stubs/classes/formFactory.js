function formFactory(config) {
    formFactory.base.call(this, config);
}
formFactory.prototype = {
    create: function() { return this.$create("test"); }
};
$.Class.extend(formFactory, $.ku4webApp.formFactory);
$.tests.stubs.formFactory = function(config) {
    return new formFactory(config);
};