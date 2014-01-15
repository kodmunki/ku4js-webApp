(function(l){ $=l;
$.ku4webApp = { };

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

/* serviceFactory must create services of type $.service
 * formFactory must create forms of type $.form
 */

function abstractController(mediator, serviceFactory, formFactory) {
    this._mediator = mediator;
    this._serviceFactory = serviceFactory;
    this._formFactory = formFactory;
}
abstractController.prototype = {
    $mediator: function() { return this._mediator; },
    $serviceFactory: function() { return this._serviceFactory; },
    $formFactory: function() { return this._formFactory; }
};
$.ku4webApp.controller = abstractController;

/* config must follow format: { action: "/service/url" }
 */

function abstractService(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
abstractService.prototype = {
    $call: function(verb, action, success, params) {
        $.service()[verb]().uri(this._config[action])
            .onSuccess(function(datagram){
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError) this._mediator.notify(response, "error");
                else this._mediator.notify(response.data, success);
            }, this)
            .onError(function(data){ this._mediator.notify(data, "error"); }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = abstractService;

function abstractTemplate(templates) {
    this._templates = templates;
}
abstractTemplate.prototype = {
    $templates: function() { return this._templates; },
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
$.ku4webApp.template = abstractTemplate;

/* responsebox must implement interface: show(html) hide()
 * templateFactory must create classes that inherit from baseTemplate
 */

function abstractView(mediator, responsebox, templateFactory) {
    this._mediator = mediator;
    this._responsebox = responsebox;
    this._templateFactory = templateFactory;
}
abstractView.prototype = {
    $mediator: function() { return this._mediator; },
    $responsebox: function() { return this._responsebox; },
    $templateFactory: function() { return this._templateFactory; }
};
$.ku4webApp.view = abstractView;

function abstractFormFactory(config) {
    this._config = config;
}
abstractFormFactory.prototype = {
    $create: function(configKey) {
        return $.ku4webApp.form(this._config[configKey]);
    }
};
$.ku4webApp.formFactory = abstractFormFactory;

function abstractServiceFactory(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
abstractServiceFactory.prototype = {
    $mediator: function() { return this._mediator; },
    $config: function() { return this._config; }
}
$.ku4webApp.serviceFactory = abstractServiceFactory;

})(jQuery);
