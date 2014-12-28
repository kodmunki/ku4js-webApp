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
                    app.mediator.subscribe(obj.key, _view[obj.value], _view);
                });
            $.ku4webApp.__views[name] = _view;
        }
        return $.ku4webApp.__views[name];
    }
}