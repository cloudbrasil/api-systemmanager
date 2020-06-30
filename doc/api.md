<a name="API"></a>

## API
Class API

**Kind**: global class  
<a name="new_API_new"></a>

### new API([options])
Options for constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Options to new instance |
| [options.auth] | <code>object</code> |  | Options to authentication |
| options.auth.type | <code>string</code> | <code>null</code> | Type (apikey or userpassword) |
| [options.auth.credentials] | <code>object</code> |  | Credentials to login SM |
| options.auth.credentials.username | <code>string</code> | <code>null</code> | Credentials to login SM |
| options.auth.credentials.password | <code>string</code> | <code>null</code> | Credentials to login SM |
| options.auth.credentials.session | <code>string</code> | <code>null</code> | Session started by social login |
| options.auth.credentials.apikey | <code>string</code> | <code>null</code> | Session started by social login |
| options.attemptsRetry | <code>string</code> | <code>3</code> | Number of login attempts |
| options.httpStatusToRetry | <code>string</code> | <code>&quot;[401&quot;</code> | HTTP status to retry login |
| options.uri | <code>string</code> | <code>&quot;http://127.0.0.1:8080&quot;</code> | Address of the server |
| [options.debug] | <code>object</code> |  | Enable debug of requisitions |
| options.debug.success | <code>boolean</code> | <code>true</code> | Enable debug success |
| options.debug.error | <code>boolean</code> | <code>true</code> | Enable debug error |

**Example**  
```js
const params = {
  auth: {
    type: 'apikey',
    credentials: {
      key: '36371923-27dc-4d30-b666-7fc4ecead925'
    }
  },
  url: 'http://cloudbrasil.com.br'
};

const API = require('@docbrasil/api-systemmanager');
const api = new API(params);
```
root@thiago:~/Projetos/Empregonet/api-systemmanager/api# jsdoc2md ../index.js 
<a name="API"></a>

## API
Class API

**Kind**: global class  
<a name="new_API_new"></a>

### new API([options])
Options for constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Options to new instance |
| [options.auth] | <code>object</code> |  | Options to authentication |
| options.auth.type | <code>string</code> | <code>null</code> | Type (apikey or userpassword) |
| [options.auth.credentials] | <code>object</code> |  | Credentials to login SM |
| options.auth.credentials.username | <code>string</code> | <code>null</code> | Credentials to login SM |
| options.auth.credentials.password | <code>string</code> | <code>null</code> | Credentials to login SM |
| options.auth.credentials.session | <code>string</code> | <code>null</code> | Session started by social login |
| options.auth.credentials.apikey | <code>string</code> | <code>null</code> | Session started by social login |
| options.attemptsRetry | <code>string</code> | <code>3</code> | Number of login attempts |
| [options.httpStatusToRetry] | <code>array</code> | <code>[401]</code> | HTTP status to retry login |
| options.uri | <code>string</code> | <code>&quot;http://127.0.0.1:8080&quot;</code> | Address of the server |
| [options.debug] | <code>object</code> |  | Enable debug of requisitions |
| options.debug.success | <code>boolean</code> | <code>true</code> | Enable debug success |
| options.debug.error | <code>boolean</code> | <code>true</code> | Enable debug error |

**Example**  
```js
const params = {
  auth: {
    type: 'apikey',
    credentials: {
      key: '36371923-27dc-4d30-b666-7fc4ecead925'
    }
  },
  url: 'http://cloudbrasil.com.br'
};

const API = require('@docbrasil/api-systemmanager');
const api = new API(params);
```
