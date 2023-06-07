const express = require('express')
const { formModel } = require('../model/form.model')

const formRoutes = express.Router()

formRoutes.get('/', async (req, res) => {
    try {
        const forms = await formModel.find()
        res.send(forms)
    } catch (err) {

    }
})

formRoutes.post('/', async (req, res) => {
    try {
        const { name, mobile, position, resume } = req.body

        const userForm = new formModel({ name, mobile, position, resume })
        await userForm.save()
        res.send({ 'msg': 'Form uploaded sucessfully' })

    } catch (err) {
        console.log(err)
        res.send({ 'msg': 'Error' })
    }
})

formRoutes.delete('/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await formModel.findByIdAndDelete({ _id })
        res.send({ 'msg': 'Resume has been deleted' })
    } catch (err) {
        console.log(err)
        res.send({ 'msg': 'Error' })
    }
})



module.exports = {
    formRoutes
}