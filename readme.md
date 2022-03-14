## INICIANDO O PROJETO
```
npm init adonis-ts-app project-authentication

```
- Proximo passo API / NOME DO PROJETO / ESLINT FALSE

## INSTALANDO A CONEXÃO COM BANCO DE DADOS
```
npm i @adonisjs/lucid
```
- depois configurar
```
node ace configure @adonisjs/lucid
```
- depois selecionar o banco
```
MySQL / MariaDB
```
- Selecione o browser e pega o codigo abaixo:
```
DB_CONNECTION: Env.schema.string(),
```
- Coloque no env.ts
```
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  // colocar essa parte de baixo
  DB_CONNECTION: Env.schema.string(),
  MYSQL_HOST: Env.schema.string({ format: 'host' }),
  MYSQL_PORT: Env.schema.number(),
  MYSQL_USER: Env.schema.string(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string(),
})
```
- Depois incluir no .env( alterar apenas user/password/name )
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=XN3JmWtV6ZuEQM3waX6M1WFWiZcAnbg7
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=admin
MYSQL_DB_NAME=adonisjs-auth
```
## CRIAR O BANCO NO HEIDISQL

- Logar no heidisql e criar o banco de dados com o nome igual acima => adonisjs-auth
- Agora rodar 
```
$ node ace migration:run ou status
```
## AUTHENTICAÇÃO
> Rodar comando:
```
npm install @adonisjs/auth
```
>Configurar pacote:
```
node ace configure @adonissjs/auth
```
- Depois:  
- QUAL PROVEDOR DE AUTHENTICAÇÃO ? Lucid .
- QUAL TIPO DE AUTHENTICAÇÃO ? Api tokens(tokens - opacos) . 
- NOME DO MODEL? User . 
- IREMOS CRIAR UMA MIGRATION PARA USUARIOS?  Sim. 
- IREMOS GUARDA OS TOKENS?  Banco de dados. 
- CRIAR MIGRATION PARA GUARDAR OS TOKENS? Sim.
-  Depois só rodar o run e conferir no banco

## CRIAR UMA ROTA 
> Criar um controller
```
node ace make:controller Auth
```
- Depois add dois metodos
- Criar no routes.ts as rotas

> Rodar
```
node ace serve --watch
```
- Criar as request no insomia ( login, logout )
> Depois add dentro do metodo login:
```
  public async login({request}: HttpContextContract){
    const {email, password} = request.all();
    return {email, password}
  }
```
- Enviar no insonia email e senha em json
```
{
	"email": "silastj@hotmail.com",
	"password": "123456"
}
```
- Agora iremos enviar o auth
```
  public async login({request, auth}: HttpContextContract){
    const {email, password} = request.all();
    const token = await auth.attempt(email, password {
      expiresIn: '365 days'
    })
    return token;
  }
```
- Configurando o logout
```
  public async logout({auth}: HttpContextContract){
    await auth.logout();
  }
```
## CRIANDO UM SEEDER
```
node ace make:seeder UserSeeder
```
- Iremos importar o user
- Iremos criar o usuario, passando os valores
```
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeederSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      email: 'silastj@hotmail.com',
      password:'123456'
    })
  }
}

```
- Correto é rodar o run e depois o seeder para ele crear apenas uma vez.

> Depois iremos rodar esse comando
```
node ace db:seed
```
- Instalar o biblioteca de hash
```
npm i phc-argon2
```
- Depois só rodar node ace db:seed
- Vamos rodar o servidor
```
node ace serve --watch
```

> No insonia iremos usar o request Logout, sendo que iremos usar a aba header e colocar Authorization como chave e no valor bearer espaço mais o token criado no request login.

## CRIANDO ROTAS E RETORNANDO OS VALORES

- Criaremos um metodo me
- Criaremos as routas
- Depois no insonia criar uma request get e passar no headers o authorization e o bearer espaço mais o token

> OBS: eliminar o email ou senha do retorno é aplicar conforme abaixo 
- C:\AulasEAD\B7WebBonieky\adonisJS\adonisJSauthentication\project-authentication\app\Models\User.ts
```
  @column({ serializeAs: null })
  public password: string
```

## CRIANDO UM Middleware 
- É um codigo antes de entrar no controller
- Primeiro passo Registrar e depois usar
- No arquivo kernel.ts no final
```
Server.middleware.registerNamed({
auth: 'App/Middleware/Auth'
})
```

- Depois matar o servidor 
- Depois no metodo me, tirar o metodo authenticator e passar a responsabilidade para o middlare na routa do me conforme abaixo:
```
Route.get('/me', 'AuthController.me').middleware('auth');

```
