const express = require("express")
const { userModel } = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRoute = express.Router()

userRoute.post("/register", async (req, res) => {
    const { name, email, password, gender } = req.body

    try {
        bcrypt.hash(password, 9, async (err, hash) => {
            if (err) {
                console.log(err)
                res.send("Something went wrong")
            } else {
                const user = new userModel({ name, email, password: hash, gender })
                await user.save()
                res.send({ "msg": "new user has been register", "sucess": true })
            }
        });

    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register", "sucess": false })
    }
})

userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.find({ email })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'resume');
                    res.send({ token })
                } else {
                    res.send({ "msg": "Wrong Credential", "sucess": false, user: user[0] })
                }
            });
        } else {
            res.send({ "msg": "Wrong Credential", "sucess": false })
        }


    } catch (err) {
        res.send('Err')
        console.log(err)
    }
})



module.exports = {
    userRoute
}