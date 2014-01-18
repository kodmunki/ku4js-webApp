(function(l){ $=l;
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
        if(fieldConfig.required && $.exists(field.required)) field.required();
        this.add(field.dom().name, field);
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

function app() {
    var app = $.ku4webApp,
        mediator = $.mediator(),
        serviceFactory = app.serviceFactory(mediator, app.config.services),
        storeFactory = app.storeFactory(mediator, app.config.collections),
        validatorFactory = app.validatorFactory(app.config.validators);
    this.mediator = mediator;
    this.modelFactory = app.modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.responsebox = app.responsebox(".ku4webApp-responsebox");
}
app.prototype = {
    throwErrors: function() { this.mediator.throwErrors(); return this; }
}
$.ku4webApp.app = function() { return new app(); }

function abstractController(modelFactory, formFactory) {
    this._modelFactory = modelFactory;
    this._formFactory = formFactory;
}
abstractController.prototype = {
    $model: function(name) { return this._modelFactory.create(name); },
    $read: function(name) { return this._formFactory.create(name).read(); },
    $clear: function(name) { this._formFactory.create(name).clear(); return this;}
};
$.ku4webApp.abstractController = abstractController;

$.ku4webApp.controller = function(name, proto) {

    function controller(modelFactory, formFactory, validatorFactory) {
        controller.base.call(this, modelFactory, formFactory, validatorFactory);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        return new controller(app.modelFactory, app.formFactory, app.validatorFactory);
    }
}

function abstractModel(mediator, serviceFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
abstractModel.prototype = {
    $collection: function(name) { return this._storeFactory.create(name); },
    $service: function(name) { return this._serviceFactory.create(name); },
    $validate: function(key, dto) {
        var validator = this._validatorFactory.create(key);
        return validator.validate(dto);
    },
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};
$.ku4webApp.abstractModel = abstractModel;

$.ku4webApp.model = function(name, proto, subscriptions) {

    function model(mediator, serviceFactory, storeFactory, validatorFactory) {
        model.base.call(this, mediator, serviceFactory, storeFactory, validatorFactory);
    }
    model.prototype = proto;
    $.Class.extend(model, abstractModel);

    $.ku4webApp.models[name] = function(mediator, serviceFactory, storeFactory, validatorFactory) {
        var _model = new model(mediator, serviceFactory, storeFactory, validatorFactory);
        if($.exists(subscriptions))
            $.hash(subscriptions).each(function(obj) {
                mediator.subscribe(obj.key, _model[obj.value], _model);
            });
        return _model;
    }
}

function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(dto) {
        var config = this._config,
            mediator = this._mediator,
            params = (!$.exists(dto)) ? "" :
                ($.exists(dto.toQueryString))
                    ? dto.toQueryString()
                    : $.dto(dto).toQueryString();

        $.service()[config.verb]().uri(config.uri)
            .onSuccess(function(datagram){
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError && $.exists(config.error))
                    mediator.notify(response, config.error);
                else if($.exists(config.success))
                    mediator.notify(response.data, config.success);
            }, this)
            .onError(function(data){
                if($.exists(config.error))
                    mediator.notify(data, config.error);
            }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};

function store(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
store.prototype = {
    insert: function(dto) {
        var config = this._config,
            collection = $.ku4store().read(config.name);
        collection.insert(dto.toObject());
        collection.save();
        if($.exists(config.create))
            this._mediator.notify(collection, config.insert);
    },
    find: function(criteria) {
        var config = this._config,
            collection = $.ku4store().read(config.name),
            data = collection.find(criteria);
        if($.exists(config.read))
            this._mediator.notify(data, config.find);
        return data;
    },
    update: function(dto) {
        var config = this._config,
            obj = dto.toObject(),
            collection = $.ku4store().read(config.name).update({"_ku4Id": obj._ku4Id}, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
    },
    remove: function(dto) {
        var config = this._config,
            collection = $.ku4store().read(config.name).remove(dto.toObject()).save();
        if($.exists(config.remove))
            this._mediator.notify(collection, config.remove);
    }
};
$.ku4webApp.store = function(mediator, config) {
    return new store(mediator, config);
};

function abstractTemplate(config) {
    this._config = config;
}
abstractTemplate.prototype = {
    $localization: function(name) { return this._config.localization[name]; },
    $config: function(name) { return ($.exists(name)) ? this._config[name] : this._config; },
    $forms: function(name) { return ($.exists(name)) ? this._config.forms[name] : this._config.forms; },
    $views: function(name) { return ($.exists(name)) ? this._config.views[name] : this._config.views; },
    $render: function(template, data) { return $.str.render(template, data); },
    $renderList: function(template, dataList) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, entity);
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
        return new template(config);
    }
}

function abstractView(templateFactory, formFactory) {
    this._templateFactory = templateFactory;
    this._formFactory = formFactory;
}
abstractView.prototype = {
    $template: function(name) { return this._templateFactory.create(name); },
    $write: function(name, data) {
        var dto = ($.exists(data) && $.exists(data.find)) ? data : $.dto(data);
        this._formFactory.create(name).write(dto);
        return this;
    }
};
$.ku4webApp.abstractView = abstractView;

$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(templateFactory, formFactory) {
        view.base.call(this, templateFactory, formFactory);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var mediator = app.mediator,
            _view = new view(app.templateFactory, app.formFactory);
        if($.exists(subscriptions))
            $.hash(subscriptions).each(function(obj) {
                mediator.subscribe(obj.key, _view[obj.value], _view);
            });
        return _view;
    }
}

function formFactory(config) {
    this._config = config;
}
formFactory.prototype = {
    create: function(key) { return $.ku4webApp.form(this._config[key]); }
};
$.ku4webApp.formFactory = function(config) {
    return new formFactory(config);
};

function modelFactory(mediator, serviceFactory, storeFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._storeFactory = storeFactory;
    this._validatorFactory = validatorFactory;
}
modelFactory.prototype = {
    create: function(name) {
        return $.ku4webApp.models[name](this._mediator, this._serviceFactory, this._storeFactory, this._validatorFactory);
    }
};
$.ku4webApp.modelFactory = function(mediator, serviceFactory, storeFactory, validatorFactory) {
    return new modelFactory(mediator, serviceFactory, storeFactory, validatorFactory);
};

function serviceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
serviceFactory.prototype = {
    create: function(key) { return $.ku4webApp.service(this._mediator, this._config[key]); }
}
$.ku4webApp.serviceFactory = function(mediator, config) {
    return new serviceFactory(mediator, config);
};

function storeFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
storeFactory.prototype = {
    create: function(key) { return $.ku4webApp.store(this._mediator, this._config[key]); }
}
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

})(jQuery);
