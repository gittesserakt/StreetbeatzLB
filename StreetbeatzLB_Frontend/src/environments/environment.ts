export const environment = {
  production: true,
  auth0: {
    domain: 'dev-decl55hw5iibzttr.eu.auth0.com',
    clientId: 'PVLubF1ASpXIGc69aZANFwzWH4iLU0mj',
    authorizationParams: {
      audience: 'https://streetbeatzlb.de/auth/api',
      redirect_uri: 'http://localhost:4200/',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:8080/streetbeatzlb/api',
  },
};
