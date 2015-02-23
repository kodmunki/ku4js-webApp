$.ku4webApp.config.templates.views = {
    cardList: '<div class="card-list js-card-list">{{cardList}}</div>' +
              '<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button>',

    card:   '<div class="card js-card">' +
                '<img src="{{photo}}" class="card-photo js-card-photo"/>' +
                '<span class="card-name js-card-name">{{name}}</span>' +
                '<span class="card-value js-card-value">{{value}}</span>' +
                '<span class="card-description js-card-description">{{description}}</span>' +
                '<button class="card-edit-control" onclick="cardController.edit(\'{{id}}\');">Edit</button></div>'
};