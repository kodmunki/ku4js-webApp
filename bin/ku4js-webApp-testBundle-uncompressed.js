(function(l){
$.ku4webApp_testBundle = { };

$.ku4webAppUT = { };

function bundle() {
    var app = $.ku4webApp_testBundle.app();
    this._mediator = app.mediator;
    this._app = app;
}
bundle.prototype = {
    mediator: function() { return this._mediator; },
    logErrors: function() { this._mediator.logErrors(); return this; },
    throwErrors: function() { this._mediator.throwErrors(); return this; },

    callback: function(callback){ $.ku4webApp_testBundle.callback = callback; return this; },
    onModelCall: function(methodName, onModelCall) {
    //MAKE THIS AN OBSERVER to subscribe to
    $.ku4webApp_testBundle.onModelCall = onModelCall; return this; },

    form: function(name) {
        return this._app.formFactory.create(name);
    },
    model: function(name) {
        var app = this._app.prodModel();
        return $.ku4webApp.models[name](this._mediator, app.serviceFactory, app.socketFactory, app.storeFactory, app.validatorFactory);
    },
    view: function(name) {
        return $.ku4webApp.views[name](this._app.prodModel());
    },
    controller: function(name) {
        return $.ku4webApp.controllers[name](this._app.stubModel());
    },
    template: function(name) {
        return this._app.prodModel().templateFactory.create(name);
    }
};
$.ku4webAppUT.bundle = function() { return new bundle(); };

function app() {
    var app = $.ku4webApp;

    this.mediator = $.mediator();
    this.serviceFactory = $.ku4webApp_testBundle.serviceFactory(this.mediator, app.config.services);
    this.socketFactory = $.ku4webApp_testBundle.socketFactory(this.mediator, app.config.sockets);
    this.storeFactory = app.storeFactory(this.mediator, app.config.collections);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.prodModel();
    this.navigator = app.navigator(this.modelFactory, app.config.navigator);
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; },
    stubModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.stubModelFactory(this.mediator, this.serviceFactory, this.socketFactory, this.storeFactory, this.validatorFactory);
        return this;
    },
    prodModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.testModelFactory(this.mediator, this.serviceFactory, this.socketFactory, this.storeFactory, this.validatorFactory);
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

$.ku4webApp_testBundle.onModelCall = function() { return; };
$.ku4webApp_testBundle.model = function(name, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {

    var model = $.ku4webApp.models[name](mediator, serviceFactory, socketFactory, storeFactory, validatorFactory),
        testModel = { };

    function func() {
        $.ku4webApp_testBundle.onModelCall.apply(this, arguments);
        $.ku4webApp_testBundle.onModelCall = function() { return; };
    }

    for(var n in model) testModel[n] = func;

    return testModel;
};

function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(data) {
        var config = this._config,
            callback = $.ku4webApp_testBundle.callback || function(data) { return data;},
            callbackData = callback(data),
            isError = /^__error__$/i.test(callbackData);

        if(!$.exists(config))
            throw $.ku4exception("$.service", "Test Bundle services require a valid config containing a " +
                                              "'success':[data] and an 'error':[data] configuration.");

        if($.exists(config.error) && isError) this._mediator.notify(config.error, callbackData);
        else if($.exists(config.success)) this._mediator.notify(config.success, callbackData);

        $.ku4webApp_testBundle.callback = function(data) { return data; };
        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};

function testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
testModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp.models[name](this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory);
    }
};
$.ku4webApp_testBundle.testModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    return new testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
};

function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) { return $.ku4webApp_testBundle.service(this._mediator, this._config[key]); }
};
$.ku4webApp_testBundle.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};

function socketFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
socketFactory.prototype = {
    create: function(key) { return $.ku4webApp_testBundle.service(this._mediator, this._config[key]); }
};
$.ku4webApp_testBundle.socketFactory = function(mediator, config) {
    return new socketFactory(mediator, config);
};

function stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
stubModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp_testBundle.model(name, this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory);
    }
};
$.ku4webApp_testBundle.stubModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    return new stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
};

})();
