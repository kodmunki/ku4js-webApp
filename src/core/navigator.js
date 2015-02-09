function navigator(modelFactory, config) {

    this._modelFactory = modelFactory;
    this._config = config;
    this._notify = true;

    var me = this;
    function onhashchange() {
        if(me._notify) me.execute(me.read());
        me._notify = true;
    }

    if($.exists(window.addEventListener))
        window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent))
        window.attachEvent("onhashchange", onhashchange);
}
navigator.prototype = {
    hashEquals: function(value) {
        return this.read() == value;
    },

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
    },
    execute: function(value) {
        var config = this._config;
        if(!$.exists(config)) return;

        var confg = config[value];
        if (!$.exists(confg)) return;

        var modelName = confg.model,
            methodName = confg.method,
            modelFactory =  this._modelFactory;

        if ($.exists(modelName) && $.exists(methodName)) {
            try {
                var model = modelFactory.create(modelName);
                model[methodName]();
            }
            catch (e) { /* Fail silently */ }
        }
        return this;
    },
    executeOrDefault: function(value, dflt) {
        var config = this._config;
        if(!$.exists(config)) return;

        var confg = config[value];
        return ($.exists(confg))
            ? this.execute(confg)
            : this.execute(config[dflt]);
    }
};

$.ku4webApp.navigator = function(modelFactory, config) {
    return new navigator(modelFactory, config);
};