const User = require('../models/user.model')
const bcrypt = require('bcrypt')

//crear usuario, metodo POST, guardar en base de datos
const signUp = async (req, res) => {

    const {email, password} = req.body

    try {
        const existingEmail = await User.findOne({email})

        if (existingEmail) {
            return res.json({
                message: 'Email ya registrado.'
            })
        }

        const user = new User(req.body)
        //se le pasa pasword como parametro
        user.hashPassword(password)
        const resp = await user.save()
        return res.json({
            message: "User was successfully created",
            detail: user.onSignUpGenerateJWT()
        })
        
    } catch (error) {
        //ej si no rellena campo 'required', api informa error
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

//INICIAR SESION
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //buscar single user en database, se le pasa query de como lo encontraremos (email en este caso)
        const userFound = await User.findOne({ email })

        if (!userFound) {
            return res.json({
                message: 'User not found.'
            })
        }
        //validación de password... comparación retorna TRUE / FALSE 
        const isCorrectPassword = await bcrypt.compareSync(password, userFound.password)
        if (!isCorrectPassword){
            return res.json({
                message: 'Incorrect password.'
            })
        }
        return res.json({
            message: 'Ok',
            //al momento de hacer login, mostrar JWT generado. 
            detail: { user: userFound, token: userFound.generateJWT()}
        })

    } catch (error) {
        return res.json({
            message: 'error',
            detail: error.message
        })
    }
}

//recibir data de base de datos 
const getUsers = async(req, res) => {
    try {
        const resp = await  User.find()
        return res.json({
            message: "Users",
            detail: resp
        })
    } catch(error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

//update data
const  updateUser = async (req, res) => {
    try {
        //nueva data que viene en body
        const newData = req.body
        //encontrar doc a traves de id, y luego update
        const resp = await User.findByIdAndUpdate(
           newData.userId,
           //acutalizar data con set
           { $set: newData }, 
           { new: true }
        )
        //generar resp para user
        return res.json(
            {
                message: 'User was updated successfully',
                detail: resp
            }
        )
    } catch(error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

//delete data
const deleteUser = async (req, res) => {
    try {
        //Acedemos a id 
        const resp = await User.findByIdAndDelete(req.body.userId)
        //msje usuario
        return res.json({
            message: "user successfully deleted",
            detail: resp
        })
    } catch(error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}


module.exports = { signUp, getUsers, updateUser, deleteUser, login }