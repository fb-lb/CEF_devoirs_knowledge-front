[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/user-courses](../README.md) / UserCourses

# Class: UserCourses

Defined in: [src/app/services/user-courses.ts:10](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L10)

## Constructors

### Constructor

> **new UserCourses**(`http`): `UserCourses`

Defined in: [src/app/services/user-courses.ts:12](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L12)

#### Parameters

##### http

`HttpClient`

#### Returns

`UserCourses`

## Properties

### allCursusAvailable

> **allCursusAvailable**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:45](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L45)

***

### allElementsAvailable

> **allElementsAvailable**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:47](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L47)

***

### allLessonsAvailable

> **allLessonsAvailable**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:46](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L46)

***

### allThemesAvailable

> **allThemesAvailable**: `ThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:44](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L44)

***

### currentCursus$

> **currentCursus$**: `Observable`\<`CursusData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:65](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L65)

***

### currentLesson$

> **currentLesson$**: `Observable`\<`LessonData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:68](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L68)

***

### currentTheme$

> **currentTheme$**: `Observable`\<`ThemeData` \| `null`\>

Defined in: [src/app/services/user-courses.ts:62](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L62)

***

### currentUserCursus

> **currentUserCursus**: `UserCursusData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:76](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L76)

***

### currentUserLesson

> **currentUserLesson**: `UserLessonData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:78](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L78)

***

### currentUserTheme

> **currentUserTheme**: `UserThemeData` \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:74](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L74)

***

### cursusInCurrentTheme

> **cursusInCurrentTheme**: `CursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:84](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L84)

***

### elementsInCurrentLesson

> **elementsInCurrentLesson**: `ElementData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:86](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L86)

***

### initPromised

> **initPromised**: `Promise`\<`void`\> \| `null` = `null`

Defined in: [src/app/services/user-courses.ts:18](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L18)

***

### isInitialized

> **isInitialized**: `boolean` = `false`

Defined in: [src/app/services/user-courses.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L19)

***

### lessonsInCurrentCursus

> **lessonsInCurrentCursus**: `LessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:85](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L85)

***

### userCursusForThisUser

> **userCursusForThisUser**: `UserCursusData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:54](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L54)

***

### userLessonsForThisUser

> **userLessonsForThisUser**: `UserLessonData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:55](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L55)

***

### userThemesForThisUser

> **userThemesForThisUser**: `UserThemeData`[] = `[]`

Defined in: [src/app/services/user-courses.ts:53](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L53)

## Methods

### getCurrentCursus()

> **getCurrentCursus**(): `CursusData` \| `null`

Defined in: [src/app/services/user-courses.ts:108](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L108)

#### Returns

`CursusData` \| `null`

***

### getCurrentLesson()

> **getCurrentLesson**(): `LessonData` \| `null`

Defined in: [src/app/services/user-courses.ts:112](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L112)

#### Returns

`LessonData` \| `null`

***

### getCurrentTheme()

> **getCurrentTheme**(): `ThemeData` \| `null`

Defined in: [src/app/services/user-courses.ts:104](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L104)

#### Returns

`ThemeData` \| `null`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [src/app/services/user-courses.ts:22](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L22)

#### Returns

`Promise`\<`void`\>

***

### selectCurrentCursus()

> **selectCurrentCursus**(`newCursusId`): `void`

Defined in: [src/app/services/user-courses.ts:304](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L304)

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

Defined in: [src/app/services/user-courses.ts:338](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L338)

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

Defined in: [src/app/services/user-courses.ts:270](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L270)

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

Defined in: [src/app/services/user-courses.ts:145](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L145)

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

Defined in: [src/app/services/user-courses.ts:186](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L186)

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

Defined in: [src/app/services/user-courses.ts:166](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L166)

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

Defined in: [src/app/services/user-courses.ts:125](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L125)

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

Defined in: [src/app/services/user-courses.ts:226](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L226)

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

Defined in: [src/app/services/user-courses.ts:246](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L246)

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

Defined in: [src/app/services/user-courses.ts:206](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/user-courses.ts#L206)

**`Function`**

Fetches all available user-theme relations (for the requestor user) from the API.

#### Returns

`Promise`\<`void`\>

#### Async

syncUserThemesForThisUser

#### Throws

Will display an alert if the server cannot respond.
