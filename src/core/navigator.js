function navigator(modelFactory, config) {
    this._modelFactory = modelFactory;
    this._config = config;
    this._mute = false;

    var me = this;
    function onhashchange(e) {
        if(!me._mute) me.execute(me.read());
        me._mute = false;
    }

    if($.exists(window.addEventListener)) window.addEventListener("hashchange", onhashchange);
    else if($.exists(window.attachEvent)) window.attachEvent("onhashchange", onhashchange);
}
navigator.prototype = {
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
            argString = (args.length > 0) ? this._encodeArgs(args) : "";

        this._mute = true;
        location.hash = ($.isNullOrEmpty(argString)) ? hash : $.str.build(hash, "_ku4_", argString);
        return this;
    },
    execute: function(/*value, args...*/) {
        this.write.apply(this, arguments);
        this._execute(this.read());
        return this;
    },
    forward: function(callback) {
        if($.exists(callback)) this._setEventListener(callback);
        window.history.forward();
        return this;
    },
    back: function(callback) {
        if($.exists(callback)) this._setEventListener(callback);
        window.history.back();
        return this;
    },
    clear: function() {
        return this.hash("");
    },
    executeOrDefault: function(value, dflt) {
        var config = this._config;
        if(!$.exists(config)) return;

        var confg = config[value];
        return ($.exists(confg)) ? this._execute(value) : this._execute(dflt);
    },
    _execute: function(value) {
        var config = this._config;
        if(!$.exists(config)) return;

        var split = value.split("_ku4_"),
            key = split[0],
            args = (split.length > 1) ? this._decodeArgs(split[1]) : [],
            confg = config[key];

        if (!$.exists(confg)) return;

        var modelName = confg.model,
            methodName = confg.method,
            modelFactory =  this._modelFactory;

        if ($.exists(modelName) && $.exists(methodName)) {
            try {
                var model = modelFactory.create(modelName);
                model[methodName].apply(model, args);
            }
            catch (e) { /* Fail silently */ }
        }
        return this;
    },
    _encodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return $.str.encodeBase64($.json.serialize(value));
    },
    _decodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return $.json.deserialize($.str.decodeBase64(value));
    },
    _setEventListener: function(callback) {
        if($.exists(window.addEventListener)) {
            window.addEventListener("hashchange", function(e) {
                window.removeEventListener("hashchange", arguments.callee);
                setTimeout(function() { callback(); }, 800);
            });
        }
        else if($.exists(window.attachEvent)) {
            window.attachEvent("onhashchange", function(e) {
                window.detachEvent("onhashchange", arguments.callee);
                setTimeout(function() { callback(); }, 800);
            });
        }
    }
};

$.ku4webApp.navigator = function(modelFactory, config) {
    return new navigator(modelFactory, config);
};