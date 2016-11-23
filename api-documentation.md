#CLIFRE API

###USERS
--
##### Get All Users
`GET /users`

*Retrieve all users. Does not require Authorization Token*.

>####Response

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

>####Status

`200`

#####Sign Up User
`POST /users`

*Create new user. name, email, password are required. Only are allowed jpeg or png images.
Does not require Authorization Token.*

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

>####Status

`201`

#####Update User
`PUT /users/me`

*Update user. all fields are optional.* ***Authorization token as user is required***. *Only are allowed jpeg or png images.*

>####Headers

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

>####Status

`200`


#####User Profile
`GET /users/me`

*User detail.* ***Authorization token as user is required.***

>####Headers

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

>####Status

`200`

#####Search User by Identifier
`GET /users/:identifier`

*Search User Detail by its identifier. Does not require Authorization Token.*

>####Request

```
{
  identifier: '6957e1'
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

>####Status

`200`

#####User Cards
`GET /users/me/user-cards`

*User Cards.* ***Authorization token as user is required.*** *This endpoint is responsible to
retrieve all cards related to the logged user.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Response

```
[
  {
    "id": 16,
    "sealedDates": [
      "2016-08-05T03:59:48.979Z",
      "2016-08-05T03:59:48.979Z"
    ],
    "createdAt": "2016-08-05T03:59:48.979Z",
    "relationships": {
      "card": {
        "id": 6,
        "stamps": 6,
        "color": 6,
        "description": "test card description",
        "title": "test card 3",
        "createdAt": "2016-08-05T02:14:12.073Z"
      },
      "user": {
        "id": 51,
        "name": "fernando juarez",
        "email": "fhereduardo90@gmail.com",
        "identifier": "sy2xlobk",
        "birthdate": "1990-10-13T04:00:00.000Z",
        "avatar": null
      },
      "company": {
        "id": 2,
        "name": "The donut place",
        "email": "fhereduardo90@gmail.com",
        "identifier": "sytiudzt",
        "about": "we have the best donuts in the whole world :)",
        "address": "Galerias, San Salvador",
        "phone": "22577777",
        "avatar": null,
        "createdAt": "2016-08-05T02:13:40.542Z"
      }
    }
  },
  ...
]
```

>####Status

`200`

#####User Card Detail
`GET /users/me/user-cards/:id`

*User Card Detail.* ***Authorization token as user is required.*** *This endpoint is responsible to
show the logged user's card's detail. You must pass the logged user's card's id.*

>####Headers

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
  "id": 16,
  "sealedDates": [
    "2016-08-05T03:59:48.979Z",
    "2016-08-05T03:59:48.979Z"
  ],
  "createdAt": "2016-08-05T03:59:48.979Z",
  "relationships": {
    "card": {
      "id": 6,
      "stamps": 6,
      "color": 6,
      "description": "test card description",
      "title": "test card 3",
      "createdAt": "2016-08-05T02:14:12.073Z"
    },
    "company": {
      "id": 2,
      "name": "The donut place",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sytiudzt",
      "about": "we have the best donuts in the whole world :)",
      "address": "Galerias, San Salvador",
      "phone": "22577777",
      "avatar": null,
      "createdAt": "2016-08-05T02:13:40.542Z"
    },
    "user": {
      "id": 51,
      "name": "fernando juarez",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sy2xlobk",
      "birthdate": "1990-10-13T04:00:00.000Z",
      "avatar": null
    }
  }
}
```

>####Status

`200`

###COMPANIES
--
##### Get All Companies
`GET /companies`

*Retrieve all companies. Does not require Authorization Token*.

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

>####Status

`200`

##### Company Profile
`GET /companies/me`

*Company detail.* ***Authorization token as company is required.***

>####Headers

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

>####Status

`200`

##### Sign Up Create Company
`POST /companies`

*Create new company. Only are allowed jpeg or png images. Does not require
Authorization Token.*

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

>####Status

`201`

##### Update Company
`PUT /companies/me`

*Update company. all fields are optional.* ***Authorization token as company is required***.
*Only are allowed jpeg or png images.*

>####Headers

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

>####Status

`200`

#### Get all company's users
`GET /companies/me/users`

*Company's Users.* ***Authorization token as company is required.*** *This endpoint
retrieve all users related with the company through any card created by the
company.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Response

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

>####Status

`200`

#### Find company's users by user's id
`GET /companies/me/users/:id`

***Authorization token as company is required.*** *This endpoint allow you to get any user related
to the logged company by its id.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'id': 1
}
```

>####Response

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

>####Status

`200`

#### Create to the user a card
`POST /users/:userId/user-cards`

***Authorization token as company is required.*** *This endpoint is responsible to create to the user
a new card. You must pass the user's id and the current company's card's id.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76,
  'cardId': 1
}
```

>####Response

```
{
  "id": 20,
  "sealedDates": [],
  "createdAt": "2016-08-05T04:56:21.453Z",
  "relationships": {
    "company": {
      "id": 2,
      "name": "The donut place",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sytiudzt",
      "about": "we have the best donuts in the whole world :)",
      "address": "Galerias, San Salvador",
      "phone": "22577777",
      "avatar": null,
      "createdAt": "2016-08-05T02:13:40.542Z"
    },
    "card": {
      "id": 6,
      "stamps": 6,
      "color": 6,
      "description": "test card description",
      "title": "test card 3",
      "createdAt": "2016-08-05T02:14:12.073Z"
    },
    "user": {
      "id": 51,
      "name": "fernando juarez",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sy2xlobk",
      "birthdate": "1990-10-13T04:00:00.000Z",
      "avatar": null,
      "createdAt": "2016-08-05T02:12:52.087Z"
    }
  }
}
```

>####Status

`201`

