[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [guards/user-auth-guard](../README.md) / userAuthGuard

# Function: userAuthGuard()

> **userAuthGuard**(`route`, `state`): `MaybeAsync`\<`GuardResult`\>

Defined in: [src/app/guards/user-auth-guard.ts:24](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/1eda2ccc1e07a7ecab9604ca759bb89f2e164e03/src/app/guards/user-auth-guard.ts#L24)

Guard that checks whether the current user is connected as a user.

 userAuthGuard

## Parameters

### route

`ActivatedRouteSnapshot`

The route that is being accessed.

### state

`RouterStateSnapshot`

The current router state.

## Returns

`MaybeAsync`\<`GuardResult`\>

Returns `true` if the user is connected as a user,
otherwise returns a `UrlTree` redirecting the user to the home page
with an error message in query parameters.

## Description

- Checks that user has a cookie named 'isAuth'.
- If true, it validates user session otherwise the user is redirected with a message
  explaining that user rights are required.
