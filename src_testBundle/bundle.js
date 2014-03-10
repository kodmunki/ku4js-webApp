$.ku4webAppUT = { };

function bundle() {
    var app = $.ku4webApp_testBundle.app();
    this._mediator = app.mediator;
    this._app = app;
}
bundle.prototype = {
    mediator: function() { return this._mediator; },
    model: function(name) {
        var app = this._app;
        return $.ku4webApp.models[name](this._mediator, app.serviceFactory, app.storeFactory, app.validatorFactory);
    },
    view: function(name) {
        return $.ku4webApp.views[name](this._app);
    },
    controller: function(name) {
        return $.ku4webApp.controllers[name](this._app);
    }
};
$.ku4webAppUT.bundle = function() { return new bundle(); };