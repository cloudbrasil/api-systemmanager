
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

<!-- INTANCIA DA API -->

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

<!-- MODULO ACCESS -->

## Módulo access

Módulo para fazer chamadas de acesso, login do usuário SU que faz as chamadas internas no módulo, como login
dos usuários externos.

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

<!-- MODULO DISPATCH -->
      
## Módulo dispatch

Módulo responsável por fazer gerenciar as chamadas as API, este módulo ele tem um `interceptors` 
que é responsável por interceptar as chamadas a API, e quando recebe um HTTP status, `401` este
módulo refazer o login e refaz a chamada a API.

### `sessionIsValid()` - **async**
Method que verifica se o token é válido, se o token for válido retorna o token decodificado.

#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
await api.dispatch.logoutUser(accessToken);
```

<!-- MODULO DOCUMENTS -->
      
## Módulo dispatch

Módulo responsável por gerenciar documentos do system manager.

### `autoComplete(params)` - **async**
Method faz autocomplete dos dados, utilizado para buscar dados passando um texto para busca
utilizado muito quando se tem um grande volume de dados, exemplo buscar cidades estados do BR.

- `params` - Objeto contendo os itens para busca de autocomplete.
    - `index` - Nome do campo que será efetuado a busca. `requerido`
    - `txtToSearch` - Texto que será feito o regex no DB para efetuar o autocomplete. `requerido`
    - `docId` - ID do documento. `requerido`
    - `docAreaId` - ID da doc área que o doumento pertence. `requerido`
    - `tag` - Tag do documento. `requerido`
    - `projecttion` - String separado por `,` para retornar somente os campos desejados. `opcional` 
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();

const params = {
  index: 'extraCityname',
  txtToSearch: 'Palhoça',
  docId: '5e5945f650b526150f651717',
  docAreaId: '5db06b51f833e1047a27fd8b',
  tag: 'Nome da cidade',
  projection: 'extraCityname,extraStateabbreviation'
};

await api.document.autoComplete(params);
```




