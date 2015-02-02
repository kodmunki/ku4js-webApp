$(function() {

    module("templates.example");

    var bundle = $.ku4webAppUT.bundle(),
        template = bundle.template("example");

    test("new", function() {
        expect(1);
        ok(template);
    });

    test("renderForm", function() {
        var result = '<div class=\"js-validationMessages\"></div><form class=\"js-example-form css-example-form\"><div class=\"css-field\"><label for=\"username\">Username</label><input id=\"username\" name=\"username\" type=\"text\" value=\"\"/></div><div class=\"css-field\"><label for=\"password\">Password</label><input id=\"password\" name=\"password\" type=\"password\" value=\"\"/></div><div class=\"css-field\"><label for=\"firstName\">First name</label><input id=\"firstName\" name=\"firstName\" type=\"text\" value=\"\"/></div><div class=\"css-field\"><label for=\"lastName\">Last name</label><input id=\"lastName\" name=\"lastName\" type=\"text\" value=\"\"/></div><div class=\"css-field\"><label for=\"email\">Email</label><input id=\"email\" name=\"email\" type=\"text\" value=\"\"/></div><div class=\"css-field\"><label for=\"reco\">Who recommended this site?</label><select id=\"reco\" name=\"reco\"><optgroup label=\"Desire\"><option value=\"0\">Advertisement.</option><option value=\"1\">Google.</option><option value=\"2\">Friend.</option><option value=\"3\">I stumbled onto it.</option></optgroup></select></div><button href=\"#\" onclick=\"controller.create(); return false;\">Create Account</button><button href=\"#\" onclick=\"controller.cancel(); return false;\">Cancel</button></form>';
        expect(1);

        equal(template.renderForm(), result);
    });

    test("renderValidation", function() {
        var data = {
                username: "Invalid must be 10 characters.",
                password: "Invalid cannot contain special characters."
            },
            results = '<ul class="css-validation-error">' +
                      '<li class="css-validation-error">Invalid must be 10 characters.</li>' +
                      '<li class="css-validation-error">Invalid cannot contain special characters.</li></ul>';
        expect(1);

        equal(template.renderValidation(data), results);
    });

    test("renderAccountList", function() {
        var data = [{
                username: "johnUsername",
                password: "password",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@email.com",
                phone: "222-555-8888"
            }],
            result = '<div><h4>John Doe</h4>' +
                     '<ul class="css-account-error">' +
                     '<li class="css-account-data">' +
                       '<span class="css-label">Username: </span>' +
                       '<span class="css-value">johnUsername</span></li>' +
                     '<li class="css-account-data">' +
                       '<span class="css-label">Password: </span>' +
                       '<span class="css-value">password</span></li>' +
                     '<li class="css-account-data">' +
                       '<span class="css-label">Email: </span>' +
                       '<span class="css-value">john.doe@email.com</span></li>' +
                     '</ul></div>';
        expect(2);

        equal(template.renderAccountList(), "");
        equal(template.renderAccountList(data), result);
    });

});