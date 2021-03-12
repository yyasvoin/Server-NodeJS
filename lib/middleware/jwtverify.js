import * as jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers['authorization']
    // Value of the authorization header is typically: "Bearer JWT", hence splitting with empty space and getting second part of the split
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(400).send({message: "token not provided"})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: err.message})
    }
}
