function navigator(modelFactory, config) {

    var me = this;
    function onhashchange() {
        if(me.read() == "ku4#") return;
        if(me._notify && $.exists(config)) {
            var confg = config[me.read()];
            if ($.exists(confg)) {
                var modelName = confg.model,
                    methodName = confg.method;
                if ($.exists(modelName) && $.exists(methodName)) {
                    try {
                        var model = modelFactory.create(modelName);
                        model[methodName]();
                    }
                    catch (e) { }
                }
            }
        }
        me._notify = true;
    }

    if($.exists(window.addEventListener))
        window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent))
        window.attachEvent("onhashchange", onhashchange);

    this._notify = true;
}
navigator.prototype = {

    //NOTE: Writing the hash using this method will NOT cause a "hash" config
    //      method call. That is, there is NO notification
    hash: function(value) {
        return ($.exists(value)) ? this.write(value, true) : this.read();
    },
    read: function() {
        return location.hash.substr(1);
    },

    //NOTE: Writing the hash using this method WILL cause a "hash" config
    //      method call. That is, there IS notification. Unless, true is
    //      passed for mute, then this will act as hash, above.
    write: function(value, mute) {
        var currentHash = this.read();

        //NOTE: This check is here because onhashchange will NOT fire if the value that is written
        //      is the same as the currentValue. Therefore we need to NOT set the isInternalChange
        //      value because there is no "change" and the onhashchange event will NOT fire, leaving
        //      this value in the incorrect state for a subsequent call.
        this._notify = (mute) ? false : true;
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