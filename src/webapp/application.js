function app(name) {
    var _name = name || $.uid(),
        app = $.ku4webApp,
        mediator = $.mediator("ku4webApp_" + _name),
        serviceFactory = app.serviceFactory(mediator, app.config.services),
        socketFactory = app.socketFactory(mediator, app.config.sockets),
        storeFactory = app.storeFactory(mediator, app.config.collections),
        validatorFactory = app.validatorFactory(app.config.validators);

    this._state = $.ku4webApp.state("__ku4appStarted__");
    this.modelFactory = app.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, this._state);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.mediator = mediator;

    var stateMachine = $.ku4webApp.$stateMachine;
    this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(this.modelFactory) : null;
    this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);
}
app.prototype = {
    logErrors: function() {
        this.mediator.logErrors();
        this.navigator.logErrors();
        return this;
    },
    throwErrors: function() {
        this.mediator.throwErrors();
        this.navigator.throwErrors();
        return this;
    },
    catchErrors: function() {
        this.mediator.catchErrors();
        this.navigator.catchErrors();
        return this;
    }
};
$.ku4webApp.app = function(name) { return new app(name); };

function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}