$.ku4webApp.config.navigator = {
    "ku4routes": {
        "card.edit*":   "card.edit",
        "ku4default":   "card.list"
    },
    "card.list": {
        model: "card",
        method: "listCards"
    },
    "card.add": {
        model: "card",
        method: "createCard"
    },
    "card.edit": {
        model: "card",
        method: "editCard"
    }
};