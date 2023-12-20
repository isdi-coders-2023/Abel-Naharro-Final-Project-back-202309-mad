# Todotecnofertas - Backend

_By Abel Naharro_ 😁👍 <a href="https://www.linkedin.com/in/abelnaharro/" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@10.1.0/icons/linkedin.svg" alt="Linkedin Abel Naharro" height="30" width="40"/>Linkedin</a> <a href="https://github.com/abelnhm" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@10.1.0/icons/github.svg" alt="Github Abel Naharro" height="30" width="40"/>Github</a>

> Todotecnofertas is a social web app specialized in sharing online offers about technology.

<a href="https://sonarcloud.io/summary/overall?id=isdi-coders-2023_Abel-Naharro-Final-Project-back-202309-mad" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@10.1.0/icons/sonarcloud.svg" alt="Project information on sonarcloud" height="30" width="40"/>SonarCloud</a>

<a href="https://two02309-final-backend-abel-naharro.onrender.com" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@10.1.0/icons/render.svg" alt="Project link of Render" height="30" width="40"/>Render Project</a>

<a href="https://github.com/isdi-coders-2023/Abel-Naharro-Final-Project-front-202309-mad" target="blank">
<img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@10.1.0/icons/github.svg" alt="Project link of fontend project" height="30" width="40"/>Backend Project</a>

## 🛠️ Built With

- Node.js
- NPM
- TypeScript
- Jest
- Express
- MongoDB & Mongoose
- Rest API with JWT
- Jsonwebtoken
- Morgan
- Bcrypt
- Cors
- Cross-env
- Debug
- Dotenv
- Multer
- Cloudinary

## 🚀 Installation

Clone repo

```sh
git clone https://github.com/isdi-coders-2023/Abel-Naharro-Final-Project-back-202309-mad
cd Abel-Naharro-Final-Project-back-202309-mad
```

Install dependencies

```sh
npm i
```

Compile TypeScript

```sh
npm run build
```

Run project

```sh
npm run start:dev
```

Run tests

```sh
npm run test:pro
```

Ready to enjoy! 😉

# 📖 Route Documentation

Below is the documentation for the backend routes.

## API Reference

### USERS

#### Get information about a specific user based on their ID.

```http
  GET /user/:id
```

\*Authorization Required

#### Get information about the user who is currently logged in.

```http
  GET /user/login
```

#### Register a new user.

```http
  POST /user/register
```

#### Update information for an existing user based on their ID.

```http
  PATCH /user/:id
```

### OFFERS

#### Get all available offers.

```http
  GET /offer
```

```json
Response:
[
    {
        "image": {
            "publicId": "example.png",
            "size": 87150,
            "format": "image/png",
            "url": "public\\assets\\img\\offers\\1702979640906-example.png",
            "cloudinaryURL": "http://res.cloudinary.com/xxxx"
        },
        "author": {
            "userName": "exampleName",
            "email": "test@test.com",
            "createdAt": 1702974006687,
            "updatedAt": 1702974006687,
            "id": "exampleID"
        },
        "title": "Example description",
        "regularPrice": 999,
        "offerPrice": 829,
        "isCoupon": false,
        "coupon": "",
        "offerURL": "https://github.com/xxx",
        "category": "others",
        "createdAt": 1702974006882,
        "updatedAt": 1702974006882,
        "id": "6581683a9fe4b3fb11929153"
    },...
]
```

#### Get information about a specific offer based on its ID.

```http
  GET /offer/:id
```

#### Get all offers from a specific category.

```http
  GET /offer/category/:name-filter
```

#### Create a new offer.

```http
  POST /offer
```

\*Authorization Required

#### Update information for an existing offer based on its ID.

```http
  PATCH /offer/:id
```

\*Authorization Required

#### Register a vote for a specific offer based on its ID.

```http
  POST /offer/vote/:id
```

\*Authorization Required

#### Delete a specific offer based on its ID.

```http
  DELETE /offer/:id
```

\*Authorization Required

## 🚨 Issues and Suggestions

If you encounter any issues or have suggestions to improve the project, please create a new issue.
