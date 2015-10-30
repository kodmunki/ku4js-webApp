(function(l){
$.ku4webApp = {
    config: {
        templates: { }
    },
    templates: { },
    models: { },
    controllers: { },
    views: { }
};

function form(config) {
    form.base.call(this);
    $.list(config).each(this._add, this);
}
form.prototype = {
    _add: function(fieldConfig) {
        var field = $[fieldConfig.type](fieldConfig.selector);
        if($.exists(fieldConfig.spec)) field.spec(fieldConfig.spec);
        if($.exists(fieldConfig.maxDims)) field.maxDims(fieldConfig.maxDims);
        if((fieldConfig.required === true) && $.isFunction(field.required)) field.required();
        if($.exists(fieldConfig.format) && $.isFunction(field.format)) field.format(fieldConfig.format);

        if($.isNullOrEmpty(field.dom().name))
            throw $.ku4exception("form", "Form requires all field DOM elements have a valid 'name' attribute");
        else this.add(field.dom().name, field);
    }
};
$.Class.extend(form, $.form.Class);
$.ku4webApp.form = function(config) { return new form(config); };

function responsebox(query) {
    this._container = $(query);
    this._display = "css-responsebox-show";
}
responsebox.prototype = {
    show: function(content) {
        this._container.html(content).addClass(this._display);
    },
    hide: function() {
        this._container.html("").removeClass(this._display);
    }
}
$.ku4webApp.responsebox = function(query) {
    return new responsebox(query);
}

function validator(config) {
    this._config = config;
}
validator.prototype = {
    validate: function(dto) {
        var config = this._config,
            isValid = true,
            messages = $.hash({}),
            _dto = dto || $.dto();

        $.list(config).each(function(item) {
            var name = item.name,
                spec = item.spec,
                message = item.message,
                data = _dto.find(name);
            if(spec.isSatisfiedBy(data)) return;
            isValid = false;
            messages.add(name, message);
        });
        return { isValid: function() { return isValid; },
                 messages: function() { return messages.toObject(); } };
    }
};
$.ku4webApp.validator = function(config) {
    return new validator(config);
};

function abstractController(modelFactory, formFactory, navigator, stateMachine) {
    this._modelFactory = classRefcheck("controllers", "modelFactory", modelFactory);
    this._formFactory = classRefcheck("controllers", "formFactory", formFactory);
    this._navigator = navigator;
    this._stateMachine = stateMachine;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); },
    $navigator: function() { return this._navigator; },
    $stateMachine: function() { return this._stateMachine; }
};

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

function abstractModel(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    this._mediator = classRefcheck("models", "mediator", mediator);
    this._serviceFactory = classRefcheck("models", "serviceFactory", serviceFactory);
    this._socketFactory = classRefcheck("models", "socketFactory", socketFactory);
    this._storeFactory = classRefcheck("models", "storeFactory", storeFactory);
    this._validatorFactory = classRefcheck("models", "validatorFactory", validatorFactory);
    this._appState = appState;
    this._state = $.ku4webApp.state();
}
abstractModel.prototype = {
    $mediator: function() { return this._mediator; },
    $collection: function(name) { return this._storeFactory.create(name); },
    $service: function(name) { return this._serviceFactory.create(name); },
    $socket: function(name) { return this._socketFactory.create(name); },
    $validator: function(name) { return this._validatorFactory.create(name); },
    $state: function() { return this._state; },
    $appState: function(value) {
        //NOTE: This value corresponds  to the global app state and can and will
        //      change the value for all models in the application!
        if(!$.exists(value)) return this._appState;
        this._appState.set(value);
        return this;
    },
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};

function abstractStateMachine(modelFactory) {
    this._modelFactory = classRefcheck("stateMachine", "modelFactory", modelFactory);
    this._state = $.ku4webApp.state();
    this._securityLock = $.lock();
}

abstractStateMachine.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    is: function(value) { return this._state.is(value); },
    set: function(value) { this._state.set(value); return this; },
    read: function(key) { return this._state.read(key); },
    write: function(key, value) { this._state.write(key, value); return this; },
    lock: function() { this._securityLock.lock(); return this; },
    unlock: function() { this._securityLock.unlock(); return this; },
    isLocked: function() { return this._securityLock.isLocked(); },
    isUnlocked: function() { return !this.isLocked(); },
    value: function() { return this._state.value(); }
};

