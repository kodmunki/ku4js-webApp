(function(l){
$.ku4webApp_testBundle = { };

$.ku4webAppUT = { };

function bundle() {
    var app = $.ku4webApp_testBundle.app();
    this._mediator = app.mediator;
    this._navigator = app.navigator;
    this._app = app;

    this._onModelCall = $.mediator();
    this._onServiceCall = $.hash();

    app.onModelCall(this._onModelCall)
       .onServiceCall(this._onServiceCall);

    this.throwErrors();
}
bundle.prototype = {
    mediator: function() { return this._mediator; },
    navigator: function() { return this._navigator; },
    logErrors: function() {
        this._mediator.logErrors();
        this._navigator.logErrors();
        return this;
    },
    throwErrors: function() {
        this._mediator.throwErrors();
        this._navigator.throwErrors();
        return this;
    },
    catchErrors: function() {
        this._mediator.catchErrors();
        this._navigator.catchErrors();
        return this;
    },
    onModelCall: function(methodName, func, scope) {
        this._onModelCall.subscribe(methodName, function() {
            func.apply(scope, arguments);
        });
        return this;
    },
    onServiceCall: function(serviceName, callback){
        this._onServiceCall.add(serviceName, function() {
            return callback.apply(callback, arguments);
        });
        return this;
    },
    subscribe: function(name, func, scope, id) {
        this._mediator.subscribe(name, func, scope, id);
        return this;
    },
    unsubscribe: function(name, id) {
        this._mediator.subscribe(name, id);
        return this;
    },
    initCollection: function(name, data) {
        this.collection(name).init(data);
        return this;
    },
    clear: function() {
        this._onModelCall.clear();
        this._onServiceCall.clear();
    },
    form: function(name) {
        return this._app.formFactory.create(name);
    },
    model: function(name) {
        var app = this._app.prodModel();
        return $.ku4webApp.models[name](this._mediator, app.serviceFactory.onServiceCall(this._onServiceCall), app.socketFactory, app.storeFactory, app.validatorFactory, this._app.state);
    },
    view: function(name) {
        return $.ku4webApp.views[name](this._app.prodModel());
    },
    controller: function(name) {
        return $.ku4webApp.controllers[name](this._app.stubModel());
    },
    template: function(name) {
        return this._app.prodModel().templateFactory.create(name);
    },
    collection: function(name) {
        var app = this._app.prodModel();
        return app.storeFactory.create(name);
    }
};
$.ku4webAppUT.bundle = function() { return new bundle(); };

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
    this.prodModel();
    this.navigator = app.navigator(this.modelFactory, app.config.navigator);
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; },
    stubModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.stubModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this._onModelCall);
        return this;
    },
    prodModel: function() {
        this.modelFactory = $.ku4webApp_testBundle.testModelFactory(this.mediator, this.serviceFactory.onServiceCall(this._onServiceCall), this.socketFactory, this.storeFactory, this.validatorFactory, this.state);
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

$.ku4webApp_testBundle.model = function(name, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {

    var model = $.ku4webApp.models[name](mediator, serviceFactory, socketFactory, storeFactory, validatorFactory),
        testModel = { };

    for(var n in model) {
        function testMethod(name) {
            return function() {
                var args = [name].concat($.arr.parseArguments(arguments));
                onModelCall.notify.apply(onModelCall, args);
            }
        }
        testModel[n] = testMethod(n);
    }

    return testModel;
};

function service(mediator, name, config, onServiceCall) {
    this._mediator = mediator;
    this._name = name;
    this._config = config;
    this._onServiceCall = onServiceCall;
}
service.prototype = {
    call: function(data) {
        var config = this._config,
            callback = this._onServiceCall.find(this._name),
            callbackData = ($.isFunction(callback)) ? callback(data) : {},
            isError = callbackData instanceof Error;

        if(!$.exists(config))
            throw $.ku4exception("$.service", "Test Bundle services require a valid config containing a " +
                                              "'success':[data] and an 'error':[data] configuration.");

        if($.exists(config.error) && isError) this._mediator.notify(config.error, callbackData);
        else if($.exists(config.success)) this._mediator.notify(config.success, callbackData);

        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, name, config, onServiceCall) {
    return new service(mediator, name, config, onServiceCall);
};

function testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
    this._appState = appState;
}
testModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp.models[name](this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory, this._appState);
    }
};
$.ku4webApp_testBundle.testModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    return new testModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
};

function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) {
        return $.ku4webApp_testBundle.service(this._mediator, key, this._config[key], this._onServiceCall);
    },
    onServiceCall: function(onServiceCall) { this._onServiceCall = onServiceCall; return this; }
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

function stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._socketFactory = socketFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
    this._onModelCall = onModelCall;
}
stubModelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp_testBundle.model(name, this._mediator, this._serviceFactory, this._socketFactory, this._storeFactory, this._validatorFactory, this._onModelCall);
    }
};
$.ku4webApp_testBundle.stubModelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {
    return new stubModelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall);
};

})();
