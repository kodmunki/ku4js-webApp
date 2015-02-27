function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) {
        return $.ku4webApp_testBundle.service(this._mediator, key, this._config[key], this._onServiceCall);
    },
    onServiceCall: function(onServiceCall) { this._onServiceCall = onServiceCall; return this; }
};
$.ku4webApp_testBundle.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};