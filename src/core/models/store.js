function store(mediator, config, key, join) {
    this._mediator = mediator;
    this._config = config;
    this._key = key;
    this._join = join;
}
store.prototype = {
    insert: function(dto) {
        var config = classRefcheck("Collection", "config", this._config[this._key]),
            _message = $.str.format("Cannot insert invalid type: {1} into Collection[\"{0}\"]", config.name, dto);
        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);

        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto,
            collection = $.ku4store().read(config.name);
        collection.insert(obj);
        collection.save();
        if($.exists(config.insert))
            this._mediator.notify(collection, config.insert);
        return this;
    },
    find: function(criteria) {
        var config = classRefcheck("Collection", "config", this._config[this._key]),
            join = this._join,
            collection = ($.exists(join))
                ? $.ku4store().read(config.name).join($.ku4store().read(join[0]), join[1], join[2])
                : $.ku4store().read(config.name),
            data = collection.find(criteria);
        if($.exists(config.find))
            this._mediator.notify(data, config.find);
        return data;
    },
    update: function(criteria, dto) {
        var config = classRefcheck("Collection", "config", this._config[this._key]),
            _message = $.str.format("Cannot update type: {1} into Collection[\"{0}\"]", config.name, dto);
        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);

        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto;

        var collection = $.ku4store().read(config.name).update(criteria, obj).save();
        if($.exists(config.update))
            this._mediator.notify(collection, config.update);
        return this;
    },
    remove: function(dto) {
        var config = classRefcheck("Collection", "config", this._config[this._key]),
            obj = ($.exists(dto) && $.exists(dto.toObject)) ? dto.toObject() : dto,
            collection = $.ku4store().read(config.name).remove(obj).save();
        if($.exists(config.remove))
            this._mediator.notify(collection, config.remove);
        return this;
    },
    join: function() {
        var args = $.list.parseArguments(arguments).toArray(),
            config = this._config,
            name = args[0],
            confg = config[name];
        if($.exists(confg)) args[0] = confg.name;
        return new store(this._mediator, this._config, this._key, args);
    }
};
$.ku4webApp.store = function(mediator, config, confg) {
    return new store(mediator, config, confg);
};