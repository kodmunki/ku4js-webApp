function abstractServiceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
abstractServiceFactory.prototype = {
    $mediator: function() { return this._mediator; },
    $config: function() { return this._config; }
}
$.ku4webApp.serviceFactory = abstractServiceFactory;