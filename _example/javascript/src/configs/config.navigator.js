$.ku4webApp.config.navigator = {
    "ku4routes": {
        "card.edit*":   "card.edit",
        "ku4default":   "card.list"
    },
    "card.list": {
        stateMachine: "",
        method: "listCards"
    },
    "card.add": {
        stateMachine: "",
        method: "createCard"
    },
    "card.edit": {
        stateMachine: "",
        method: "editCard"
    }
};