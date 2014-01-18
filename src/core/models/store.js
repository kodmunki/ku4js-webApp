function store(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
store.prototype = {
    insert: function(dto) {
        var config = this._config,
            collection = $.ku4store().read(config.name);
        collection.insert(dto.toObject());
        collection.save();
        if($.exists(config.insert))
            this._mediator.notify(collection, config.insert);
    },
    find: function(criteria) {
        var config = this._config,
            collection = $.ku4store().read(config.name),
            data = collection.find(criteria);
        if($.exists(config.find))
            this._mediator.notify(data, config.find);
        return data;
    },
    update: function(dto) {
        var config = this._config,
            obj = dto.toObject(),
            collection = $.ku4store().read(config.name).update({"_ku4Id": obj._ku4Id}, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
    },
    remove: function(dto) {
        var config = this._config,
            collection = $.ku4store().read(config.name).remove(dto.toObject()).save();
        if($.exists(config.remove))
            this._mediator.notify(collection, config.remove);
    }
};
$.ku4webApp.store = function(mediator, config) {
    return new store(mediator, config);
};