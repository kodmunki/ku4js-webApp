function serviceFactory(mediator, config) {
    serviceFactory.base.call(this, mediator, config);
}
serviceFactory.prototype = {
    create: function() { return $.tests.stubs.service(this.$mediator(), this.$config()); }
};
$.Class.extend(serviceFactory, $.ku4webApp.serviceFactory);
$.tests.stubs.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};