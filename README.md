# Project

For this project you must work alone to build a backend application consisting of a RESTful JSON API for a contact us form [_(examples)_](https://www.jotform.com/form-templates/category/contact-form) you'll be building out in a later class. All persistent data is to be stored in a simple JSON file that’s operated on through Node’s `fs` module.

While entries can be submitted by anyone, the listing of messages is restricted to authenticated users only. **Ensure you follow the route structure as set out in the breakdown. All endpoints are assumed to be based off of localhost, unless specified.**


## Route Requirements

**Note**: Any validation or any other errors for requests should use the appropriate status code, alongside the documented response body for the error.

1. Route to _create_ an entry when the user submits their contact form:
    `POST /contact_form/entries`
    
    Request body expected:
    ```json
    {
        "name": "some string",
        "email": "address@email.com", // should be a valid email address
        "phoneNumber": "2343331234",
        "content": "User's message goes here"
    }
    ```
    When saving the above, a property `id` should be added to the object that uses the format of a `UUID v4`. You can use a package such as [uuid](https://www.npmjs.com/package/uuid) to generate it.
    Successful request should return the created object, including its `id` with the appropriate status code, e.g.:
    ```json
    {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "some string",
        "email": "address@email.com",
        "phoneNumber": "2343331234",
        "content": "User's message goes here"
    }
    ```

    In the event the body of the request is missing any of the following properties, or these fields have incorrect values: `name, email, phoneNumber, content`, it should be treated as a `Bad Request`, and the response should be in the format of:
    ```json
    {
        "message": "validation error",
        "invalid": ["email", "phoneNumber"] // this array should be populated with name of any required property that is missing or has incorrect data
    }
    ```
2. Route to _create_ a user:
    `POST /users`

    Request body accepted (all properties required):
    ```json
    {
        "name": "Some Name",
        "password": "password", // must be minimum 8 characters
        "email": "address@email.com" // must be a valid email address
    }
    ```
    When saving the above, a property `id` should be added to the object that uses the format of a `UUID v4`. You can use a package such as [uuid](https://www.npmjs.com/package/uuid) to generate it.
    Successful request should return the created object, including its `id` with the appropriate status code, e.g.:
    ```json
    {
        "id": "b34adff-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "Some Name",
        "email": "address@email.com"
    }
    ```
    In the event any of the properties are missing, or the wrong values are provided, alongside the appropriate status code (`Bad Request`), the response should be in the format of:
    ```json
    {
        "message": "validation error",
        "invalid": ["email"] // this array should be populated with name of any required property that is missing or has incorrect data
    }
    ```
3. Route to log a registered user in to _create_ a JWT (JSON Web Token) token:
    `POST /auth`
    
    Expected request:
    ```json
    {
        "email": "address@email.com",
        "password": "somepassword"
    }
    ```
    Successful response (alongside the appropriate status code):
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
    In the event the email and password do not match, `Unauthorized` status code should be given, with following response body:
    ```json
    {
        "message": "incorrect credentials provided"
    }
    ```
4. Route to _get_ a listing of all submissions when given a valid JWT is provided as part of the :
    ```
    GET /contact_form/entries
    Authorization: bearer token
    ```
    Where token is the one received from the route definied above.
    Upon success, an array consisting of all objects for the contact form entries should be displayed, e.g.:
    ```json
    [
        {
           "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "name": "some string",
            "email": "address@email.com",
            "phoneNumber": "2343331234",
            "content": "User's message goes here"
        }, {
            "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            "name": "another one",
            "email": "msn@email.com",
            "phoneNumber": "4",
            "content": "Another message"
        }
    ]
    ```
    In the event the JWT is invalid, or not provided, the `Forbidden` status code should be returned alongside with a reason why, e.g.:
    ```json
    {
        "message": "token not provided" // other options for this message include: "token expired"
    }
    ```

5. Route to _get_ a specific submission when given an ID alongside a valid JWT:    
    ```
    GET /contact_form/entries/:id
    Authorization: bearer token
    ```
    If successful, the response, alongside the appropriate status code should be similar to below based on the submission entry id given:
    ```json
    {
        "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "name": "some string",
        "email": "address@email.com",
        "phoneNumber": "2343331234",
        "content": "User's message goes here"
    }
    ```
    If requested ID is not found, `Not Found` status code should be returned alongside a response:
    ```json
    {
        "message": "entry 23bacf-3b7d-4bad-9bdd-2b0d7b3dcb6d not found"
    }
    ```
    In the event the JWT is invalid, or not provided, the `Forbidden` status code should be returned alongside with a reason why, e.g.:
    ```json
    {
        "message": "token not provided" // other options for this message include: "token expired"
    }
    ```


## Parts

### Part 1
- Gitlab repository is set up, including ignoring `node_modules`
- Express is running on a high port number such as `3000`, configurable from the environment.
- Readme file contains information about the project, as well as how to start the application as well as configure the environment.
- npm is used to add any relevant packages
- Ensure the appropriate merge request is created, and instructor is assigned to it to mark this part.

### Part 2
- Be sure to pull your merged changes once merged, before creating a new branch off of master!
- Routes are setup and semantically correct, and respond with a valid and applicable response as define dabove.
- Express default error handling middleware is setup where any route not found should return back the appropriate status code (`Not Found`) and the following response: `{"message": "not found"}`.
- Express JSON parsing middleware is setup.
- Expectation is that the project is organized with the appropriate modules, but is not expected to be saving anything to a JSON file. For instance you will have the route files setup, however your routes may only have validation logic attached, and nothing more.
- Create a merge request, and assign instructor to it to mark this part.

#### Resources
- [Default error handler](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler)

### Part 3
- There are two resources identified in this project: `users` and `entries`. There should exist two `json` files, in a folder called `data` located where `package.json` is. These json files should be ignored from git as well.
- Create a module that can read and write to the two JSON files. If file does not exist, your module should first create the file in the proper location
- Update your endpoints from Part 2 to now read and write to the JSON as required by the route definitions
- Open a merge request, and assign the instructor, as well as two other students to get marked as well as obtain your peers' feedback
- Once marked, be sure to merge to master so you can use it for future courses.



## Rubric

| Assessment Criteria | Not Good Enough _(0% score <60%)_ | Good _(60% score <90%)_ | Very Good _(%90 score %100)_ | **Marks** |
| --- | --- | --- | --- | --- |
| ***Repository and Package Setup*** | The project exists with `package.json` with some correct information in it. Files are disorderly placed. | A git repository was created for this project which contains a `package.json` with useful npm scripts and a `.gitignore` that ignores `node_modules`. which mostly contains the correct information. Files are fairly organized. | A git repository was created for this project which contains a package.json, with the appropriate npm start script using nodemon and the appropriate name and author fields were completed. | **10** |
| ***Maintainability*** | Code and modules are not reasonably organized. The code is also mostly difficult to follow and reason about. | Most relevant files and code is easy to read and understand. The router module exists and contains some or all relevant code. | All code is well organized into modules and easy to follow and understand. Strict mode is enforced in all relevant files and code is easy to read and understand with reasonable formatting. | **10** |
| ***Functionality*** | An attempt to get an Express app with the desired functionality was made. | An Express app with the desired functionality runs and responds to most HTTP requests without error and accept JSON in the request bodies. | An Express HTTP server runs on a high port number. The server responds to all HTTP requests without error and implements all required functionality. All routes accept JSON in request bodies and are defined in a router file which is used as Express middleware. | **20** |
| ***HTTP Semantics*** | Most HTTP methods (verbs) and status codes were not correctly implemented. | Most HTTP responses use the proper HTTP status code or a 200 status code. The appropriate HTTP methods were used to define many routes. | All HTTP responses use the proper HTTP status code or a 200 status code. The appropriate HTTP methods were used to define all routes. | **10** |
