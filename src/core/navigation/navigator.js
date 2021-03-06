function navigator(modelFactory, config, stateMachine) {
    this._modelFactory = modelFactory;
    this._stateMachine = stateMachine;
    this._config = config;
    this._routes = ($.exists(config)) ? $.hash(config.ku4routes) : $.hash();
    this._catchAll = this._routes.find("ku4default");
    this._exceptionRule = 0;
    this._mute = false;

    var me = this;
    function onhashchange(e) {
        $.evt.mute(e);
        if(!me._mute) me.execute(me.read());
        me._mute = false;
    }

    if($.exists(window.addEventListener)) window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent)) window.attachEvent("onhashchange", onhashchange);
}
navigator.prototype = {
    throwErrors: function() { this._exceptionRule = 2; return this; },
    logErrors: function() { this._exceptionRule = 1; return this; },
    catchErrors: function() { this._exceptionRule = 0; return this; },

    hashEquals: function(value) {
        return this.read() == value;
    },
    hashContainsArguments: function() {
        return /_ku4_/.test(this.read());
    },
    hash: function(value) {
        return ($.exists(value)) ? this.write(value) : this.read().split("_ku4_")[0];
    },
    read: function() {
        return location.hash.substr(1);
    },
    write: function(/*value, args...*/) {
        var args = Array.prototype.slice.call(arguments),
            hash = args.shift(),
            argString = (args.length > 0) ? this._encodeArgs(args) : "",
            writeHash = ($.isNullOrEmpty(argString)) ? hash : $.str.build(hash, "_ku4_", argString);

        if(this.read() == writeHash) return this;
        this._mute = true;
        location.hash = writeHash;
        return this;
    },
    execute: function(/*value, args...*/) {
        this.write.apply(this, arguments);
        this._execute(this.read());
        return this;
    },
    executeOrDefault: function(value, dflt) {
        var config = this._config;
        if(!$.exists(config) || !$.isString(value)) return;

        var key = value.split("_ku4_")[0];
        return ($.exists(config[key])) ? this._execute(value) : this._execute(dflt);
    },
    route: function() {
        var hasArguments = this.hashContainsArguments(),
            currentHash = (hasArguments) ? this.hash() + "*" : this.hash(),
            proposedRoute = this._routes.findValue(currentHash),
            proposedArgs = (hasArguments) ? "_ku4_" + this._readArgs() : "",
            primaryRoute = ($.exists(proposedRoute)) ? proposedRoute + proposedArgs : "";

        this.executeOrDefault(primaryRoute, this._routes.findValue("ku4default"));
    },
    tryRouteOrHash: function(hash) {
        try { this.route(); }
        catch(e) { this.execute(hash); }
    },
    forward: function(callback) {
        if($.exists(callback)) this._setCallback(callback);
        window.history.forward();
        return this;
    },
    back: function(callback) {
        if($.exists(callback)) this._setCallback(callback);
        window.history.back();
        return this;
    },
    clear: function() {
        return this.hash("");
    },
    _execute: function(value) {
        var config = this._config;
        if(!$.exists(config)) return this;

        var split = value.split("_ku4_"),
            key = split[0],
            args = (split.length > 1) ? this._decodeArgs(split[1]) : [],
            confg = config[key];

        if (!$.exists(confg)) return this;
        var stateMachine = confg.stateMachine,
            modelName = $.exists(stateMachine) ? "stateMachine" : confg.model,
            methodName = confg.method,
            model = ($.exists(stateMachine))
                ? this._stateMachine
                : this._modelFactory.create(modelName);

        if (($.exists(stateMachine) || $.exists(modelName)) && $.exists(methodName)) {
            try {
                model[methodName].apply(model, args);
            }
            catch (e) {
                try {
                    var catchAll = config[this._catchAll],
                        catchAllModel = ($.exists(stateMachine))
                            ? this._stateMachine
                            : this._modelFactory.create(catchAll.model);

                    catchAllModel[catchAll.method]();
                }
                catch(e) {
                    this._alertException(e, modelName, methodName);
                }
            }
        }
        return this;
    },
    _readArgs: function() {
        return this.read().split("_ku4_")[1];
    },
    _encodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return $.str.encodeBase64($.json.serialize(value));
    },
    _decodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return $.json.deserialize($.str.decodeBase64(value));
    },
    _setCallback: function(callback) {
        setTimeout(function() { callback(); }, 800);
    },
    _alertException: function(e, modelName, methodName) {
        var t = this._exceptionRule,
            exception = $.ku4exception("$.ku4webApp.navigator",
                $.str.format("{0}. Model: {1}, Method: {2}", e.message, modelName, methodName));
        if(t == 2) throw exception;
        if(t == 1) $.ku4Log(exception.message);
    }
};

$.ku4webApp.navigator = function(modelFactory, config, stateMachine) {
    return new navigator(modelFactory, config, stateMachine);
};