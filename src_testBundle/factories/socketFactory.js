function socketFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
socketFactory.prototype = {
    create: function(key) { return $.ku4webApp_testBundle.service(this._mediator, this._config[key]); }
};
$.ku4webApp_testBundle.socketFactory = function(mediator, config) {
    return new socketFactory(mediator, config);
};