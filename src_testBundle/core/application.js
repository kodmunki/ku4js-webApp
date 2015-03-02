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

    this.prodModel().throwErrors();
}
app.prototype = {
    throwErrors: function() {
        this._exceptionRule = 2;
        this._configureExceptionRule();
        return this;
    },
    logErrors: function() {
        this._exceptionRule = 1;
        this._configureExceptionRule();
        return this;
    },
    catchErrors: function() {
        this._exceptionRule = 0;
        this._configureExceptionRule();
        return this;
    },
    stubModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.stubModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this._onModelCall);
        var app = $.ku4webApp,
            stateMachine = $.ku4webApp.$stateMachine,
            currentState = ($.exists(this.stateMachine)) ? this.stateMachine._state._value : null;

        this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(this.mediator, this.modelFactory) : null;
        this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);

        if($.exists(this.stateMachine)) this.stateMachine.set(currentState);

        this._configureExceptionRule();
        return this;
    },
    prodModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.testModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this.state);
        var app = $.ku4webApp,
            stateMachine = $.ku4webApp.$stateMachine,
            currentState = ($.exists(this.stateMachine)) ? this.stateMachine._state._value : null;

        this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(this.mediator, this.modelFactory) : null;
        this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);

        if($.exists(this.stateMachine)) this.stateMachine.set(currentState);

        this._configureExceptionRule();
        return this;
    },
    onModelCall: function(onModelCall) { this._onModelCall = onModelCall; return this; },
    onServiceCall: function(onServiceCall) { this._onServiceCall = onServiceCall; return this; },

    _configureExceptionRule: function() {
        var m = this.mediator, n = this.navigator;
        switch (this._exceptionRule) {
            case 2: m.throwErrors(); n.throwErrors(); break;
            case 1: m.logErrors(); n.logErrors(); break;
            case 0: m.catchErrors(); n.catchErrors(); break;
        }
    }
};
$.ku4webApp_testBundle.app = function() { return new app(); };


function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}