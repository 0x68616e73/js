# Login Register Basic Back-end web application

This application created with CRUD operations, hashing system and MongoDB.

## Installation dependencies

To install the necessary dependencies, use the following command([npm](https://docs.npmjs.com/cli/v10/commands/npm-install)) in PowerShell or CMD:

```bash
npm install
```

## Starting application
You can use node to start application:
```java
node app.js
```
If you want to monitor application, you shoul use nodemon:
```java
nodemon app.js
```

## Project structure

Here is the basic structure of your project:

```java
root
│   .env
│   package.json
│   server.js
│
├───models
│       users.js
│
├───static
│   │   index.html
│   ├───css
│   │       style.css
│   └───js
│           main.js
└───DB.js
```

## Setting up the Environment
Create a .env file in the root directory with the following content:

```json
PORT=3002
MONGODB_URL=your_mongodb_connection_string
```

## License

[MIT](https://choosealicense.com/licenses/mit/)