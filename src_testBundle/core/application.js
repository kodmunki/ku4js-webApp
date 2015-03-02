function app() {
    var app = $.ku4webApp;
    this.state = $.ku4webApp.state("__ku4appTestStarted__");
    this.mediator = $.mediator("ku4webApp_testBundle");
    this.serviceFactory = $.ku4webApp_testBundle.serviceFactory(this.mediator, app.config.services);
    this.socketFactory = $.ku4webApp_testBundle.socketFactory(this.mediator, app.config.sockets);
    this.storeFactory = app.storeFactory(this.mediator, app.config.collections);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; },
    stubModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.stubModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this._onModelCall);

        var stateMachine = $.ku4webApp.$stateMachine;
        this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(this.modelFactory) : null;
        this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);

        return this;
    },
    prodModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.testModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this.state);

        var stateMachine = $.ku4webApp.$stateMachine;
        this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(this.modelFactory) : null;
        this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);

        return this;
    },
    onModelCall: function(onModelCall) { this._onModelCall = onModelCall; return this; },
    onServiceCall: function(onServiceCall) { this._onServiceCall = onServiceCall; return this; }
};
$.ku4webApp_testBundle.app = function() { return new app(); };


function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}