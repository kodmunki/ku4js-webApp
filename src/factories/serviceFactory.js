function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) { return $.ku4webApp.service(this._mediator, this._config[key]); }
};
$.ku4webApp.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};