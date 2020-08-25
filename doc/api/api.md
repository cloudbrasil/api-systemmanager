## Classes

<dl>
<dt><a href="#Documents">Documents</a></dt>
<dd><p>Class for documents, permission admin</p>
</dd>
<dt><a href="#Form">Form</a></dt>
<dd><p>Class for forms, permission admin</p>
</dd>
<dt><a href="#Admin">Admin</a></dt>
<dd><p>API request, admin permission level</p>
</dd>
<dt><a href="#Lists">Lists</a></dt>
<dd><p>Class for lists, permission admin</p>
</dd>
<dt><a href="#Notification">Notification</a></dt>
<dd><p>Class for notification, permission admin</p>
</dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd><p>Class for plugin, permission admin</p>
</dd>
<dt><a href="#Policy">Policy</a></dt>
<dd><p>Class for policy, permission admin</p>
</dd>
<dt><a href="#Task">Task</a></dt>
<dd><p>Class for task, permission admin</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>Class for user, permission admin</p>
</dd>
<dt><a href="#Documents">Documents</a></dt>
<dd><p>Class for documents, permission user</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>API request, user permission level</p>
</dd>
<dt><a href="#Organization">Organization</a></dt>
<dd></dd>
<dt><a href="#Process">Process</a></dt>
<dd><p>Class for process, permission user</p>
</dd>
<dt><a href="#Task">Task</a></dt>
<dd><p>Class for task, permission user</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>Class for user, permission user</p>
</dd>
</dl>

<a name="Documents"></a>

## Documents
Class for documents, permission admin

**Kind**: global class  

