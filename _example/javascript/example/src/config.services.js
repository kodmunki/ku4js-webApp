$.ku4webApp.config.services = {
    "card.list": {
        verb: "GET",
        uri: "./_serverStub/cardList.json",
        contentType: "text/json",
        success: "svc+cardsListed",
        error: "svc-cardsListed"
    },
    "card.add": {
        verb: "POST",
        uri: "./_serverStub/cardAdd.json",
        contentType: "text/json",
        success: "svc+cardAdded",
        error: "svc-cardAdded"
    }
};