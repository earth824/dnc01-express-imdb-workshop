# IMDB API

This is an API example describing a IMDB API.

<details>

<summary style="font-size: 20px">Authentication</summary>

---

<div style="height: 8px"></div>

| Method | Endpoint       | Description                                 |
| ------ | -------------- | ------------------------------------------- |
| POST   | /auth/register | Create a new user account                   |
| POST   | /auth/login    | Authenticates a user with their credentials |

<details>

<summary style="font-size: 16px">Register</summary>

<div style="height: 16px"></div>

```
POST /auth/register
```

Creates a new user account. This endpoint registers a user using the provided credentials and required profile information

#### Body

| Attribute  | Type   | Required | Description                                                                                                |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `email`    | string | Yes      | Unique identifier for the user. Must be a valid email and not already registered.                          |
| `password` | string | Yes      | User’s password. Must be at least 6 characters long and contain only letters (A–Z, a–z) and numbers (0–9). |
| `role`     | string | No       | Role assigned to the user. Allowed values are admin or user. If not provided, the default role is user.    |

##### Example

```
{
  "email": "john@email.com",
  "password": "123456",
  "role": "user"
}
```

#### Response

`201 Created`

Registration successful. The user account has been created successfully.

##### Example response

```
{
  "message": "user registered successfully"
}
```

`400 Bad Request`

One or more fields are missing or invalid.

##### Example response

```
{
  "message": "validation error"
}
```

`409 Conflict`

Conflict. The email already exists.

##### Example response

```
{
  "message": "email already in use"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

</details>

<div style="height: 8px"></div>

<details>

<summary style="font-size: 16px">Login</summary>

<div style="height: 16px"></div>

```
POST /auth/login
```

Authenticates a user with their credentials and returns an access token that can be used to authorize subsequent API requests.

#### Body

| Attribute  | Type   | Required | Description                                                                                   |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------- |
| `email`    | string | Yes      | The registered email of the user.                                                             |
| `password` | string | Yes      | The user’s password. Must be at least 6 characters long and contain only letters and numbers. |

##### Example

```
{
  "email": "a@email.com",
  "password": "123456",
}
```

#### Response

`200 OK`

Login successful. An access token is returned.

##### Example response

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
}
```

`400 Bad Request`

Request body is invalid or incomplete.

##### Example response

```
{
  "message": "email and password are required"
}
```

`401 Unauthorized`

Unauthorized. Invalid credentials provided.

##### Example response

```
{
  "message": "invalid credentials"
}
```

`500 Internal Server Error`

Internal Server Error. An unexpected error occurred.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

</details>

</details>

<div style="height: 8px"></div>

---

<details>

<summary style="font-size: 20px">Movie</summary>

---

<div style="height: 8px"></div>

| Method | Endpoint             | Description                                                        |
| ------ | -------------------- | ------------------------------------------------------------------ |
| GET    | /movies              | Retrieves a list of all movies (optionally paginated and sortable) |
| GET    | /movies/{id}         | Retrieves a movie by its unique identifier                         |
| POST   | /movies              | Creates a new movie entry                                          |
| PATCH  | /movies/{id}         | Partially updates an existing movie                                |
| DELETE | /movies/{id}         | Deletes a movie identified by its unique identifier                |
| POST   | /movies/{id}/ratings | Submits a new rating for a movie                                   |

<details>

<summary style="font-size: 16px">Create a movie</summary>

<div style="height: 16px"></div>

```
POST /movies
```

Creates a new movie using the provided data. Authentication is required.

#### Authorization

Require Bearer token authentication. Include the token in the request header as follows:

```
Authorization: Bearer <access_token>
```

#### Body

| Attribute     | Type     | Required | Description                                 |
| ------------- | -------- | -------- | ------------------------------------------- |
| `title`       | string   | Yes      | The title of the movie.                     |
| `releaseYear` | number   | Yes      | The year the movie was released.            |
| `genres`      | string[] | Yes      | A list of genres associated with the movie. |

##### Example

```
{
  "title": "Inception",
  "releaseYear": 2010,
  "genres": ["Sci-Fi", "Action", "Thriller"]
}
```

#### Response

`201 Created`

Movie created successfully.

##### Example response

```
{
  "data": {
    "id": 101,
    "title": "Inception",
    "releaseYear": 2010,
    "genres": ["Sci-Fi", "Action", "Thriller"]
  }
}
```

