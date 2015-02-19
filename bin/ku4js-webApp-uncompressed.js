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
        if(fieldConfig.required && $.exists(field.required)) field.required();

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
        return { isValid: isValid, messages: messages.toObject() };
    }
};
$.ku4webApp.validator = function(config) {
    return new validator(config);
};

function abstractController(modelFactory, formFactory, navigator) {
    this._modelFactory = classRefcheck("controllers", "modelFactory", modelFactory);
    this._formFactory = classRefcheck("controllers", "formFactory", formFactory);
    this._navigator = navigator;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); },
    $navigator: function() { return this._navigator; }
};
$.ku4webApp.abstractController = abstractController;

$.ku4webApp.controller = function(name, proto) {

    function controller(modelFactory, formFactory, navigator) {
        controller.base.call(this, modelFactory, formFactory, navigator);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        var className = $.str.format("$.ku4webApp.controllers.{0}", name),
            message = $.str.format("Requires a valid app. app= {0}", app);
        if(!$.exists(app)) throw $.ku4exception(className, message);
        return new controller(app.modelFactory, app.formFactory, app.navigator);
    }
};

function abstractModel(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    this._mediator = classRefcheck("models", "mediator", mediator);
    this._serviceFactory = classRefcheck("models", "serviceFactory", serviceFactory);
    this._socketFactory = classRefcheck("models", "socketFactory", socketFactory);
    this._storeFactory = classRefcheck("models", "storeFactory", storeFactory);
    this._validatorFactory = classRefcheck("models", "validatorFactory", validatorFactory);
    this._state = new state();
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
        if(!$.exists(value)) return __appState;
        __appState = new state(value);
        return this;
    },
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};
$.ku4webApp.abstractModel = abstractModel;

$.ku4webApp.model = function(name, proto, subscriptions) {
    function model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
        model.base.call(this, mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
        var _model = new model(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
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

        if($.exists(config.complete)) service.onError(function(data){
            mediator.notify(config.complete, data, service.processId());
        }, this, config.complete);

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

var __ku4socket;
function socketInstance() {
    if($.isUndefined(__ku4socket)) __ku4socket = ($.exists(io)) ? io() : null;
    return __ku4socket;
}
function socket(mediator, config) {

    if(!$.exists(config.event)) throw new Error("Invalid socket event configuration");

    this._event = config.event;

    var socket = socketInstance();
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
    }
};

var __appState = new state("__ku4appStarted__");

function store(mediator, config, key, collection) {
    this._mediator = mediator;
    this._config = config;
    this._key = key;
    this._collection = collection;
}
store.prototype = {
    init: function(list) {
        this._collection = null;
        this.__collection().init(list).save();
        return this;
    },
    find: function(criteria) {
        var config = this.__config(),
            data = this.__collection().find(criteria);

        if($.exists(config.find))
            this._mediator.notify(config.find, data);
        return data;
    },
    insert: function(dto) {
        var config = this.__config(),
            message = $.str.format("Cannot insert invalid type: {1} into Collection[\"{0}\"]", config.name, dto),
            collection = this.__collection();

        if(!$.exists(dto)) throw $.ku4exception("Collection", message);
        collection.insert(dto).save();

        if($.exists(config.insert))
            this._mediator.notify(config.insert, collection);

        return this;
    },
    insertList: function(list) {
        this.__collection().insertList(list).save();
        return this;
    },
    update: function(criteria, dto) {
        var config = this.__config(),
            _message = $.str.format("Cannot update type: {1} into Collection[\"{0}\"]", config.name, dto);
        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);

        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto;

        var collection = this.__collection().update(criteria, obj).save();
        if($.exists(config.update))
            this._mediator.notify(config.update, collection);
        return this;
    },
    remove: function(dto) {
        var obj = ($.exists(dto) && $.exists(dto.toObject)) ? dto.toObject() : dto,
            config = this.__config(),
            collection = this.__collection().remove(obj).save();
        if($.exists(config.remove))
            this._mediator.notify(config.remove, collection);
        return this;
    },
    join: function() {
        var config = this._config,
            name = arguments[0],
            on = arguments[1],
            equals = arguments[2],
            direction = arguments[3],
            collectionConfig = config[name],
            joinName = ($.exists(collectionConfig)) ? collectionConfig.name : name,
            collection1 = this.__collection(),
            collection2 = $.ku4store().read(joinName),
            join = collection1.join(collection2, on, equals, direction),
            join_name = join.name(),
            newConfig = $.hash(config).replicate().add(join_name, { name: join_name }).toObject();
        return new store(this._mediator, newConfig, join_name, join);
    },
    exec: function(func) {
        this._collection = this.__collection().exec(func);
        return this;
    },
    __config: function() {
        return classRefcheck("Collection", "config", this._config[this._key]);
    },
    __collection: function() {
        var collection = this._collection;
        return ($.exists(collection)) ? collection : $.ku4store().read(this.__config().name);
    }
};
$.ku4webApp.store = function(mediator, config, key, collection) {
    return new store(mediator, config, key, collection);
};

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
        return ($.exists(confg)) ? this.execute(value) : this.execute(dflt);
    }
};

$.ku4webApp.navigator = function(modelFactory, config) {
    return new navigator(modelFactory, config);
};

function abstractTemplate(config) {
    this._config = classRefcheck("templates", "config", config);
}
abstractTemplate.prototype = {
    $config: function(name) { return ($.exists(name)) ? this._config[name] : this._config; },
    $forms: function(name) { return ($.exists(name)) ? this._config.forms[name] : this._config.forms; },
    $views: function(name) { return ($.exists(name)) ? this._config.views[name] : this._config.views; },
    $render: function(template, data, alt) { return $.str.render(template, data, alt); },
    $renderList: function(template, dataList, alt) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, entity, alt);
        }, this);
        return rendering;
    },
    $renderListWithAction: function(dataList, action) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += action.call(this, entity);
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
    this._state = new state();
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

function modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    var models = $.hash();
    $.hash($.ku4webApp.models).each(function(obj){
        models.add(obj.key, obj.value(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory));
    }, this);
    this._models = models;
}
modelFactory.prototype = {
    create: function(name) { return this._models.find(name); }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
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

    this.modelFactory = app.modelFactory(mediator, serviceFactory, socketFactory, storeFactory, validatorFactory);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.navigator = app.navigator(this.modelFactory, app.config.navigator);
    this.mediator = mediator;
}
app.prototype = {
    logErrors: function() { this.mediator.logErrors(); return this; },
    throwErrors: function() { this.mediator.throwErrors(); return this; }
};
$.ku4webApp.app = function(name) { return new app(name); };

function classRefcheck(className, propertyName, property) {
    var _className = $.str.format("$.ku4webApp.{0}", className),
        _message = $.str.format("Requires a valid {0}. {0}= {1}", propertyName, property);
    if(!$.exists(property)) throw $.ku4exception(_className, _message);
    else return property;
}

})();
