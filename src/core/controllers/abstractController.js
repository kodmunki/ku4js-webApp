function abstractController(mediator, serviceFactory, store, formFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._store = store;
    this._formFactory = formFactory;
    this._validatorFactory = validatorFactory;
}
abstractController.prototype = {
    $mediator: function() { return this._mediator; },
    $store: function() { return this._store; },
    $service: function(name) { return this._serviceFactory.create(name); },
    $validate: function(key) {
        var form = this._formFactory.create(key),
            validator = this._validatorFactory.create(key);
        return validator.validate(form);
    },
    $read: function(key) { return this._formFactory.create(key).read(); },
    $clear: function(key) { this._formFactory.create(key).clear(); return this;},
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};
$.ku4webApp.abstractController = abstractController;