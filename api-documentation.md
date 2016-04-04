#CLIFRE API

###USERS
--
`GET /users`

*Retrieve all users.* ***Authorization token is required***.
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Response

```
{
  [
    {
      "id": 1,
      "name": "test name",
      "email": "test@test.com",
      "identifier": "cbc7fc",
      "birthdate": "1990-10-13T00:00:00.000Z",
      "avatar": "[S3 URL IMAGE]"
    },
    {
      "id": 2,
      "name": "test name2",
      "email": "test2@test.com",
      "identifier": "cfe7fc",
      "birthdate": "1990-10-13T00:00:00.000Z",
      "avatar": "[S3 URL IMAGE]"
    },
    ...
  ]
}
```

`POST /users`

*Create new user. name, email, password are required. Only are allow jpeg or png images.*
>####Request

```
{
  "name": "new test name",
  "email": "test@test.com",
  "password": "12345678",
  "birthdate": "10/13/1990",
  "avatar": "data:image/[png or jpeg];base64,ad4sad4a..."
}
```

>####Response

```
{
  "access_token": "[oauth access token]"
}
```

`PUT /users`

*Update user. all fields are optional.* ***Authorization token is required***. *Only are allow jpeg or png images.*
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  "name": "new test name",
  "email": "test@test.com",
  "password": "12345678",
  "birthdate": "10/13/1990",
  "avatar": "data:image/[png or jpeg];base64,ad4sad4a..."
}
```

>####Response

```
{
  "id": 3,
  "name": "new test name",
  "avatar": "[S3 URL IMAGE]",
  "birthdate": "1990-10-13T00:00:00.000Z",
  "email": "test@test.com"
}
```
