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