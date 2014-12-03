function modelFactory(mediator, serviceFactory, storeFactory, validatorFactory) {
    var models = $.hash();
    $.hash($.ku4webApp.models).each(function(obj){
        models.add(obj.key, obj.value(mediator, serviceFactory, storeFactory, validatorFactory));
    }, this);
    this._models = models;
}
modelFactory.prototype = {
    create: function(name) {
        return this._models.find(name);
    }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
};