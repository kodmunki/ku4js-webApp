$.ku4webApp.config.sockets = {
    "account.create": {
        event: "acount.create",
        success: "socket+accountCreated",
        error: "socket-accountCreated"
    },
    "account.list": {
        event: "account.list",
        success: "socket+accountCreated",
        error: "socket-accountCreated"
    }
};