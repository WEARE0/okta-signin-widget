const getOktaSignIn = async (config) => {
  // CDN bundle is added via script tag
  if (window.OktaSignIn) {
    return new window.OktaSignIn(config);
  }

  const OktaSignIn = (await import('@okta/okta-signin-widget')).default;
  return new OktaSignIn(config);
}

export default getOktaSignIn;
