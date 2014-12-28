function navigator(modelFactory, config) {

    var me = this;
    function onhashchange() {
        if($.exists(config)) {
            var confg = config[ me.read()];
            if ($.exists(confg)) {
                var modelName = confg.model,
                    methodName = confg.method;
                if ($.exists(modelName) && $.exists(methodName)) {
                    try {
                        var model = modelFactory.create(modelName);
                        model[methodName]();
                    }
                    catch (e) {
                        throw $.ku4exception("ku4webApp.navigator",
                        $.str.format("Invalid configuration. model: {0}, method: {1}, \n\n error: {2}",
                                     modelName, methodName, e.message));
                    }
                }
            }
        }
    }

    if($.exists(window.addEventListener))
        window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent))
        window.attachEvent("onhashchange", onhashchange);
}
navigator.prototype = {
    hash: function(value) {
        return ($.exists(value)) ? this.write(value) : this.read();
    },
    read: function() {
        return location.hash.substr(1);
    },
    write: function(value) {
        location.hash = value;
        return this;
    },
    forward: function() {
        window.history.forward();
        return this;
    },
    back: function() {
        window.history.back();
        return this;
    }
};

$.ku4webApp.navigator = function(modelFactory, config) {
    return new navigator(modelFactory, config);
};