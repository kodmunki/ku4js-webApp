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