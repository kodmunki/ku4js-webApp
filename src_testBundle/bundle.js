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