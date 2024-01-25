## Classes

<dl>
<dt><a href="#AdminDocuments">AdminDocuments</a></dt>
<dd><p>Admin Class for documents, permission admin</p>
</dd>
<dt><a href="#AdminForm">AdminForm</a></dt>
<dd><p>Admin Class for forms, permission admin</p>
</dd>
<dt><a href="#Admin">Admin</a></dt>
<dd><p>API request, admin permission level</p>
</dd>
<dt><a href="#AdminLists">AdminLists</a></dt>
<dd><p>Admin Class for lists, permission admin</p>
</dd>
<dt><a href="#AdminMessage">AdminMessage</a></dt>
<dd><p>Admin Class for user, permission admin</p>
</dd>
<dt><a href="#AdminNotification">AdminNotification</a></dt>
<dd><p>Admin Class for notification, permission admin</p>
</dd>
<dt><a href="#Organization">Organization</a></dt>
<dd><p>Class for organizations, permission user</p>
</dd>
<dt><a href="#AdminPlugin">AdminPlugin</a></dt>
<dd><p>Admin Class for plugin, permission admin</p>
</dd>
<dt><a href="#AdminPolicy">AdminPolicy</a></dt>
<dd><p>Admin Class for policy, permission admin</p>
</dd>
<dt><a href="#AdminProcesses">AdminProcesses</a></dt>
<dd><p>Admin Class for processes, permission admin</p>
</dd>
<dt><a href="#AdminTask">AdminTask</a></dt>
<dd><p>Admin Class for task, permission admin</p>
</dd>
<dt><a href="#AdminUser">AdminUser</a></dt>
<dd><p>Admin Class for user, permission admin</p>
</dd>
<dt><a href="#GeoLocation">GeoLocation</a></dt>
<dd><p>General Class for user, permission organization</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>API request, user permission level</p>
</dd>
<dt><a href="#Application">Application</a></dt>
<dd><p>Class for Applications, permission user</p>
</dd>
<dt><a href="#Datasource">Datasource</a></dt>
<dd><p>Class for user datasource access, to be used with when creating new documents</p>
</dd>
<dt><a href="#Documents">Documents</a></dt>
<dd><p>Class for documents, permission user</p>
</dd>
<dt><a href="#Help">Help</a></dt>
<dd><p>Class for user registration in a user</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>API request, user permission level</p>
</dd>
<dt><a href="#MyTasks">MyTasks</a></dt>
<dd><p>Class for my tasks, permission user</p>
</dd>
<dt><a href="#Notification">Notification</a></dt>
<dd><p>Class for user registration in a user</p>
</dd>
<dt><a href="#Organization">Organization</a></dt>
<dd><p>Class for organizations, permission user</p>
</dd>
<dt><a href="#Page">Page</a></dt>
<dd><p>Class for Pages, permission user</p>
</dd>
<dt><a href="#Process">Process</a></dt>
<dd><p>Class for process, permission user</p>
</dd>
<dt><a href="#Register">Register</a></dt>
<dd><p>Class for user registration in a user</p>
</dd>
<dt><a href="#Settings">Settings</a></dt>
<dd><p>Class for user settings</p>
</dd>
<dt><a href="#Task">Task</a></dt>
<dd><p>Class for task, permission user</p>
</dd>
<dt><a href="#TaskAvailable">TaskAvailable</a></dt>
<dd><p>Class for available tasks, permission user</p>
</dd>
<dt><a href="#Updates">Updates</a></dt>
<dd><p>Class for user registration in a user</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>Class for user, permission user</p>
</dd>
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

<a name="AdminDocuments"></a>

## AdminDocuments
Admin Class for documents, permission admin

**Kind**: global class  