* [Documents](#Documents)
    * [.findById(params, session)](#Documents+findById) ⇒ <code>Promise</code>
    * [.add(params, session)](#Documents+add) ⇒ <code>Promise</code>
    * [.find(params, session)](#Documents+find) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#Documents+findByIdAndRemove) ⇒ <code>Promise</code>
    * [.signedUrl(params, session)](#Documents+signedUrl) ⇒ <code>Promise</code>

<a name="Documents+findById"></a>

### documents.findById(params, session) ⇒ <code>Promise</code>
Get document by id

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get document by id |
| params.docId | <code>string</code> | Document id (_id database) |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 docId: '5edd11c46b6ce9729c2c297c',
 orgId: '55e4a3bd6be6b45210833fae'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.document.findById(params, session);
```
<a name="Documents+add"></a>

### documents.add(params, session) ⇒ <code>Promise</code>
Create new document

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Object for add new document |
| params.orgname | <code>string</code> |  | Organization name |
| params.areaId | <code>string</code> |  | Doc area id (_id database) |
| params.docId | <code>string</code> |  | Document id (_id database) |
| [params.documentDate] | <code>string</code> | <code>&quot;new\\ Date()&quot;</code> | Date of document |
| params.filename | <code>string</code> |  | File name |
| params.type | <code>string</code> |  | Mimetype of the document (image/png) |
| params.name | <code>string</code> |  | Document name |
| [params.content] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Content of document |
| [params.description] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Description of document |
| [params.category] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Category of document |
| [params.tags] | <code>array</code> | <code>[]</code> | Tags of document |
| params.docTypeId | <code>string</code> |  | Document type id (_id database) |
| [params.hasPhisicalStorage] | <code>boolean</code> | <code>false</code> | Has Phisical Storage |
| [params.boxId] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Box ID |
| [params.storageStatus] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Storage status |
| [params.ocrDocumentBackend] | <code>boolean</code> | <code>false</code> | Ocr document backend |
| params.bytes | <code>number</code> |  | Size document in bytes |
| [params.docAreaPermission] | <code>object</code> | <code>{}</code> | Permission to doc area |
| [params.docTypeFieldsData] | <code>object</code> | <code>{}</code> | Fields data "extraField' |
| params.signedUrl | <code>string</code> |  | SIgned URL |
| [params.urlType] | <code>string</code> | <code>&quot;&#x27;S3&#x27;&quot;</code> | URL type |
| [params.addType] | <code>string</code> | <code>&quot;&#x27;S3_SIGNED&#x27;&quot;</code> | Add type |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 orgname: 'cloundbrasil',
 areaId: '5edf9f8ee896b817e45b8dac',
 docId: '5edf86fbe896b817e45b8da6',
 fileName: 'foto',
 type: 'image/png',
 name: 'Fotografia',
 docTypeId = '5edf9f8ee896b817e45b8dac',
 bytes: 12345,
 signedUrl: 'https://s3.amazonaws.com...'
 docTypeFieldsData: {extraUser: '12349f8ee896b817e45b8dac'},
 orgId: '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+find"></a>

### documents.find(params, session) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Object with params |
| params.index | <code>string</code> |  | Field to search |
| params.txtToSearch | <code>string</code> |  | Text to search |
| [params.compare] | <code>string</code> | <code>&quot;*&quot;</code> | Filter to search (=, ~, *, =*, *=, *?) |
| params.docId | <code>string</code> |  | Document id for serach |
| params.docAreaId | <code>string</code> |  | Doc area id |
| params.tag | <code>string</code> |  | Tag of the document |
| [params.projection] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Projection to return fields |
| [params.sort] | <code>string</code> | <code>&quot;\&quot;Mais+recentes\&quot;&quot;</code> | Sort data |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| params.pagination | <code>string</code> |  | Set pagination |
| [params.pagination.page] | <code>number</code> | <code>1</code> | Page |
| [params.pagination.perPage] | <code>number</code> | <code>100</code> | perPage Itens per page |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 index: 'extraCity',
 txtToSearch: 'São',
 docId: '5df7f19618430c89a41a19d2',
 docAreaId: '5edd11c46b6ce9729c2c297c',
 tag: 'Nome da cidade',
 orgId: '1234d01dc4af3941d42f8c5c'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+findByIdAndRemove"></a>

### documents.findByIdAndRemove(params, session) ⇒ <code>Promise</code>
Remove document by id

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to remove document |
| params.docId | <code>string</code> | Document Id (_id database) |
| params.orgId | <code>string</code> | Organizarion id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 docId: '5dadd01dc4af3941d42f8c5c',
 orgIdId: '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+signedUrl"></a>

### documents.signedUrl(params, session) ⇒ <code>Promise</code>
Request signed url url to put or get

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.methodType | <code>string</code> | Method type HTTP get or put |
| params.docId | <code>string</code> | Document id |
| params.fileName | <code>string</code> | File name |
| params.docAreaId | <code>string</code> | docAreaId of the document |
| params.type | <code>string</code> | mimeType image/png image/jpg others |
| params.document | <code>string</code> | Name document to request |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'put',
 docId: '5dadd01dc4af3941d42f8c5c',
 docAreaId: '5df7f19618430c89a41a19d2',
 fileName: 'Foto',
 type: 'image/png'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.signedUrl(params, session);
```
<a name="Form"></a>

## Form
Class for forms, permission admin

**Kind**: global class  
<a name="Form+findById"></a>

### form.findById(params, session) ⇒ <code>Promise</code>
Get advance form by ID

**Kind**: instance method of [<code>Form</code>](#Form)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to find form by id |
| params.id | <code>string</code> | Formulary Id (_id database) |
| params.orgId | <code>string</code> | Organization Id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '55e4a3bd6be6b45210833fae',
 orgId: '5edd11c46b6ce9729c2c297c',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.form.findById(params, session);
```
<a name="Admin"></a>

## Admin
API request, admin permission level

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
<a name="new_Admin_new"></a>

### new Admin(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="Lists"></a>

## Lists
Class for lists, permission admin

**Kind**: global class  

* [Lists](#Lists)
    * [.findById(params, session)](#Lists+findById) ⇒ <code>Promise</code>
    * [.find(params, session)](#Lists+find) ⇒ <code>Promise</code>

<a name="Lists+findById"></a>

### lists.findById(params, session) ⇒ <code>Promise</code>
Get list by ID

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to find list by id |
| params.id | <code>string</code> | List Id (_id database) |
| params.orgId | <code>string</code> | Organization Id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '55e4a3bd6be6b45210833fae',
 orgId: '5edd11c46b6ce9729c2c297c',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.list.findById(params, session);
```
<a name="Lists+find"></a>

### lists.find(params, session) ⇒ <code>Promise</code>
Get all lists

**Kind**: instance method of [<code>Lists</code>](#Lists)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> | <code>{}</code> | Params to pagination and orgId |
| [params.page] | <code>number</code> | <code>0</code> | Current page to pagination |
| [params.perPage] | <code>number</code> | <code>200</code> | Qnt itens per page |
| params.orgId | <code>string</code> |  | Organization Id (_id database) |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '55e4a3bd6be6b45210833fae'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.list.find(params, session);
```
<a name="Notification"></a>

## Notification
Class for notification, permission admin

**Kind**: global class  

* [Notification](#Notification)
    * [.add(params, session)](#Notification+add) ⇒ <code>Promise</code>
    * [.findById(params, session)](#Notification+findById) ⇒ <code>Promise</code>
    * [.findByIdAndUpdate(params, session)](#Notification+findByIdAndUpdate) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#Notification+findByIdAndRemove) ⇒ <code>Promise</code>

<a name="Notification+add"></a>

### notification.add(params, session) ⇒ <code>Promise</code>
Create notification

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to create notification |
| params.orgId | <code>string</code> | OrgId of the user SU |
| params.userId | <code>string</code> | User to create notification |
| params.message | <code>object</code> | Object with data to send user |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5edd11c46b6ce9729c2c297c',
 userId: '55e4a3bd6be6b45210833fae',
 message: 'Olá como vai tudo bem?'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.notifications.add(params, session);
```
<a name="Notification+findById"></a>

### notification.findById(params, session) ⇒ <code>Promise</code>
Search notification using (notificationId or userId)

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to create notification |
| params.orgId | <code>string</code> | OrgId of the user SU |
| params.id | <code>string</code> | ALERT! Id is userId or id is notificationId |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5edd11c46b6ce9729c2c297c',
 id: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.notifications.findById(params, session);
```
<a name="Notification+findByIdAndUpdate"></a>

### notification.findByIdAndUpdate(params, session) ⇒ <code>Promise</code>
Update notification using (notificationId or userId)

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to create notification |
| params.orgId | <code>string</code> | OrgId of the user SU |
| params.id | <code>string</code> | ALERT! Id is userId or id is notificationId |
| params.read | <code>boolean</code> | If message is read true or false |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5edd11c46b6ce9729c2c297c',
 id: '55e4a3bd6be6b45210833fae',
 read: true
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.notifications.findByIdAndUpdate(params, session);
```
<a name="Notification+findByIdAndRemove"></a>

### notification.findByIdAndRemove(params, session) ⇒ <code>Promise</code>
Delete notification using (notificationId or userId)

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to create notification |
| params.orgId | <code>string</code> | OrgId of the user SU |
| params.id | <code>string</code> | ALERT! Id is userId or id is notificationId |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5edd11c46b6ce9729c2c297c',
 id: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.notifications.findByIdAndDelete(params, session);
```
<a name="Plugin"></a>

## Plugin
Class for plugin, permission admin

**Kind**: global class  
<a name="Plugin+findById"></a>

### plugin.findById(id, session) ⇒ <code>Promise</code>
Get plugin by ID

**Kind**: instance method of [<code>Plugin</code>](#Plugin)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Plugin Id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const id ='55e4a3bd6be6b45210833fae',
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.plugin.findById(id, session);
```
<a name="Policy"></a>

## Policy
Class for policy, permission admin

**Kind**: global class  
<a name="Policy+find"></a>

### policy.find(session) ⇒ <code>Promise</code>
Find all policies

**Kind**: instance method of [<code>Policy</code>](#Policy)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.policy.find(session);
```
<a name="Task"></a>

## Task
Class for task, permission admin

**Kind**: global class  

* [Task](#Task)
    * [.findOne(params, session)](#Task+findOne)
    * [.findById(params, session)](#Task+findById) ⇒ <code>promise</code>
    * [.findByIdAndUpdate(params)](#Task+findByIdAndUpdate) ⇒ <code>Promise</code>

<a name="Task+findOne"></a>

### task.findOne(params, session)
Get task by user Id

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get task |
| params.userId | <code>string</code> |  | User id (_id database) |
| [params.filter] | <code>string</code> | <code>&quot;NOT_DONE&quot;</code> | Filter type CLEAN | EXECUTED | PENDING | LATE | NOT_DONE | DONE |
| [params.includeOwner] | <code>boolean</code> | <code>false</code> | Include owner true | false |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.task.findOne(params, session);
```
<a name="Task+findById"></a>

### task.findById(params, session) ⇒ <code>promise</code>
Method to find task by id

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.processId | <code>object</code> | Proccess id (_id database) |
| params.taskId | <code>object</code> | Task id (_id database) |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 processId: '5dadd01dc4af3941d42f8c5c',
 taskId: '5df7f19618430c89a41a19d2',
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.findById(params, session);
```
<a name="Task+findByIdAndUpdate"></a>

### task.findByIdAndUpdate(params) ⇒ <code>Promise</code>
Find task by id and update

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update task |
| params.userId | <code>object</code> | User id (_id database) |
| params.processId | <code>string</code> | Proccess id (_id database) |
| params.taskId | <code>string</code> | Task id (_id database) |
| params.flowName | <code>string</code> | Flow name |
| params.action | <code>string</code> | Button action |
| params.formData | <code>object</code> | Data to update task |
| [params.actionGuid] | <code>string</code> | GUID of the action |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '5739d4c6ccb0ebc61f2a9557',
 processId: '5dadd01dc4af3941d42f8c5c',
 taskId: '5df7f19618430c89a41a19d2',
 action: 1,
 formData: {name: 'CloudBrasil'},
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.findByIdAndUpdate(params, session);
```
<a name="User"></a>

## User
Class for user, permission admin

**Kind**: global class  

* [User](#User)
    * [.findById(userId, session)](#User+findById) ⇒ <code>Promise</code>
    * [.findByIdAndUpdatePassword(params, session)](#User+findByIdAndUpdatePassword) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.emailExist(email, session)](#User+emailExist)
    * [.updateAvatar(params, session)](#User+updateAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#User+removeAvatar) ⇒ <code>Promise</code>

<a name="User+findById"></a>

### user.findById(userId, session) ⇒ <code>Promise</code>
Request profile by userId

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | User identifier (_id database) |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const userId = '55e4a3bd6be6b45210833fae';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.findById(userId, session);
```
<a name="User+findByIdAndUpdatePassword"></a>

### user.findByIdAndUpdatePassword(params, session) ⇒ <code>Promise.&lt;unknown&gt;</code>
Update password by userId

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update password |
| params.userId | <code>string</code> | Id of the user |
| params.oldPassword | <code>string</code> | Old password |
| params.newPassword | <code>string</code> | New password |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '55e4a3bd6be6b45210833fae',
 oldPassword: '123456',
 newPassword: '123456789'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.findByIdAndUpdatePassword(params, session);
```
<a name="User+emailExist"></a>

### user.emailExist(email, session)
Check if email is unique

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Check if email is unique |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const email = 'ana.silva@gmail.com';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.emailExist(email, session);
```
<a name="User+updateAvatar"></a>

### user.updateAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update avatar |
| params.avatar | <code>string</code> | Image in base64 to update |
| params.type | <code>string</code> | mimeType (image/png) |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 avatar: '55e4a3bd6be6b45210833fae',
 type: '123456',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.user.updateAvatar(params, session);
```
<a name="User+removeAvatar"></a>

### user.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.user.removeAvatar(session);
```
<a name="Documents"></a>

## Documents
Class for documents, permission user

**Kind**: global class  

* [Documents](#Documents)
    * [.findById(params, session)](#Documents+findById) ⇒ <code>Promise</code>
    * [.add(params, session)](#Documents+add) ⇒ <code>Promise</code>
    * [.find(params, session)](#Documents+find) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#Documents+findByIdAndRemove) ⇒ <code>Promise</code>
    * [.signedUrl(params, session)](#Documents+signedUrl) ⇒ <code>Promise</code>

<a name="Documents+findById"></a>

### documents.findById(params, session) ⇒ <code>Promise</code>
Get document by id

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get document by id |
| params.docId | <code>string</code> | Document id (_id database) |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 docId: '5edd11c46b6ce9729c2c297c',
 orgId: '55e4a3bd6be6b45210833fae'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.document.findById(params, session);
```
<a name="Documents+add"></a>

### documents.add(params, session) ⇒ <code>Promise</code>
Create new document

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Object for add new document |
| params.orgname | <code>string</code> |  | Organization name |
| params.areaId | <code>string</code> |  | Doc area id (_id database) |
| params.docId | <code>string</code> |  | Document id (_id database) |
| [params.documentDate] | <code>string</code> | <code>&quot;new\\ Date()&quot;</code> | Date of document |
| params.filename | <code>string</code> |  | File name |
| params.type | <code>string</code> |  | Mimetype of the document (image/png) |
| params.name | <code>string</code> |  | Document name |
| [params.content] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Content of document |
| [params.description] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Description of document |
| [params.category] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Category of document |
| [params.tags] | <code>array</code> | <code>[]</code> | Tags of document |
| params.docTypeId | <code>string</code> |  | Document type id (_id database) |
| [params.hasPhisicalStorage] | <code>boolean</code> | <code>false</code> | Has Phisical Storage |
| [params.boxId] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Box ID |
| [params.storageStatus] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Storage status |
| [params.ocrDocumentBackend] | <code>boolean</code> | <code>false</code> | Ocr document backend |
| params.bytes | <code>number</code> |  | Size document in bytes |
| [params.docAreaPermission] | <code>object</code> | <code>{}</code> | Permission to doc area |
| [params.docTypeFieldsData] | <code>object</code> | <code>{}</code> | Fields data "extraField' |
| params.signedUrl | <code>string</code> |  | SIgned URL |
| [params.urlType] | <code>string</code> | <code>&quot;&#x27;S3&#x27;&quot;</code> | URL type |
| [params.addType] | <code>string</code> | <code>&quot;&#x27;S3_SIGNED&#x27;&quot;</code> | Add type |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 orgname: 'cloundbrasil',
 areaId: '5edf9f8ee896b817e45b8dac',
 docId: '5edf86fbe896b817e45b8da6',
 fileName: 'foto',
 type: 'image/png',
 name: 'Fotografia',
 docTypeId = '5edf9f8ee896b817e45b8dac',
 bytes: 12345,
 signedUrl: 'https://s3.amazonaws.com...'
 docTypeFieldsData: {extraUser: '12349f8ee896b817e45b8dac'},
 orgId: '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+find"></a>

### documents.find(params, session) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Object with params |
| params.index | <code>string</code> |  | Field to search |
| params.txtToSearch | <code>string</code> |  | Text to search |
| [params.compare] | <code>string</code> | <code>&quot;*&quot;</code> | Filter to search (=, ~, *, =*, *=, *?) |
| params.docId | <code>string</code> |  | Document id for serach |
| params.docAreaId | <code>string</code> |  | Doc area id |
| params.tag | <code>string</code> |  | Tag of the document |
| [params.projection] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | Projection to return fields |
| [params.sort] | <code>string</code> | <code>&quot;\&quot;Mais+recentes\&quot;&quot;</code> | Sort data |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| params.pagination | <code>string</code> |  | Set pagination |
| [params.pagination.page] | <code>number</code> | <code>1</code> | Page |
| [params.pagination.perPage] | <code>number</code> | <code>100</code> | perPage Itens per page |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 index: 'extraCity',
 txtToSearch: 'São',
 docId: '5df7f19618430c89a41a19d2',
 docAreaId: '5edd11c46b6ce9729c2c297c',
 tag: 'Nome da cidade',
 orgId: '1234d01dc4af3941d42f8c5c'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+findByIdAndRemove"></a>

### documents.findByIdAndRemove(params, session) ⇒ <code>Promise</code>
Remove document by id

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to remove document |
| params.docId | <code>string</code> | Document Id (_id database) |
| params.orgId | <code>string</code> | Organizarion id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 docId: '5dadd01dc4af3941d42f8c5c',
 orgIdId: '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+signedUrl"></a>

### documents.signedUrl(params, session) ⇒ <code>Promise</code>
Request signed url url to put or get

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.methodType | <code>string</code> | Method type HTTP get or put |
| params.docId | <code>string</code> | Document id |
| params.fileName | <code>string</code> | File name |
| params.docAreaId | <code>string</code> | docAreaId of the document |
| params.type | <code>string</code> | mimeType image/png image/jpg others |
| params.document | <code>string</code> | Name document to request |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'put',
 docId: '5dadd01dc4af3941d42f8c5c',
 docAreaId: '5df7f19618430c89a41a19d2',
 fileName: 'Foto',
 type: 'image/png'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.signedUrl(params, session);
```
<a name="Users"></a>

## Users
API request, user permission level

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="Organization"></a>

## Organization
**Kind**: global class  

* [Organization](#Organization)
    * [new Organization()](#new_Organization_new)
    * [.findById(orgId, session)](#Organization+findById)
    * [.idCardExist(idcard, session)](#Organization+idCardExist)

<a name="new_Organization_new"></a>

### new Organization()
Class for organizations, permission user

<a name="Organization+findById"></a>

### organization.findById(orgId, session)
Find organization by id

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| orgId | <code>string</code> | ID of the organization to find (_id database) |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const orgId = '80443245000122';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.organization.findById(idCard, session);
```
<a name="Organization+idCardExist"></a>

### organization.idCardExist(idcard, session)
Check if id card exist

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| idcard | <code>string</code> | Check if id card exist |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const idCard = '80443245000122';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.organization.idCardExist(idCard, session);
```
<a name="Process"></a>

## Process
Class for process, permission user

**Kind**: global class  
<a name="Process+start"></a>

### process.start(params, session) ⇒ <code>Promise</code>
Start process

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to start process |
| params.processId | <code>string</code> |  | Process id (_id database); |
| params.orgId | <code>string</code> |  | Organization id (_id database); |
| [params.payload] | <code>object</code> | <code>{}</code> | Start process with data |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  processId: '5dadd01dc4af3941d42f8c5c',
  orgId: '5edd11c46b6ce9729c2c297c',
  payload: {}
}
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.process.start(params, session);
```
<a name="Task"></a>

## Task
Class for task, permission user

**Kind**: global class  

* [Task](#Task)
    * [.findOne(params, session)](#Task+findOne)
    * [.findById(params, session)](#Task+findById) ⇒ <code>promise</code>
    * [.findByIdAndUpdate(params)](#Task+findByIdAndUpdate) ⇒ <code>Promise</code>

<a name="Task+findOne"></a>

### task.findOne(params, session)
Get task by user Id

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get task |
| params.userId | <code>string</code> |  | User id (_id database) |
| [params.filter] | <code>string</code> | <code>&quot;NOT_DONE&quot;</code> | Filter type CLEAN | EXECUTED | PENDING | LATE | NOT_DONE | DONE |
| [params.includeOwner] | <code>boolean</code> | <code>false</code> | Include owner true | false |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.task.findOne(params, session);
```
<a name="Task+findById"></a>

### task.findById(params, session) ⇒ <code>promise</code>
Method to find task by id

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.processId | <code>object</code> | Proccess id (_id database) |
| params.taskId | <code>object</code> | Task id (_id database) |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 processId: '5dadd01dc4af3941d42f8c5c',
 taskId: '5df7f19618430c89a41a19d2',
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.findById(params, session);
```
<a name="Task+findByIdAndUpdate"></a>

### task.findByIdAndUpdate(params) ⇒ <code>Promise</code>
Find task by id and update

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update task |
| params.userId | <code>object</code> | User id (_id database) |
| params.processId | <code>string</code> | Proccess id (_id database) |
| params.taskId | <code>string</code> | Task id (_id database) |
| params.flowName | <code>string</code> | Flow name |
| params.action | <code>string</code> | Button action |
| params.formData | <code>object</code> | Data to update task |
| [params.actionGuid] | <code>string</code> | GUID of the action |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '5739d4c6ccb0ebc61f2a9557',
 processId: '5dadd01dc4af3941d42f8c5c',
 taskId: '5df7f19618430c89a41a19d2',
 action: 1,
 formData: {name: 'CloudBrasil'},
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.findByIdAndUpdate(params, session);
```
<a name="User"></a>

## User
Class for user, permission user

**Kind**: global class  

* [User](#User)
    * [.findById(userId, session)](#User+findById) ⇒ <code>Promise</code>
    * [.findByIdAndUpdatePassword(params, session)](#User+findByIdAndUpdatePassword) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.emailExist(email, session)](#User+emailExist)
    * [.updateAvatar(params, session)](#User+updateAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#User+removeAvatar) ⇒ <code>Promise</code>

<a name="User+findById"></a>

### user.findById(userId, session) ⇒ <code>Promise</code>
Request profile by userId

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | User identifier (_id database) |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const userId = '55e4a3bd6be6b45210833fae';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.findById(userId, session);
```
<a name="User+findByIdAndUpdatePassword"></a>

### user.findByIdAndUpdatePassword(params, session) ⇒ <code>Promise.&lt;unknown&gt;</code>
Update password by userId

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update password |
| params.userId | <code>string</code> | Id of the user |
| params.oldPassword | <code>string</code> | Old password |
| params.newPassword | <code>string</code> | New password |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 userId: '55e4a3bd6be6b45210833fae',
 oldPassword: '123456',
 newPassword: '123456789'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.findByIdAndUpdatePassword(params, session);
```
<a name="User+emailExist"></a>

### user.emailExist(email, session)
Check if email is unique

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Check if email is unique |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const email = 'ana.silva@gmail.com';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.user.emailExist(email, session);
```
<a name="User+updateAvatar"></a>

### user.updateAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update avatar |
| params.avatar | <code>string</code> | Image in base64 to update |
| params.type | <code>string</code> | mimeType (image/png) |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 avatar: '55e4a3bd6be6b45210833fae',
 type: '123456',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.user.updateAvatar(params, session);
```
<a name="User+removeAvatar"></a>

### user.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.user.removeAvatar(session);
```
