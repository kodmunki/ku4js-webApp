(function(l){ $=l;
$.ku4webApp = {
    config: {
        templates: { }
    },
    templates: { },
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

/* This responsebox requires a div that is added
 * to an html page and is styled by CSS
 */

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

/* The config for a validator should contain an array of key, value pairs
 * per field that is intended to be included in the validation output.
 * Each fields config should contain a name and a message.
 */

function formValidator(config) {
    this._config = config;
}
formValidator.prototype = {
    validate: function(form) {
        var config = this._config,
            isValid = true,
            messages = $.hash({}),
            fields = form.fields();

        $.list(config).each(function(item) {
            var name = item.name,
                message = item.message,
                field = fields.find(name);
            if(!$.exists(field) || field.isValid()) return;
            isValid = false;
            messages.add(name, message);
        });
        return { isValid: isValid, messages: messages.toObject() };
    }
};
$.ku4webApp.validator = function(config) {
    return new formValidator(config);
};

function app() {
    var app = $.ku4webApp;
    this.mediator = $.mediator();
    this.serviceFactory = app.serviceFactory(this.mediator, app.config.services);
    this.store = app.store(this.mediator, app.config.store);
    this.templateFactory = app.templateFactory(app.config.templates);
    this.formFactory = app.formFactory(app.config.forms);
    this.validatorFactory = app.validatorFactory(app.config.validators);
    this.responsebox = app.responsebox(".ku4webApp-responsebox");
}

$.ku4webApp.app = function() { return new app(); }

function abstractController(mediator, serviceFactory, store, formFactory, validatorFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._store = store;
    this._formFactory = formFactory;
    this._validatorFactory = validatorFactory;
}
abstractController.prototype = {
    $mediator: function() { return this._mediator; },
    $store: function() { return this._store; },
    $service: function(name) { return this._serviceFactory.create(name); },
    $validate: function(key) {
        var form = this._formFactory.create(key),
            validator = this._validatorFactory.create(key);
        return validator.validate(form);
    },
    $read: function(key) { return this._formFactory.create(key).read(); },
    $clear: function(key) { this._formFactory.create(key).clear(); return this;},
    $notify: function() {
        var mediator = this._mediator;
        mediator.notify.apply(mediator, arguments);
        return this;
    }
};
$.ku4webApp.abstractController = abstractController;

$.ku4webApp.controller = function(name, proto) {

    function controller(mediator, serviceFactory, store, formFactory, validatorFactory) {
        controller.base.call(this, mediator, serviceFactory, store, formFactory, validatorFactory);
    }
    controller.prototype = proto;
    $.Class.extend(controller, abstractController);

    $.ku4webApp.controllers[name] = function(app) {
        return new controller(app.mediator, app.serviceFactory, app.store, app.formFactory, app.validatorFactory);
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
            params = ($.exists(dto.toQueryString))
                ? dto.toQueryString()
                : $.dto(dto).toQueryString;

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
    create: function(key, dto) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection);
        collection.insert(dto.toObject());
        collection.save();
        if($.exists(config.create))
            this._mediator.notify(collection, config.create);
    },
    read: function(key, criteria) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection),
            data = collection.find(criteria);
        if($.exists(config.read))
            this._mediator.notify(data, config.read);
        return data;
    },
    update: function(key, dto) {
        var config = this._config[key],
            obj = dto.toObject(),
            collection = $.ku4store().read(config.collection).update({"_ku4Id": obj._ku4Id}, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
    },
    remove: function(key, dto) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection).remove(dto.toObject()).save();
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
    $localization: function(key) { return this._config.localization[key]; },
    $config: function(key) { return ($.exists(key)) ? this._config[key] : this._config; },
    $forms: function(key) { return ($.exists(key)) ? this._config.forms[key] : this._config.forms; },
    $views: function(key) { return ($.exists(key)) ? this._config.views[key] : this._config.views; },
    $render: function(template, data) { return $.str.render(template, data); },
    $renderList: function(template, dataList) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$render(template, entity);
        }, this);
        return rendering;
    },
    $renderWithAction: function(data, renderAction) {
        return renderAction.call(this, data);
    },
    $renderListWithAction: function(dataList, renderAction) {
        var rendering = "";
        $.list(dataList).each(function(entity) {
            rendering += this.$renderWithAction(entity, renderAction);
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

function abstractView(mediator, responsebox, templateFactory, formFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
    this._formFactory = formFactory;
}
abstractView.prototype = {
    $mediator: function() { return this._mediator; },
    $template: function(key) { return this._templateFactory.create(key); },
    $show: function(html) { this._responsebox.show(html); },
    $hide: function() { this._responsebox.hide(); },
    $write: function(key, data) {
        var dto = ($.exists(data.find)) ? data : $.dto(data);
        return this._formFactory.create(key).write(dto);
    }
};
$.ku4webApp.abstractView = abstractView;

$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(mediator, responsebox, templateFactory, formFactory) {
        view.base.call(this, mediator, responsebox, templateFactory, formFactory);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var mediator = app.mediator,
            _view = new view(mediator, app.responsebox, app.templateFactory, app.formFactory);
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
    create: function(key) {
        return $.ku4webApp.form(this._config[key]);
    }
};
$.ku4webApp.formFactory = function(config) {
    return new formFactory(config);
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
