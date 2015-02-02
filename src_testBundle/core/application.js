function app() {
    var app = $.ku4webApp;

    this.mediator = $.mediator();
    this.serviceFactory = $.ku4webApp_testBundle.serviceFactory(this.mediator, app.config.services);
    this.storeFactory = app.storeFactory(this.mediator, app.config.collections);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);

    this.prodModel();

    this.navigator = app.navigator(this.modelFactory, app.config.hash);
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; },
    stubModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.modelFactory(this.mediator, this.serviceFactory, this.storeFactory, this.validatorFactory);
        return this;
    },
    prodModel: function() {
        this.modelFactory = $.ku4webApp.modelFactory(this.mediator, this.serviceFactory, this.storeFactory, this.validatorFactory);
        return this;
    }
};
$.ku4webApp_testBundle.app = function() { return new app(); };


function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}