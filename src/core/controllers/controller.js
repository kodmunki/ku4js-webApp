$.ku4webApp.controller = function(name, proto) {
    function controller(modelFactory, formFactory, navigator, stateMachine) {
        controller.base.call(this, modelFactory, formFactory, navigator, stateMachine);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        var className = $.str.format("$.ku4webApp.controllers.{0}", name),
            message = $.str.format("Requires a valid app. app= {0}", app);
        if(!$.exists(app)) throw $.ku4exception(className, message);
        return new controller(app.modelFactory, app.formFactory, app.navigator, app.stateMachine);
    }
};