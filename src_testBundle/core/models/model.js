$.ku4webApp_testBundle.onModelCall = function() { return; };
$.ku4webApp_testBundle.model = function(name, mediator, serviceFactory, storeFactory, validatorFactory) {

    var model = $.ku4webApp.models[name](mediator, serviceFactory, storeFactory, validatorFactory),
        testModel = { };

    function func() {
        $.ku4webApp_testBundle.onModelCall.apply(this, arguments);
        $.ku4webApp_testBundle.onModelCall = function() { return; };
    }

    for(var n in model) testModel[n] = func;

    return testModel;
};