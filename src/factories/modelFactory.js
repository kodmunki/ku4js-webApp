function modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    var models = $.hash();
    $.hash($.ku4webApp.models).each(function(obj){
        models.add(obj.key, obj.value(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState));
    }, this);
    this._models = models;
}
modelFactory.prototype = {
    create: function(name) { return this._models.find(name); }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    return new modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
};