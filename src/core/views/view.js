$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(templateFactory, formFactory) {
        view.base.call(this, templateFactory, formFactory);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var _view = new view(app.templateFactory, app.formFactory);
        if($.exists(subscriptions))
            $.hash(subscriptions).each(function(obj) {
                app.mediator.subscribe(obj.key, _view[obj.value], _view);
            });
        return _view;
    }
}