[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/user-courses](../README.md) / UserCourses

# Class: UserCourses

Defined in: [src/app/services/user-courses.ts:11](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L11)

## Constructors

### Constructor

> **new UserCourses**(`http`, `authService`): `UserCourses`

Defined in: [src/app/services/user-courses.ts:13](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L13)

#### Parameters

##### http

`HttpClient`

##### authService

[`AuthenticationService`](../../authentication.service/classes/AuthenticationService.md)

#### Returns

`UserCourses`

## Properties

### allCursusAvailable

> **allCursusAvailable**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:85](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L85)

***

### allElementsAvailable

> **allElementsAvailable**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:87](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L87)

***

### allLessonsAvailable

> **allLessonsAvailable**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:86](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L86)

***

### allThemesAvailable

> **allThemesAvailable**: `ThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:84](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L84)

***

### currentCursus$

> **currentCursus$**: `Observable`\<`CursusData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:105](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L105)

***

### currentLesson$

> **currentLesson$**: `Observable`\<`LessonData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:108](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L108)

***

### currentTheme$

> **currentTheme$**: `Observable`\<`ThemeData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:102](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L102)

***

### currentUserCursus

> **currentUserCursus**: `UserCursusData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:116](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L116)

***

### currentUserLesson

> **currentUserLesson**: `UserLessonData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:118](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L118)

***

### currentUserTheme

> **currentUserTheme**: `UserThemeData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:114](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L114)

***

### cursusInCurrentTheme

> **cursusInCurrentTheme**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:124](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L124)

***

### elementsInCurrentLesson

> **elementsInCurrentLesson**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:126](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L126)

***

### initPromised

> **initPromised**: `Promise`\<`void`\> \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L19)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [src/app/services/user-courses.ts:20](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L20)

***

### lessonsInCurrentCursus

> **lessonsInCurrentCursus**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:125](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L125)

***

### userCursusForThisUser

> **userCursusForThisUser**: `UserCursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:94](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L94)

***

### userLessonsForThisUser

> **userLessonsForThisUser**: `UserLessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:95](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L95)

***

### userThemesForThisUser

> **userThemesForThisUser**: `UserThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:93](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L93)

## Methods

### getCurrentCursus()

> **getCurrentCursus**(): `CursusData` \| `null`

Defined in: [src/app/services/user-courses.ts:148](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L148)

#### Returns

`CursusData` \| `null`

***

### getCurrentLesson()

> **getCurrentLesson**(): `LessonData` \| `null`

Defined in: [src/app/services/user-courses.ts:152](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L152)

#### Returns

`LessonData` \| `null`

***

### getCurrentTheme()

> **getCurrentTheme**(): `ThemeData` \| `null`

Defined in: [src/app/services/user-courses.ts:144](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L144)

#### Returns

`ThemeData` \| `null`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:23](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L23)

#### Returns

`Promise`\<`void`\>

***

### reset()

> **reset**(): `void`

Defined in: [src/app/services/user-courses.ts:54](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L54)

#### Returns

`void`

***

### selectCurrentCursus()

> **selectCurrentCursus**(`newCursusId`): `void`

Defined in: [src/app/services/user-courses.ts:337](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L337)

**`Function`**

Retrieves and sets the current cursus.

 selectCurrentCursus

#### Parameters

##### newCursusId

`number` \| `null`

The ID of the cursus to select.

#### Returns

`void`

#### Description

- If newCursusId is null, it sets to null currentCursus, currentUserCursus and lessonsInCurrentCursus list.
- Otherwise it retrieves and sets current cursus and also the currentUserCursus and find the lessons to push in lessonsInCurrentCursus.

***

### selectCurrentLesson()

> **selectCurrentLesson**(`newLessonId`): `void`

Defined in: [src/app/services/user-courses.ts:371](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L371)

**`Function`**

Retrieves and sets the current lesson.

 selectCurrentLesson

#### Parameters

##### newLessonId

`number` \| `null`

The ID of the lesson to select.

#### Returns

`void`

#### Description

- If newLessonId is null, it sets to null currentLesson, currentUserLesson and elementsInCurrentLesson list.
- Otherwise it retrieves and sets current lesson and also the currentUserLesson and find the elements to push in elementsInCurrentLesson.

***

### selectCurrentTheme()

> **selectCurrentTheme**(`newThemeId`): `void`

Defined in: [src/app/services/user-courses.ts:303](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L303)

**`Function`**

Retrieves and sets the current theme.

 selectCurrentTheme

#### Parameters

##### newThemeId

`number` \| `null`

The ID of the theme to select.

#### Returns

`void`

#### Description

- If newThemeId is null, it sets to null currentTheme, currentUserTheme and cursusInCurrentTheme list.
- Otherwise it retrieves and sets current theme and also the currentUserTheme and find the cursus to push in cursusInCurrentTheme.

***

### syncAllCursusAvailable()

> **syncAllCursusAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:184](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L184)

**`Function`**

Fetches all available cursus (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllCursusAvailable

#### Throws

If an unexpected error occurs

***

### syncAllElementsAvailable()

> **syncAllElementsAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:223](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L223)

**`Function`**

Fetches all available elements (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllElementsAvailable

#### Throws

If an unexpected error occurs

***

### syncAllLessonsAvailable()

> **syncAllLessonsAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:204](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L204)

**`Function`**

Fetches all available lessons (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllLessonsAvailable

#### Throws

If an unexpected error occurs

***

### syncAllThemesAvailable()

> **syncAllThemesAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:165](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L165)

**`Function`**

Fetches all available themes (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllThemesAvailable

#### Throws

If an unexpected error occurs

***

### syncData()

> **syncData**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:36](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L36)

#### Returns

`Promise`\<`void`\>

***

### syncUserCursusForThisUser()

> **syncUserCursusForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:261](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L261)

**`Function`**

Fetches all available user-cursus relations (for the requestor user) from the APIr.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserCursusForThisUser

#### Throws

If an unexpected error occurs

***

### syncUserLessonsForThisUser()

> **syncUserLessonsForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:280](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L280)

**`Function`**

Fetches all available user-lesson relations (for the requestor user) from the API.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserLessonsForThisUser

#### Throws

If an unexpected error occurs

***

### syncUserThemesForThisUser()

> **syncUserThemesForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:242](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/6aeb25b76edb59989119140b26b6653b865e2991/src/app/services/user-courses.ts#L242)

**`Function`**

Fetches all available user-theme relations (for the requestor user) from the API.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserThemesForThisUser

#### Throws

If an unexpected error occurs
