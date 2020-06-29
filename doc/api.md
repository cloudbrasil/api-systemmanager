
### Introdução

**api-systemmanager** <p>Vamos descrever todos os methods utilizados na API. o que você precisa entender para usar é que cada method tem um contexto, facilitando assim o entendimento de cada contexto, e podendo ter uma linguagem ubiqua em cada contexto, então fique atendo ao contexto.</p>
<p>Vamos descrever todos os contextos dentro da API e logo abaixo os methods que fazem parte de cada conexto.</p>

 - [Módulo Acesso](#módulo-access)
 - [Módulo Dispatch](#módulo-dispatch)
 - [Módulo Documentos](#módulo-documentos)
 - [Módulo Formulários](#módulo-forms)
 - [Módulo Listas](#módulo-lists) 
 - [Módulo Plugins](#módulo-plugins)
 - [Módulo Políticas de segurança](#módulo-policies)
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
        - `accessToken` - Login com redes sociais `requerido na rede facebook e google`.
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

- `accessToken` - É o sessionId (Token JWT). `requerido`

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

<!-- MODULO DOCUMENTOS -->
      
## Módulo documentos

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

### `getById(docId)` - **async**
Requisita um documento pelo id (_id mongo) do documento, nele traz toda a estrutura do documento
dados e campos.

- `docId` - ID do documumento `requerido`
 
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();

const docId = '5d1bc97da965b23a4a0f9644';
await api.document.autoComplete(docId);
```

### `getSignedUrl(params)` - **async**
Requisita uma URL do buscket empregonet da AWS (Amazon).

- `params` - Objecto para requisitar uma URL assinada.
    - `methodType` - Tipo de reuquisição para bucket `get`ou `put` `requerido`.
    - `docId` - ID do documento `requerido`.
    - `docAreaId` - ID da doc área que está associado o documento.
    - `type` - Mimetype do documento (image/png, image/jpg...) `requerido`
    - `document` - Docuemnto (utilizado na requisição get); `requerido no method get`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
// Exemplo utilizando URL assinada method PUT.
const params = {
  methodType: 'put',
  docId: '5edf86fbe896b817e45b8da6',
  fileName: 'foto',
  docAreaId: '5edf9f8ee896b817e45b8dac',
  type: 'image/png',
};
await api.document.autoComplete(params);
```

### `createCV(params)` - **async**
Cria um documento no system manager, do tipo currículum.

- `params` - Objecto para criar um documento tipo currículo.
    - `userId` - ID do usuário que ficará associado ao documento. `requerido`
    - `docId` - ID do documento `requerido`.
    - `name` - Nome do documento. `requerido`
    - `docTypeId` - ID do tipo do documento. `requerido`
    - `areaId` - ID da doc área que o documento está associado. `requerido`
    - `type` - Mimetype do documento (image/png, image/jpg...) `requerido`
    - `signedUrl` - URL assinada do bucket AWS. `requerido`
    - `bytes` -  Tamanho do arquivo em bytes. `requerido`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
// Exemplo utilizando URL assinada method PUT.
const params = {
  userId = '5739d4c6ccb0ebc61f2a9557',  
  docId: '5edf86fbe896b817e45b8da6',
  name: 'foto',
  docTypeId = '5edf9f8ee896b817e45b8dac',  
  areaId = '1abcdf8ee896b817e45b8dac',  
  type: 'image/png',
  signedUrl: 'https://aws...',
  byes: 1234
};
await api.document.createCV(params);
```

### `removeCV(docId)` - **async**
Remove um documento no system manager, do tipo currículum.

- `docId` - ID do documumento `requerido`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
const docId = '5edf86fbe896b817e45b8da6';
await api.document.removeCV(docId);
```

<!-- MODULO FORMS -->
      
## Módulo forms

Módulo responsável por gerenciar formulários no System manager.

### `getById(formId)` - **async**
Solicita um formulário pelo ID, é o schema que o form builder gera do Quasar.

- `formId` - ID do formulário `requerido`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
const formId = '5739d4c6ccb0ebc61f2a9557';
await api.forms.getById(formId);
```

<!-- MODULO LISTS -->
      
## Módulo lists

Módulo responsável por gerenciar listas no System manager.

### `getById(lisId)` - **async**
Solicita uma lista pelo ID.

- `listId` - ID da lista `requerido`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
const formId = '5739d4c6ccb0ebc61f2a9557';
await api.lists.getById(listId);
```

### `getAll(params)` - **async**
Solicita todas as listas cadastradas no system manager;

- `params` - Parametros para solicitar todas listas cadastradas no SM `opcional`
    - `page` - Página inicial `opcional, default é 0`
    - `perPage` - Quantidade de registro por página `opcional, default é 200`

#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
await api.lists.getAll();
```

<!-- MODULO PLUGINS -->
      
## Módulo plugins

Módulo responsável por gerenciar plugins no System manager.

### `getById(pluginId)` - **async**
Solicita uma lista pelo ID.

- `pluginId` - ID do plugin `requerido`
    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
const formId = '5739d4c6ccb0ebc61f2a9557';
await api.plugins.getById(pluginId);
```

<!-- MODULO POLICIES -->
      
## Módulo policies

Módulo responsável por gerenciar politicas de segurança de entrada e saída.

### `getAll()` - **async**
Solicita todas as políticas de segurança, é uma reuquisão que baixa o banco de dados de políticas e 
utiliza em conjunto com o PEP localmente para rodar a política.

    
#### Exemplo de uso
```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
 
await api.policies.getAll();
```