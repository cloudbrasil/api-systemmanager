## Classes

<dl>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Api dispatch manager</p>
</dd>
<dt><a href="#External">External</a></dt>
<dd><p>Class for documents, permission user</p>
</dd>
<dt><a href="#Login">Login</a></dt>
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
    * [.getContext(url, session)](#Dispatch+getContext) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getClient()](#Dispatch+getClient) ⇒ <code>promise</code>

<a name="Dispatch+getContext"></a>

### dispatch.getContext(url, session) ⇒ <code>Promise.&lt;object&gt;</code>
Get the URL context

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The full data context of the URL  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | Full url |
| session | <code>session</code> | <code></code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const retContext = await api.dispatch.getContext('http://myndware.io/login/myorg);
```
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
<a name="External"></a>

## External
Class for documents, permission user

**Kind**: global class  

* [External](#External)
    * [.context(params)](#External+context) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>array.&lt;object&gt;</code>
    * [.getUploadDocumentSignedUrl(mime, authorization)](#External+getUploadDocumentSignedUrl) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.handle(authorization, params)](#External+handle) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="External+context"></a>

### external.context(params) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>array.&lt;object&gt;</code>
Create new document

**Kind**: instance method of [<code>External</code>](#External)  
**Returns**: <code>Promise.&lt;object&gt;</code> - data<code>string</code> - _id the id of the form<code>string</code> - orgId the organization id of the form<code>string</code> - authorization the unique token registered internally by the system for all the next calls to the external form APIs
     The authorization is unique and is ONLY valid for this session.<code>array.&lt;object&gt;</code> - groups the form groups to render  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object for add new document |
| params.id | <code>string</code> | Organization form id |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '611e679741cc63168c26d7ee'
};
const retForm = await api.external.context(params);
```
<a name="External+getUploadDocumentSignedUrl"></a>

### external.getUploadDocumentSignedUrl(mime, authorization) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Get an upload signed url, so it will be possible to upload documents temporarily during the use of the external form

**Kind**: instance method of [<code>External</code>](#External)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc<code>string</code> - doc.mime the original mime type of the document<code>string</code> - doc.signedUrl the signed url to upload the document<code>string</code> - doc.filename  the filename of the uploaded file<code>string</code> - doc.extension  the extension of the filename, obtained from the mime type  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| mime | <code>string</code> | the mime type of the document |
| authorization | <code>string</code> | a legal authorization |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const authorization = '...';
const doc = {
 mime: 'application/pdf'
};
const retDoc = await api.external.getUploadDocumentSignedUrl(doc, authorization);
```
<a name="External+handle"></a>

### external.handle(authorization, params) ⇒ <code>Promise.&lt;boolean&gt;</code>
Handles the execution of an external form

**Kind**: instance method of [<code>External</code>](#External)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - true|false if success  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| authorization | <code>string</code> | a legal authorization |
| params | <code>object</code> | the parameters to handle the execution of an external form |
| params.payload | <code>array.&lt;object&gt;</code> | the payload of the external form. It should represent the form groups of the external form |
| params.payload.name | <code>string</code> | the name of the group |
| params.payload.fields | <code>array.&lt;object&gt;</code> | the fields that belong to each group |
| params.payload.fields.value | <code>\*</code> \| <code>Object</code> | besides all the data inside a field, it should have the value of the the field |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const authorization = '...';
const params = {
 payload: [
     {
         name: 'My Group One',
         fields: [
             {}
         ]
     }
 ]
};
const success = await api.external.handle(params, authorization);
```
<a name="Login"></a>

## Login
Login manager

**Kind**: global class  

* [Login](#Login)
    * [.facebook(params)](#Login+facebook) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
    * [.google(params)](#Login+google) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
    * [.apiKey(apikey)](#Login+apiKey) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
    * [.userPass(params)](#Login+userPass) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
    * [.logout(session)](#Login+logout) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>
    * [.recover(username)](#Login+recover) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>

<a name="Login+facebook"></a>

### login.facebook(params) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
Login with social login Facebook

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>object</code> - data.auth true or false if we have the user authenticaited correctly<code>object</code> - data.user the logged user  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to login Facebook |
| params.accessToken | <code>string</code> | Access token of the system manager |
| params.initialUserData | <code>object</code> | Object with roles default if sigin |
| params.initialUserData.externalRoles | <code>array</code> | Array with permission of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const params = { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cC...' };
const { auth, user } = await api.login.facebook(params);
```
<a name="Login+google"></a>

### login.google(params) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
Login with social login Google

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>object</code> - data.auth true or false if we have the user authenticaited correctly<code>object</code> - data.user the logged user  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to login Google |
| params.accessToken | <code>string</code> | Access token of the system manager |
| params.initialUserData | <code>object</code> | Object with roles default if sigin |
| params.initialUserData.externalRoles | <code>array</code> | Array with permission of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
const { auth, user } = await api.login.google(accessToken);
```
<a name="Login+apiKey"></a>

### login.apiKey(apikey) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
Login with apikey

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>object</code> - data.auth true or false if we have the user authenticaited correctly<code>object</code> - data.user the logged user  
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
const { auth, user } = await api.login.apiKey(apiKey);
```
<a name="Login+userPass"></a>

### login.userPass(params) ⇒ <code>promise.&lt;object&gt;</code> \| <code>object</code> \| <code>object</code>
Login with user and password

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>object</code> - data.auth true or false if we have the user authenticaited correctly<code>object</code> - data.user the logged user  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with user and password |
| params.username | <code>string</code> | Username or email of the user |
| params.password | <code>string</code> | Password of the user |
| params.orgname | <code>string</code> | The organame of the user |

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
const { auth, user } = await api.login.userPass(params);
```
<a name="Login+logout"></a>

### login.logout(session) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>
Logout user system manager

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - } data<code>boolean</code> - data.success true|false  
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
const { success } = await api.login.logout(session);
```
<a name="Login+recover"></a>

### login.recover(username) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>
Recover the password

**Kind**: instance method of [<code>Login</code>](#Login)  
**Returns**: <code>promise.&lt;object&gt;</code> - } data<code>boolean</code> - data.success true|false  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | The username or email |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');

// Params of the instance
const params = {...}
const api = new API(params);
const { success } = await api.login.recover('myusername');
```
<a name="Session"></a>

## Session
Session manager of the API

**Kind**: global class  
<a name="Session+information"></a>

### session.information(sessionId, suSessionId) ⇒ <code>Promise</code>
Show information for session, thus validating the session (Valid token JWT)

**Kind**: instance method of [<code>Session</code>](#Session)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sessionId | <code>string</code> |  | The user session (JWT Token) |
| suSessionId | <code>string</code> | <code>&quot;sessionId&quot;</code> | Given a JWT Token of a SU (SuperAdmin), allow to check session for another user. |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const sessionId = 'eyJhbFVBBiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const suSessionId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.session.information(sessionId, suSessionId);
```
