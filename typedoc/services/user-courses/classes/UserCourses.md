[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/user-courses](../README.md) / UserCourses

# Class: UserCourses

Defined in: [src/app/services/user-courses.ts:10](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L10)

## Constructors

### Constructor

> **new UserCourses**(`http`): `UserCourses`

Defined in: [src/app/services/user-courses.ts:12](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L12)

#### Parameters

##### http

`HttpClient`

#### Returns

`UserCourses`

## Properties

### allCursusAvailable

> **allCursusAvailable**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:75](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L75)

***

### allElementsAvailable

> **allElementsAvailable**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:77](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L77)

***

### allLessonsAvailable

> **allLessonsAvailable**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:76](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L76)

***

### allThemesAvailable

> **allThemesAvailable**: `ThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:74](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L74)

***

### currentCursus$

> **currentCursus$**: `Observable`\<`CursusData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:95](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L95)

***

### currentLesson$

> **currentLesson$**: `Observable`\<`LessonData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:98](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L98)

***

### currentTheme$

> **currentTheme$**: `Observable`\<`ThemeData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:92](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L92)

***

### currentUserCursus

> **currentUserCursus**: `UserCursusData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:106](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L106)

***

### currentUserLesson

> **currentUserLesson**: `UserLessonData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:108](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L108)

***

### currentUserTheme

> **currentUserTheme**: `UserThemeData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:104](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L104)

***

### cursusInCurrentTheme

> **cursusInCurrentTheme**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:114](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L114)

***

### elementsInCurrentLesson

> **elementsInCurrentLesson**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:116](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L116)

***

### initPromised

> **initPromised**: `Promise`\<`void`\> \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:18](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L18)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [src/app/services/user-courses.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L19)

***

### lessonsInCurrentCursus

> **lessonsInCurrentCursus**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:115](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L115)

***

### userCursusForThisUser

> **userCursusForThisUser**: `UserCursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:84](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L84)

***

### userLessonsForThisUser

> **userLessonsForThisUser**: `UserLessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:85](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L85)

***

### userThemesForThisUser

> **userThemesForThisUser**: `UserThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:83](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L83)

## Methods

### getCurrentCursus()

> **getCurrentCursus**(): `CursusData` \| `null`

Defined in: [src/app/services/user-courses.ts:138](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L138)

#### Returns

`CursusData` \| `null`

***

### getCurrentLesson()

> **getCurrentLesson**(): `LessonData` \| `null`

Defined in: [src/app/services/user-courses.ts:142](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L142)

#### Returns

`LessonData` \| `null`

***

### getCurrentTheme()

> **getCurrentTheme**(): `ThemeData` \| `null`

Defined in: [src/app/services/user-courses.ts:134](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L134)

#### Returns

`ThemeData` \| `null`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L22)

#### Returns

`Promise`\<`void`\>

***

### reset()

> **reset**(): `void`

Defined in: [src/app/services/user-courses.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L44)

#### Returns

`void`

***

### selectCurrentCursus()

> **selectCurrentCursus**(`newCursusId`): `void`

Defined in: [src/app/services/user-courses.ts:334](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L334)

**`Function`**

Retrieves and sets the current cursus.

 selectCurrentCursus

#### Parameters

##### newCursusId

The ID of the cursus to select.

`number` | `null`

#### Returns

`void`

#### Description

- If newCursusId is null, it sets to null currentCursus, currentUserCursus and lessonsInCurrentCursus list.
- Otherwise it retrieves and sets current cursus and also the currentUserCursus and find the lessons to push in lessonsInCurrentCursus.

***

### selectCurrentLesson()

> **selectCurrentLesson**(`newLessonId`): `void`

Defined in: [src/app/services/user-courses.ts:368](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L368)

**`Function`**

Retrieves and sets the current lesson.

 selectCurrentLesson

#### Parameters

##### newLessonId

The ID of the lesson to select.

`number` | `null`

#### Returns

`void`

#### Description

- If newLessonId is null, it sets to null currentLesson, currentUserLesson and elementsInCurrentLesson list.
- Otherwise it retrieves and sets current lesson and also the currentUserLesson and find the elements to push in elementsInCurrentLesson.

***

### selectCurrentTheme()

> **selectCurrentTheme**(`newThemeId`): `void`

Defined in: [src/app/services/user-courses.ts:300](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L300)

**`Function`**

Retrieves and sets the current theme.

 selectCurrentTheme

#### Parameters

##### newThemeId

The ID of the theme to select.

`number` | `null`

#### Returns

`void`

#### Description

- If newThemeId is null, it sets to null currentTheme, currentUserTheme and cursusInCurrentTheme list.
- Otherwise it retrieves and sets current theme and also the currentUserTheme and find the cursus to push in cursusInCurrentTheme.

***

### syncAllCursusAvailable()

> **syncAllCursusAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:175](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L175)

**`Function`**

Fetches all available cursus (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllCursusAvailable

#### Throws

Will display an alert if the server cannot respond.

***

### syncAllElementsAvailable()

> **syncAllElementsAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:216](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L216)

**`Function`**

Fetches all available elements (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllElementsAvailable

#### Throws

Will display an alert if the server cannot respond.

***

### syncAllLessonsAvailable()

> **syncAllLessonsAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:196](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L196)

**`Function`**

Fetches all available lessons (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllLessonsAvailable

#### Throws

Will display an alert if the server cannot respond.

***

### syncAllThemesAvailable()

> **syncAllThemesAvailable**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:155](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L155)

**`Function`**

Fetches all available themes (for the requestor user) from the API and stores them sorted by order.

#### Returns

`Promise`\<`void`\>

#### Async

syncAllThemesAvailable

#### Throws

Will display an alert if the server cannot respond.

***

### syncUserCursusForThisUser()

> **syncUserCursusForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:256](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L256)

**`Function`**

Fetches all available user-cursus relations (for the requestor user) from the APIr.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserCursusForThisUser

#### Throws

Will display an alert if the server cannot respond.

***

### syncUserLessonsForThisUser()

> **syncUserLessonsForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:276](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L276)

**`Function`**

Fetches all available user-lesson relations (for the requestor user) from the API.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserLessonsForThisUser

#### Throws

Will display an alert if the server cannot respond.

***

### syncUserThemesForThisUser()

> **syncUserThemesForThisUser**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:236](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/services/user-courses.ts#L236)

**`Function`**

Fetches all available user-theme relations (for the requestor user) from the API.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserThemesForThisUser

#### Throws

Will display an alert if the server cannot respond.
