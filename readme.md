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

