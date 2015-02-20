(function(l){
$.ku4webApp.config.collections = {
    card: {
        name: "card"
    }
};

$.ku4webApp.config.forms = {
    card: [
        {
            selector: "#name",
            type: "field",
            required:true
        },
        {
            selector: "#photo",
            type: "imageFileField",
            maxDims: [100,100]
        },
        {
            selector: "#description",
            type: "field",
            required:true
        },
        {
            selector: "#value",
            type: "field",
            required:true
        }
    ]
};

$.ku4webApp.config.navigator = {
    "employee.list": {
        model: "employee",
        method: "list"
    },
    "employee.add": {
        model: "employee",
        method: "add"
    },
    "department.list": {
        model: "department",
        method: "list"
    },
    "department.add": {
        model: "department",
        method: "add"
    }
};

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

$.ku4webApp.config.sockets = {
    //Add Sockets Here
};

$.ku4webApp.config.templates.forms = {
    card:   '<form class="card-form js-card-form" action="">' + '' +
                '<legend>Card Info</legend>' +
                '<fieldset>' +

                '</fieldset>' +

                '{{controls}}</form>'
};

$.ku4webApp.config.templates.views = {
    cardList: '<div class="card-list js-card-list"></div>' +
              '<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button>',

    card:   '<div class="card js-card">' +
                '<img src="{{photo}}" class="card-photo"/>' +
                '<span class="card-name">{{name}}</span>' +
                '<span class="card-value">{{value}}</span>' +
                '<span class="card-description">{{description}}</span>' +
                '<button class="card-edit-control" onclick="cardController.edit(\'{{id}}\');">Edit</button></div>'
};

$.ku4webApp.config.validators = {
    card: [
        {
            name: "name",
            spec: $.spec(function(value) { return /^\w{1,140}$/.test(value); }),
            message: "Username is invalid."
        },
        {
            name: "description",
            spec: $.spec(function(value) { return /.{1,140}/.test(value) }),
            message: "Invalid description."
        },
        {
            name: "value",
            spec: $.spec(function(value) { return $.money.canParse(value); }),
            message: "Invalid value."
        }
    ]
};

$.ku4webApp.controller("card", {
    list: function() {
        this.$model("card").listCards();
        return this;
    },
    create: function() {
        this.$model("card").createCard();
        return this;
    },
    add: function() {
        this.$model("card").addCard(this.$form("card").read());
        return this;
    },
    edit: function(id) {
        this.$model("card").editCard(id);
        return this;
    }
});

$.ku4webApp.model("card", {
    listCards: function() {
        if(this.$state().is("cardsListed"))
            this.$notify("onCardsListed", this.$collection("card").find());
        else this.$service("card.list").call();
        return this;
    },
    createCard: function() {
        this.$notify("onCreateCard");
        return this;
    },
    addCard: function(dto) {

        //this.$state().write("addCard", dto);
        //this.$service("card.add").call(dto.toFormData)

        //NOTE: Bypassing the service call above as there is no real server in this example
        //      In a real world app, you would likely call a service here and add to your
        //      collection on a successful response either getting the data in a response
        //      from the server or persisting it in state, as depicted above, until you
        //      recieved a response;

        dto.add("id", $.uid())
           .update("photo", $.image.dataUrlFromFile(dto.find("photo")));

        this.$collection("card").insert(dto.toObject());
        return this;
    },
    editCard: function(id) {
        console.log(id)
        var cards = this.$collection("card").find({"id": id});

        if(!($.isArray(cards) && cards.length == 1)) this.$notify("onError", new Error("Card collection corrupted."));
        else this.$notify("onEditCard", cards[0]);
        return this;
    },
    updateCard: function(dto) {
        var card = dto.toObject();
        this.$collection("card").update({"id": card.id}, card);
        this.$notify("onCardUpdated", card);
        return this;
    },
    onCardsListed: function(serverResponse) {
        var cardList = $.dto.parseJson(serverResponse).toObject();
        this.$collection("card").init(cardList);

        this.$state().set("cardsListed");
        this.$notify("onCardsListed", cardList);
    },
    onCardAdded: function(serverResponse) {
        var card = $.dto.parseJson(serverResponse).toObject();
        //var card = this.$state().read("addCard")

        this.$collection("card").insert(card);
    },

    onCardsListedError: function(serverResponse) {
        this.$notify("onCardListedError, onError", new Error("Card listing exception."));
    }
},
{
    "svc+cardsListed": "onCardsListed",
    "svc-cardsListed": "onCardsListedError"
});

$.ku4webApp.template("card", {
    renderCardForm: function() {
        return this.$render(this.$forms("card"));
    },
    renderCardList: function(data) {
        return this.$renderList(this.$views("card"), data, "", function(data) {
            data.value = $.money.parse(data.value).toString();
            return data;
        })
    }
});

$.ku4webApp.view("card", {
    displayCardList: function(data) {
        $(".js-card-form").remove();

        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
    },
    displayCardAdded: function(data) {
        console.log(data);
    },
    displayEditCard: function(card) {
        $(".js-card").remove();

        var cardForm = this.$template("card").renderCardForm();
        $("#site").append(cardForm);

        //this.$form("card").write(card);
    },
    displayCardListError: function(data) {
        console.log(data);
    },
    displayError: function(data) {
        console.log(data);
    }
},
{
    "onCardsListed":        "displayCardList",
    "onCardAdded":          "displayCardAdded",

    "onEditCard":           "displayEditCard",

    "onCardsListedError":   "displayCardListError",
    "onError":              "displayError"
});

})();
