const express = require('express')
var cors = require('cors')
const { connection } = require('./config/db')
const { userRoute } = require('./routes/user.routes')
const { formRoutes } = require('./routes/form.routes')
const { authenticate } = require('./middleware/auth.middleware')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Welcome')
})
app.use('/user', userRoute)
app.use(authenticate)
app.use('/form', formRoutes)

app.listen(4500, async () => {
    try {
        await connection
        console.log('Connected to db')
    } catch (err) {
        console.log('Not connected to db')
    }
    console.log('Server is running at port 4500')
})