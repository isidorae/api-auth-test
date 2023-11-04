require('dotenv').config()
const jwt = require('express-jwt')
const secret = process.env.SECRET_JWT


const getToken = (req) => {
        let { authorization } = req.headers;
        if(authorization) {
            let [type, token] = authorization.split(' ')
            return (type === 'Token' || type === 'Bearer') ? token : null; 
        }
}

//le pasamos objeto a function, con secreto
const auth = jwt.expressjwt(
    {
    secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
    }
    )

    module.exports = auth; 
