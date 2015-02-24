$.ku4webApp.config.templates.forms = {
    card:   '<form id="cardForm" class="card-form" action="">' +
                '<fieldset>' +
                    '<legend>Card Info</legend>' +
                    '<input id="cardId" name="id" type="hidden" />' +
                    '<input id="cardPhotoField" name="photo" class="card-photo-field" type="file" accept="image/*" capture="camera" />' +
                    '<input id="cardNameField" name="name" class="card-name-field" type="text" placeholder="Card Name"/>' +
                    '<input id="cardValueField" name="value" class="card-value-field" type="number" placeholder="999.99"/>' +
                    '<textarea id="cardDescriptionField" name="description" class="card-description-field" placeholder="Description"></textarea></fieldset>' +
                '<div class="card-form-controls">{{controls}}</div></form>',

    cardAddControl:   '<button class="card-add-control" onclick="cardController.add(); return false;">Add</button>',
    cardEditControl:  '<button class="card-update-control" onclick="cardController.update(); return false;">Update</button>'
};