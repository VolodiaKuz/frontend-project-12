const host = '/api/v1';

const routes = {
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  page404: () => '*',
  channels: () => [host, 'channels'].join('/'),
  editChannel: (id) => [host, 'channels', id].join('/'),
  messages: () => [host, 'messages'].join('/'),
};

export default routes;
