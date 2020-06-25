
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

### Instância API
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
        
        
            
            



