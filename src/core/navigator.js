function navigator(modelFactory, config) {
    this._modelFactory = modelFactory;
    this._config = config;
}
navigator.prototype = {
    hashEquals: function(value) {
        return this.read() == value;
    },
    hash: function(value) {
        return ($.exists(value)) ? this.write(true, value) : this.read().split("_")[0];
    },
    read: function() {
        return location.hash.substr(1);
    },
    write: function(/*mute, value, ...*/) {
        var args = Array.prototype.slice.call(arguments),
            mute = ($.isBool(args[0])) ? args.shift() : false,
            hash = args.shift(),
            argString = (args.length > 0) ? this._encodeArgs(args) : "";

        location.hash = ($.isNullOrEmpty(argString)) ? hash : $.str.build(hash, "_", argString);
        if(!mute) this.execute(this.read());
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
    execute: function(value) {
        var config = this._config;
        if(!$.exists(config)) return;

        var split = value.split("_"),
            key = split[0],
            args = this._decodeArgs(split[1]),
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
    executeOrDefault: function(value, dflt) {
        var config = this._config;
        if(!$.exists(config)) return;

        var confg = config[value];
        return ($.exists(confg)) ? this.execute(value) : this.execute(dflt);
    },
    _encodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return encodeURIComponent($.str.encodeBase64($.json.serialize(value)));
    },
    _decodeArgs: function(value) {
        if($.isNullOrEmpty(value)) return "";
        return $.json.deserialize($.str.decodeBase64(decodeURIComponent(value)));
    },
    _setEventListener: function(callback) {
        var write = this.write;

        if($.exists(window.addEventListener)) {
            window.addEventListener("hashchange", function(e) {
                window.removeEventListener("hashchange", arguments.callee);
                setTimeout(function() { callback(); }, 500);
            });
        }
        else if($.exists(window.attachEvent)) {
            window.attachEvent("onhashchange", function(e) {
                window.detachEvent("onhashchange", arguments.callee);
                setTimeout(function() { callback(); }, 500);
            });
        }
    }
};

$.ku4webApp.navigator = function(modelFactory, config) {
    return new navigator(modelFactory, config);
};