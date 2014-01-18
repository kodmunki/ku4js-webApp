function app() {
    var app = $.ku4webApp,
        mediator = $.mediator(),
        serviceFactory = app.serviceFactory(mediator, app.config.services),
        storeFactory = app.storeFactory(mediator, app.config.collections),
        validatorFactory = app.validatorFactory(app.config.validators);
    this.mediator = mediator;
    this.modelFactory = app.modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.responsebox = app.responsebox(".ku4webApp-responsebox");
}
app.prototype = {
    throwErrors: function() { this.mediator.throwErrors(); return this; }
}
$.ku4webApp.app = function() { return new app(); }