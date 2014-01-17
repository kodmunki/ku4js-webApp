function store(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
store.prototype = {
    create: function(key, dto) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection);
        collection.insert(dto.toObject());
        collection.save();
        if($.exists(config.create))
            this._mediator.notify(collection, config.create);
    },
    read: function(key, criteria) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection),
            data = collection.find(criteria);
        if($.exists(config.read))
            this._mediator.notify(data, config.read);
        return data;
    },
    update: function(key, dto) {
        var config = this._config[key],
            obj = dto.toObject(),
            collection = $.ku4store().read(config.collection).update({"_ku4Id": obj._ku4Id}, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
    },
    remove: function(key, dto) {
        var config = this._config[key],
            collection = $.ku4store().read(config.collection).remove(dto.toObject()).save();
        if($.exists(config.remove))
            this._mediator.notify(collection, config.remove);
    }
};
$.ku4webApp.store = function(mediator, config) {
    return new store(mediator, config);
};