$.ku4webApp.model = function(name, proto, subscriptions) {
    function model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
        model.base.call(this, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
        var _model = new model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
        if($.exists(subscriptions)) {
            $.hash(subscriptions).each(function(obj) {
                var key = obj.key,
                    value = obj.value,
                    id = $.str.format("ku4webApp.model.{0}_{1}", name, value),
                    method = _model[value];

                try {
                    mediator
                        .unsubscribe(key, id)
                        .subscribe(key, method, _model, id);
                }
                catch(e) {
                    throw $.ku4exception("$.ku4webApp.model", $.str.format("$.ku4webApp.model.{0} cannot subscribe to mediator with name: {1} or method: {2}.\n\nmessage:{3}\n\n", name, key, value, e.message));
                }
            });
        }
        return _model;
    }
};

function service(mediator, name, config) {
    this._mediator = mediator;
    this._config = config;

    var service = $.service(name)[config.verb]().uri(config.uri);
        service.contentType(config.contentType);

        if($.exists(config.success)) service.onSuccess(function(data) {
            mediator.notify(config.success, data, service.processId());
        }, this, config.success);

        if($.exists(config.error)) service.onError(function(data){
            mediator.notify(config.error, data, service.processId());
        }, this, config.success);

        if($.exists(config.complete)) service.onComplete(function(data){
            mediator.notify(config.complete, data, service.processId());
        }, this, config.complete);

        if($.exists(config.abort)) service.onAbort(function(data){
            mediator.notify(config.abort, data, service.processId());
        }, this, config.abort);

    this._service = service;
}
service.prototype = {
    cache: function() { this._service.cache(); return this; },
    noCache: function() { this._service.noCache(); return this; },
    lock: function() { this._service.lock(); return this; },
    unlock: function() { this._service.unlock(); return this; },
    abort: function() { this._service.abort(); return this; },
    call: function(params) { this._service.call(params); return this; }
};
$.ku4webApp.service = function(mediator, name, config) {
    return new service(mediator, name, config);
};

var __ku4socket, io;
function socketInstance() {
    if($.isUndefined(__ku4socket)) __ku4socket = ($.exists(io)) ? io() : null;
    return __ku4socket;
}
function socket(mediator, config) {

    if(!$.exists(config.event)) throw new Error("Invalid socket event configuration");
    this._event = config.event;

    var socket = socketInstance();

    if(!$.exists(socket)) throw new Error("Missing socket.io dependency. Add socket.io to your application.");
    if($.exists(config.success))
        socket.on(this._event, function(data) { mediator.notify(config.success, data); });
    if($.exists(config.error))
        socket.on("error", function(data) { mediator.notify(config.error, data); });
}
socket.prototype = {
    call: function(data) { socketInstance().emit(this._event, data); }
};
$.ku4webApp.socket = function(mediator, config) {
    return new socket(mediator, config);
};

function state(value) {
    this._value = value;
    this._data = $.hash();
}
state.prototype = {
    is: function(value) { return this._value === value; },
    set: function(value) {
        this._value = value;
        return this;
    },
    read: function(key) {
        return this._data.findValue(key);
    },
    write: function(key, value) {
        this._data.update(key, value);
        return this;
    },
    value: function() {
        return this._value;
    }
};
$.ku4webApp.state = function(value) {
    return new state(value);
};

$.ku4webApp.stateMachine = function(proto, subscriptions) {
    function stateMachine(modelFactory) {
        stateMachine.base.call(this, modelFactory);
    }
    stateMachine.prototype = proto;
    $.Class.extend(stateMachine, abstractStateMachine);

    $.ku4webApp.$stateMachine = function(mediator, modelFactory) {
        var _stateMachine = new stateMachine(modelFactory);

        if($.exists(subscriptions)) {
            $.hash(subscriptions).each(function (obj) {
                var key = obj.key,
                    value = obj.value,
                    id = $.str.format("ku4webApp.stateMachine.{0}", value),
                    method = _stateMachine[value];

                try {
                    mediator
                        .unsubscribe(key, id)
                        .subscribe(key, method, _stateMachine, id);
                }
                catch (e) {
                    throw $.ku4exception("$.ku4webApp.stateMachine", $.str.format("$.ku4webApp.stateMachine cannot subscribe to mediator with name: {0} or method: {1}.\n\nmessage:{2}\n\n", key, value, e.message));
                }
            });
        }
        return _stateMachine;
    }
};

