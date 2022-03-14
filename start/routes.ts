import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController';

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');
Route.get('/me', 'AuthController.me').middleware('auth');
