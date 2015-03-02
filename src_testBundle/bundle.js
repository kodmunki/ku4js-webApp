$.ku4webAppUT = { };

function bundle() {
    var app = $.ku4webApp_testBundle.app();
    this._app = app;

    this._onModelCall = $.mediator();
    this._onServiceCall = $.hash();

    app.onModelCall(this._onModelCall)
       .onServiceCall(this._onServiceCall);
}
bundle.prototype = {
    throwErrors: function() { this._app.throwErrors(); return this; },
    logErrors: function() { this._app.logErrors(); return this; },
    catchErrors: function() { this._app.catchErrors(); return this; },
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
        this._app.mediator.subscribe(name, func, scope, id);
        return this;
    },
    unsubscribe: function(name, id) {
        this._app.mediator.subscribe(name, id);
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
        return $.ku4webApp.models[name](this._app.mediator, app.serviceFactory.onServiceCall(this._onServiceCall), app.socketFactory, app.storeFactory, app.validatorFactory, this._app.state);
    },
    view: function(name) {
        return $.ku4webApp.views[name](this._app.prodModel());
    },
    controller: function(name) {
        return $.ku4webApp.controllers[name](this._app.stubModel());
    },
    stateMachine: function() {
        return $.ku4webApp.$stateMachine(this._app.prodModel().modelFactory);
    },
    setState: function(value) {
        this._app.stateMachine._state.set(value);
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