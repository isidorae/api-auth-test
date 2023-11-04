const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT;

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        dob: {type: Date},
        email: {type: String, required: true},
        password: {type: String, required: true},
    }
)

//**********ENCRIPTAR PASSWORD
//function que recibe por parametro password. 
userSchema.methods.hashPassword = function (password) {
    //encriptacion de forma asincrona.. se le pasa data (password) y config de encriptacion
    this.password = bcrypt.hashSync(password, 16)
}

//**********GENERAR JWT
userSchema.methods.generateJWT = () => {
    //function que retorna un jwt, 
    return jwt.sign(
        //al objeto le pasaremos userId que sera igual al id creado en el model
        { userId: this._id},
        //le pasamos secreto del .env
        secret
        )
}


//**********JWT que se va generar al registrarnos/SINGUP (crear usuario)
userSchema.methods.onSignUpGenerateJWT = function () {
    //retorna objeto; definir userId
    return {
        userId: this._id,
        // y devolver token que se esta creando
        token: this.generateJWT()
    }
}


//**********JWTlogin generar token para obtener/LOGIN usuario

const User = mongoose.model('user', userSchema);
module.exports = User;