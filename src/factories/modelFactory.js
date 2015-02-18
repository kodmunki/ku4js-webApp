function modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    var models = $.hash();
    $.hash($.ku4webApp.models).each(function(obj){
        models.add(obj.key, obj.value(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory));
    }, this);
    this._models = models;
}
modelFactory.prototype = {
    create: function(name) { return this._models.find(name); }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
};