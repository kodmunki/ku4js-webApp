function store(mediator, config, key, collection) {
    this._mediator = mediator;
    this._config = config;
    this._key = key;
    this._collection = collection;
}
store.prototype = {
    init: function(list) {
        this.__collection().init(list).save();
        return this;
    },
    find: function(criteria) {
        var config = this.__config(),
            data = this.__collection().find(criteria);

        if($.exists(config.find))
            this._mediator.notify(config.find, data);
        return data;
    },
    insert: function(dto) {
        var config = this.__config(),
            message = $.str.format("Cannot insert invalid type: {1} into Collection[\"{0}\"]", config.name, dto),
            collection = this.__collection();

        if(!$.exists(dto)) throw $.ku4exception("Collection", message);
        collection.insert(dto).save();

        if($.exists(config.insert))
            this._mediator.notify(config.insert, collection);

        return this;
    },
    insertList: function(list) {
        this.__collection().insertList(list).save();
        return this;
    },
    update: function(criteria, dto) {
        var config = this.__config(),
            _message = $.str.format("Cannot update type: {1} into Collection[\"{0}\"]", config.name, dto);
        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);

        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto;

        var collection = this.__collection().update(criteria, obj).save();
        if($.exists(config.update))
            this._mediator.notify(config.update, collection);
        return this;
    },
    remove: function(dto) {
        var obj = ($.exists(dto) && $.exists(dto.toObject)) ? dto.toObject() : dto,
            config = this.__config(),
            collection = this.__collection().remove(obj).save();
        if($.exists(config.remove))
            this._mediator.notify(config.remove, collection);
        return this;
    },
    join: function() {
        var config = this._config,
            name = arguments[0],
            on = arguments[1],
            equals = arguments[2],
            direction = arguments[3],
            collectionConfig = config[name],
            joinName = ($.exists(collectionConfig)) ? collectionConfig.name : name,
            collection1 = this.__collection(),
            collection2 = $.ku4store().read(joinName),
            join = collection1.join(collection2, on, equals, direction),
            join_name = join.name(),
            newConfig = $.hash(config).replicate().add(join_name, { name: join_name }).toObject();
        return new store(this._mediator, newConfig, join_name, join);
    },
    exec: function(func) {
        this._collection = this.__collection().exec(func);
        return this;
    },
    __config: function() {
        return classRefcheck("Collection", "config", this._config[this._key]);
    },
    __store: function() {
        var storeType = this._config.ku4StoreType;
        switch(storeType) {
            case "memory": return $.ku4memoryStore();
            case "indexedDB": return $.ku4indexedDbStore();
            default: return $.ku4localStorageStore();
        }
    },
    __collection: function() {
        var collection = this._collection;
        return ($.exists(collection)) ? collection : this.__store().read(this.__config().name);
    }
};
$.ku4webApp.store = function(mediator, config, key, collection) {
    return new store(mediator, config, key, collection);
};