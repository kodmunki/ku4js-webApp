$.ku4webApp.controller = function(name, proto) {

    function controller(mediator, serviceFactory, store, formFactory, validatorFactory) {
        controller.base.call(this, mediator, serviceFactory, store, formFactory, validatorFactory);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        return new controller(app.mediator, app.serviceFactory, app.store, app.formFactory, app.validatorFactory);
    }
}