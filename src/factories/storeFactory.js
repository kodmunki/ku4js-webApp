function storeFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
storeFactory.prototype = {
    create: function(key) { return $.ku4webApp.store(this._mediator, this._config, key); }
};
$.ku4webApp.storeFactory = function(mediator, config) {
    return new storeFactory(mediator, config);
};