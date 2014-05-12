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
    model: function(name) {
        var app = this._app;
        return $.ku4webApp.models[name](this._mediator, app.serviceFactory, app.storeFactory, app.validatorFactory);
    },
    view: function(name) {
        return $.ku4webApp.views[name](this._app);
    },
    controller: function(name) {
        return $.ku4webApp.controllers[name](this._app);
    },
    template: function(name) {
        return this._app.templateFactory.create(name);
    }
};
$.ku4webAppUT.bundle = function() { return new bundle(); };

function app() {
    var app = $.ku4webApp,
        mediator = $.mediator(),
        serviceFactory = $.ku4webApp_testBundle.serviceFactory(mediator, app.config.services),
        storeFactory = app.storeFactory(mediator, app.config.collections),
        validatorFactory = app.validatorFactory(app.config.validators);
    this.serviceFactory = serviceFactory;
    this.storeFactory = storeFactory;
    this.validatorFactory = validatorFactory;
    this.modelFactory = app.modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.mediator = mediator;
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; }
};
$.ku4webApp_testBundle.app = function() { return new app(); };

function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}

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

function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) { return $.ku4webApp_testBundle.service(this._mediator, this._config[key]); }
}
$.ku4webApp_testBundle.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};

})(jQuery);
