$.ku4webApp.model = function(name, proto, subscriptions) {
    function model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
        model.base.call(this, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
        var _model = new model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
        if($.exists(subscriptions)) {
            $.hash(subscriptions).each(function(obj) {
                var key = obj.key,
                    value = obj.value,
                    id = $.str.format("ku4webApp.model.{0}_{1}", name, value),
                    method = _model[value];

                try {
                    mediator
                        .unsubscribe(key, id)
                        .subscribe(key, method, _model, id);
                }
                catch(e) {
                    throw $.ku4exception("$.ku4webApp.model", $.str.format("$.ku4webApp.model.{0} cannot subscribe to mediator with name: {1} or method: {2}.\n\nmessage:{3}\n\n", name, key, value, e.message));
                }
            });
        }
        return _model;
    }
};