const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()

const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/exercise', require('./routes/exercise.routes'))
app.use('/api/defect', require('./routes/defect.routes'))

async function start(){
    try{ 
        mongoose.connect(
            process.env.MONGODB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        app.listen(PORT, () => {
            console.log("listening on port: ", PORT)
        })
    } catch (err) {
        console.erroe(err)
    }
}

start()