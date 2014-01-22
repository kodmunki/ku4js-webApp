$.ku4webApp.model = function(name, proto, subscriptions) {

    function model(mediator, serviceFactory, storeFactory, validatorFactory) {
        model.base.call(this, mediator, serviceFactory, storeFactory, validatorFactory);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, storeFactory, validatorFactory) {
        if(!$.exists(this.__instance)) {
            var _model = new model(mediator, serviceFactory, storeFactory, validatorFactory);
            if($.exists(subscriptions))
                $.hash(subscriptions).each(function(obj) {
                    mediator.subscribe(obj.key, _model[obj.value], _model);
                });
            this.__instance = _model;
        }
        return this.__instance;
    }
}