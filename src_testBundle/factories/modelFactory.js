function testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
    this._appState = appState;
}
testModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp.models[name](this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory, this._appState);
    }
};
$.ku4webApp_testBundle.testModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    return new testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
};