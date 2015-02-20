$.ku4webApp.config.templates.views = {
    cardList: '<div class="card-list js-card-list"></div>' +
              '<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button>',

    card:   '<div class="card">' +
                '<img src="{{photo}}" />' +
                '<span>{{name}}</span>' +
                '<span>{{value}}</span>' +
                '<span>{{description}}</span>' +
                '<button class="card-edit-control" onclick="cardController.edit(\'{{id}}\');">Edit</button></div>'
};