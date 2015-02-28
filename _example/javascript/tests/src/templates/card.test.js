$(function() {

    module("templates.card");

    var bundle = $.ku4webAppUT.bundle(),
        template = bundle.template("card");

    test("renderAddCardForm", function() {
        var result =
            '<form id="cardForm" class="card-form" action="">' +
                '<fieldset>' +
                    '<legend>Card Info</legend>' +
                    '<input id="cardId" name="id" type="hidden" />' +
                    '<div class="card-photo-container"><img src="" class="card-photo js-card-photo"/></div>' +
                    '<input id="cardPhotoField" name="photo" class="card-photo-field" type="file" accept="image/*" capture="camera" />' +
                    '<input id="cardNameField" name="name" class="card-name-field" type="text" placeholder="Card Name"/>' +
                    '<input id="cardValueField" name="value" class="card-value-field" type="number" placeholder="999.99"/>' +
                    '<textarea id="cardDescriptionField" name="description" class="card-description-field" placeholder="Description"></textarea></fieldset>' +
                '<div class="card-form-controls"><button class="card-add-control" onclick="cardController.add(); return false;">Add</button></div></form>';

        expect(1);
        equal(template.renderAddCardForm(), result);
    });

    test("renderEditCardForm", function() {
        var result =
            '<form id="cardForm" class="card-form" action="">' +
                '<fieldset>' +
                    '<legend>Card Info</legend>' +
                    '<input id="cardId" name="id" type="hidden" />' +
                    '<div class="card-photo-container"><img src="myPhoto.jpg" class="card-photo js-card-photo"/></div>' +
                    '<input id="cardPhotoField" name="photo" class="card-photo-field" type="file" accept="image/*" capture="camera" />' +
                    '<input id="cardNameField" name="name" class="card-name-field" type="text" placeholder="Card Name"/>' +
                    '<input id="cardValueField" name="value" class="card-value-field" type="number" placeholder="999.99"/>' +
                    '<textarea id="cardDescriptionField" name="description" class="card-description-field" placeholder="Description"></textarea></fieldset>' +
                '<div class="card-form-controls"><button class="card-update-control" onclick="cardController.update(); return false;">Update</button></div></form>';

        expect(1);
        equal(template.renderEditCardForm({
            photo: "myPhoto.jpg"
        }), result);
    });

    test("renderCard", function() {
        var result =
            '<div class="card js-card js-1">' +
                '<div class="card-photo-container"><img src="myPhoto.jpg" class="card-photo js-card-photo"/></div>' +
                '<span class="card-name js-card-name">name</span>' +
                '<span class="card-value js-card-value">$1.00</span>' +
                '<span class="card-description js-card-description">description</span>' +
                '<button class="card-edit-control" onclick="cardController.edit(\'1\');">Edit</button></div>';

        expect(1);
        equal(template.renderCard({
            id: "1",
            name: "name",
            value: 1,
            description: "description",
            photo: "myPhoto.jpg"
        }), result);
    });

    test("renderCardList", function() {
        var result =
            '<div class="card-list js-card-list">' +
                '<div class="card js-card js-1">' +
                    '<div class="card-photo-container"><img src="myPhoto1.jpg" class="card-photo js-card-photo"/></div>' +
                    '<span class="card-name js-card-name">name1</span>' +
                    '<span class="card-value js-card-value">$1.00</span>' +
                    '<span class="card-description js-card-description">description1</span>' +
                    '<button class="card-edit-control" onclick="cardController.edit(\'1\');">Edit</button></div>' +
                '<div class="card js-card js-2">' +
                    '<div class="card-photo-container"><img src="myPhoto2.jpg" class="card-photo js-card-photo"/></div>' +
                    '<span class="card-name js-card-name">name2</span>' +
                    '<span class="card-value js-card-value">$2.00</span>' +
                    '<span class="card-description js-card-description">description2</span>' +
                    '<button class="card-edit-control" onclick="cardController.edit(\'2\');">Edit</button></div>' +
                '<button class="card-add-control js-card-add-control" onclick="cardController.create();">Add Card</button></div>';

        expect(1);
        equal(template.renderCardList([
            {
                id: "1",
                name: "name1",
                value: 1,
                description: "description1",
                photo: "myPhoto1.jpg"
            },
            {
                id: "2",
                name: "name2",
                value: 2,
                description: "description2",
                photo: "myPhoto2.jpg"
            }
        ]), result);
    });
});