`400 Bad Request`

Validation error or missing required fields.

##### Example response

```
{
  "message": "validation error"
}
```

`401 Unauthorized`

Invalid or missing Bearer token.

##### Example response

```
{
  "message": "access token is missing or invalid"
}
```

`403 Forbidden`

User is authenticated but does not have permission to perform this action. Only users with the admin role can create a movie.

##### Example response

```
{
   "message": "only admin users are allowed to create movies"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

</details>

<div style="height: 8px"></div>

<details>

<summary style="font-size: 16px">Get all movies</summary>

<div style="height: 16px"></div>

```
GET /movies
```

Retrieves a list of movies. Supports filtering, sorting, and pagination.

#### Query Parameters

| Parameter     | Type   | Required | Description                                               |
| ------------- | ------ | -------- | --------------------------------------------------------- |
| `title`       | string | No       | Filter movies by title (partial match, case-insensitive). |
| `releaseYear` | number | No       | Filter movies by release year.                            |
| `genres`      | string | No       | Filter movies by genre (e.g. Action, Drama).              |
| `sortBy`      | string | No       | Field to sort by. Allowed values: title, releaseYear.     |
| `order`       | string | No       | Sort order. Allowed values: asc, desc.                    |
| `page`        | number | No       | Page number (default: 1).                                 |
| `limit`       | number | No       | Number of items per page (default: 10).                   |

##### Example Request

```
GET /movies?title=star&genre=Sci-Fi&sortBy=releaseYear&order=desc&page=1&limit=10
```

#### Response

`200 OK`

Movies retrieved successfully.

##### Example response

```
{
  "data": [
    {
      "id": 101,
      "title": "Star Wars: A New Hope",
      "releaseYear": 1977,
      "genres": ["Sci-Fi", "Adventure"]
    },
    {
      "id": 102,
      "title": "Star Trek",
      "releaseYear": 2009,
      "genres": ["Sci-Fi", "Action"]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

`400 Bad Request`

Invalid query parameters (e.g. unsupported sortBy value).

##### Example response

```
{
  "message": "invalid query parameter: sortBy"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

</details>

<div style="height: 8px"></div>

<details>

<summary style="font-size: 16px">Submit a new rating for a movie</summary>

<div style="height: 16px"></div>

```
POST /movies/{id}/ratings
```

Submits a new rating for a specific movie. Authentication is required. Each authenticated user can rate a movie once (subsequent submissions update the existing rating).

#### Authorization

Require Bearer token authentication. Include the token in the request header as follows:

```
Authorization: Bearer <access_token>
```

#### Path Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| `id`      | number | Yes      | The unique identifier of the movie. |

##### Example Request

```
POST /movies/101/ratings
```

#### Body

| Attribute | Type   | Required | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| `rating`  | number | Yes      | Rating score for the movie (minimum 1, maximum 10). |

##### Example

```
{
  "rating": 9
}
```

#### Response

`200 OK`

Returned when the user already rated the movie and the rating is updated instead of created.

##### Example response

```
{
  "data": {
    "id": 555,
    "movieId": 101,
    "userId": 567,
    "rating": 8,
  }
}
```

`201 Created`

Rating submitted successfully.

##### Example response

```
{
  "data": {
    "id": 555,
    "movieId": 101,
    "userId": 567,
    "rating": 9
  }
}
```

`400 Bad Request`

Validation error (rating out of range or invalid data type).

##### Example response

```
{
  "message": "rating must be an integer between 1 and 10"
}
```

`401 Unauthorized`

Invalid or missing Bearer token.

##### Example response

```
{
  "message": "access token is missing or invalid"
}
```

`403 Forbidden`

User is authenticated but does not have permission to perform this action. Only users with the user role can submit a rating.

##### Example response

```
{
   "message": "only users are allowed to submit movie ratings"
}
```

`404 Not Found`

Movie not found.

##### Example response

```
{
  "message": "movie not found"
}
```

`409 Conflict`

User has already rated the movie and duplicate ratings are not allowed.

##### Example response

```
{
  "message": "user has already rated this movie"
}
```

`500 Internal Server Error`

Internal server error. An unexpected error occurred on the server.

##### Example response

```
{
  "message": "an unexpected error occurred"
}
```

</details>

</details>

<div style="height: 8px"></div>

---
