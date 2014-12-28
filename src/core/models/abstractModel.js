function abstractModel(mediator, serviceFactory, storeFactory, validatorFactory) {
    this._mediator = classRefcheck("models", "mediator", mediator);
    this._serviceFactory = classRefcheck("models", "serviceFactory", serviceFactory);
    this._storeFactory = classRefcheck("models", "storeFactory", storeFactory);
    this._validatorFactory = classRefcheck("models", "validatorFactory", validatorFactory);
    this._navigator = classRefcheck("models", "validatorFactory", validatorFactory);
    this._state = new state();
}
abstractModel.prototype = {
    $collection: function(name) { return this._storeFactory.create(name); },
    $service: function(name) { return this._serviceFactory.create(name); },
    $validator: function(name) { return this._validatorFactory.create(name); },
    $state: function() { return this._state; },
    $appState: function(value) {
        //NOTE: This value corresponds  to the global app state and can and will
        //      change the value for all models in the application!
        if(!$.exists(value)) return __appState;
        __appState = new state(value);
        return this;
    },
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};
$.ku4webApp.abstractModel = abstractModel;