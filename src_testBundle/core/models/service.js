function service(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
service.prototype = {
    call: function(dto) {
        var obj = ($.exists(dto) && $.exists(dto.toObject)) ? dto.toObject() : dto,
            success = ($.exists(obj)) ? obj.success : null,
            error = ($.exists(obj)) ? obj.error : null,
            config = this._config;

        if(!$.exists(config))
            throw $.ku4exception("$.service", "Test Bundle services require a valid config containing a " +
                                              "'success':[data] and an 'error':[data] configuration.");

        if($.exists(success)) this._mediator.notify(success, config.success);
        else if($.exists(error)) this._mediator.notify(error, config.error);
        else this._mediator.notify(obj, config.success);
        return this;
    }
};
$.ku4webApp_testBundle.service = function(mediator, config) {
    return new service(mediator, config);
};