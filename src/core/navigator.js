function navigator(modelFactory, config) {

    var me = this;
    function onhashchange() {
        if(!me._isInternalChange && $.exists(config)) {
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
                        $.str.format("Invalid configuration. model: {0}, method: {1}, \\error: {2}",
                                     modelName, methodName, e.message));
                    }
                }
            }
        }
        me._isInternalChange = false;
    }

    if($.exists(window.addEventListener))
        window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent))
        window.attachEvent("onhashchange", onhashchange);

    this._isInternalChange = false;
}
navigator.prototype = {
    hash: function(value) {
        return ($.exists(value)) ? this.write(value) : this.read();
    },
    read: function() {
        return location.hash.substr(1);
    },
    write: function(value) {
        var currentHash = this.read();

        //NOTE: This check is here because onhashchange will NOT fire if the value that is written
        //      is the same as the currentValue. Therefore we need to NOT set the isInternalChange
        //      value because there is no "change" and the onhashchange event will NOT fire, leaving
        //      this value in the incorrect state for a subsequent call.
        this._isInternalChange = (currentHash == value) ? false : true;

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