$.ku4webApp.controller = function(name, proto) {

    function controller(mediator, serviceFactory, formFactory, validatorFactory) {
        controller.base.call(this, mediator, serviceFactory, formFactory, validatorFactory);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        return new controller(app.mediator, app.serviceFactory, app.formFactory, app.validatorFactory);
    }
}