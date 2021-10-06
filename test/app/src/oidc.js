function _initialize(event) {
  event.preventDefault();
  var config = JSON.parse(document.getElementById('config-textarea').value);
  initialize(config);
}

var CONFIG = {
  baseUrl: 'https://oswtests.oktapreview.com',
  // SPA clientId
  clientId: '0oaw0yek68Swxseof0h7',
  redirectUri: 'http://localhost:3000/done',
  authParams: {
    pkce: false,
    issuer: 'https://oswtests.oktapreview.com/oauth2/default',
    responseType: 'id_token',
    scopes: ['openid', 'email', 'profile', 'address', 'phone']
  },
  idps: [
    {
      'type': 'FACEBOOK',
      'id': '0oa85bk5q6KOPeHCT0h7'
    }
  ]
}

document.addEventListener('DOMContentLoaded', function() {
  var formattedConfig = JSON.stringify(CONFIG, null, 2);
  formattedConfig = formattedConfig.replace(/\n/g, '\r\n');
  document.getElementById('config-textarea').value = formattedConfig;
  document.getElementById('init-button').addEventListener('click', _initialize, false);
});




var CONTAINER_ID = 'okta-login-container';

function addMessageToPage(id, msg) {
  var containerNode = document.getElementById(CONTAINER_ID);
  if (containerNode) {
    containerNode.remove();
  }

  var appNode = document.createElement('div');
  appNode.setAttribute('id', id);
  appNode.innerHTML = msg;
  document.body.appendChild(appNode);
}

function replaceMessageOnPage(id, msg) {
  var containerNode = document.getElementById(id);
  if (containerNode) {
    containerNode.remove();
  }

  var appNode = document.createElement('div');
  appNode.setAttribute('id', id);
  appNode.innerHTML = msg;
  document.body.appendChild(appNode);
}

function initialize(options) {

  replaceMessageOnPage('csp-errors', globalCspTrap.map( function(err) { 
    return err.blockedURI + " blocked due to CSP rule " + err.violatedDirective + " from " + err.originalPolicy;
  }).join('')); 

  var oktaSignIn = new OktaSignIn(options);
  oktaSignIn.renderEl(
    { el: '#okta-login-container' },
    function (res) {
      if (res.status !== 'SUCCESS') {
        return;
      }
      
      var idToken = res.tokens.idToken;
      var accessToken = res.tokens.accessToken;

      if (idToken) {
        addMessageToPage('idtoken_user', idToken.claims.name);
      } 
      
      if (accessToken) {
        addMessageToPage('accesstoken_type', accessToken.tokenType);
      }
    },
    function (err) {
      addMessageToPage('oidc_error', JSON.stringify(err));
    }
  );
}

function triggerCspViolation() { 
  eval("var cspTrigger = true;");
}

if (window.location.search === '?fail-csp') { 
  try { 
    triggerCspViolation();
  } catch (e) { 
    console.warn(e);
  }
}

window.initialize = initialize;