* [AdminDocuments](#AdminDocuments)
    * [.advancedSearch(params, session)](#AdminDocuments+advancedSearch) ⇒ <code>Promise</code>
    * [.findById(params, session)](#AdminDocuments+findById) ⇒ <code>Promise</code>
    * [.signedUrl(params, apiKey)](#AdminDocuments+signedUrl) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.updateContent(params, apiKey)](#AdminDocuments+updateContent) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.updateAI(params, apiKey)](#AdminDocuments+updateAI) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getContent(params, apiKey)](#AdminDocuments+getContent) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>number</code>

<a name="AdminDocuments+advancedSearch"></a>

### adminDocuments.advancedSearch(params, session) ⇒ <code>Promise</code>
Advanced search of document in elastic search ussing system manager

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to search document |
| params.docId | <code>string</code> | Document id (_id database) |
| params.query | <code>object</code> | Query to search in elastic search |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  docId: '5edd11c46b6ce9729c2c297c',
  query: {
     "query": {
       "bool": {
         "minimum_should_match": 1,
         "should": [
           {
             "match": {
               "locationText.keyword": {
                 "query": "sao pau"
               }
             }
           },
           {
             "wildcard": {
               "locationText.normalized": "*sao pau*"
             }
           }
         ]
       }
     }
   }
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.document.advancedSearch(params, session);
```
<a name="AdminDocuments+findById"></a>

### adminDocuments.findById(params, session) ⇒ <code>Promise</code>
Get document by id

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
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
<a name="AdminDocuments+signedUrl"></a>

### adminDocuments.signedUrl(params, apiKey) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Request signed url url to put or get

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc Returned document data with the signed url<code>string</code> - doc.docId Document id<code>string</code> - doc.name The name of the document, which is the fileName<code>string</code> - doc.areaId docAreaId of the document<code>string</code> - doc.type the document mimi type<code>string</code> - doc.signedUrl the signed URL to upload  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.methodType | <code>string</code> | Method type HTTP get or put |
| params.docId | <code>string</code> | The unique id of the document |
| apiKey | <code>string</code> | Api Key as permission to use this functionality |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'put',
 docId: '5dadd01dc4af3941d42f8c5c'
};
const apiKey: '...';
const { docId, name, areaId, type, signedUrl } = await api.admin.document.signedUrl(params, apiKey);
```
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'get',
 docId: '5dadd01dc4af3941d42f8c5c'
};
const apiKey: '...';
const { signedUrl, imageType } = await api.admin.document.signedUrl(params, apiKey);
```
<a name="AdminDocuments+updateContent"></a>

### adminDocuments.updateContent(params, apiKey) ⇒ <code>Promise.&lt;object&gt;</code>
Update a document content

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc Returned document data with the signed url  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.content | <code>string</code> | The content text |
| params.docId | <code>string</code> | The unique id of the document |
| apiKey | <code>string</code> | Api Key as permission to use this functionality |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 content: 'some text...',
 docId: '5dadd01dc4af3941d42f8c5c'
};
const apiKey: '...';
await api.admin.document.updateContent(params, apiKey);
```
<a name="AdminDocuments+updateAI"></a>

### adminDocuments.updateAI(params, apiKey) ⇒ <code>Promise.&lt;object&gt;</code>
Update a document content

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc Returned document data with the signed url  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.content | <code>string</code> | The content text |
| params.docId | <code>string</code> | The unique id of the document |
| params.searchablePDFURL | <code>string</code> | The searchable PDF Url |
| params.overlay | <code>object</code> | The overlay information |
| params.entities | <code>array</code> | The list of entities extracted from the text |
| params.language | <code>object</code> | The language detected |
| params.language.name | <code>string</code> | The language name detected |
| params.language.confidence | <code>string</code> | The confidence that it is the language |
| apiKey | <code>string</code> | Api Key as permission to use this functionality |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 content: 'some text...',
 docId: '5dadd01dc4af3941d42f8c5c'
};
const apiKey: '...';
await api.admin.document.updateContent(params, apiKey);
```
<a name="AdminDocuments+getContent"></a>

### adminDocuments.getContent(params, apiKey) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>number</code>
Get the content of a document

**Kind**: instance method of [<code>AdminDocuments</code>](#AdminDocuments)  
**Returns**: <code>Promise.&lt;object&gt;</code> - data the document content<code>string</code> - data._id the _id of the document<code>string</code> - data.content all the pages or if asked by page, just one page, the one requested<code>string</code> - data.content.TextOverlay the overlay text if requested<code>string</code> - data.content.ParsedText the page text content<code>number</code> - data.total the total number of pages  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.docId | <code>string</code> | The unique id of the document |
| params.page | <code>string</code> | The page, from 0, or 'all' if all pages (the full content) |
| apiKey | <code>string</code> | Api Key as permission to use this functionality |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 page: '0',
 docId: '5dadd01dc4af3941d42f8c5c'
};
const apiKey: '...';
await api.admin.document.getContent(params, apiKey);
```
<a name="AdminForm"></a>

## AdminForm
Admin Class for forms, permission admin

**Kind**: global class  

* [AdminForm](#AdminForm)
    * [.findById(params, session)](#AdminForm+findById) ⇒ <code>Promise</code>
    * [.getFormList(params, session)](#AdminForm+getFormList) ⇒ <code>Promise</code>

<a name="AdminForm+findById"></a>

### adminForm.findById(params, session) ⇒ <code>Promise</code>
Get advance form by ID

**Kind**: instance method of [<code>AdminForm</code>](#AdminForm)  
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
<a name="AdminForm+getFormList"></a>

### adminForm.getFormList(params, session) ⇒ <code>Promise</code>
Request signed url url to put or get

**Kind**: instance method of [<code>AdminForm</code>](#AdminForm)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get form list |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| params.page | <code>number</code> | <code>1</code> | Page of pagination |
| params.perPage | <code>number</code> | <code>200</code> | Items per page |
| params.type | <code>object</code> | <code>2</code> | Form type (1 to Business or 2 to Advanced) |
| params.project | <code>object</code> | <code>{_id:</code> | 1, name: 1} - Fields to project |
| params.sort | <code>object</code> | <code>{name:</code> | 1} - Sort fields |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 orgId: '5dadd01dc4af3941d42f8c5c',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.form.getFormList(params, session);
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

<a name="AdminLists"></a>

## AdminLists
Admin Class for lists, permission admin

**Kind**: global class  

* [AdminLists](#AdminLists)
    * [.findById(params, session)](#AdminLists+findById) ⇒ <code>Promise</code>
    * [.find(params, session)](#AdminLists+find) ⇒ <code>Promise</code>

<a name="AdminLists+findById"></a>

### adminLists.findById(params, session) ⇒ <code>Promise</code>
Get list by ID

**Kind**: instance method of [<code>AdminLists</code>](#AdminLists)  
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
<a name="AdminLists+find"></a>

### adminLists.find(params, session) ⇒ <code>Promise</code>
Get all lists

**Kind**: instance method of [<code>AdminLists</code>](#AdminLists)  
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
<a name="AdminMessage"></a>

## AdminMessage
Admin Class for user, permission admin

**Kind**: global class  

* [AdminMessage](#AdminMessage)
    * [._paginationOfTheSMS(params)](#AdminMessage+_paginationOfTheSMS)
    * [._validItemToSendEmail(params)](#AdminMessage+_validItemToSendEmail)
    * [.sendSMS(params)](#AdminMessage+sendSMS) ⇒ <code>Promise.&lt;{}&gt;</code>
    * [.sendEmail(params, session)](#AdminMessage+sendEmail) ⇒ <code>Promise.&lt;{success: boolean, sent: Array.&lt;object&gt;}&gt;</code>

<a name="AdminMessage+_paginationOfTheSMS"></a>

### adminMessage.\_paginationOfTheSMS(params)
Pagination SMS texts

**Kind**: instance method of [<code>AdminMessage</code>](#AdminMessage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to pagintion SMS |
| params.message | <code>string</code> |  | Message to pagination |
| params.limitSize | <code>number</code> | <code>130</code> | Limit of the start pagination |
| params.continueText | <code>number</code> | <code>continua...</code> | Text to continue other SMS |

<a name="AdminMessage+_validItemToSendEmail"></a>

### adminMessage.\_validItemToSendEmail(params)
Validation struct to send email

**Kind**: instance method of [<code>AdminMessage</code>](#AdminMessage)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to send email |
| params.subject | <code>string</code> | Subject of the email |
| params.message | <code>string</code> | Body of the email |
| params.to | <code>string</code> | Destination email |
| params.from | <code>string</code> | Source email |

<a name="AdminMessage+sendSMS"></a>

### adminMessage.sendSMS(params) ⇒ <code>Promise.&lt;{}&gt;</code>
Send an SMS message

**Kind**: instance method of [<code>AdminMessage</code>](#AdminMessage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to send SMS |
| params.apiKey | <code>string</code> |  | Organization API key |
| params.message | <code>string</code> |  | The text message to send |
| params.recipient | <code>string</code> |  | The telephone number without with only numbers |
| params.limitSize | <code>number</code> | <code>130</code> | Size limit to send SMS |

<a name="AdminMessage+sendEmail"></a>

### adminMessage.sendEmail(params, session) ⇒ <code>Promise.&lt;{success: boolean, sent: Array.&lt;object&gt;}&gt;</code>
Send email, array with email list or send one email

**Kind**: instance method of [<code>AdminMessage</code>](#AdminMessage)  
**Returns**: <code>Promise.&lt;{success: boolean, sent: Array.&lt;object&gt;}&gt;</code> - - Success and email sent  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to send email |
| params.subject | <code>string</code> | Subject of the email |
| params.message | <code>string</code> | Body of the email |
| params.to | <code>string</code> | Destination email |
| params.from | <code>string</code> | Source email |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 subject: 'Test email',
 message: '<h1>Hi!</h1>',
 to: 'destination@gmail.com'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.message.sendEmail(params, session);
```
<a name="AdminNotification"></a>

## AdminNotification
Admin Class for notification, permission admin

**Kind**: global class  

* [AdminNotification](#AdminNotification)
    * [.realTime(params, session)](#AdminNotification+realTime) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.add(params, session)](#AdminNotification+add) ⇒ <code>Promise</code>
    * [.findById(params, session)](#AdminNotification+findById) ⇒ <code>Promise</code>
    * [.findByIdAndUpdate(params, session)](#AdminNotification+findByIdAndUpdate) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#AdminNotification+findByIdAndRemove) ⇒ <code>Promise</code>

<a name="AdminNotification+realTime"></a>

### adminNotification.realTime(params, session) ⇒ <code>Promise.&lt;\*&gt;</code>
Send real time notification

**Kind**: instance method of [<code>AdminNotification</code>](#AdminNotification)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to send notification |
| params.userIds | <code>string</code> | Users to send notification |
| params.message | <code>object</code> | Object with data to send user |
| session | <code>object</code> | Session, token JWT |

<a name="AdminNotification+add"></a>

### adminNotification.add(params, session) ⇒ <code>Promise</code>
Create notification

**Kind**: instance method of [<code>AdminNotification</code>](#AdminNotification)  
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
<a name="AdminNotification+findById"></a>

### adminNotification.findById(params, session) ⇒ <code>Promise</code>
Search notification using (notificationId or userId)

**Kind**: instance method of [<code>AdminNotification</code>](#AdminNotification)  
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
<a name="AdminNotification+findByIdAndUpdate"></a>

### adminNotification.findByIdAndUpdate(params, session) ⇒ <code>Promise</code>
Update notification using (notificationId or userId)

**Kind**: instance method of [<code>AdminNotification</code>](#AdminNotification)  
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
<a name="AdminNotification+findByIdAndRemove"></a>

### adminNotification.findByIdAndRemove(params, session) ⇒ <code>Promise</code>
Delete notification using (notificationId or userId)

**Kind**: instance method of [<code>AdminNotification</code>](#AdminNotification)  
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
<a name="Organization"></a>

## Organization
Class for organizations, permission user

**Kind**: global class  

* [Organization](#Organization)
    * [.upsertAvatar(params, session)](#Organization+upsertAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#Organization+removeAvatar) ⇒ <code>Promise</code>
    * [.findById(orgId, session)](#Organization+findById)
    * [.idCardExist(idcard, session)](#Organization+idCardExist)
    * [.upsertAvatar(params, session)](#Organization+upsertAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#Organization+removeAvatar) ⇒ <code>Promise</code>
    * [.callFetch(params)](#Organization+callFetch) ⇒ <code>promise</code>

<a name="Organization+upsertAvatar"></a>

### organization.upsertAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of organization by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update avatar |
| params.orgId | <code>string</code> | Organization id |
| params.avatar | <code>string</code> | Image in base64 to update |
| params.type | <code>string</code> | MimeType (image/png) |
| session | <code>string</code> | Is token JWT of user SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5dadd01dc4af3941d42f8c5c',
 avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
 type: 'image/png',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.organizations.upsertAvatar(params, session);
```
<a name="Organization+removeAvatar"></a>

### organization.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params.orgId | <code>string</code> | Organization id |
| session | <code>string</code> | Is token JWT of user SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const orgId = '5dadd01dc4af3941d42f8c5c';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.organizations.removeAvatar(orgId, session);
```
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
<a name="Organization+upsertAvatar"></a>

### organization.upsertAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of organization by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
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
 avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
 type: 'image/png',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.profile.updateAvatar(params, session);
```
<a name="Organization+removeAvatar"></a>

### organization.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
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
await api.user.profile.removeAvatar(session);
```
<a name="Organization+callFetch"></a>

### organization.callFetch(params) ⇒ <code>promise</code>
Call URL internal, need auth JWT (session)

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to call fectch (URL internal) |
| params.url | <code>string</code> |  | URL to call |
| [params.method] | <code>string</code> | <code>&quot;POST&quot;</code> | Fetch Method |
| params.payload | <code>string</code> |  | Payload to send system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();

const params = {
  url: 'http://localhost:8080/organizations/..../process/..../task/candidateAccepted/end/....',
  method: 'POST'
}
await api.user.organization.callFetchs(params, session);
```
<a name="AdminPlugin"></a>

## AdminPlugin
Admin Class for plugin, permission admin

**Kind**: global class  

* [AdminPlugin](#AdminPlugin)
    * [.find(params)](#AdminPlugin+find)
    * [.findById(id, session)](#AdminPlugin+findById) ⇒ <code>Promise</code>

<a name="AdminPlugin+find"></a>

### adminPlugin.find(params)
Find plugins

**Kind**: instance method of [<code>AdminPlugin</code>](#AdminPlugin)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to search plugins |
| params.page | <code>number</code> | Start page to pagination |
| params.perPage | <code>number</code> | Items per page |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {page: 1, perPage: 200};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.organization.findById(params, session);
```
<a name="AdminPlugin+findById"></a>

### adminPlugin.findById(id, session) ⇒ <code>Promise</code>
Get plugin by ID

**Kind**: instance method of [<code>AdminPlugin</code>](#AdminPlugin)  
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
<a name="AdminPolicy"></a>

## AdminPolicy
Admin Class for policy, permission admin

**Kind**: global class  
<a name="AdminPolicy+find"></a>

### adminPolicy.find(session) ⇒ <code>Promise</code>
Find all policies

**Kind**: instance method of [<code>AdminPolicy</code>](#AdminPolicy)  
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
<a name="AdminProcesses"></a>

## AdminProcesses
Admin Class for processes, permission admin

**Kind**: global class  

* [AdminProcesses](#AdminProcesses)
    * [.search()](#AdminProcesses+search) ⇒ <code>Promise</code>
    * [.advancedSearch(params, session)](#AdminProcesses+advancedSearch) ⇒ <code>Promise</code>

<a name="AdminProcesses+search"></a>

### adminProcesses.search() ⇒ <code>Promise</code>
Advanced search of processes, check documentation, to verify all params, pass to method search

**Kind**: instance method of [<code>AdminProcesses</code>](#AdminProcesses)  
**Access**: public  
**See**: https://confluence.external-share.com/content/7450b014-52c6-4d9e-b30e-a062b57453b5/17104899/17694721/532545537  
**Author**: CloudBrasil <abernardo.br@gmail.com>  
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5edd11c46b6ce9729c2c297c',
 ...
 ...
 ...
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.processes.search(params, session);
```
<a name="AdminProcesses+advancedSearch"></a>

### adminProcesses.advancedSearch(params, session) ⇒ <code>Promise</code>
Advanced search of process in elastic search ussing system manager

**Kind**: instance method of [<code>AdminProcesses</code>](#AdminProcesses)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to search document |
| params.orgProcessId | <code>string</code> | Document id (_id database) of the process |
| params.query | <code>object</code> | Query to search in elastic search |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  orgProcessId: '5edd11c46b6ce9729c2c297c',
  query: {
     "_source": "processData.properties.processProperties",
     "query": {
       "term": {
         "initParams.email.keyword": {
           "value": "clintes001@gmail.com"
         }
       }
     }
  }
}
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.processes.advancedSearch(params, session);
```
<a name="AdminTask"></a>

## AdminTask
Admin Class for task, permission admin

**Kind**: global class  
<a name="AdminTask+find"></a>

### adminTask.find(params, session)
Get task by user Id

**Kind**: instance method of [<code>AdminTask</code>](#AdminTask)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get task |
| params.userId | <code>string</code> |  | User id (_id database) |
| [params.filter] | <code>string</code> | <code>&quot;NOT_DONE&quot;</code> | Filter type CLEAN | EXECUTED | PENDING | LATE | NOT_DONE | DONE |
| params.project | <code>object</code> |  | Project to return |
| params.project.returnProcessProperties | <code>boolean</code> |  | Return process properties |
| params.project.returnInitParams | <code>boolean</code> |  | Return init params |
| params.userId | <code>string</code> |  | User id (_id database) |
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
await api.admin.task.find(params, session);
```
<a name="AdminUser"></a>

## AdminUser
Admin Class for user, permission admin

**Kind**: global class  

* [AdminUser](#AdminUser)
    * [.findById(userId, session)](#AdminUser+findById) ⇒ <code>Promise</code>
    * [.findByIds(userIds, apiKey)](#AdminUser+findByIds) ⇒ <code>Promise</code>
    * [.findByIdAndUpdatePassword(params, session)](#AdminUser+findByIdAndUpdatePassword) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.emailExist(email, session)](#AdminUser+emailExist)
    * [.findByIdAndUpdate(userId, payload, session)](#AdminUser+findByIdAndUpdate) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.getChangePasswordGuid(email)](#AdminUser+getChangePasswordGuid) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.changePasswordGuid(Payload)](#AdminUser+changePasswordGuid) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="AdminUser+findById"></a>

### adminUser.findById(userId, session) ⇒ <code>Promise</code>
Request profile by userId

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
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
<a name="AdminUser+findByIds"></a>

### adminUser.findByIds(userIds, apiKey) ⇒ <code>Promise</code>
Request profile by userId

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| userIds | <code>string</code> | Users identifier (_id database) |
| apiKey | <code>string</code> | Api to use to search users |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const userIds = ['55e4a3bd6be6b45210833fae', '55e4a3bd6be6b45210833fae'];
const apiKey = 'c9bbd652-d112-454e-8595-f1669f49dde0';
await api.admin.user.findByIds(userIds, apiKey);
```
<a name="AdminUser+findByIdAndUpdatePassword"></a>

### adminUser.findByIdAndUpdatePassword(params, session) ⇒ <code>Promise.&lt;unknown&gt;</code>
Update password by userId

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
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
<a name="AdminUser+emailExist"></a>

### adminUser.emailExist(email, session)
Check if email is unique

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

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
<a name="AdminUser+findByIdAndUpdate"></a>

### adminUser.findByIdAndUpdate(userId, payload, session) ⇒ <code>Promise.&lt;\*&gt;</code>
update userData by userSMId

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | User SM Id |
| payload | <code>object</code> | Payload to update |
| session | <code>string</code> | Is token JWT |

**Example**  
```js
const userId = '55e4a3bd6be6b45210833fae';
const payload = {
  name: 'Maria joaquina',
  email: 'maria@gmail.com'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```
<a name="AdminUser+getChangePasswordGuid"></a>

### adminUser.getChangePasswordGuid(email) ⇒ <code>Promise.&lt;\*&gt;</code>
Request GUID to change the password

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | User email |

**Example**  
```js
const payload = {
  email: 'maria@gmail.com'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```
<a name="AdminUser+changePasswordGuid"></a>

### adminUser.changePasswordGuid(Payload) ⇒ <code>Promise.&lt;\*&gt;</code>
Change password guid

**Kind**: instance method of [<code>AdminUser</code>](#AdminUser)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| Payload | <code>object</code> | Payload to change password |
| Payload.guid | <code>string</code> | GUID |
| Payload.newPassword | <code>string</code> | New password |

**Example**  
```js
const payload = {
  guid: '5b3c049c-4861-4353-a423-5e3f14242642',
  newPassword: '123456789'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```
<a name="GeoLocation"></a>

## GeoLocation
General Class for user, permission organization

**Kind**: global class  
<a name="GeoLocation+location"></a>

### geoLocation.location(params) ⇒ <code>Promise</code>
Get geo location of the address

**Kind**: instance method of [<code>GeoLocation</code>](#GeoLocation)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get geo location |
| params.address | <code>string</code> | The address to get the location for |
| params.apiKey | <code>string</code> | The Organization API Key |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 address: 'Rua Sud Menucci, 615 - Vila Camilopolis, Santo André - SP',
 apiKey: 'AIzaSyC7gJFOkuT-Mel3WZbX5uKuJ1USqLVkGnY',
};
await api.general.geo.location(params);
```
<a name="Users"></a>

## Users
API request, user permission level

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

* [Users](#Users)
    * [new Users(options)](#new_Users_new)
    * [new Users(options)](#new_Users_new)

<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="Application"></a>

## Application
Class for Applications, permission user

**Kind**: global class  
<a name="Application+list"></a>

### application.list(params, session) ⇒ <code>promise</code>
Get the available applications for this user in this organizations

**Kind**: instance method of [<code>Application</code>](#Application)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.application.list(params, session);
```
<a name="Datasource"></a>

## Datasource
Class for user datasource access, to be used with when creating new documents

**Kind**: global class  
<a name="Datasource+autocomplete"></a>

### datasource.autocomplete(params, session) ⇒ <code>promise.&lt;array&gt;</code> \| <code>string</code> \| <code>object</code>
Method to get autocomplete data from a datasource

**Kind**: instance method of [<code>Datasource</code>](#Datasource)  
**Returns**: <code>promise.&lt;array&gt;</code> - docs The returned documents field with autocomplete<code>string</code> - docs._id the _id of the document<code>object</code> - data.docTypeFieldsData the field values  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to add notification token |
| params.orgId | <code>string</code> | The user organization _id |
| params.dataSources | <code>array.&lt;object&gt;</code> | The document type data sources information |
| params.dataSources._id | <code>string</code> | The document type data sources _id |
| params.dataSources.fields | <code>array.&lt;object&gt;</code> | The document type data sources list of fields |
| params.documents | <code>array.&lt;object&gt;</code> | The document list |
| params.documents._id | <code>string</code> | The document _id |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const params = {
 orgId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
 dataSources: [{}],
 documents: [{}]
};
const retData = await api.user.datasource.autocomplete(params, session);
```
<a name="Documents"></a>

## Documents
Class for documents, permission user

**Kind**: global class  

* [Documents](#Documents)
    * [.add(params, session)](#Documents+add) ⇒ <code>Promise</code>
    * [.findByIdAndUpdate(id, params, session)](#Documents+findByIdAndUpdate) ⇒ <code>Promise</code>
    * [.findById(id, session)](#Documents+findById) ⇒ <code>Promise</code>
    * [.find(params, session)](#Documents+find) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#Documents+findByIdAndRemove) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.findByIdsAndRemove(params, session)](#Documents+findByIdsAndRemove) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.signedUrl(params, session)](#Documents+signedUrl) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.signedUrls(params, session)](#Documents+signedUrls) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.uploadSignedDocument(params)](#Documents+uploadSignedDocument) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.checkPrimaryKeys(params, session)](#Documents+checkPrimaryKeys) ⇒ <code>Promise.&lt;array&gt;</code> \| <code>array.&lt;string&gt;</code>
    * [.searchDocuments(params, session)](#Documents+searchDocuments) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>

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
| [params.documentDate] | <code>string</code> | <code>&quot;new Date()&quot;</code> | Date of document |
| params.document | <code>string</code> |  | The path to the file. If S3, the key to S3, gotten after getting a signed URL |
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
const params = {
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
await api.user.document.add(params, session);
```
<a name="Documents+findByIdAndUpdate"></a>

### documents.findByIdAndUpdate(id, params, session) ⇒ <code>Promise</code>
Updates a document

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Document _id |
| params | <code>object</code> | Object for document payload to update. It has to be the FULL document data, that you can get with findById |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = { ... };
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndUpdate('5edf9f8ee896b817e45b8dad', params, session);
```
<a name="Documents+findById"></a>

### documents.findById(id, session) ⇒ <code>Promise</code>
Updates a document.
 IMPORTANT: if your document has a content, it will NOT bring the content.

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Document _id |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findById('5edf9f8ee896b817e45b8dad', session);
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

### documents.findByIdAndRemove(params, session) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Remove document by id

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;object&gt;</code> - data The returned data<code>number</code> - data.removed The quantity of removed documents<code>array.&lt;object&gt;</code> - data.errors Array of errors<code>string</code> - data.errors.id Id of the document that had an error<code>string</code> - data.errors.code Error code<code>string</code> - data.errors.message Error message  
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
 orgId '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdAndRemove(params, session);
```
<a name="Documents+findByIdsAndRemove"></a>

### documents.findByIdsAndRemove(params, session) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Remove documents

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;object&gt;</code> - data The returned data<code>number</code> - data.removed The quantity of removed documents<code>array.&lt;object&gt;</code> - data.errors Array of errors<code>string</code> - data.errors.id Id of the document that had an error<code>string</code> - data.errors.code Error code<code>string</code> - data.errors.message Error message  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to remove document |
| params.documents | <code>array.&lt;string&gt;</code> | An array ids of documents (_id database) |
| params.documents._id | <code>array.&lt;string&gt;</code> | The document id (_id database) |
| params.orgId | <code>string</code> | Organizarion id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 documents: [{ _id: '5dadd01dc4af3941d42f8c5c' }],
 orgId: '5df7f19618430c89a41a19d2',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.document.findByIdsAndRemove(params, session);
```
<a name="Documents+signedUrl"></a>

### documents.signedUrl(params, session) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Request signed url url to put or get

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc Returned document data with the signed url<code>string</code> - doc.docId Document id<code>string</code> - doc.name The name of the document, which is the fileName<code>string</code> - doc.areaId docAreaId of the document<code>string</code> - doc.type the document mimi type<code>string</code> - doc.signedUrl the signed URL to upload  
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
| params.document | <code>string</code> | Name document to request if method type is get |
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
 orgId: '5df7f19618430c89a41a19f8'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
// each doc: { docId, name, areaId, type, signedUrl }
const { docs } = await api.user.document.signedUrl(params, session);
```
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'get',
 document: 'pinkandthebrain/5df7f19618430c89a41a19d2/5dadd01dc4af3941d42f8c5c/9dadd01dc4af3941d42f6dd4.pdf',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const base64Data = await api.user.document.signedUrl(params, session);
```
<a name="Documents+signedUrls"></a>

### documents.signedUrls(params, session) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Request signed url url to put or get

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;object&gt;</code> - doc Returned document data with the signed url<code>string</code> - doc.docId Document id<code>string</code> - doc.name The name of the document, which is the fileName<code>string</code> - doc.areaId docAreaId of the document<code>string</code> - doc.type the document mimi type<code>string</code> - doc.signedUrl the signed URL to upload  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to request signed url |
| params.docs | <code>array</code> | the list of documents to get the signed urls |
| params.docs.docId | <code>string</code> | Document id |
| params.docs.name | <code>string</code> | File name |
| params.docs.areaId | <code>string</code> | docAreaId of the document |
| params.docs.type | <code>string</code> | mimeType image/png image/jpg others |
| params.docs.document | <code>string</code> | Name document to request if method type is get |
| params.methodType | <code>string</code> | Method type HTTP get or put |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'put',
 orgId: '5df7f19618430c89a41a19f8'
 docs: [
     {
       docId: '5dadd01dc4af3941d42f8c5c',
       areaId: '5df7f19618430c89a41a19d2',
       name: 'Foto.png',
       type: 'image/png'
     }
 ]
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
// each doc: { docId, name, areaId, type, signedUrl }
const { docs } = await api.user.document.signedUrls(params, session);
```
**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 methodType: 'get',
 docs: [
     { document: 'pinkandthebrain/5df7f19618430c89a41a19d2/5dadd01dc4af3941d42f8c5c/9dadd01dc4af3941d42f6dd4.pdf' }
 ],
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const base64Data = await api.user.document.signedUrls(params, session);
```
<a name="Documents+uploadSignedDocument"></a>

### documents.uploadSignedDocument(params) ⇒ <code>Promise.&lt;boolean&gt;</code>
Uploads the file

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if success  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to upload document |
| params.content | <code>buffer</code> | The content of the file (Buffer) |
| params.signedUrl | <code>string</code> | The signed URL |
| params.type | <code>string</code> | The file mime type |
| params.onUploadProgress | <code>string</code> | A callback for the upload progress. It will return a progressEvent. |

**Example**  
```js
const FS = require('fs');
const Path = require('path');
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params - {
 content: FS.readFileSync(Path.join(__dirname, '.mypdf.pdf')),
 signedUrl: 'https://signedurl.com/token...',
 type: 'application/pdf'
};
const retData = await api.user.document.uploadSignedDocument(params);

onUploadProgress return the progressEvent
 - lengthComputable: A Boolean that indicates whether or not the total number of bytes is known.
 - loaded: The number of bytes of the file that have been uploaded.
 - total: The total number of bytes in the file.
```
<a name="Documents+checkPrimaryKeys"></a>

### documents.checkPrimaryKeys(params, session) ⇒ <code>Promise.&lt;array&gt;</code> \| <code>array.&lt;string&gt;</code>
**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;array&gt;</code> - Return the array of the documents that are repeated. If not document is repeaded, then if returns an empty array.<code>array.&lt;string&gt;</code> - id  the id of the repeated document  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>
Checks if a document can be added and it does not repeat its primary key  

| Param | Type | Description |
| --- | --- | --- |
| params |  |  |
| params.orgId | <code>string</code> | the organization id |
| params.docTypeId | <code>string</code> | the id of the doc type |
| params.docs | <code>array.&lt;object&gt;</code> | an array of documents |
| params.docs.id | <code>string</code> | an unique id representing the document |
| params.docs.docTypeFields | <code>object</code> | thje docTypeFields of the document |
| params.docs.docTypeFieldsData | <code>object</code> | thje docTypeFieldsData of the document |
| session |  |  |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const docTypeFields = [...];   // the doc type fields array
const docTypeFieldsData = {...};   // the data of this fields
const params - {
 docs: [{ id: '5dadd01dc4af3941d42f8c5c', docTypeFields, docTypeFieldsData }],
 orgId: '5df7f19618430c89a41a19d2',
 docTypeId: '5df7f19618430c89a41a19d5',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retDocs = await api.user.document.checkPrimaryKeys(params, session);
```
<a name="Documents+searchDocuments"></a>

### documents.searchDocuments(params, session) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
Method to search documents for

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>promise</code> - returned data from the search<code>number</code> - count the count of items searched<code>array.&lt;object&gt;</code> - items the items returned from search<code>number</code> - took the number of documents taken<code>number</code> - totalCount the total count of all documents  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to search the documents |
| params.query | <code>object</code> | Search documents query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {p: 20, i: 1, s: 'Mais recentes', as: '', m: 'w', ai: '57e6a3bd6be6b45210833fae'},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.document.searchDocuments(params, session);
```
<a name="Help"></a>

## Help
Class for user registration in a user

**Kind**: global class  

* [Help](#Help)
    * [.getTopics(session)](#Help+getTopics)
    * [.get(params, session)](#Help+get) ⇒ <code>promise</code>

<a name="Help+getTopics"></a>

### help.getTopics(session)
get heps topics

**Kind**: instance method of [<code>Help</code>](#Help)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | JWT token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.help.getTopics(session);
```
<a name="Help+get"></a>

### help.get(params, session) ⇒ <code>promise</code>
Method to find helps from a topic

**Kind**: instance method of [<code>Help</code>](#Help)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get helps from topic |
| params.id | <code>object</code> | Topic id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '5dadd01dc4af3941d42f8c5c'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.help.get(params, session);
```
<a name="Users"></a>

## Users
API request, user permission level

**Kind**: global class  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

* [Users](#Users)
    * [new Users(options)](#new_Users_new)
    * [new Users(options)](#new_Users_new)

<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="new_Users_new"></a>

### new Users(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Params of the constructor |
| options.parent | <code>object</code> | This of the pararent |

<a name="MyTasks"></a>

## MyTasks
Class for my tasks, permission user

**Kind**: global class  

* [MyTasks](#MyTasks)
    * [.find(params, session)](#MyTasks+find) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
    * [.saveDueDate(params, session)](#MyTasks+saveDueDate) ⇒ <code>Promise</code>
    * [.removeDueDate(session)](#MyTasks+removeDueDate) ⇒ <code>Promise</code>
    * [.getTaskMultiUsers(params, session)](#MyTasks+getTaskMultiUsers) ⇒ <code>promise</code>
    * [.removeMultiTaskUser(params, session)](#MyTasks+removeMultiTaskUser) ⇒ <code>Promise</code>
    * [.addMultiTaskUser(params, session)](#MyTasks+addMultiTaskUser) ⇒ <code>Promise</code>
    * [.getAssignTaskUsers(params, session)](#MyTasks+getAssignTaskUsers) ⇒ <code>promise</code>
    * [.assignTaskUsers(params, session)](#MyTasks+assignTaskUsers) ⇒ <code>Promise</code>
    * [.unclaim(params, session)](#MyTasks+unclaim) ⇒ <code>Promise</code>
    * [.escalate(params, session)](#MyTasks+escalate) ⇒ <code>Promise</code>

<a name="MyTasks+find"></a>

### myTasks.find(params, session) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
Method to find my tasks for a user

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Returns**: <code>promise</code> - returned data from the search<code>number</code> - count the count of items searched<code>array.&lt;object&gt;</code> - items the items returned from search<code>number</code> - page the page of the search (on pagination), zero indexed<code>number</code> - perPage how many items per page  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get tasks |
| params.query | <code>object</code> | Search my tasks query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.task.mytasks.find(params, session);
```
<a name="MyTasks+saveDueDate"></a>

### myTasks.saveDueDate(params, session) ⇒ <code>Promise</code>
Update task dueDate

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | The Date to save |
| params.dueDate | <code>string</code> | DueDate |
| params.orgId | <code>string</code> | Organization id |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   dueDate: '2011-10-05T14:48:00.000Z',
   orgId: '646386c9583e04a131adc894',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.saveDueDate(params, session);
```
<a name="MyTasks+removeDueDate"></a>

### myTasks.removeDueDate(session) ⇒ <code>Promise</code>
Update task dueDate

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| data.orgId | <code>string</code> | Organization id |
| data.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   orgId: '646386c9583e04a131adc894',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.removeDueDate(params, session);
```
<a name="MyTasks+getTaskMultiUsers"></a>

### myTasks.getTaskMultiUsers(params, session) ⇒ <code>promise</code>
Method to get task multi users

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.taskId | <code>object</code> | Task id (_id database) |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 taskId: '5df7f19618430c89a41a19d2',
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.getTaskMultiUsers(params, session);
```
<a name="MyTasks+removeMultiTaskUser"></a>

### myTasks.removeMultiTaskUser(params, session) ⇒ <code>Promise</code>
remove multi task user

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params of the user to be removed |
| params.userId | <code>string</code> | User id |
| params.orgId | <code>string</code> | Organization id |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   userId: '646386c9583e04a131adc896',
   orgId: '646386c9583e04a131adc894',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.removeMultiTaskUser(params, session);
```
<a name="MyTasks+addMultiTaskUser"></a>

### myTasks.addMultiTaskUser(params, session) ⇒ <code>Promise</code>
Add Multi Task User

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params for adding multi task user |
| params.userId | <code>string</code> | User id |
| params.orgId | <code>string</code> | Organization id |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   userId: '646386c9583e04a131adc8946',
   orgId: '646386c9583e04a131adc894',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.addMultiTaskUser(params, session);
```
<a name="MyTasks+getAssignTaskUsers"></a>

### myTasks.getAssignTaskUsers(params, session) ⇒ <code>promise</code>
Method to get assign task users

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.taskId | <code>object</code> | Task id (_id database) |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 taskId: '5df7f19618430c89a41a19d2',
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.getAssignTaskUsers(params, session);
```
<a name="MyTasks+assignTaskUsers"></a>

### myTasks.assignTaskUsers(params, session) ⇒ <code>Promise</code>
Assign Task user

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | The params to assign task to user |
| params.orgName | <code>string</code> | Organization Name |
| params.userId | <code>string</code> | User id that will be assigned the task |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   orgName: 'pinkbrain',
   userId: '646386c9583e04a131adc894',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.assignTaskUser(params, session);
```
<a name="MyTasks+unclaim"></a>

### myTasks.unclaim(params, session) ⇒ <code>Promise</code>
Unclaim task

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | The params to unclaim task |
| params.orgName | <code>string</code> | Organization Name |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   orgName: 'pinkbrain',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.unclaim(params, session);
```
<a name="MyTasks+escalate"></a>

### myTasks.escalate(params, session) ⇒ <code>Promise</code>
Escalate task

**Kind**: instance method of [<code>MyTasks</code>](#MyTasks)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | The params to escalate task |
| params.orgName | <code>string</code> | Organization Name |
| params.taskId | <code>string</code> | Task Id |
| session | <code>string</code> | Is token JWT of user |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
   orgName: 'pinkbrain',
   taskId: '646386c9583e04a131adc895'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.mytasks.escalate(params, session);
```
<a name="Notification"></a>

## Notification
Class for user registration in a user

**Kind**: global class  

* [Notification](#Notification)
    * [.tokenTypes](#Notification+tokenTypes) ⇒ <code>Object</code>
    * [.addToken(params, session)](#Notification+addToken) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>
    * [.getNew(session)](#Notification+getNew)
    * [.getOld(session)](#Notification+getOld)
    * [.setRead(params, session)](#Notification+setRead) ⇒ <code>Promise</code>
    * [.setUnread(params, session)](#Notification+setUnread) ⇒ <code>Promise</code>

<a name="Notification+tokenTypes"></a>

### notification.tokenTypes ⇒ <code>Object</code>
Notification token types

**Kind**: instance property of [<code>Notification</code>](#Notification)  
<a name="Notification+addToken"></a>

### notification.addToken(params, session) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code>
Method to add a notification token

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>boolean</code> - data._id the id of the added token  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to add notification token |
| params.token | <code>string</code> | The token |
| params.type | <code>object</code> | The token type |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const params = {
 token: 'V6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz2',
 type: 'FCM_WEB'
};
const retData = await api.user.notification.addToken(params, session);
```
<a name="Notification+getNew"></a>

### notification.getNew(session)
get new notifications

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | JWT token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.notification.getNew(session);
```
<a name="Notification+getOld"></a>

### notification.getOld(session)
get old notifications

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | JWT token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.notification.getOld(session);
```
<a name="Notification+setRead"></a>

### notification.setRead(params, session) ⇒ <code>Promise</code>
Set notification as readed

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update the notification |
| params.id | <code>string</code> | Notification Id |
| session | <code>string</code> | JWT Token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '34c344c43c34c344c43c'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.notification.setRead(params, session);
```
<a name="Notification+setUnread"></a>

### notification.setUnread(params, session) ⇒ <code>Promise</code>
Set notification as unreaded

**Kind**: instance method of [<code>Notification</code>](#Notification)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update the notification |
| params.id | <code>string</code> | Notification Id |
| session | <code>string</code> | JWT Token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 id: '34c344c43c34c344c43c'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.notification.setUnread(params, session);
```
<a name="Organization"></a>

## Organization
Class for organizations, permission user

**Kind**: global class  

* [Organization](#Organization)
    * [.upsertAvatar(params, session)](#Organization+upsertAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#Organization+removeAvatar) ⇒ <code>Promise</code>
    * [.findById(orgId, session)](#Organization+findById)
    * [.idCardExist(idcard, session)](#Organization+idCardExist)
    * [.upsertAvatar(params, session)](#Organization+upsertAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#Organization+removeAvatar) ⇒ <code>Promise</code>
    * [.callFetch(params)](#Organization+callFetch) ⇒ <code>promise</code>

<a name="Organization+upsertAvatar"></a>

### organization.upsertAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of organization by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update avatar |
| params.orgId | <code>string</code> | Organization id |
| params.avatar | <code>string</code> | Image in base64 to update |
| params.type | <code>string</code> | MimeType (image/png) |
| session | <code>string</code> | Is token JWT of user SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '5dadd01dc4af3941d42f8c5c',
 avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
 type: 'image/png',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.organizations.upsertAvatar(params, session);
```
<a name="Organization+removeAvatar"></a>

### organization.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params.orgId | <code>string</code> | Organization id |
| session | <code>string</code> | Is token JWT of user SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const orgId = '5dadd01dc4af3941d42f8c5c';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.admin.organizations.removeAvatar(orgId, session);
```
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
<a name="Organization+upsertAvatar"></a>

### organization.upsertAvatar(params, session) ⇒ <code>Promise</code>
Update avatar of organization by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
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
 avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
 type: 'image/png',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.profile.updateAvatar(params, session);
```
<a name="Organization+removeAvatar"></a>

### organization.removeAvatar(session) ⇒ <code>Promise</code>
Remove avatar of user by session of user not allow session user SU

**Kind**: instance method of [<code>Organization</code>](#Organization)  
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
await api.user.profile.removeAvatar(session);
```
<a name="Organization+callFetch"></a>

### organization.callFetch(params) ⇒ <code>promise</code>
Call URL internal, need auth JWT (session)

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to call fectch (URL internal) |
| params.url | <code>string</code> |  | URL to call |
| [params.method] | <code>string</code> | <code>&quot;POST&quot;</code> | Fetch Method |
| params.payload | <code>string</code> |  | Payload to send system manager |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();

const params = {
  url: 'http://localhost:8080/organizations/..../process/..../task/candidateAccepted/end/....',
  method: 'POST'
}
await api.user.organization.callFetchs(params, session);
```
<a name="Page"></a>

## Page
Class for Pages, permission user

**Kind**: global class  
<a name="Page+get"></a>

### page.get(params, session) ⇒ <code>promise</code>
Get the available page for an application inside an organization

**Kind**: instance method of [<code>Page</code>](#Page)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.orgId | <code>object</code> | Organization id (_id database) |
| params.appId | <code>object</code> | application id (_id database) |
| params.pageId | <code>object</code> | page id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '55e4a3bd6be6b45210833fae',
 appId: '57e4a3bd6be6b45210833fa7',
 pageId: '57e4a3bd6be6b45210833fab'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.application.page.get(params, session);
```
<a name="Process"></a>

## Process
Class for process, permission user

**Kind**: global class  

* [Process](#Process)
    * [.start(params, session)](#Process+start) ⇒ <code>Promise</code>
    * [.getProcessProperties(params, session)](#Process+getProcessProperties) ⇒ <code>Promise</code>
    * [.getOrgProcessSearchInfo(params, session)](#Process+getOrgProcessSearchInfo) ⇒ <code>Promise</code> \| <code>string</code> \| <code>object</code> \| <code>object</code> \| <code>object</code> \| <code>string</code>
    * [.find(params, session)](#Process+find) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
    * [.remove(params, session)](#Process+remove)
    * [.exportStatusData(params, session)](#Process+exportStatusData)
    * [.exportProcessData(params, session)](#Process+exportProcessData)
    * [.processDocs(params, session)](#Process+processDocs) ⇒ <code>promise</code> \| <code>array.&lt;object&gt;</code>
    * [.downloadDocs(params, session)](#Process+downloadDocs) ⇒ <code>promise</code>

<a name="Process+start"></a>

### process.start(params, session) ⇒ <code>Promise</code>
Start process

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to start process |
| params.orgProcessId | <code>string</code> |  | The organization process id (_id database); |
| params.orgId | <code>string</code> |  | Organization id (_id database); |
| [params.payload] | <code>object</code> | <code>{}</code> | Start process with data |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  orgProcessId: '5dadd01dc4af3941d42f8c5c',
  orgId: '5edd11c46b6ce9729c2c297c',
  payload: {}
}
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.process.start(params, session);
```
<a name="Process+getProcessProperties"></a>

### process.getProcessProperties(params, session) ⇒ <code>Promise</code>
Get process properties of process

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get process properties |
| params.processId | <code>string</code> | Process id (_id database); |
| params.orgId | <code>string</code> | Organization id (_id database); |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  processId: '5dadd01dc4af3941d42f8c5c',
  orgId: '5edd11c46b6ce9729c2c297c',
}
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.process.getProcessProperties(params, session);
```
<a name="Process+getOrgProcessSearchInfo"></a>

### process.getOrgProcessSearchInfo(params, session) ⇒ <code>Promise</code> \| <code>string</code> \| <code>object</code> \| <code>object</code> \| <code>object</code> \| <code>string</code>
Get the search info of a organization process

**Kind**: instance method of [<code>Process</code>](#Process)  
**Returns**: <code>Promise</code> - the search info result<code>string</code> - name the name of the organization process<code>object</code> - processIndexFields the list of fields to index<code>object</code> - processParticipantsGroup the permissions in this organization process<code>object</code> - stepsProperties the organization process steps properties<code>string</code> - _id the same organization id
@  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get search info |
| params.orgProcessId | <code>string</code> | The id of an organization process (_id database); |
| params.orgId | <code>string</code> | Organization id (_id database); |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
  orgProcessId: '5dadd01dc4af3941d42f8c67',
  orgId: '5edd11c46b6ce9729c2c297c',
}
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearchInfo = await api.user.process.getOrgProcessSearchInfo(params, session);
```
<a name="Process+find"></a>

### process.find(params, session) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
Method to search processes

**Kind**: instance method of [<code>Process</code>](#Process)  
**Returns**: <code>promise</code> - returned data from the search<code>number</code> - count the count of items searched<code>array.&lt;object&gt;</code> - items the items returned from search<code>number</code> - page the page of the search (on pagination), zero indexed<code>number</code> - perPage how many items per page  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to search processes |
| params.query | <code>object</code> | Search process query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {"orgProcessId": {"value":"62c2d1cdfb5455c195d1baa1","oper":"=","type":"string"},"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.process.find(params, session);
```
<a name="Process+remove"></a>

### process.remove(params, session)
Method to remove process

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to remove process |
| params.orgId | <code>object</code> | Organization id (_id database) |
| params.processId | <code>object</code> | Process id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '55e4a3bd6be6b45210833fae',
 processId: '55e4a3bd6be6b45210833fae'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.process.remove(params, session);
```
<a name="Process+exportStatusData"></a>

### process.exportStatusData(params, session)
Method to export status data

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to export status data |
| params.query | <code>object</code> | Search process query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {"orgProcessId": {"value":"62c2d1cdfb5455c195d1baa1","oper":"=","type":"string"},"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.process.exportStatusData(params, session);
```
<a name="Process+exportProcessData"></a>

### process.exportProcessData(params, session)
Method to export process data

**Kind**: instance method of [<code>Process</code>](#Process)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to export process data |
| params.query | <code>object</code> | Search process query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {"orgProcessId": {"value":"62c2d1cdfb5455c195d1baa1","oper":"=","type":"string"},"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.process.exportProcessData(params, session);
```
<a name="Process+processDocs"></a>

### process.processDocs(params, session) ⇒ <code>promise</code> \| <code>array.&lt;object&gt;</code>
Method to get Process Docs

**Kind**: instance method of [<code>Process</code>](#Process)  
**Returns**: <code>promise</code> - returned data from the get process docs<code>array.&lt;object&gt;</code> - Docs returned from process  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get process docs |
| params.orgProcessId | <code>string</code> | Organization Process Id |
| params.processId | <code>string</code> | Process Id |
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgProcessId: '55e4a3bd6be6b45210833fae',
 processId: '55e4a3bd6be6b45210833fae',
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.process.processDocs(params, session);
```
<a name="Process+downloadDocs"></a>

### process.downloadDocs(params, session) ⇒ <code>promise</code>
Method to download the process documents

**Kind**: instance method of [<code>Process</code>](#Process)  
**Returns**: <code>promise</code> - returned data from the search  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to download the process documents |
| params.orgId | <code>string</code> | Organization id (_id database) |
| params.type | <code>string</code> | Document Type |
| params.docIds | <code>array</code> | Documents Ids |
| params.footer | <code>string</code> | Documents Footer |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 orgId: '55e4a3bd6be6b45210833fae',
 type: 'Docs',
 docIds: ['55e4a3bd6be6b45210833fae'],
 footer: 'Documento - {page} de {pages}'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const result = await api.user.process.downloadDocs(params, session);
```
<a name="Register"></a>

## Register
Class for user registration in a user

**Kind**: global class  

* [Register](#Register)
    * [.getOrgname()](#Register+getOrgname) ⇒ <code>string</code>
    * [.validateEmail(params)](#Register+validateEmail) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code> \| <code>boolean</code> \| <code>string</code> \| <code>object</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>object</code> \| <code>string</code> \| <code>string</code>
    * [.execute(params)](#Register+execute) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code> \| <code>boolean</code> \| <code>object</code> \| <code>string</code>

<a name="Register+getOrgname"></a>

### register.getOrgname() ⇒ <code>string</code>
**Kind**: instance method of [<code>Register</code>](#Register)  
**Returns**: <code>string</code> - orgname The orgname of the organization in the registerId  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params.registerId | <code>object</code> | The registerId that comes with the registration page context |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 registerId: 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...'
};
const orgname = await api.user.register.getOrgname(params);
```
<a name="Register+validateEmail"></a>

### register.validateEmail(params) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code> \| <code>boolean</code> \| <code>string</code> \| <code>object</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>object</code> \| <code>string</code> \| <code>string</code>
Method to find task by id

**Kind**: instance method of [<code>Register</code>](#Register)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>boolean</code> - data.success If the operation was successfully done (true|false)<code>boolean</code> - data.userAlreadyExists If the user already exists (true|false), if true, then the other information is not returned<code>string</code> - data.registrationEmailInfoRaw The fully cryptographed registration information<code>object</code> - data.registrationEmailInfo The registration information<code>string</code> - data.registrationEmailInfo.orgname The orgname<code>string</code> - data.registrationEmailInfo.orgId The orgId of the organization<code>string</code> - data.registrationEmailInfo.guid The unique id for the registration<code>object</code> - data.registrationEmailInfo.emailValidation The email validation information<code>string</code> - data.registrationEmailInfo.emailValidation.email The email that the code was sent to<code>string</code> - data.registrationEmailInfo.emailValidation.code The 4 digit code to validate the email  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.registerId | <code>string</code> | The registerId that comes with the registration page context |
| params.email | <code>object</code> | The email to validate |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 registerId: 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...',
 email: 'myemail@company.com'
};
const retData = await api.user.register.validateEmail(params);
```
<a name="Register+execute"></a>

### register.execute(params) ⇒ <code>promise.&lt;object&gt;</code> \| <code>boolean</code> \| <code>boolean</code> \| <code>object</code> \| <code>string</code>
Method to register a user

**Kind**: instance method of [<code>Register</code>](#Register)  
**Returns**: <code>promise.&lt;object&gt;</code> - data<code>boolean</code> - data.success If the operation was successfully done (true|false)<code>boolean</code> - data.userAlreadyExists If the user already exists (true|false), if true, then the other information is not returned<code>object</code> - auth The full authentication data with session, if login is true.<code>string</code> - auth.redirectUrl The url to redirect.  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get task |
| params.registerId | <code>string</code> |  | The registerId that comes with the registration page context |
| params.type | <code>string</code> | <code>&quot;sign&quot;</code> | The type of the registration. By defailt, |
| params.login | <code>boolean</code> | <code>false</code> | If we want to login the user directly after registering the user successfully. If you have a redirect, the best option is to login automatically. |
| params.emailInfo | <code>object</code> |  | The information for the email validation |
| params.emailInfo.email | <code>string</code> |  | The email validation information |
| params.emailInfo.code | <code>string</code> |  | The 4 digit code to validate the email |
| params.registerData | <code>object</code> |  | The registration data |
| params.registerData.name | <code>string</code> |  | The name if the user |
| params.registerData.registerEmail | <code>string</code> |  | The email of the user |
| params.registerData.phone | <code>string</code> |  | The phone of the user |
| params.registerData.idcard | <code>string</code> |  | The ID card of the user |
| params.registerData.registerPassword | <code>string</code> |  | The user password in open text |
| params.registerData.emailValidationCode | <code>string</code> |  | The code used to validate the email |
| params.registerData.phoneValidationCode | <code>string</code> |  | The code used to validate the phone |
| params.registerData.language | <code>string</code> |  | The defaulf navigator language (i.e.: navigator.language) |
| params.registerData.timezone | <code>string</code> |  | The defaulf navigator timezone (i.e.: Intl.DateTimeFormat().resolvedOptions().timeZone) |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params ={
    "registerId": 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...',
    "type": 'sign',
    "login": false,
    "emailInfo": {
      "code": "5974",
      "email": "cbtoto_1@mailinator.com"
    },
    "registerData": {
      "name": "Augusto Totlo",
      "registerEmail": "cbtoto_1@mailinator.com",
      "phone": "",
      "idcard": "",
      "dob": "1978-01-12T03:00:00.000Z",
      "registerPassword": "123456",
      "emailValidationCode": "5974",
      "phoneValidationCode": "",
      "language": "en-US",
      "timezone": "Europe/Dublin"
    }
  };
const retData = await api.user.register.execute(params);
```
<a name="Settings"></a>

## Settings
Class for user settings

**Kind**: global class  

* [Settings](#Settings)
    * [.upsert(settings, session)](#Settings+upsert) ⇒ <code>Promise</code>
    * [.get(session)](#Settings+get) ⇒ <code>Promise</code>
    * [.remove(session)](#Settings+remove) ⇒ <code>Promise</code>

<a name="Settings+upsert"></a>

### settings.upsert(settings, session) ⇒ <code>Promise</code>
Adds/updates a user settings

**Kind**: instance method of [<code>Settings</code>](#Settings)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Full user settings |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const settings = {
 areaId: '55e4a3bd6be6b45210833fae'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.settings.upsert(settings, session);
```
<a name="Settings+get"></a>

### settings.get(session) ⇒ <code>Promise</code>
Gets the user settings. Returns an array of settings.

**Kind**: instance method of [<code>Settings</code>](#Settings)  
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
ret settings = await api.user.settings.get(session);
```
<a name="Settings+remove"></a>

### settings.remove(session) ⇒ <code>Promise</code>
Removes the user settings

**Kind**: instance method of [<code>Settings</code>](#Settings)  
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
await api.user.settings.remove(session);
```
<a name="Task"></a>

## Task
Class for task, permission user

**Kind**: global class  

* [Task](#Task)
    * [.findById(params, session)](#Task+findById) ⇒ <code>promise</code>
    * [.findByIdAndUpdate(params, session)](#Task+findByIdAndUpdate) ⇒ <code>Promise</code>
    * [.executeActionFinalize(params, session)](#Task+executeActionFinalize) ⇒ <code>Promise</code>

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

### task.findByIdAndUpdate(params, session) ⇒ <code>Promise</code>
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
| params.orgId | <code>string</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

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
<a name="Task+executeActionFinalize"></a>

### task.executeActionFinalize(params, session) ⇒ <code>Promise</code>
Find task by id and update

**Kind**: instance method of [<code>Task</code>](#Task)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params - to update task |
| params.taskId | <code>string</code> |  | Task id (_id database) |
| params.actionGuid | <code>string</code> |  | GUID of the action |
| params.orgId | <code>string</code> |  | Organization id (_id database) |
| params.payload | <code>any</code> | <code>{}</code> | Payload to send in action |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 taskId: '5df7f19618430c89a41a19d2',
 actionGuid: 'b3823a2ae52c7a05bfb9590fe427038d'
 orgId: '5df7f19618430c89a41a1bc3',
 payload: {}',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.executeActionFinalize(params, session);
```
<a name="TaskAvailable"></a>

## TaskAvailable
Class for available tasks, permission user

**Kind**: global class  

* [TaskAvailable](#TaskAvailable)
    * [.find(params, session)](#TaskAvailable+find) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
    * [.claim(params, session)](#TaskAvailable+claim) ⇒ <code>promise</code> \| <code>boolean</code>

<a name="TaskAvailable+find"></a>

### taskAvailable.find(params, session) ⇒ <code>promise</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>number</code> \| <code>number</code>
Method to find available tasks for a user

**Kind**: instance method of [<code>TaskAvailable</code>](#TaskAvailable)  
**Returns**: <code>promise</code> - returned data from the search<code>number</code> - count the count of items searched<code>array.&lt;object&gt;</code> - items the items returned from search<code>number</code> - page the page of the search (on pagination), zero indexed<code>number</code> - perPage how many items per page  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.query | <code>object</code> | Search available tasks query |
| params.orgId | <code>object</code> | Organization id (_id database) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 query: {"orgProcessId": {"value":"62c2d1cdfb5455c195d1baa1","oper":"=","type":"string"},"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
 orgId: '55e4a3bd6be6b45210833fae',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const retSearch = await api.user.task.available.find(params, session);
```
<a name="TaskAvailable+claim"></a>

### taskAvailable.claim(params, session) ⇒ <code>promise</code> \| <code>boolean</code>
Method for a user to claim an available task

**Kind**: instance method of [<code>TaskAvailable</code>](#TaskAvailable)  
**Returns**: <code>promise</code> - returned data from the method call<code>boolean</code> - success true|false if the method was successful  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to get task |
| params.taskId | <code>object</code> | the task id to claim |
| params.orgname | <code>object</code> | Organization slug (short name of the orgnization) |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 taskId: '55e4a3bd6be6b45210833f67',
 orgname: 'acme',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const success = await api.user.task.available.claim(params, session);
```
<a name="Updates"></a>

## Updates
Class for user registration in a user

**Kind**: global class  
<a name="Updates+get"></a>

### updates.get(session)
get updates

**Kind**: instance method of [<code>Updates</code>](#Updates)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>string</code> | JWT token |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.updates.get(session);
```
<a name="User"></a>

## User
Class for user, permission user

**Kind**: global class  

* [User](#User)
    * [.updateAvatar(params, session)](#User+updateAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#User+removeAvatar) ⇒ <code>Promise</code>
    * [.removeSignature(session)](#User+removeSignature) ⇒ <code>Promise</code>
    * [.saveSignature(data, session)](#User+saveSignature) ⇒ <code>Promise</code>
    * [.findByIdAndUpdate(params, session)](#User+findByIdAndUpdate) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.changeOrganization(id, session)](#User+changeOrganization) ⇒ <code>Promise</code>

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
await api.user.profile.updateAvatar(params, session);
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
await api.user.profile.removeAvatar(session);
```
<a name="User+removeSignature"></a>

### user.removeSignature(session) ⇒ <code>Promise</code>
Remove the signature of user by session

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
await api.user.profile.removeSignature(session);
```
<a name="User+saveSignature"></a>

### user.saveSignature(data, session) ⇒ <code>Promise</code>
Sava a new signature of user by session

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | The signature data to save |
| data.type | <code>string</code> | CURSIVE or HANDWRITE |
| data.file | <code>string</code> | CURSIVE the <fontname>:<name used on the signature>                      HANDWRITE the base 64 image (w/o the mime a base prefix) |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const data = {
   type: 'CURSIVE',
   file: 'allura:Mary John Heart'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.profile.saveSignature(data, session);

const API = require('@docbrasil/api-systemmanager');
const api = new API();
const data = {
   type: 'HANDWRITE',
   file: 'iVBORw0KGgoAAAANSUhEUgAAAj...'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.profile.saveSignature(session);
```
<a name="User+findByIdAndUpdate"></a>

### user.findByIdAndUpdate(params, session) ⇒ <code>Promise.&lt;void&gt;</code>
Update a user profile by id

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to update task |
| params.name | <code>string</code> | The name of the user |
| params.site | <code>string</code> | The site of the user |
| params.faceboook | <code>string</code> | The faceboook of the user |
| params.linkedin | <code>string</code> | The linkedin of the user |
| params.dob | <code>date</code> | The date of birth of the user |
| params.gender | <code>number.&lt;UserGender&gt;</code> | The gender of of the user self.gender |
| params.phone | <code>string</code> | The phone |
| params.phone2 | <code>string</code> | The phone 2 |
| params.phone3 | <code>string</code> | The phone 3 |
| params.password | <code>string</code> | The password to change |
| params.secQuestion | <code>string</code> | The security question |
| params.secAnswer | <code>string</code> | The security answer |
| params.timezone | <code>string</code> | The timezone |
| params.userLanguage | <code>string</code> | The user language |
| params.changePassword | <code>string</code> | (required) If we need to change the status and we changed the password |
| params.acceptTermsOfUse | <code>string</code> | If the user has accepted the terms of change |
| session | <code>string</code> | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 name: 'New Name'
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.profile.findByIdAndUpdate(params, session);
```
<a name="User+changeOrganization"></a>

### user.changeOrganization(id, session) ⇒ <code>Promise</code>
Change a user's organization

**Kind**: instance method of [<code>User</code>](#User)  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Organization id |
| session | <code>string</code> | Is token JWT of user NOT allow SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const id = '616eccaaa9360a05293b10fe';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.changeOrganization.updateAvatar(id, session);
```
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
    * [.getUploadDocumentsSignedUrl(docs, authorization)](#External+getUploadDocumentsSignedUrl) ⇒ <code>Promise.&lt;array&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
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
<a name="External+getUploadDocumentsSignedUrl"></a>

### external.getUploadDocumentsSignedUrl(docs, authorization) ⇒ <code>Promise.&lt;array&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
Get an upload signed url, for many documents. So it will be possible to upload documents temporarily during the use of the external form

**Kind**: instance method of [<code>External</code>](#External)  
**Returns**: <code>Promise.&lt;array&gt;</code> - docs<code>string</code> - docs.mime the original mime type of the document<code>string</code> - docs.signedUrl the signed url to upload the document<code>string</code> - docs.filename  the filename of the uploaded file<code>string</code> - docs.extension  the extension of the filename, obtained from the mime type  
**Access**: public  
**Author**: CloudBrasil <abernardo.br@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| docs | <code>array.&lt;object&gt;</code> | the list of documents |
| docs.mime | <code>string</code> | the mime type of the document |
| authorization | <code>string</code> | a legal authorization |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const authorization = '...';
const docs = [
   {
     mime: 'application/pdf'
   }
];
const retDocs = await api.external.getUploadDocumentsSignedUrl(docs, authorization);
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
