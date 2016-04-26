#CLIFRE API

###USERS
--
##### Get All Users
`GET /users`

*Retrieve all users.*.

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
  "access_token": "[access token]"
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
    "identifier": "abcdef",
    "about": "we have the best coffee in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "avatar": "[aws url]"
  },
  {
    "id": 2,
    "name": "The donut place",
    "email": "thedonutplace@gmail.com",
    "identifier": "abcdef",
    "about": "we have the best donuts in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "avatar": "[aws url]"
  }
]
```

##### Company Detail
`GET /companies/profile`

*Company detail.* ***Authorization token is required.***
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Response

```
{
  "id": 1,
  "name": "starbucks",
  "identifier": "abcdef",
  "about": "we have the best coffee in the whole world :)",
  "address": "Galerias, San Salvador",
  "phone": "22577777",
  "avatar": "[aws url]"
}
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
    "phone": "22577777",
    "avatar": "data:image/[png or jpeg];base64,ad4sad4a..."
}
```

>####Response

```
{
  "access_token": "[access token]"
}
```

##### Update Companie
`PUT /companies`

*Update company. all fields are optional.* ***Authorization token is required***. *Only are allow jpeg or png images.*
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
    "name": "The donut place",
    "email": "thedonutplace@gmail.com",
    "about": "we have the best donuts in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "avatar": "data:image/[png or jpeg];base64,ad4sad4a..."
}
```

>####Response

```
{
  "id": 1,
  "name": "starbucks",
  "identifier": "abcdef",
  "about": "we have the best coffee in the whole world :)",
  "address": "Galerias, San Salvador",
  "phone": "22577777",
  "avatar": "[aws url]"
}
```

###CARDS
--
##### Get All Company's Cards
`GET /companies/cards`

*Company's Cards.* ***Authorization token is required.***
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Response

```
[
  {
    "id": 11,
    "title": "card title",
    "stamps": 6,
    "description": "card description ",
    "color": "blue"
  },
  ...
]
```

##### Company's Card Detail
`GET /companies/cards/:id`

*Company's Card Detail.* ***Authorization token is required.***
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  id: 11
}
```

>####Response

```
{
  "id": 11,
  "title": "card title",
  "stamps": 6,
  "description": "card description ",
  "color": "blue"
}
```

##### Create Card
`POST /companies/cards`

*Create Card.* ***Authorization token is required.***
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  "title": "card title",
  "stamps": 6,
  "description": "card description ",
  "color": "blue"
}
```

>####Response

```
{
  "id": 11,
  "title": "card title",
  "stamps": 6,
  "description": "card description ",
  "color": "blue"
}
```

##### Update Companie's Card
`PUT /companies/cards/:id`

*Update Company's Card. all fields are optional.* ***Authorization token is required***.
>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  "id": 11,
  "title": "card title",
  "stamps": 6,
  "description": "card description ",
  "color": "blue"
}
```

>####Response

```
{
  "id": 11,
  "title": "card title",
  "stamps": 6,
  "description": "card description ",
  "color": "blue"
}
```

###SESSION
--
##### Sign In Users
`POST /authorization`

>#### Request

```
{
  'email': 'xyz@xyz.com',
  'password': '12345678'
}
```

>####Response

```
{
  "access_token": "[access token]"
}
```

##### Sign In Companies
`POST /authorization-company`

>#### Request

```
{
  'email': 'xyz@xyz.com',
  'password': '12345678'
}
```

>####Response

```
{
  "access_token": "[access token]"
}
```
