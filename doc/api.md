<a name="API"></a>

## API
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

## Classes

<dl>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Api dispatch manager</p>
</dd>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Login manager</p>
</dd>
<dt><a href="#Session">Session</a></dt>
<dd><p>Session manager of the API</p>
</dd>
</dl>

<a name="Dispatch"></a>

## Dispatch
Api dispatch manager

**Kind**: global class  

* [Dispatch](#Dispatch)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [.getClient()](#Dispatch+getClient) ⇒ <code>promise</code>
    * [.facebook(accessToken)](#Dispatch+facebook)
    * [.google(accessToken)](#Dispatch+google)
    * [.apiKey(apikey)](#Dispatch+apiKey)
    * [.userPass(params)](#Dispatch+userPass)
    * [.logout(session)](#Dispatch+logout) ⇒ <code>promise</code>

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="Dispatch+getClient"></a>

### dispatch.getClient() ⇒ <code>promise</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>promise</code> - return client axios  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
await api.dispatch.getClient();
```
<a name="Dispatch+facebook"></a>

### dispatch.facebook(accessToken)
Login with social login Facebook

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.facebook(accessToken);
```
<a name="Dispatch+google"></a>

### dispatch.google(accessToken)
Login with social login Google

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.google(accessToken);
```
<a name="Dispatch+apiKey"></a>

### dispatch.apiKey(apikey)
Login with apikey

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | Access key |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
const retData = await api.login.apiKey(apiKey);
```
<a name="Dispatch+userPass"></a>

### dispatch.userPass(params)
Login with user and password

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with user and password |
| params.username | <code>string</code> | Username or email of the user |
| params.password | <code>string</code> | Password of the user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const params = {
  username: 'ana.silva@gmail.com',
  password: '123456'
};
const retData = await api.login.userPass(params);
```
<a name="Dispatch+logout"></a>

### dispatch.logout(session) ⇒ <code>promise</code>
Logout user system manager

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retData = await api.login.logout(session);
```
<a name="Dispatch"></a>

## Dispatch
Login manager

**Kind**: global class  

* [Dispatch](#Dispatch)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [.getClient()](#Dispatch+getClient) ⇒ <code>promise</code>
    * [.facebook(accessToken)](#Dispatch+facebook)
    * [.google(accessToken)](#Dispatch+google)
    * [.apiKey(apikey)](#Dispatch+apiKey)
    * [.userPass(params)](#Dispatch+userPass)
    * [.logout(session)](#Dispatch+logout) ⇒ <code>promise</code>

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="Dispatch+getClient"></a>

### dispatch.getClient() ⇒ <code>promise</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>promise</code> - return client axios  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
await api.dispatch.getClient();
```
<a name="Dispatch+facebook"></a>

### dispatch.facebook(accessToken)
Login with social login Facebook

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.facebook(accessToken);
```
<a name="Dispatch+google"></a>

### dispatch.google(accessToken)
Login with social login Google

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.google(accessToken);
```
<a name="Dispatch+apiKey"></a>

### dispatch.apiKey(apikey)
Login with apikey

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | Access key |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
const retData = await api.login.apiKey(apiKey);
```
<a name="Dispatch+userPass"></a>

### dispatch.userPass(params)
Login with user and password

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with user and password |
| params.username | <code>string</code> | Username or email of the user |
| params.password | <code>string</code> | Password of the user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const params = {
  username: 'ana.silva@gmail.com',
  password: '123456'
};
const retData = await api.login.userPass(params);
```
<a name="Dispatch+logout"></a>

### dispatch.logout(session) ⇒ <code>promise</code>
Logout user system manager

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retData = await api.login.logout(session);
```
<a name="Session"></a>

## Session
Session manager of the API

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
<a name="new_Session_new"></a>

### new Session(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

root@thiago:~/Projetos/Empregonet/api-systemmanager# jsdoc2md index.js api/*
## Classes

<dl>
<dt><a href="#API">API</a></dt>
<dd></dd>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Api dispatch manager</p>
</dd>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Login manager</p>
</dd>
<dt><a href="#Session">Session</a></dt>
<dd><p>Session manager of the API</p>
</dd>
</dl>

<a name="API"></a>

## API
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
<a name="Dispatch"></a>

## Dispatch
Api dispatch manager

**Kind**: global class  

* [Dispatch](#Dispatch)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [.getClient()](#Dispatch+getClient) ⇒ <code>promise</code>
    * [.facebook(accessToken)](#Dispatch+facebook)
    * [.google(accessToken)](#Dispatch+google)
    * [.apiKey(apikey)](#Dispatch+apiKey)
    * [.userPass(params)](#Dispatch+userPass)
    * [.logout(session)](#Dispatch+logout) ⇒ <code>promise</code>

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="Dispatch+getClient"></a>

### dispatch.getClient() ⇒ <code>promise</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>promise</code> - return client axios  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
await api.dispatch.getClient();
```
<a name="Dispatch+facebook"></a>

### dispatch.facebook(accessToken)
Login with social login Facebook

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.facebook(accessToken);
```
<a name="Dispatch+google"></a>

### dispatch.google(accessToken)
Login with social login Google

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.google(accessToken);
```
<a name="Dispatch+apiKey"></a>

### dispatch.apiKey(apikey)
Login with apikey

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | Access key |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
const retData = await api.login.apiKey(apiKey);
```
<a name="Dispatch+userPass"></a>

### dispatch.userPass(params)
Login with user and password

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with user and password |
| params.username | <code>string</code> | Username or email of the user |
| params.password | <code>string</code> | Password of the user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const params = {
  username: 'ana.silva@gmail.com',
  password: '123456'
};
const retData = await api.login.userPass(params);
```
<a name="Dispatch+logout"></a>

### dispatch.logout(session) ⇒ <code>promise</code>
Logout user system manager

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retData = await api.login.logout(session);
```
<a name="Dispatch"></a>

## Dispatch
Login manager

**Kind**: global class  

* [Dispatch](#Dispatch)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [.getClient()](#Dispatch+getClient) ⇒ <code>promise</code>
    * [.facebook(accessToken)](#Dispatch+facebook)
    * [.google(accessToken)](#Dispatch+google)
    * [.apiKey(apikey)](#Dispatch+apiKey)
    * [.userPass(params)](#Dispatch+userPass)
    * [.logout(session)](#Dispatch+logout) ⇒ <code>promise</code>

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="Dispatch+getClient"></a>

### dispatch.getClient() ⇒ <code>promise</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>promise</code> - return client axios  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
await api.dispatch.getClient();
```
<a name="Dispatch+facebook"></a>

### dispatch.facebook(accessToken)
Login with social login Facebook

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.facebook(accessToken);
```
<a name="Dispatch+google"></a>

### dispatch.google(accessToken)
Login with social login Google

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>string</code> | Access token of the system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const retData = await api.login.google(accessToken);
```
<a name="Dispatch+apiKey"></a>

### dispatch.apiKey(apikey)
Login with apikey

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | Access key |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
const retData = await api.login.apiKey(apiKey);
```
<a name="Dispatch+userPass"></a>

### dispatch.userPass(params)
Login with user and password

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with user and password |
| params.username | <code>string</code> | Username or email of the user |
| params.password | <code>string</code> | Password of the user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const params = {
  username: 'ana.silva@gmail.com',
  password: '123456'
};
const retData = await api.login.userPass(params);
```
<a name="Dispatch+logout"></a>

### dispatch.logout(session) ⇒ <code>promise</code>
Logout user system manager

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retData = await api.login.logout(session);
```
<a name="Session"></a>

## Session
Session manager of the API

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
<a name="new_Session_new"></a>

### new Session(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |
