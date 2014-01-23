function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(dto) {
        var success = dto.find("success"),
            error = dto.find("error");

        if($.exists(success)) this._mediator.notify(success, this._config.success);
        else if($.exists(error)) this._mediator.notify(error, this._config.error);
        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};