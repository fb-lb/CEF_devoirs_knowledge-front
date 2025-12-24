[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [guards/user-auth-guard](../README.md) / userAuthGuard

# Function: userAuthGuard()

> **userAuthGuard**(`route`, `state`): `MaybeAsync`\<`GuardResult`\>

Defined in: [src/app/guards/user-auth-guard.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/guards/user-auth-guard.ts#L27)

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

## Async

## Description

- Sends a request to `/api/authentification/user` to validate the user session.
- If the request fails with an `HttpErrorResponse`, the user is redirected with a message
  explaining that he has to be connected to access this page.
- If another error occurs, the user is redirected with a more generic message.
