[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/courses.service](../README.md) / CoursesService

# Class: CoursesService

Defined in: [src/app/services/courses.service.ts:11](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L11)

## Constructors

### Constructor

> **new CoursesService**(`http`, `authService`): `CoursesService`

Defined in: [src/app/services/courses.service.ts:12](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L12)

#### Parameters

##### http

`HttpClient`

##### authService

[`AuthenticationService`](../../authentication.service/classes/AuthenticationService.md)

#### Returns

`CoursesService`

## Properties

### allCursus$

> **allCursus$**: `Observable`\<`CursusData`[]\>

Defined in: [src/app/services/courses.service.ts:21](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L21)

***

### allElements$

> **allElements$**: `Observable`\<`ElementData`[]\>

Defined in: [src/app/services/courses.service.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L27)

***

### allLessons$

> **allLessons$**: `Observable`\<`LessonData`[]\>

Defined in: [src/app/services/courses.service.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L24)

***

### allThemes$

> **allThemes$**: `Observable`\<`ThemeData`[]\>

Defined in: [src/app/services/courses.service.ts:18](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L18)

***

### initPromise

> **initPromise**: `Promise`\<`void`\> \| `null` = `null`

Defined in: [src/app/services/courses.service.ts:15](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L15)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [src/app/services/courses.service.ts:14](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L14)

## Accessors

### getAllCursus

#### Get Signature

> **get** **getAllCursus**(): `CursusData`[]

Defined in: [src/app/services/courses.service.ts:65](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L65)

##### Returns

`CursusData`[]

***

### getAllElements

#### Get Signature

> **get** **getAllElements**(): `ElementData`[]

Defined in: [src/app/services/courses.service.ts:81](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L81)

##### Returns

`ElementData`[]

***

### getAllLessons

#### Get Signature

> **get** **getAllLessons**(): `LessonData`[]

Defined in: [src/app/services/courses.service.ts:73](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L73)

##### Returns

`LessonData`[]

***

### getAllThemes

#### Get Signature

> **get** **getAllThemes**(): `ThemeData`[]

Defined in: [src/app/services/courses.service.ts:57](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L57)

##### Returns

`ThemeData`[]

***

### setAllElements

#### Set Signature

> **set** **setAllElements**(`newValue`): `void`

Defined in: [src/app/services/courses.service.ts:85](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L85)

##### Parameters

###### newValue

`ElementData`[]

##### Returns

`void`

## Methods

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:33](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L33)

#### Returns

`Promise`\<`void`\>

***

### retrieveAllCursus()

> **retrieveAllCursus**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:138](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L138)

**`Function`**

Fetches all cursus from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

retrieveAllCursus

#### Throws

If an unexpected error occurs

***

### retrieveAllData()

> **retrieveAllData**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:93](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L93)

#### Returns

`Promise`\<`void`\>

***

### retrieveAllElements()

> **retrieveAllElements**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:176](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L176)

**`Function`**

Fetches all elements from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

retrieveAllElements

#### Throws

If an unexpected error occurs

***

### retrieveAllLessons()

> **retrieveAllLessons**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:157](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L157)

**`Function`**

Fetches all lessons from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

retrieveAllLessons

#### Throws

If an unexpected error occurs

***

### retrieveAllThemes()

> **retrieveAllThemes**(): `Promise`\<`void`\>

Defined in: [src/app/services/courses.service.ts:119](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/courses.service.ts#L119)

**`Function`**

Fetches all themes from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

retrieveAllThemes

#### Throws

If an unexpected error occurs
