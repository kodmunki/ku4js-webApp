(function(l){ $=l;
$.ku4webApp_testBundle = { }

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
    onModelCall: function(onModelCall) { $.ku4webApp_testBundle.onModelCall = onModelCall; return this; },

    model: function(name) {
        var app = this._app.prodModel();
        return $.ku4webApp.models[name](this._mediator, app.serviceFactory, app.storeFactory, app.validatorFactory);
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
    this.storeFactory = app.storeFactory(this.mediator, app.config.collections);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);

    this.prodModel();
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

$.ku4webApp_testBundle.onModelCall = function() { return; };
$.ku4webApp_testBundle.model = function(name, mediator, serviceFactory, storeFactory, validatorFactory) {

    var model = $.ku4webApp.models[name](mediator, serviceFactory, storeFactory, validatorFactory),
        testModel = { };

    function func(data) {
        $.ku4webApp_testBundle.onModelCall(data);
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

        if($.exists(config.error) && isError) this._mediator.notify(callbackData, config.error);
        else if($.exists(config.success)) this._mediator.notify(callbackData, config.success);

        $.ku4webApp_testBundle.callback = function(data) { return data; };

        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};

function modelFactory(mediator, serviceFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
modelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp_testBundle.model(name, this._mediator, this._serviceFactory, this._storeFactory, this._validatorFactory);
    }
};
$.ku4webApp_testBundle.modelFactory = function(mediator, serviceFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
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

})(jQuery);