function store(mediator, config, key, collection) {
    this._mediator = mediator;
    this._config = config;
    this._key = key;
    this._collection = collection;
}
store.prototype = {
    init: function(list, callback, scope) {
        var _callback = callback || function() {},
            scp = scope || this;
        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.init(list).save(function(err) {
                _callback.call(scp, err, this);
            }, this);
        }, this);
        return this;
    },
    find: function(criteria, callback, scope) {
        var config = this.__config(),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else {
                var results = collection.find(criteria);
                _callback.call(scp, null, results);
                if ($.exists(config.find)) this._mediator.notify(config.find, data);
            }
        }, this)
    },
    insert: function(dto, callback, scope) {
        var config = this.__config(),
            message = $.str.format("Cannot insert invalid type: {1} into Collection[\"{0}\"]", config.name, dto),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else if(!$.exists(dto)) throw $.ku4exception("Collection", message);
            else collection.insert(dto).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.insert)) this._mediator.notify(config.insert, collection);
            }, this);
        }, this);
        return this;
    },
    insertList: function(list, callback, scope) {
        var config = this.__config(),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.insertList(list).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.insert)) this._mediator.notify(config.insert, collection);
            }, this);
        }, this);
        return this;
    },
    update: function(criteria, dto, callback, scope) {
        var config = this.__config(),
            _message = $.str.format("Cannot update type: {1} into Collection[\"{0}\"]", config.name, dto),
            _callback = callback || function() {},
            scp = scope || this;

        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);
        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.update(criteria, obj).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.update)) this._mediator.notify(config.update, collection);
            }, this);
        }, this);
        return this;
    },
    remove: function(dto, callback, scope) {
        var dtoIsFunction = $.isFunction(dto),
            _dto = (dtoIsFunction) ? null : dto,
            _callback = (dtoIsFunction) ? dto : callback,
            _scope = (dtoIsFunction) ? callback : scope,
            obj = ($.exists(_dto) && $.exists(_dto.toObject)) ? _dto.toObject() : _dto,
            config = this.__config(),
            __callback = _callback || function() {},
            scp = _scope || this;

        this.__collection(function(err, collection){
            if($.exists(err)) __callback.call(scp, err, null);
            else collection.remove(obj).save(function(err) {
                __callback.call(scp, err, this);
                if($.exists(config.remove)) this._mediator.notify(config.remove, collection);
            }, this);
        }, this);
        return this;
    },
    join: function() {
        var config = this._config,
            name = arguments[0],
            arg1 = arguments[1],
            arg2 = arguments[2],
            arg3 = arguments[3],
            arg4 = arguments[4],
            arg5 = arguments[5],

            threeArg =  arguments.length == 3,  //(name,    method(),   callback())
            fourArg =   arguments.length == 4,  //(name,    method(),   "direction",    callback())
            fiveArg =   arguments.length == 5,  //(name,    "key",      "value",        "direction",    callback())

            collectionConfig = config[name],
            joinName = ($.exists(collectionConfig)) ? collectionConfig.name : name,

            _callback = (threeArg) ? arg2 : (fourArg) ? arg3 : arg4,
            _scope = (threeArg) ? arg3 : (fourArg) ? arg4 : arg5,
            __callback = _callback || function() {},
            scp = _scope || this;

        this.__collection(function(err, collection1) {
            this.__store().read(joinName, function(err, collection2) {
                var join = (function() {
                    if(threeArg)    return collection1.join(collection2, arg1);
                    if(fourArg)     return collection1.join(collection2, arg1, arg2);
                    if(fiveArg)     return collection1.join(collection2, arg1, arg2, arg3);
                    return null;
                })();

                if(!$.exists(join)) __callback.call(scp, $.ku4exception("$.ku4webApp.store", "Join exception"));
                else {
                    var join_name = join.name(),
                        newConfig = $.hash(config).replicate().add(join_name, { name: join_name }).toObject(),
                        joinStore = new store(this._mediator, newConfig, join_name, join);
                    __callback.call(scp, err, joinStore);
                }
            }, this);
        }, this);
    },
    exec: function(func, callback, scope) {
        var _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else {
                var execStore = new store(this._mediator, this._config, this._key, collection.exec(func));
                _callback.call(scp, err, execStore);
            }
        }, this);
        return this;
    },
    __config: function() {
        return classRefcheck("Collection", "config", this._config[this._key]);
    },
    __store: function() {
        var storeType = this._config.ku4StoreType;
        switch(storeType) {
            case "memory": return $.ku4memoryStore();
            case "indexedDB": return $.ku4indexedDbStore();
            default: return $.ku4localStorageStore();
        }
    },
    __collection: function(callback, scope) {
        var collection = this._collection,
            scp = scope || this;

        if($.exists(collection)) callback.call(scp, null, collection);
        else this.__store().read(this.__config().name, callback, scp);
    }
};
$.ku4webApp.store = function(mediator, config, key, collection) {
    return new store(mediator, config, key, collection);
};

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

