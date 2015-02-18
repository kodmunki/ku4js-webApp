function socketFactory(mediator, config) {
    var sockets = $.hash();

    $.hash(config).each(function(obj){
        sockets.add(obj.key, $.ku4webApp.socket(mediator, obj.value));
    }, this);

    this._sockets = sockets;
}
socketFactory.prototype = {
    create: function(name) { return this._sockets.find(name); }
};
$.ku4webApp.socketFactory = function(mediator, config) {
    return new socketFactory(mediator, config);
};