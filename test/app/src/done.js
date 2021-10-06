// OIDC Redirect Flow - this is the page that is redirected to with
// tokens in the parameters

// PKCE cannot be enabled because the test app is a "web" type. OKTA-246000 
var pkce = false;

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

// auto-detect responseMode (when responseType is code)
var responseMode;
if (window.location.search.indexOf('code') >= 0) {
  responseMode = 'query';
} else if (window.location.hash.indexOf('code') >= 0) {
  responseMode = 'fragment';
}

var oktaSignIn = new OktaSignIn({
  'baseUrl': 'https://oswtests.oktapreview.com',
  // SPA clientId
  'clientId': '0oaw0yek68Swxseof0h7',
  authParams: {
    pkce: pkce,
    responseMode: responseMode
  }
});
addMessageToPage('page', 'oidc_app');

const authClient = oktaSignIn.authClient;
if (authClient.token.isLoginRedirect()) {
  addMessageToPage('location_hash', window.location.hash);
  addMessageToPage('location_search', window.location.search);

  // We currently only process tokens with implicit flow.
  // For PKCE or authorization_code flow, the code will be left in the URL
  if (window.location.hash.indexOf('id_token') >= 0) {
    authClient.token.parseFromUrl()
      .then(function (res) {
        addTokensToPage(res.tokens);
      })
      .catch(function (err) {
        addMessageToPage('oidc_error', JSON.stringify(err));
      });
  }
}