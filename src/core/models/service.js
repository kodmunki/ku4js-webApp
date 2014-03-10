function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(params) {
        var config = this._config,
            mediator = this._mediator,
            svc = ($.exists(config.contentType))
                ? $.service().contentType(config.contentType)
                : $.service();

        svc[config.verb]().uri(config.uri)
            .onSuccess(function(datagram) {
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError && $.exists(config.error))
                    mediator.notify(response, config.error);
                else if($.exists(config.success))
                    mediator.notify(response, config.success);
            }, this)
            .onError(function(data){
                if($.exists(config.error))
                    mediator.notify(data, config.error);
            }, this)
            .call(params);
        return this;
    }
};
$.ku4webApp.service = function(mediator, config) {
    return new service(mediator, config);
};