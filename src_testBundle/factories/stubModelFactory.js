function stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
    this._onModelCall = onModelCall;
}
stubModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp_testBundle.model(name, this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory, this._onModelCall);
    }
};
$.ku4webApp_testBundle.stubModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {
    return new stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall);
};