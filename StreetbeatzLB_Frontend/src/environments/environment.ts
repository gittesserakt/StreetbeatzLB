export const environment = {
  production: true,
  auth0: {
    domain: 'dev-decl55hw5iibzttr.eu.auth0.com',
    clientId: 'PVLubF1ASpXIGc69aZANFwzWH4iLU0mj',
    authorizationParams: {
      audience: 'https://streetbeatzlb.de/auth/api',
      redirect_uri: '${DOMAIN}${BASE_HREF}',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: '${DOMAIN}${BASE_HREF}/api',
  },
};
