function abstractView(templateFactory, formFactory) {
    this._templateFactory = templateFactory;
    this._formFactory = formFactory;
}
abstractView.prototype = {
    $template: function(name) { return this._templateFactory.create(name); },
    $form: function(name) { return this._formFactory.create(name); }
};
$.ku4webApp.abstractView = abstractView;