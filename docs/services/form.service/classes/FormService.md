[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [services/form.service](../README.md) / FormService

# Class: FormService

Defined in: [src/app/services/form.service.ts:7](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/form.service.ts#L7)

## Constructors

### Constructor

> **new FormService**(): `FormService`

#### Returns

`FormService`

## Methods

### getAllErrorMessages()

> **getAllErrorMessages**(`form`, `inputName`): `string`[]

Defined in: [src/app/services/form.service.ts:35](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/form.service.ts#L35)

**`Function`**

Used in template to retrieve all field errors in form for a specific field.

 getAllErrorMessages

#### Parameters

##### form

`FormGroup`

The FormGroup containing the control to check

##### inputName

`string`

The control name to retrieve in the FormGroup

#### Returns

`string`[]

Returns a list of messages related to field errors.

***

### isInputValid()

> **isInputValid**(`form`, `inputName`): `boolean`

Defined in: [src/app/services/form.service.ts:19](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/services/form.service.ts#L19)

**`Function`**

Used to display form errors in templates
 isInputValid

#### Parameters

##### form

`FormGroup`

The FormGroup containing the control to check

##### inputName

`string`

The control name to retrieve in the FormGroup

#### Returns

`boolean`

Returns `true` if the control to check is invalid and has been touched by the user
else it returns `false`.
