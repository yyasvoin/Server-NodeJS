import express from "express";
import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import * as db from './dbHandler.js'

const router = express.Router();

//---------------------------------------------------------------------
// Validation Check middleware
//---------------------------------------------------------------------

const validationCheck = (request, response, next) => {
    let errors = [];
    const user=request.body;
    const requiredProps = ["name", "email", "password"]
    requiredProps.forEach(property => {
    if(!user.hasOwnProperty(property)) {
      errors.push(property);
        }
    })
    if (errors.length > 0){
        return response.status(400).json({ message: "validation error", invalid: errors});
    }
    next()
}

router.use (validationCheck)
//-----------------------------------------------------------------//
//Route to create an entry when the user submits their contact form
//-----------------------------------------------------------------//

router.post("/users", async (request, response, next) => {
    const newUser = { id: uuidv4(), ...request.body }
    try {
            await db.users_file_add(newUser)
            return response.status(201).send(newUser)
    } catch (err) {
            console.error("There is an error: ", err)
            return next(err)
    }
});

    //---------------------------------------------------------------------//
    //Route to log a registered user in to create a JWT (JSON Web Token) token
    //--------------------------------------------------------------------//

router.post("/auth", async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    const users = await db.users_file_getAll();
    const foundUser = users.find(u => u.email == email && u.password == password)

    if (foundUser) { 
        const token = JWT.sign({email}, process.env.JWT_SECRET, {expiresIn: '10m'})
        return response.json({token})
    }
    else {
        return response.status(400).json({message: "incorrect credentials provided"})
    } 

    
});

export default router;