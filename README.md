## ID90 Travel Challenge

### 01. Installation and Requirements
Requierements and technologies used:
- Backend: PHP 7.4+, Composer, Guzzle
- Frontend: ES6+, React, Create React App, Axios

#### 01.1 Installing Backend
In order to run the API easier, a docker container is provided. Just follow the next steps:
- Make sure `docker` and `docker-compose` are installed
- From the root folder run `docker-compose up -d`
- Install composer dependencies with `docker-compose exec php-fpm sh -c "cd api; composer install; composer dumpautoload"`
- API should be accesible at `http://localhost/`

#### 01.2 Installing Frontend
Within the `ui` folder un the following commands:
- `npm install`
- `npm start`
- UI should be accesible at `http://localhost:3000/`

### 02. API Endpoints
- `POST` http://localhost/api/login
- `GET` http://localhost/api/logout
- `GET` http://localhost/api/config
- `GET` http://localhost/api/search

### 03. Further Improvements
For the Backend:
- Add ValidationService to valide requests
- Add Authorization Middleware
- Add Cache layer to reduce API Provider calls

For the Frontend:
- Redux / Tool for sharing a global state
- Auth middleware within the Router