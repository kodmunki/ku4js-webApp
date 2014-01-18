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