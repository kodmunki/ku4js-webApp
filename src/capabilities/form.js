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