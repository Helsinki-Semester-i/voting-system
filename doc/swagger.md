Helsinki e-Voting
=================
Helsinki Voting System REST API.`

**Version:** 0.0.1

**Terms of service:**  
https://github.com/andresbarroe/voting-system

**License:** [MIT License](https://raw.githubusercontent.com/andresbarroe/voting-system/master/LICENSE)

### Security
---
**voting_auth**  

|oauth2|*OAuth 2.0*|
|---|---|
|Flow|implicit|
|**Scopes**||
|write:users|modify users in the system|
|read:polls|read poll data|

**api_key**  

|apiKey|*API Key*|
|---|---|
|Name|api_key|
|In|header|

### /user
---
##### ***POST***
**Summary:** Create user

**Description:** This can only be done by the logged in user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Created user object | Yes | [User](#user) |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /user/login
---
##### ***GET***
**Summary:** Logs user into the system

**Description:** 

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | query | The user name for login | Yes | string |
| password | query | The password for login in clear text | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | string |
| 400 | Invalid username/password supplied |  |

### /user/logout
---
##### ***GET***
**Summary:** Logs out current logged in user session

**Description:** 

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /user/{username}
---
##### ***GET***
**Summary:** Get user by user name

**Description:** 

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path | The name that needs to be fetched. | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |
| 400 | Invalid username supplied |  |
| 404 | User not found |  |

##### ***PUT***
**Summary:** Updated user

**Description:** This can only be done by the logged in user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path | name that need to be updated | Yes | string |
| body | body | Updated user object | Yes | [User](#user) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid user supplied |
| 404 | User not found |

##### ***DELETE***
**Summary:** Delete user

**Description:** This can only be done by the logged in user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path | The name that needs to be deleted | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 400 | Invalid username supplied |
| 404 | User not found |

### /poll
---
##### ***POST***
**Summary:** Create a new poll

**Description:** Creates poll in the organization

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| name | path | The name of the poll | Yes | string |
| body | body | Created poll object | Yes | [Poll](#poll) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 201 | Poll created |
| 403 | Not enough permissions to perform this action |

### /poll/byuser/{username}
---
##### ***GET***
**Summary:** Find polls for user

**Description:** Returns a collection of polls available for the user

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| username | path | username that can participate in the poll | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Poll](#poll) ] |
| 400 | Invalid ID supplied |  |
| 404 | Poll not found |  |

### /poll/{poll_id}
---
##### ***PUT***
**Summary:** Updates a poll by Id

**Description:** This can only be done by the logged in user with administrator privileges.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| poll_id | path | poll that need to be updated | Yes | string |
| body | body | Updated poll object | Yes | [Poll](#poll) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | Poll updated |
| 400 | Invalid poll supplied |
| 403 | Not enough permissions to perform this action. |
| 404 | Poll not found |

##### ***DELETE***
**Summary:** Delete a poll

**Description:** This can only be done by the logged in user with administrator privileges.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| poll_id | path | The id of the poll that needs to be deleted | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 204 | Poll deleted. No further data to show |
| 400 | Invalid poll id supplied |
| 403 | Not enough permissions to perform this action. |
| 404 | User not found |

### /vote
---
##### ***POST***
**Summary:** Create vote

**Description:** This can only be done by the logged in user.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Created vote object | Yes | [Vote](#vote) |

**Responses**

| Code | Description |
| ---- | ----------- |
| default | successful operation |

### /vote/{unique_code}
---
##### ***GET***
**Summary:** Retrieve vote

**Description:** Get details of an individual vote

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| unique_code | path | Get a vote by an unique code | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Vote](#vote) ] |
| 400 | Invalid Vote ID |  |
| 404 | Vote not found |  |

### Models
---

### User  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| username | string |  | No |
| firstName | string |  | No |
| lastName | string |  | No |
| email | string |  | No |
| password | string |  | No |
| phone | string |  | No |
| userStatus | integer | User Status | No |

### Poll  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| participants | [ string ] |  | No |
| anonymous | boolean |  | No |
| questions | [ [Question](#question) ] |  | No |

### Question  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| question | string |  | No |
| open | boolean |  | No |
| answers | [ string ] |  | No |

### Vote  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | long |  | No |
| unique_code | string |  | No |
| date | date |  | No |
| poll_id | long |  | No |
| voter_id | long |  | No |
| votes | [ object ] |  | No |
