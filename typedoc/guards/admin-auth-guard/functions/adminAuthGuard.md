[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [guards/admin-auth-guard](../README.md) / adminAuthGuard

# Function: adminAuthGuard()

> **adminAuthGuard**(`route`, `state`): `MaybeAsync`\<`GuardResult`\>

Defined in: [src/app/guards/admin-auth-guard.ts:27](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/guards/admin-auth-guard.ts#L27)

Guard that checks whether the current user has admin privileges.

 adminAuthGuard

## Parameters

### route

`ActivatedRouteSnapshot`

The route that is being accessed.

### state

`RouterStateSnapshot`

The current router state.

## Returns

`MaybeAsync`\<`GuardResult`\>

Returns `true` if the user is an admin,
otherwise returns a `UrlTree` redirecting the user to the home page
with an error message in query parameters.

## Async

## Description

- Sends a request to `/api/authentification/admin` to validate the admin session.
- If the request fails with an `HttpErrorResponse`, the user is redirected with a message
  explaining that admin rights are required.
- If another error occurs, the user is redirected with a more generic message.
