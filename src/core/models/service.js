function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(dto) {
        var config = this._config,
            mediator = this._mediator,
            params = (!$.exists(dto)) ? "" :
                ($.exists(dto.toQueryString))
                    ? dto.toQueryString()
                    : $.dto(dto).toQueryString();

        $.service()[config.verb]().uri(config.uri)
            .onSuccess(function(datagram){
                var response = $.dto.parseJson(datagram).toObject();
                if (response.isError && $.exists(config.error))
                    mediator.notify(response, config.error);
                else if($.exists(config.success))
                    mediator.notify(response.data, config.success);
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