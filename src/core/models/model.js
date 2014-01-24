$.ku4webApp.model = function(name, proto, subscriptions) {
    function model(mediator, serviceFactory, storeFactory, validatorFactory) {
        model.base.call(this, mediator, serviceFactory, storeFactory, validatorFactory);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, storeFactory, validatorFactory) {
        var _model = new model(mediator, serviceFactory, storeFactory, validatorFactory);
        if($.exists(subscriptions)) {
            $.hash(subscriptions).each(function(obj) {
                var key = obj.key;
                mediator
                    .unsubscribe(key, name)
                    .subscribe(key, _model[obj.value], _model, name);
            });
        }
        return _model;
    }
};