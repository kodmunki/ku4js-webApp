function modelFactory(mediator, serviceFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
modelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp_testBundle.model(name, this._mediator, this._serviceFactory, this._storeFactory, this._validatorFactory);
    }
};
$.ku4webApp_testBundle.modelFactory = function(mediator, serviceFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
};