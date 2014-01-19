function store(mediator, config) {
    this._mediator = mediator;
    this._config = config;
}
store.prototype = {
    insert: function(dto) {
        if(!$.exists(dto)) throw new Error($.str.format("Cannot insert invalid type: {0}", dto));
        var config = this._config,
            obj = ($.exists(dto.toObject)) ? dto.toObject() : dto,
            collection = $.ku4store().read(config.name);
        collection.insert(obj);
        collection.save();
        if($.exists(config.insert))
            this._mediator.notify(collection, config.insert);
        return this;
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
        if(!$.exists(dto)) throw new Error($.str.format("Cannot update type: {0}", dto));
        var config = this._config,
            obj = ($.exists(dto.toObject)) ? dto.toObject() : dto,
            collection = $.ku4store().read(config.name).update({"_ku4Id": obj._ku4Id}, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
        return this;
    },
    remove: function(dto) {
        var config = this._config,
            obj = ($.exists(dto) && $.exists(dto.toObject)) ? dto.toObject() : dto,
            collection = $.ku4store().read(config.name).remove(obj).save();
        if($.exists(config.remove))
            this._mediator.notify(collection, config.remove);
        return this;
    }
};
$.ku4webApp.store = function(mediator, config) {
    return new store(mediator, config);
};