function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
    this._noCache = false;
}
service.prototype = {
    noCache: function() { this._noCache = true; return this; },
    call: function(params) {
        var config = this._config,
            mediator = this._mediator,
            service = $.service()[config.verb]().uri(config.uri);
        service.contentType(config.contentType);
        if(this._noCache) service.noCache();
        service.onSuccess(function(data) {
                if($.exists(config.success))
                    mediator.notify(data, service.processId(), config.success);
            }, this)
            .onError(function(data){
                if($.exists(config.error))
                    mediator.notify(data, service.processId(), config.error);
            }, this)
            .call(params);
        return service;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};