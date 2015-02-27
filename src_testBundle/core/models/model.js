$.ku4webApp_testBundle.model = function(name, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, onModelCall) {

    var model = $.ku4webApp.models[name](mediator, serviceFactory, socketFactory, storeFactory, validatorFactory),
        testModel = { };

    for(var n in model) {
        function testMethod(name) {
            return function() {
                var args = [name].concat($.arr.parseArguments(arguments));
                onModelCall.notify.apply(onModelCall, args);
            }
        }
        testModel[n] = testMethod(n);
    }

    return testModel;
};