/*
    //COLLECTION
    NAME: {
        name: "COLLECTION NAME",
        insert: "ON CREATED",
        find: "ON FOUND",
        update: "ON UPDATED",
        remove: "ON REMOVED"
    }
*/

$.ku4webApp.config.collections = {

    //NOTE: Set your store type here. This defines how collections will persist
    //      data. The default is localStorage. Type memory will only persist
    //      for the duration of the application run. Whereas, localStorage and
    //      indexedDB will persist until the storage mechanism is cleared.
    "storeType": "localStorage" // memory | localStorage | indexedDB

    //ADD YOUR COLLECTIONS HERE
};