#### Get all cards that belongs to any user related to the logged company
`GET /users/:userId/user-cards`

***Authorization token as company is required.*** *This endpoint retrieve all cards that belongs
to any user related to the logged company. You must pass the id of the user that
you want to get all cards related with him.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76
}
```

>####Response

```
[
  {
    "id": 16,
    "sealedDates": [
      "2016-08-05T03:59:48.979Z",
      "2016-08-05T03:59:48.979Z"
    ],
    "createdAt": "2016-08-05T03:59:48.979Z",
    "relationships": {
      "card": {
        "id": 6,
        "stamps": 6,
        "color": 6,
        "description": "test card description",
        "title": "test card 3",
        "createdAt": "2016-08-05T02:14:12.073Z"
      },
      "user": {
        "id": 51,
        "name": "fernando juarez",
        "email": "fhereduardo90@gmail.com",
        "identifier": "sy2xlobk",
        "birthdate": "1990-10-13T04:00:00.000Z",
        "avatar": null,
        "createdAt": "2016-08-05T02:12:52.087Z"
      },
      "company": {
        "id": 2,
        "name": "The donut place",
        "email": "fhereduardo90@gmail.com",
        "identifier": "sytiudzt",
        "about": "we have the best donuts in the whole world :)",
        "address": "Galerias, San Salvador",
        "phone": "22577777",
        "avatar": null,
        "createdAt": "2016-08-05T02:13:40.542Z"
      }
    }
  },
  ...
]
```

>####Status

`200`

#### Get user's card detail (by company)
`GET /users/:userId/user-cards/:id`

***Authorization token as company is required.*** *This endpoint shows the user's card detail.
You must pass the user's id and the user's card's id.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76,
  'id': 22
}
```

>####Response

```
{
  "id": 16,
  "sealedDates": [
    "2016-08-05T03:59:48.979Z",
    "2016-08-05T03:59:48.979Z"
  ],
  "createdAt": "2016-08-05T03:59:48.979Z",
  "relationships": {
    "card": {
      "id": 6,
      "stamps": 6,
      "color": 6,
      "description": "test card description",
      "title": "test card 3",
      "createdAt": "2016-08-05T02:14:12.073Z"
    },
    "user": {
      "id": 51,
      "name": "fernando juarez",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sy2xlobk",
      "birthdate": "1990-10-13T04:00:00.000Z",
      "avatar": null,
      "createdAt": "2016-08-05T02:12:52.087Z"
    },
    "company": {
      "id": 2,
      "name": "The donut place",
      "email": "fhereduardo90@gmail.com",
      "identifier": "sytiudzt",
      "about": "we have the best donuts in the whole world :)",
      "address": "Galerias, San Salvador",
      "phone": "22577777",
      "avatar": null,
      "createdAt": "2016-08-05T02:13:40.542Z"
    }
  }
}
```

>####Status

`200`

#### Delete user's card (by company)
`DELETE /users/:userId/user-cards/:id`

***Authorization token as company is required.*** *This endpoint is responsible to delete the
user's card specified by the card's id. You must pass the user's id and the user's card's id*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76,
  'id': 22
}
```

>####Status

`204`

#### Add a new stamp to the user's card
`PUT /users/:userId/user-cards/add-stamp`

***Authorization token as company is required.*** *This endpoint is responsible to add a new stamp
to the the user's cards specified by the user's card's id. You must pass user's id and user card's id.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76,
  'id': 22
}
```

>####Status

`204`

#### Remove one new stamp to the user's card
`PUT /users/:userId/user-cards/remove-stamp`

***Authorization token as company is required.*** *This endpoint is responsible to remove one stamp
to the the user's cards specified by the user's card's id. You must pass user's id and user card's id.*

>####Headers

```
{
  'Authorization': 'Bearer [access token]'
}
```

>####Request

```
{
  'userId': 76,
  'id': 22
}
```

>####Status

`204`

###CARDS
--
##### Get All Company's Cards
`GET /companies/me/cards`

*Company's Cards.* ***Authorization token as company is required.***

>####Headers

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

>####Status

`200`

##### Company's Card Detail
`GET /companies/me/cards/:id`

*Company's Card Detail.* ***Authorization token as company is required.***
>####Headers

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

>####Status

`200`

##### Create Card
`POST /companies/me/cards`

*Create Card.* ***Authorization token as company is required.***

>####Headers

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

>####Status

`201`

##### Update Companie's Card
`PUT /companies/me/cards/:id`

*Update Company's Card. all fields are optional.* ***Authorization token as company is required***.

>####Headers

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

>####Status

`200`

###SESSION
--
##### Sign In Users
`POST /authenticate`

>####Request

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

>####Status

`200`

##### Sign In Companies
`POST /authenticate-company`

>####Request

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

>####Status

`200`

##### Sign In Users by Facebook
`POST /authenticate-facebook-user`

>####Request

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

>####Status

`200`

###PASSWORDS
--
##### Recovery User Password
`POST /passwords/user/reset`

*If the parameters are correct, you will receive a new email with the reset token.*

>####Request

```
{
  'email': 'xyz@xyz.com',
}
```

>####Status

`200`

##### Reset User Password
`PUT /passwords/user/reset`

>####Request

```
{
  'resetToken': '[reset token]',
  'password': 'xyz@xyz.com',
}
```

>####Status

`200`

##### Recovery Company Password
`POST /passwords/company/reset`

*If the parameters are correct, you will receive a new email with the reset token.*

>####Request

```
{
  'email': 'xyz@xyz.com',
}
```

>####Status

`200`

##### Reset Company Password
`PUT /passwords/company/reset`

>####Request

```
{
  'resetToken': '[reset token]',
  'password': 'xyz@xyz.com',
}
```

>####Status

`200`
