## Classes

<dl>
<dt><a href="#Access">Access</a></dt>
<dd><p>Class for access</p>
</dd>
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd></dd>
<dt><a href="#Documents">Documents</a></dt>
<dd><p>Class for documents</p>
</dd>
<dt><a href="#Forms">Forms</a></dt>
<dd><p>Class for forms</p>
</dd>
<dt><a href="#Lists">Lists</a></dt>
<dd><p>Class for lists</p>
</dd>
<dt><a href="#Plugins">Plugins</a></dt>
<dd><p>Class for plugins</p>
</dd>
<dt><a href="#Lists">Lists</a></dt>
<dd><p>Class for lists</p>
</dd>
<dt><a href="#Proccess">Proccess</a></dt>
<dd><p>Class for proccess</p>
</dd>
<dt><a href="#Tasks">Tasks</a></dt>
<dd><p>Class for tasks</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>Class for users</p>
</dd>
</dl>

<a name="Access"></a>

## Access
Class for access

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Access](#Access)
    * [new Access(options)](#new_Access_new)
    * [.loginSU()](#Access+loginSU) ⇒ <code>promise</code>
    * [.logoutSU()](#Access+logoutSU) ⇒ <code>promise</code>
    * [.loginUser(params)](#Access+loginUser) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.logoutUser()](#Access+logoutUser) ⇒ <code>promise</code>

<a name="new_Access_new"></a>

### new Access(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="Access+loginSU"></a>

### access.loginSU() ⇒ <code>promise</code>
Start login super user in system manager

**Kind**: instance method of [<code>Access</code>](#Access)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Access+logoutSU"></a>

### access.logoutSU() ⇒ <code>promise</code>
Logout super user system manager

**Kind**: instance method of [<code>Access</code>](#Access)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Access+loginUser"></a>

### access.loginUser(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
**Kind**: instance method of [<code>Access</code>](#Access)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to make login |
| params.network | <code>string</code> | Login in network (facebook || google || empregonet) |
| params.payload | <code>object</code> | User data |
| params.payload.username | <code>string</code> | Username of the user |
| params.payload.password | <code>string</code> | Password of the user |
| params.payload.accessToken | <code>string</code> | AccessToken "prelogin" FB or Google |

<a name="Access+logoutUser"></a>

### access.logoutUser() ⇒ <code>promise</code>
Logout super user system manager

**Kind**: instance method of [<code>Access</code>](#Access)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Dispatch"></a>

## Dispatch
**Kind**: global class  

* [Dispatch](#Dispatch)
    * [new Dispatch(options)](#new_Dispatch_new)
    * [.getOrgId()](#Dispatch+getOrgId) ⇒ <code>string</code>
    * [.getSession()](#Dispatch+getSession) ⇒ <code>string</code>
    * [.cleanSession()](#Dispatch+cleanSession)
    * [.getClient()](#Dispatch+getClient) ⇒ <code>string</code>
    * [.sessionIsValid()](#Dispatch+sessionIsValid) ⇒ <code>string</code>

<a name="new_Dispatch_new"></a>

### new Dispatch(options)
Options for constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options to new instance |
| options.parent | <code>object</code> | This of the parent |

<a name="Dispatch+getOrgId"></a>

### dispatch.getOrgId() ⇒ <code>string</code>
Get organization id

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>string</code> - return orgId  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Dispatch+getSession"></a>

### dispatch.getSession() ⇒ <code>string</code>
Get session id JWT

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>string</code> - return session JWT  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Dispatch+cleanSession"></a>

### dispatch.cleanSession()
Clean session id JWT

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Dispatch+getClient"></a>

### dispatch.getClient() ⇒ <code>string</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>string</code> - return client axios  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Dispatch+sessionIsValid"></a>

### dispatch.sessionIsValid() ⇒ <code>string</code>
Get client Axios

**Kind**: instance method of [<code>Dispatch</code>](#Dispatch)  
**Returns**: <code>string</code> - return client axios  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Documents"></a>

## Documents
Class for documents

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Documents](#Documents)
    * [new Documents(options)](#new_Documents_new)
    * [.autoComplete(params)](#Documents+autoComplete) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getById(id)](#Documents+getById) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getSignedUrl(params)](#Documents+getSignedUrl) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.createCV(params)](#Documents+createCV) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.removeCV(id)](#Documents+removeCV) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Documents_new"></a>

### new Documents(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Documents+autoComplete"></a>

### documents.autoComplete(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Object with params |
| params.index | <code>string</code> | Field to search ex: extraCityname |
| params.txtToSearch | <code>string</code> | Text to search ex: são |
| params.docId | <code>string</code> | Document id for serach |
| params.docAreaId | <code>string</code> | docArea id |
| params.tag | <code>string</code> | Tag of the document |
| params.projection | <code>string</code> | Projection to return fields |

<a name="Documents+getById"></a>

### documents.getById(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get document by id database

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | document id |

<a name="Documents+getSignedUrl"></a>

### documents.getSignedUrl(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
Request signed url url to put or get

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.methodType | <code>string</code> | Method type HTTP get or put |
| params.docId | <code>string</code> | Document id |
| params.fileName | <code>string</code> | File name |
| params.docAreaId | <code>string</code> | docAreaId of the document |
| params.type | <code>string</code> | mimeType image/png image/jpg others |
| params.document | <code>string</code> | Name document to request |

<a name="Documents+createCV"></a>

### documents.createCV(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
Create document

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to create document |
| params.docId | <code>string</code> | Document id |
| params.name | <code>string</code> | File name |
| params.areaId | <code>string</code> | Docarea id |
| params.type | <code>string</code> | Mimetype of the file |
| params.signedUrl | <code>string</code> | SignedURL AWS |
| params.filename | <code>string</code> | File name |
| params.bytes | <code>number</code> | Size file |

<a name="Documents+removeCV"></a>

### documents.removeCV(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
Remove document tipo curriculo

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the document to remove |

<a name="Forms"></a>

## Forms
Class for forms

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Forms](#Forms)
    * [new Forms(options)](#new_Forms_new)
    * [.getById(id)](#Forms+getById) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Forms_new"></a>

### new Forms(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Forms+getById"></a>

### forms.getById(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get advance form by ID

**Kind**: instance method of [<code>Forms</code>](#Forms)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id form in mongodb |

<a name="Lists"></a>

## Lists
Class for lists

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Lists](#Lists)
    * [new Lists(options)](#new_Lists_new)
    * [new Lists(options)](#new_Lists_new)
    * [.getById(id)](#Lists+getById) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getAll(params)](#Lists+getAll) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getAll()](#Lists+getAll) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Lists_new"></a>

### new Lists(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="new_Lists_new"></a>

### new Lists(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Lists+getById"></a>

### lists.getById(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get list by ID

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id form in mongodb |

<a name="Lists+getAll"></a>

### lists.getAll(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get all lists

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to pagination |
| params.page | <code>number</code> | Current page to pagination |
| params.perPage | <code>number</code> | Qnt itens per page |

<a name="Lists+getAll"></a>

### lists.getAll() ⇒ <code>Promise.&lt;unknown&gt;</code>
Get all policies

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Plugins"></a>

## Plugins
Class for plugins

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Plugins](#Plugins)
    * [new Plugins(options)](#new_Plugins_new)
    * [.getById([id])](#Plugins+getById) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Plugins_new"></a>

### new Plugins(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Plugins+getById"></a>

### plugins.getById([id]) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get plugins by id database

**Kind**: instance method of [<code>Plugins</code>](#Plugins)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>object</code> | <code>{nome:&#x27;thiago&#x27;\,sobrenome:&#x27;Anselmo&#x27;}</code> | Id form in mongodb |

**Example**  
```js
const API = new API();

const id = '234r5t6y78i923456789';
await API.getById(id);
```
<a name="Lists"></a>

## Lists
Class for lists

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Lists](#Lists)
    * [new Lists(options)](#new_Lists_new)
    * [new Lists(options)](#new_Lists_new)
    * [.getById(id)](#Lists+getById) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getAll(params)](#Lists+getAll) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.getAll()](#Lists+getAll) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Lists_new"></a>

### new Lists(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="new_Lists_new"></a>

### new Lists(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Lists+getById"></a>

### lists.getById(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get list by ID

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id form in mongodb |

<a name="Lists+getAll"></a>

### lists.getAll(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get all lists

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to pagination |
| params.page | <code>number</code> | Current page to pagination |
| params.perPage | <code>number</code> | Qnt itens per page |

<a name="Lists+getAll"></a>

### lists.getAll() ⇒ <code>Promise.&lt;unknown&gt;</code>
Get all policies

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  
<a name="Proccess"></a>

## Proccess
Class for proccess

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Proccess](#Proccess)
    * [new Proccess(options)](#new_Proccess_new)
    * [.startProcess(params)](#Proccess+startProcess) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Proccess_new"></a>

### new Proccess(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Proccess+startProcess"></a>

### proccess.startProcess(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
**Kind**: instance method of [<code>Proccess</code>](#Proccess)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to start proccess |
| params.proccesId | <code>string</code> | ProcessId is id proccess in mongodb |
| params.payload | <code>object</code> | Payload start process |

<a name="Tasks"></a>

## Tasks
Class for tasks

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Tasks](#Tasks)
    * [new Tasks(options)](#new_Tasks_new)
    * [.listAll(id)](#Tasks+listAll)
    * [.getById(params)](#Tasks+getById) ⇒ <code>promise</code>
    * [.update()](#Tasks+update) ⇒ <code>Promise.&lt;unknown&gt;</code>

<a name="new_Tasks_new"></a>

### new Tasks(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Tasks+listAll"></a>

### tasks.listAll(id)
List all task by userId

**Kind**: instance method of [<code>Tasks</code>](#Tasks)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | user id |

<a name="Tasks+getById"></a>

### tasks.getById(params) ⇒ <code>promise</code>
Method to get one tasks by task id and process id

**Kind**: instance method of [<code>Tasks</code>](#Tasks)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get one task |
| params.processId | <code>object</code> | Proccess id |
| params.taskId | <code>object</code> | Task id |

<a name="Tasks+update"></a>

### tasks.update() ⇒ <code>Promise.&lt;unknown&gt;</code>
Update task

**Kind**: instance method of [<code>Tasks</code>](#Tasks)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params.userId | <code>object</code> | User id |
| params.processId | <code>string</code> | Proccess id |
| params.taskId | <code>string</code> | Task id |
| params.flowName | <code>string</code> | Flow name |
| params.action | <code>string</code> | Button action (Reject, approved, revised) |
| params.formData | <code>string</code> | Data change of th user |
| params.actionGuid | <code>string</code> | GUID of the action |

<a name="Users"></a>

## Users
Class for users

**Kind**: global class  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

* [Users](#Users)
    * [new Users(options)](#new_Users_new)
    * [.getProfile(id)](#Users+getProfile) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.updatePassword(params)](#Users+updatePassword) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.isunique(params, params)](#Users+isunique)

<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructot |
| options.parent | <code>object</code> | This of the pararent |

<a name="Users+getProfile"></a>

### users.getProfile(id) ⇒ <code>Promise.&lt;unknown&gt;</code>
**Kind**: instance method of [<code>Users</code>](#Users)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | User id in mongodb |

<a name="Users+updatePassword"></a>

### users.updatePassword(params) ⇒ <code>Promise.&lt;unknown&gt;</code>
**Kind**: instance method of [<code>Users</code>](#Users)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update password |
| params.id | <code>string</code> | Id of the user |
| params.oldPassword | <code>string</code> | Old password |
| params.newPassword | <code>string</code> | New password |

<a name="Users+isunique"></a>

### users.isunique(params, params)
Check if value is unique

**Kind**: instance method of [<code>Users</code>](#Users)  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update password |
| params.field | <code>string</code> | Field to check |
| params.query | <code>string</code> | Query to search |
| params |  |  |

