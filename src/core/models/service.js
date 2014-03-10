function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(params) {
        var config = this._config,
            mediator = this._mediator,
            service = ($.exists(config.contentType))
                ? $.service().contentType(config.contentType)
                : $.service(),
            svc = service[config.verb]().uri(config.uri)
                .onSuccess(function(data) {
                    if($.exists(config.success))
                        mediator.notify({"data:": data, "processId": svc.processId()}, config.success);
                }, this)
                .onError(function(data){
                    if($.exists(config.error))
                        mediator.notify({"data:": data, "processId": svc.processId()}, config.error);
                }, this)
                .call(params);
        return svc;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};