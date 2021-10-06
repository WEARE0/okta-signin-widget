/* eslint-disable no-unused-vars */
function addMessageToPage(id, msg) {
  var appNode = document.createElement('div');
  appNode.setAttribute('id', id);
  appNode.innerHTML = msg;
  document.body.appendChild(appNode);
}

function addTokensToPage(tokens) {
  var idToken = tokens.idToken;
  if (idToken) {
    addMessageToPage('idtoken_user', idToken.claims.name);
  }
}

var options = {
  baseUrl: 'https://oswtests.oktapreview.com',
  'el': '#okta-login-container',
  authParams: {
    pkce: false
  }
};

window.oktaSignIn = new OktaSignIn(options);
window.addTokensToPage = addTokensToPage;
window.addMessageToPage = addMessageToPage;
