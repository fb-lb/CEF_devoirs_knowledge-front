[**knowledge-front v0.0.0**](../../../README.md)

***

[knowledge-front](../../../modules.md) / [guards/not-auth-guard](../README.md) / notAuthGuard

# Function: notAuthGuard()

> **notAuthGuard**(`route`, `state`): `MaybeAsync`\<`GuardResult`\>

Defined in: [src/app/guards/not-auth-guard.ts:23](https://github.com/fb-lb/CEF_devoirs_knowledge-front/blob/9062dea383092b0110ab0a34d38a609da725c218/src/app/guards/not-auth-guard.ts#L23)

Guard that checks whether the current user is not connected.

 notAuthGuard

## Parameters

### route

`ActivatedRouteSnapshot`

The route that is being accessed.

### state

`RouterStateSnapshot`

The current router state.

## Returns

`MaybeAsync`\<`GuardResult`\>

Returns `true` if the user is not connected,
otherwise returns a `UrlTree` redirecting the user to the home page
with an error message in query parameters.

## Description

- Checks that user has not a a token in local storage.
- If true, it validates the access to the page otherwise the user is redirected with a message
  explaining that he needs to be disconnected.