function abstractTemplate(config) {
    this._config = classRefcheck("templates", "config", config);
}
abstractTemplate.prototype = {
    $config: function(name) { return ($.exists(name)) ? this._config[name] : this._config; },
    $forms: function(name) { return ($.exists(name)) ? this._config.forms[name] : this._config.forms; },
    $views: function(name) { return ($.exists(name)) ? this._config.views[name] : this._config.views; },
    $render: function(template, data, alt, formatFunc) {
        var _formatFunc = formatFunc || function(value) { return value; };
        return $.str.render(template, _formatFunc(data), alt);
    },
    $renderList: function(template, dataList, alt, formatFunc) {
        var rendering = "",
            _alt = (!$.isFunction(alt)) ? alt : null,
            _formatFunc = ($.isFunction(alt))
                ? alt : ($.isFunction(formatFunc))
                ? formatFunc : function(value) { return value; };

        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, _formatFunc(entity), _alt);
        }, this);
        return rendering;
    },
    $renderListWithAction: function(dataList, action, formatFunc) {
        var rendering = "",
            _formatFunc = formatFunc || function(value) { return value; };

        $.list(dataList).each(function(entity) {
            rendering += action.call(this, _formatFunc(entity));
        }, this);
        return rendering;
    }
};
$.ku4webApp.abstractTemplate = abstractTemplate;

$.ku4webApp.template = function(name, proto) {

    function template(config) {
        template.base.call(this, config);
    }
    template.prototype = proto;
    $.Class.extend(template, abstractTemplate);

    $.ku4webApp.templates[name] = function(config) {
        var _config = classRefcheck($.str.format("templates.{0}", name), "config", config);
        return new template(_config);
    }
};

function abstractView(templateFactory, formFactory, navigator) {
    this._templateFactory = classRefcheck("views", "templateFactory", templateFactory);
    this._formFactory = classRefcheck("views", "formFactory", formFactory);
    this._navigator = classRefcheck("views", "navigator", navigator);
    this._state = $.ku4webApp.state();
}
abstractView.prototype = {
    $template: function(name) { return this._templateFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); },
    $navigator: function() { return this._navigator; },
    $state: function() { return this._state; }
};
$.ku4webApp.abstractView = abstractView;

