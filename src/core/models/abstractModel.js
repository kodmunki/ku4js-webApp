function abstractModel(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    this._mediator = classRefcheck("models", "mediator", mediator);
    this._serviceFactory = classRefcheck("models", "serviceFactory", serviceFactory);
    this._socketFactory = classRefcheck("models", "socketFactory", socketFactory);
    this._storeFactory = classRefcheck("models", "storeFactory", storeFactory);
    this._validatorFactory = classRefcheck("models", "validatorFactory", validatorFactory);
    this._appState = appState;
    this._state = $.ku4webApp.state();
}
abstractModel.prototype = {
    $mediator: function() { return this._mediator; },
    $collection: function(name) { return this._storeFactory.create(name); },
    $service: function(name) { return this._serviceFactory.create(name); },
    $socket: function(name) { return this._socketFactory.create(name); },
    $validator: function(name) { return this._validatorFactory.create(name); },
    $state: function() { return this._state; },
    $appState: function(value) {
        //NOTE: This value corresponds  to the global app state and can and will
        //      change the value for all models in the application!
        if(!$.exists(value)) return this._appState;
        this._appState.set(value);
        return this;
    },
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};