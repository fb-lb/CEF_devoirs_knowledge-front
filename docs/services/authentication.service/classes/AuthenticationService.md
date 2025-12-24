[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/authentication.service](../README.md) / AuthenticationService

# Class: AuthenticationService

Defined in: src/app/services/authentication.service.ts:9

## Constructors

### Constructor

> **new AuthenticationService**(): `AuthenticationService`

#### Returns

`AuthenticationService`

## Properties

### isAdmin$

> **isAdmin$**: `Observable`\<`boolean`\>

Defined in: src/app/services/authentication.service.ts:18

***

### isAuthenticated$

> **isAuthenticated$**: `Observable`\<`boolean`\>

Defined in: src/app/services/authentication.service.ts:15

***

### isTokenRefreshAllowed

> **isTokenRefreshAllowed**: `boolean` = `true`

Defined in: src/app/services/authentication.service.ts:20

## Methods

### connected()

> **connected**(`authHeader`): `void`

Defined in: src/app/services/authentication.service.ts:65

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

Defined in: src/app/services/authentication.service.ts:89

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

Defined in: src/app/services/authentication.service.ts:102

**`Function`**

Used to block token refresh 2 secondes to not spam the connected function for each response
 freezeTokenRefresh

#### Returns

`void`

***

### getIsAdmin()

> **getIsAdmin**(): `boolean`

Defined in: src/app/services/authentication.service.ts:29

#### Returns

`boolean`

***

### getIsAuthenticated()

> **getIsAuthenticated**(): `boolean`

Defined in: src/app/services/authentication.service.ts:22

#### Returns

`boolean`

***

### init()

> **init**(): `void`

Defined in: src/app/services/authentication.service.ts:36

#### Returns

`void`

***

### setIsAdmin()

> **setIsAdmin**(`isAdmin`): `void`

Defined in: src/app/services/authentication.service.ts:32

#### Parameters

##### isAdmin

`boolean`

#### Returns

`void`

***

### setIsAuthenticated()

> **setIsAuthenticated**(`isAuthenticated`): `void`

Defined in: src/app/services/authentication.service.ts:25

#### Parameters

##### isAuthenticated

`boolean`

#### Returns

`void`
