[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/authentication.service](../README.md) / AuthenticationService

# Class: AuthenticationService

Defined in: [src/app/services/authentication.service.ts:11](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L11)

## Constructors

### Constructor

> **new AuthenticationService**(`http`): `AuthenticationService`

Defined in: [src/app/services/authentication.service.ts:40](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L40)

#### Parameters

##### http

`HttpClient`

#### Returns

`AuthenticationService`

## Properties

### isAdmin$

> **isAdmin$**: `Observable`\<`boolean`\>

Defined in: [src/app/services/authentication.service.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L22)

***

### isAuthenticated$

> **isAuthenticated$**: `Observable`\<`boolean`\>

Defined in: [src/app/services/authentication.service.ts:17](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L17)

***

### isTokenRefreshAllowed

> **isTokenRefreshAllowed**: `boolean` = `true`

Defined in: [src/app/services/authentication.service.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L24)

***

### isVerified

> **isVerified**: `boolean` = `false`

Defined in: [src/app/services/authentication.service.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L19)

## Methods

### checkIsVerified()

> **checkIsVerified**(): `Promise`\<`void`\>

Defined in: [src/app/services/authentication.service.ts:96](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L96)

**`Function`**

Used to set isVerified (= email is verified) state in front end app

#### Returns

`Promise`\<`void`\>

#### Async

checkIsVerified

#### Throws

If an unexpected error occurs

***

### connected()

> **connected**(`authHeader`): `void`

Defined in: [src/app/services/authentication.service.ts:72](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L72)

**`Function`**

Used to set connected state in front end app and to save refreshed token
 connected

#### Parameters

##### authHeader

`string`

The value of Authorization header in response

#### Returns

`void`

#### Description

- check that token is Brearer token format
- store the Authorization header response value in local storage
- check if user is admin or not

***

### disconnected()

> **disconnected**(): `void`

Defined in: [src/app/services/authentication.service.ts:118](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L118)

**`Function`**

Used to set disconnected state in front end app
 disconnected

#### Returns

`void`

#### Description

- remove token in local storage

***

### freezeTokenRefresh()

> **freezeTokenRefresh**(): `void`

Defined in: [src/app/services/authentication.service.ts:132](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L132)

**`Function`**

Used to block token refresh 2 secondes to not spam the connected function for each response
 freezeTokenRefresh

#### Returns

`void`

***

### getIsAdmin()

> **getIsAdmin**(): `boolean`

Defined in: [src/app/services/authentication.service.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L33)

#### Returns

`boolean`

***

### getIsAuthenticated()

> **getIsAuthenticated**(): `boolean`

Defined in: [src/app/services/authentication.service.ts:26](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L26)

#### Returns

`boolean`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/authentication.service.ts:42](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L42)

#### Returns

`Promise`\<`void`\>

***

### setIsAdmin()

> **setIsAdmin**(`isAdmin`): `void`

Defined in: [src/app/services/authentication.service.ts:36](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L36)

#### Parameters

##### isAdmin

`boolean`

#### Returns

`void`

***

### setIsAuthenticated()

> **setIsAuthenticated**(`isAuthenticated`): `void`

Defined in: [src/app/services/authentication.service.ts:29](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/authentication.service.ts#L29)

#### Parameters

##### isAuthenticated

`boolean`

#### Returns

`void`
