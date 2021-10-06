import * as OktaSignIn from '@okta/okta-signin-widget';

var signIn = new OktaSignIn({
  baseUrl: process.env.WIDGET_TEST_SERVER
});

signIn.renderEl({el: '#okta-login-container'}, function(res) {
  if (res.status !== 'SUCCESS') {
    return;
  }
  res.session.setCookieAndRedirect(process.env.WIDGET_TEST_SERVER + '/app/UserHome');
});
