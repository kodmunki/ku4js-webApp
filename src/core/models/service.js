function service(mediator, name, config) {
    this._mediator = mediator;
    this._config = config;

    var service = $.service(name)[config.verb]().uri(config.uri);
        service.contentType(config.contentType);

        if($.exists(config.success)) service.onSuccess(function(data) {
            mediator.notify(config.success, data, service.processId());
        }, this, config.success);

        if($.exists(config.error)) service.onError(function(data){
            mediator.notify(config.error, data, service.processId());
        }, this, config.success);

        if($.exists(config.complete)) service.onComplete(function(data){
            mediator.notify(config.complete, data, service.processId());
        }, this, config.complete);

        if($.exists(config.abort)) service.onAbort(function(data){
            mediator.notify(config.abort, data, service.processId());
        }, this, config.abort);

    this._service = service;
}
service.prototype = {
    cache: function() { this._service.cache(); return this; },
    noCache: function() { this._service.noCache(); return this; },
    lock: function() { this._service.lock(); return this; },
    unlock: function() { this._service.unlock(); return this; },
    abort: function() { this._service.abort(); return this; },
    setRequestHeader: function(key, value) { this._service.setRequestHeader(key, value); return this; },
    csrfToken: function(token) { this.setRequestHeader("X-Csrf-Token", token); return this; },
    call: function(params) {
        var csrf = $.cookie.find("csrf-token");
        if($.exists(csrf)) this.csrfToken(csrf.replace("csrf-token=",""));
        this._service.call(params); return this;
    }
};
$.ku4webApp.service = function(mediator, name, config) {
    return new service(mediator, name, config);
};