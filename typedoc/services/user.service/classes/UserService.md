[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/user.service](../README.md) / UserService

# Class: UserService

Defined in: [src/app/services/user.service.ts:10](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L10)

## Constructors

### Constructor

> **new UserService**(`http`): `UserService`

Defined in: [src/app/services/user.service.ts:11](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L11)

#### Parameters

##### http

`HttpClient`

#### Returns

`UserService`

## Properties

### allUsers$

> **allUsers$**: `Observable`\<`UserData`[]\>

Defined in: [src/app/services/user.service.ts:37](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L37)

***

### initPromise

> **initPromise**: `Promise`\<`void`\> \| `null` = `null`

Defined in: [src/app/services/user.service.ts:16](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L16)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [src/app/services/user.service.ts:15](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L15)

## Accessors

### getAllUsers

#### Get Signature

> **get** **getAllUsers**(): `UserData`[]

Defined in: [src/app/services/user.service.ts:39](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L39)

##### Returns

`UserData`[]

## Methods

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/user.service.ts:18](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L18)

#### Returns

`Promise`\<`void`\>

***

### retrieveAllUsers()

> **retrieveAllUsers**(): `Promise`\<`void`\>

Defined in: [src/app/services/user.service.ts:52](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user.service.ts#L52)

**`Function`**

Fetches all users from the API and stores them.

#### Returns

`Promise`\<`void`\>

#### Async

retrieveAllUsers

#### Throws

If an unexpected error occurs
