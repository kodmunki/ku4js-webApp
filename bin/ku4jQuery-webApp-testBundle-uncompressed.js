(function(l){ $=l;
$.ku4webApp_testBundle = { }

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
    call: function(dto) {
        var success = dto.find("success"),
            error = dto.find("error");

        if($.exists(success)) this._mediator.notify(success, this._config.success);
        else if($.exists(error)) this._mediator.notify(error, this._config.error);
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
