# Context

This folder contains React context providers for app-wide state.

## AuthContext

`AuthContext.jsx` is the only implemented context today.

It stores:

- `user`
- `token`
- `loading`

It exposes:

- `login(token, user)`
- `logout()`

On initial load, it reads `localStorage["token"]` and verifies the token with the backend `GET /me` endpoint.

## Known Issue

The current backend returns:

```json
{
  "email": "user@example.com"
}
```

`AuthContext.jsx` currently reads `data.sub`. Align this before relying on restored user display names.
