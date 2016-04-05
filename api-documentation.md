#CLIFRE API

###USERS
--
##### Get All Users
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

#####Create User
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

#####Update User
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
  "identifier": "6957e1",
  "birthdate": "1990-10-13T00:00:00.000Z",
  "email": "test@test.com"
}
```

#####User Profile
`GET /users/profile`

*User detail.* ***Authorization token is required.***
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Response

```
{
  "id": 3,
  "name": "new test name",
  "avatar": "[S3 URL IMAGE]",
  "identifier": "6957e1",
  "birthdate": "1990-10-13T00:00:00.000Z",
  "email": "test@test.com"
}
```

###COMPANIES
--
##### Get All Companies
`GET /companies`

>####Response

```
[
  {
    "id": 1,
    "name": "starbucks",
    "email": "starbucks@gmail.com",
    "about": "we have the best coffee in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "avatar_path": null
  },
  {
    "id": 2,
    "name": "The donut place",
    "email": "thedonutplace@gmail.com",
    "about": "we have the best donuts in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "avatar_path": null
  }
]
```

##### Create Companie
`POST /companies`

>####Request

```
{
    "name": "The donut place",
    "email": "thedonutplace@gmail.com",
    "about": "we have the best donuts in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777"
}
```

>####Response

```
{
  "id": 2,
  "name": "The donut place",
  "email": "thedonutplace@gmail.com",
  "about": "we have the best donuts in the whole world :)",
  "address": "Galerias, San Salvador",
  "phone": "22577777",
  "updated_at": "2016-04-05T19:18:14.804Z",
  "created_at": "2016-04-05T19:18:14.804Z",
  "avatar_name": null,
  "avatar_path": null
}
```
