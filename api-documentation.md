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

*Create new user. name, email, password are required. Only are allowed jpeg or png images.*
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
  "accessToken": "[access token]"
}
```

#####Update User
`PUT /users`

*Update user. all fields are optional.* ***Authorization token is required***. *Only are allowed jpeg or png images.*
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

#####User Cards
`GET /users/me/cards`

*User Cards.* ***Authorization token is required.*** *This endpoint is responsible to
retrieve all cards related to the logged user.*

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
    "id": 22,
    "userId": 76,
    "cardId": 1,
    "sealedDates": [
      "2016-07-11T06:17:22.252Z",
      "2016-07-11T06:17:25.093Z"
    ],
    "stamps": 7,
    "title": "test card",
    "description": "test card description",
    "color": "#000000"
  },
  {
    "id": 21,
    "userId": 76,
    "cardId": 1,
    "sealedDates": [],
    "stamps": 7,
    "title": "test card",
    "description": "test card description",
    "color": "#000000"
  }
]
```

#####User Card Detail
`GET /users/me/cards/:id`

*User Card Detail.* ***Authorization token is required.*** *This endpoint is responsible to
show the logged user's card's detail. You must pass the logged user's card's id.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  id: 22
}
```

>####Response

```
{
  "id": 22,
  "userId": 76,
  "cardId": 1,
  "sealedDates": [
    "2016-07-11T06:17:22.252Z",
    "2016-07-11T06:17:25.093Z"
  ],
  "createdAt": "2016-07-11T05:37:49.144Z",
  "stamps": 7,
  "title": "test card",
  "description": "test card description",
  "color": "#000000"
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

##### Create Company
`POST /companies`

>####Request

```
{
    "name": "The donut place",
    "email": "thedonutplace@gmail.com",
    "about": "we have the best donuts in the whole world :)",
    "address": "Galerias, San Salvador",
    "phone": "22577777",
    "password": "testpassword",
    "avatar": "data:image/[png or jpeg];base64,ad4sad4a..."
}
```

>####Response

```
{
  "accessToken": "[access token]"
}
```

##### Update Company
`PUT /companies`

*Update company. all fields are optional.* ***Authorization token is required***. *Only are allowed jpeg or png images.*

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
    "password": "testpassword",
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

#### Get all company's users
`GET /companies/me/users`

*Company's Users.* ***Authorization token is required.*** *This endpoint
retrieve all users related with the company through any card created by the
company.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Response

```
[
  {
    "id": 75,
    "name": "fernando juarez",
    "email": "fher.unity@hotmail.com",
    "identifier": "hj234k9v",
    "birthdate": "1990-10-13T04:00:00.000Z",
    "avatar": null
  },
  {
    "id": 76,
    "name": "fernando juarez",
    "email": "fhereduardo90@gmail.com",
    "identifier": "rjgqnkqv",
    "birthdate": "1990-10-13T04:00:00.000Z",
    "avatar": null
  }
]
```

#### Find company's users by user's identifier
`GET /companies/me/users/:identifier`

***Authorization token is required.*** *This endpoint allow you to get any user related
to the logged company by its identifier.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'identifier': 'rjgqnkqv'
}
```

>#### Response

```
{
  "id": 76,
  "name": "fernando juarez",
  "email": "fhereduardo90@gmail.com",
  "identifier": "rjgqnkqv",
  "birthdate": "1990-10-13T04:00:00.000Z",
  "avatar": null
}
```

#### Create to the user a card
`POST /users/:userId/cards`

***Authorization token is required.*** *This endpoint is responsible to create to the user
a new card. You must pass the user's id and the current company's card's id.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76,
  'cardId': 1
}
```

>#### Response

```
{
  "id": 28,
  "userId": 76,
  "cardId": 1,
  "companyId": 9,
  "sealedDates": [],
  "stamps": 7
}
```

#### Get all cards that belongs to any user related to the logged company
`GET /users/:userId/cards`

***Authorization token is required.*** *This endpoint retrieve all cards that belongs
to any user related to the logged company. You must pass the id of the user that
you want to get all cards related with him.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76
}
```

>#### Response

```
[
  {
    "id": 22,
    "userId": 76,
    "cardId": 1,
    "sealedDates": [
      "2016-07-11T06:17:22.252Z",
      "2016-07-11T06:17:25.093Z"
    ],
    "stamps": 7,
    "title": "test card",
    "description": "test card description",
    "color": "#000000"
  },
  {
    "id": 21,
    "userId": 76,
    "cardId": 1,
    "sealedDates": [],
    "stamps": 7,
    "title": "test card",
    "description": "test card description",
    "color": "#000000"
  }
]
```

#### Get user's card detail (by company)
`GET /users/:userId/cards/:id`

***Authorization token is required.*** *This endpoint shows the user's card detail.
You must pass the user's id and the user's card's id.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76,
  'id': 22
}
```

>#### Response

```
{
  "id": 22,
  "userId": 76,
  "cardId": 1,
  "sealedDates": [
    "2016-07-11T06:17:22.252Z",
    "2016-07-11T06:17:25.093Z"
  ],
  "createdAt": "2016-07-11T05:37:49.144Z",
  "stamps": 7,
  "title": "test card",
  "description": "test card description",
  "color": "#000000"
}
```

#### Delete user's card (by company)
`DELETE /users/:userId/cards/:id`

***Authorization token is required.*** *This endpoint is responsible to delete the
user's card specified by the card's id. You must pass the user's id and the user's card's id*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76,
  'id': 22
}
```

>#### Response

*STATUS 204*

#### Add a new stamp to the user's card
`PUT /users/:userId/cards/:id/add-stamp`

***Authorization token is required.*** *This endpoint is responsible to add a new stamp
to the the user's cards specified by the user's card's id. You must pass user's id and user card's id.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76,
  'id': 22
}
```

>#### Response

*STATUS 204*

#### Remove one new stamp to the user's card
`PUT /users/:userId/cards/:id/remove-stamp`

***Authorization token is required.*** *This endpoint is responsible to remove one stamp
to the the user's cards specified by the user's card's id. You must pass user's id and user card's id.*

>#### Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>#### Request

```
{
  'userId': 76,
  'id': 22
}
```

>#### Response

*STATUS 204*

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
`POST /authenticate`

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
  "accessToken": "[access token]"
}
```

##### Sign In Companies
`POST /authenticate-company`

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
  "accessToken": "[access token]"
}
```

##### Sign In Users by Facebook
`POST /authenticate-facebook-user`

>#### Request

```
{
  'accessToken': '[facebook access token]'
}
```

>####Response

```
{
  "accessToken": "[access token]"
}
```

###PASSWORDS
--
##### Recovery User Password
`POST /passwords/user/reset`

*If the parameters are correct, you will receive a new email with the reset token.*

>#### Request

```
{
  'email': 'xyz@xyz.com',
}
```

>####Response

```
{}
```

##### Reset User Password
`PUT /passwords/user/reset`

>#### Request

```
{
  'resetToken': '[reset token]',
  'password': 'xyz@xyz.com',
}
```

>####Response

```
{}
```

##### Recovery Company Password
`POST /passwords/company/reset`

*If the parameters are correct, you will receive a new email with the reset token.*

>#### Request

```
{
  'email': 'xyz@xyz.com',
}
```

>####Response

```
{}
```

##### Reset Company Password
`PUT /passwords/company/reset`

>#### Request

```
{
  'resetToken': '[reset token]',
  'password': 'xyz@xyz.com',
}
```

>####Response

```
{}
```
