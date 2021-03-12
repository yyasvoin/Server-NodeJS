import express from "express";
import userRoutes from "./src/userRoutes.js";
import entriesRoutes from "./src/entriesRoutes.js";
import { NotFoundError } from './src/util/errors.js';

import cors from "cors";

const app = express();
const port = 4000; 

//---------------------------------------------------------------------
// Express JSON parsing middleware
//---------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use("/contact_form",entriesRoutes);
app.use("/", userRoutes);
//---------------------------------------------------------------------
// Express default error handling middleware
//---------------------------------------------------------------------
app.use(function(req, res, next) {
    if (!req.route)
        return next (new NotFoundError());  
    next();
  });
  
app.use(function(err, req, res, next){
    res.status(404).send({message:err.message});
})



export default app.listen(port, function () {
    console.log(`express server listening on port: ${port}`);
});


