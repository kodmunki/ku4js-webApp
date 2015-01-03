function serviceFactory(mediator, config) {
    var services = $.hash();
    $.hash(config).each(function(obj){
        services.add(obj.key, $.ku4webApp.service(mediator, obj.value));
    }, this);
    this._services = services;
}
serviceFactory.prototype = {
    create: function(name) {
        return this._services.find(name);
    }
};
$.ku4webApp.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};