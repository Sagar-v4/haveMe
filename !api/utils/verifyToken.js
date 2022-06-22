const createError = require("./error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifyToken = (req, res, next) => {

    const token = req.cookie.access_token;

    if(!token) return next(createError(401, "you are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "token is not valid!"));
        req.user = user;
        next();
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.param.id || req.user.role === "admin") next()
        else return next(createError(403, "you are not authorized!"));
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role === "admin") next()
        else return next(createError(403, "you are not authorized!"));
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,

}