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
<dt><a href="#Dispatch">Dispatch</a></dt>
<dd><p>Api dispatch manager</p>
</dd>
<dt><a href="#GeoLocation">GeoLocation</a></dt>
<dd><p>General Class for user, permission organization</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>API request, user permission level</p>
</dd>
<dt><a href="#Login">Login</a></dt>
<dd><p>Login manager</p>
</dd>
<dt><a href="#Session">Session</a></dt>
<dd><p>Session manager of the API</p>
</dd>
<dt><a href="#Documents">Documents</a></dt>
<dd><p>Class for documents, permission user</p>
</dd>
<dt><a href="#Users">Users</a></dt>
<dd><p>API request, user permission level</p>
</dd>
<dt><a href="#Organization">Organization</a></dt>
<dd><p>Class for organizations, permission user</p>
</dd>
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

<a name="AdminDocuments"></a>

## AdminDocuments
Admin Class for documents, permission admin

**Kind**: global class  

* [AdminDocuments](#AdminDocuments)
    * [.advancedSearch(params, session)](#AdminDocuments+advancedSearch) ⇒ <code>Promise</code>
    * [.findById(params, session)](#AdminDocuments+findById) ⇒ <code>Promise</code>

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
    * [.sendSMS(params)](#AdminMessage+sendSMS) ⇒ <code>Promise.&lt;{}&gt;</code>
    * [.sendSMS(params)](#AdminMessage+sendSMS) ⇒ <code>Promise.&lt;{}&gt;</code>

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

<a name="AdminMessage+sendSMS"></a>

### adminMessage.sendSMS(params) ⇒ <code>Promise.&lt;{}&gt;</code>
Get geolocation

**Kind**: instance method of [<code>AdminMessage</code>](#AdminMessage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to get location |
| params.apiKey | <code>string</code> |  | Organization API key |
| params.message | <code>string</code> |  | The text message to send |
| params.recipient | <code>string</code> |  | The telephone number without with only numbers |
| params.limitSize | <code>number</code> | <code>130</code> | Size limit to send SMS |

<a name="AdminNotification"></a>

## AdminNotification
Admin Class for notification, permission admin

**Kind**: global class  

* [AdminNotification](#AdminNotification)
    * [.add(params, session)](#AdminNotification+add) ⇒ <code>Promise</code>
    * [.findById(params, session)](#AdminNotification+findById) ⇒ <code>Promise</code>
    * [.findByIdAndUpdate(params, session)](#AdminNotification+findByIdAndUpdate) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#AdminNotification+findByIdAndRemove) ⇒ <code>Promise</code>

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
    * [.findByIdAndUpdatePassword(params, session)](#AdminUser+findByIdAndUpdatePassword) ⇒ <code>Promise.&lt;unknown&gt;</code>
    * [.emailExist(email, session)](#AdminUser+emailExist)

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
<a name="Session"></a>

## Session
Session manager of the API

**Kind**: global class  
<a name="Session+information"></a>

### session.information(sessionId, session) ⇒ <code>Promise</code>
Show information for session (Valid token JWT)

**Kind**: instance method of [<code>Session</code>](#Session)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>string</code> | Is session (Token JWT) |
| session | <code>string</code> | Is session (token JWT) of th user SU |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const sessionId = 'eyJhbFVBBiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.session.information(token, session);
```
<a name="Documents"></a>

## Documents
Class for documents, permission user

**Kind**: global class  

* [Documents](#Documents)
    * [.add(params, session)](#Documents+add) ⇒ <code>Promise</code>
    * [.find(params, session)](#Documents+find) ⇒ <code>Promise</code>
    * [.findByIdAndRemove(params, session)](#Documents+findByIdAndRemove) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.findByIdsAndRemove(params, session)](#Documents+findByIdsAndRemove) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>number</code> \| <code>array.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.signedUrl(params, session)](#Documents+signedUrl) ⇒ <code>Promise.&lt;object&gt;</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code> \| <code>string</code>
    * [.uploadSignedDocument(params)](#Documents+uploadSignedDocument) ⇒ <code>Promise.&lt;boolean&gt;</code>

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
 orgIdId: '5df7f19618430c89a41a19d2',
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
 orgIdId: '5df7f19618430c89a41a19d2',
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
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const { doc: { docId, name, areaId, type, signedUrl } } = await api.user.document.signedUrl(params, session);
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
<a name="Documents+uploadSignedDocument"></a>

### documents.uploadSignedDocument(params) ⇒ <code>Promise.&lt;boolean&gt;</code>
Uploads the file

**Kind**: instance method of [<code>Documents</code>](#Documents)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if success  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Params to upload document |
| params.content | <code>string</code> \| <code>buffer</code> | The content of the file (base64 or Buffer) |
| params.signedUrl | <code>string</code> | The signed URL |
| params.type | <code>string</code> | The file mime type |

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

<a name="Organization"></a>

## Organization
Class for organizations, permission user

**Kind**: global class  

* [Organization](#Organization)
    * [.findById(orgId, session)](#Organization+findById)
    * [.idCardExist(idcard, session)](#Organization+idCardExist)
    * [.callFetch(params, params)](#Organization+callFetch) ⇒ <code>promise</code> \| <code>promise</code>

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
<a name="Organization+callFetch"></a>

### organization.callFetch(params, params) ⇒ <code>promise</code> \| <code>promise</code>
Call URL internal, need auth JWT (session)

**Kind**: instance method of [<code>Organization</code>](#Organization)  
**Access**: public  
**Author**: Augusto Pissarra <abernardo.br@gmail.com>  
**Author**: Thiago Anselmo <thiagoo.anselmoo@gmail.com>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | Params to call fectch (URL internal) |
| params.url | <code>string</code> |  | URL to call |
| [params.method] | <code>string</code> | <code>&quot;POST&quot;</code> | Fetch Method |
| params.payload | <code>string</code> |  | Payload to send |
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
<a name="Process"></a>

## Process
Class for process, permission user

**Kind**: global class  

* [Process](#Process)
    * [.start(params, session)](#Process+start) ⇒ <code>Promise</code>
    * [.getProcessProperties(params, session)](#Process+getProcessProperties) ⇒ <code>Promise</code>

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
| params.orgId | <code>any</code> | <code>{}</code> | Payload to send in action |
| session | <code>string</code> |  | Session, token JWT |

**Example**  
```js
const API = require('@docbrasil/api-systemmanager');
const api = new API();
const params = {
 taskId: '5df7f19618430c89a41a19d2',
 actionGuid: 'b3823a2ae52c7a05bfb9590fe427038d'
 orgId: '5df7f19618430c89a41a1bc3',
 body: {}',
};
const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
await api.user.task.executeActionFinalize(params, session);
```
<a name="User"></a>

## User
Class for user, permission user

**Kind**: global class  

* [User](#User)
    * [.updateAvatar(params, session)](#User+updateAvatar) ⇒ <code>Promise</code>
    * [.removeAvatar(session)](#User+removeAvatar) ⇒ <code>Promise</code>

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
