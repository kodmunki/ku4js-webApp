$.ku4webApp.config.services = {
    "account.create": {
        verb: "POST",
        uri: "./response.create.json",
        contentType: "text/json",
        success: "svc+accountCreated",
        error: "svc-accountCreated"
    },
    "account.list": {
        verb: "GET",
        uri: "./response.list.json",
        contentType: "text/json",
        success: "svc+accountsListed",
        error: "svc-accountsListed"
    }
};