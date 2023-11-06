[![Actions Status](https://img.shields.io/badge/Documentation-click--here-brightgreen)](https://localhost:4800/api-docs/)

# Book Manager APIs
## Description

The repo contains the following apis:

**POST /books** - to add a book <br />
**GET /books** - to fetch books <br />
**GET /books/:id** - to get a book by id <br />
**PUT /books/:id** - to update a book<br />
**DELETE /books/:id** - to delete a book <br />


### Installation
`$ npm i`

### Running the app

1. Development mode
`npm start`
2. Watch Mode
`npm run start:dev`
3. Dockerfile
`docker build --tag 'image_name' .`
`docker run --detach 'image_name'`

