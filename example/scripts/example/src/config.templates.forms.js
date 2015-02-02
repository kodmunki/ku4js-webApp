$.ku4webApp.config.templates.forms = {
    example: '<div class="js-validationMessages"></div>' +
             '<form class="js-example-form css-example-form">' +
             '<div class="css-field">' +
             '<label for="username">Username</label>' +
             '<input id="responsebox_username" name="username" type="text" value=""/></div>' +

             '<div class="css-field">' +
             '<label for="password">Password</label>' +
             '<input id="responsebox_password" name="password" type="password" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="firstName">First name</label>' +
             '<input id="responsebox_firstName" name="firstName" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="lastName">Last name</label>' +
             '<input id="responsebox_lastName" name="lastName" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="email">Email</label>' +
             '<input id="responsebox_email" name="email" type="text" value=""/>' +
             '</div>' +

             '<div class="css-field">' +
             '<label for="reco">Who recommended this site?</label>' +
             '<select id="responsebox_reco" name="reco">' +
             '<optgroup label="Desire">' +
             '<option value="0">Advertisement.</option>' +
             '<option value="1">Google.</option>' +
             '<option value="2">Friend.</option>' +
             '<option value="3">I stumbled onto it.</option></optgroup></select>' +
             '</div>' +

             '<button href="#" onclick=\"controller.create(); return false;\">Create Account</button>' +
             '<button href="#" onclick=\"controller.cancel(); return false;\">Cancel</button>' +

             '</form>'
}