$.ku4webApp.controller = function(name, proto) {

    function controller(modelFactory, formFactory, validatorFactory) {
        controller.base.call(this, modelFactory, formFactory, validatorFactory);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        return new controller(app.modelFactory, app.formFactory, app.validatorFactory);
    }
}