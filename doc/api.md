
### Introdução

**api-systemmanager** <p>Vamos descrever todos os methods utilizados na API. o que você precisa entender para usar é que cada method tem um contexto, facilitando assim o entendimento de cada contexto, e podendo ter uma linguagem ubiqua em cada contexto, então fique atendo ao contexto.</p>
<p>Vamos descrever todos os contextos dentro da API e logo abaixo os methods que fazem parte de cada conexto.</p>

* access
* dispatch
* documents
* forms
* lists
* tasks
* users

<p>Abaixo vamos descrever como se utiliza um contexto, porém você ter que ter uma instância da API fazendo:</p>

```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();

// Exemplo de uso.
api.access.loginSU();
api.access.logoutSU();
```

## Instância API
### `new APISystemManager(options)`
Abaixo vamos falar das opções que possam ser passadas no construtor;

- `options` - configurações opcinal:
    - `auth` - Objeto contento o tipo de autenticação do ***SU (Super usuário)*** pode ser por APIKEY ou usuário e senha.
        - `type` - Tipo autenticação `apikey` ou `userpassword` o padrão é `apikey`
        - `credentials` - Credenciais utilizadas para fazer login
            - `username` - Username caso estiver utilizando uma autenticação `userpassword`
            - `password` - Senha caso estiver utilizando uma autenticação `userpassword`
            - `apikey` - APIKEY caso estiver utilizando uma autenticação `apikey`
    - `uri` - Endereço do servidor exemplo: `https://cloudbrasil.com:8080` padrão é `http://127.0.0.1:8080`
    - `attemptsRetry` - Número máximo de tentativas que vamos fazer em um login de SU padrão `3`.
    - `httpStatusToRetry` - Os status HTTP para refazer uma autenticação de SU novamemnte padrão `[401]`
    - `debug` - Habilita o debug das chamadas
        - `success` - `true` ou `false`  Habilita debug quando uma chamada com sucesso, padrão `true`
        - `error` - `true` ou `false`  Habilita debug quando uma chamada com erro, padrão `true`
        
## Módulo access
### `loginSU()` - **async**
Método para fazer o login no system manager, para executar as chamadas a API, sempre que iniciar
a api chame este méthodo para criar a sessão com o system manager

#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();

await api.access.loginSU();
````

### `logoutSU()` - **async**
Método para fazer o logout no system manager, ***cuidado ao chamar esse method você está finalizando
a sessão do super usuário com o system manager*** e todas as chamadas não irá mais funcionar;

#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();

await api.access.logoutSU();
````
### `loginUser(params)` - **async**
Método para fazer o login de usuáriono system manager, podendo ser utilizado
como login usuario e senha, Facebook ou Google.

- `params` - Parâmetros passados ao method para fazer o login
    - `network` - Informativo dos credencias da rede `empregonet`, `google` ou `facebook`
    - `credentials` - Credenciais utilizadas no login.
        - `username` - Email do usuário `requerido na rede empregonet`
        - `password` - Senha do usuário `requerido na rede empregonet`
        - `accessToken` - Login com redes sociais `requerido na rede facebook e google`
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
const login = {
  username: 'ana.breda@gmail.com',
  password: '123456',
  network: 'empregonet'
};

await api.access.loginUser(login);
```

### `logoutUser(accessToken)` - **async**
Método para fazer o logout do usuário no system manager, muito utilizado quando se tem usuários externos no SM e o usuário faz
logout do frontend

- `accessToken` - É o sessionId (Token JWT)

#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
await api.access.logoutUser(accessToken);
```
            
            



