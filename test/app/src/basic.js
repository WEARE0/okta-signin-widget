var options = {
  'baseUrl': 'https://oswtests.oktapreview.com',
  authParams: {
    pkce: false
  }
};
var oktaSignIn = new OktaSignIn(options);
oktaSignIn.on('afterError', function () {
  var errorBox = document.getElementsByClassName('okta-form-infobox-error infobox infobox-error')[0];
  // Update text in errorBox
  errorBox.children[1].innerText = 'Custom Error!';
});

oktaSignIn.renderEl(
  { el: '#okta-login-container' },
  function (res) {
    if (res.status === 'SUCCESS') {
      res.session.setCookieAndRedirect(options.baseUrl + '/app/UserHome');
    }
  }
);

window.oktaSignIn = oktaSignIn;
window.options = options;
