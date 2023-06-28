export const environment = {
  production: true,
  auth0: {
    domain: '${AUTH0_DOMAIN}', // dev-decl55hw5iibzttr.eu.auth0.com
    clientId: '${AUTH0_CLIENT_ID}', // PVLubF1ASpXIGc69aZANFwzWH4iLU0mj
    authorizationParams: {
      audience: '${AUTH0_AUDIENCE}', // https://streetbeatzlb.de/auth/api
      redirect_uri: '${DOMAIN}${BASE_HREF}',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: '${DOMAIN}${BASE_HREF}/api',
  },
};