$.ku4webApp.__views = { };
$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(templateFactory, formFactory, navigator) {
        view.base.call(this, templateFactory, formFactory, navigator);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var className = $.str.format("$.ku4webApp.views.{0}", name),
            message = $.str.format("Requires a valid app. app= {0}", app);
        if(!$.exists(app)) throw $.ku4exception(className, message);

        if(!$.exists($.ku4webApp.__views[name])) {
            var _view = new view(app.templateFactory, app.formFactory, app.navigator);
            if($.exists(subscriptions))
                $.hash(subscriptions).each(function(obj) {
                    var key = obj.key,
                        value = obj.value,
                        id = $.str.format("ku4webApp.view_{0}_{1}", name, value),
                        method = _view[value];

                    try {
                        app.mediator
                            .unsubscribe(key, id)
                            .subscribe(key, method, _view, id);
                    }
                    catch(e) {
                        throw $.ku4exception("$.ku4webApp.view", $.str.format("$.ku4webApp.view.{0} cannot subscribe to mediator with name: {1} or key: {2}.\n\nmessage:{3}\n\n", name, key, value, e.message));
                    }
                });
            $.ku4webApp.__views[name] = _view;
        }
        return $.ku4webApp.__views[name];
    }
};

function formFactory(config) {
    this._config = config;
}
formFactory.prototype = {
    create: function(key) { return $.ku4webApp.form(this._config[key]); }
};
$.ku4webApp.formFactory = function(config) {
    return new formFactory(config);
};

function modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    var models = $.hash();
    $.hash($.ku4webApp.models).each(function(obj){
        models.add(obj.key, obj.value(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState));
    }, this);
    this._models = models;
}
modelFactory.prototype = {
    create: function(name) { return this._models.find(name); }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState) {
    return new modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, appState);
};

function serviceFactory(mediator, config) {
    var services = $.hash();
    $.hash(config).each(function(obj){
        services.add(obj.key, $.ku4webApp.service(mediator, obj.key, obj.value));
    }, this);
    this._services = services;
}
serviceFactory.prototype = {
    create: function(name) {
        return this._services.find(name);
    }
};
$.ku4webApp.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};

function socketFactory(mediator, config) {
    var sockets = $.hash();

    $.hash(config).each(function(obj){
        sockets.add(obj.key, $.ku4webApp.socket(mediator, obj.value));
    }, this);

    this._sockets = sockets;
}
socketFactory.prototype = {
    create: function(name) { return this._sockets.find(name); }
};
$.ku4webApp.socketFactory = function(mediator, config) {
    return new socketFactory(mediator, config);
};

function storeFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
storeFactory.prototype = {
    create: function(key) { return $.ku4webApp.store(this._mediator, this._config, key); }
};
$.ku4webApp.storeFactory = function(mediator, config) {
    return new storeFactory(mediator, config);
};

function templateFactory(config) {
    this._config = config;
}
templateFactory.prototype = {
    create: function (name){ return $.ku4webApp.templates[name](this._config); }
};
$.ku4webApp.templateFactory = function(templates) {
    return new templateFactory(templates);
};

function validatorFactory(config) {
    this._config = config;
}
validatorFactory.prototype = {
    create: function(key) { return $.ku4webApp.validator(this._config[key]); }
};
$.ku4webApp.validatorFactory = function(config) {
    return new validatorFactory(config);
};

function app(name) {
    var _name = name || $.uid(),
        app = $.ku4webApp,
        mediator = $.mediator("ku4webApp_" + _name),
        serviceFactory = app.serviceFactory(mediator, app.config.services),
        socketFactory = app.socketFactory(mediator, app.config.sockets),
        storeFactory = app.storeFactory(mediator, app.config.collections),
        validatorFactory = app.validatorFactory(app.config.validators);

    this._state = $.ku4webApp.state("__ku4appStarted__");
    this.modelFactory = app.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory, this._state);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.mediator = mediator;

    var stateMachine = $.ku4webApp.$stateMachine;
    this.stateMachine = ($.isFunction(stateMachine)) ? stateMachine(mediator, this.modelFactory) : null;
    this.navigator = app.navigator(this.modelFactory, app.config.navigator, this.stateMachine);
}
app.prototype = {
    logErrors: function() {
        this.mediator.logErrors();
        this.navigator.logErrors();
        return this;
    },
    throwErrors: function() {
        this.mediator.throwErrors();
        this.navigator.throwErrors();
        return this;
    },
    catchErrors: function() {
        this.mediator.catchErrors();
        this.navigator.catchErrors();
        return this;
    }
};
$.ku4webApp.app = function(name) { return new app(name); };

function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}

})();
