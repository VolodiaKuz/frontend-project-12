const host = '/api/v1';

const routes = {
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  page404: () => '*',
  login: () => [host, 'login'].join('/'),
  signup: () => [host, 'signup'].join('/'),
  channels: () => [host, 'channels'].join('/'),
  editChannel: (id) => [host, 'channels', id].join('/'),
  messages: () => [host, 'messages'].join('/'),
  editMessages: (id) => [host, 'messages', id].join('/'),
};

export default routes;
