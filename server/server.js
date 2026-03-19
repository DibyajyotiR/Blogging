const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const allRoutes = require('./routes/allRoutes')

const app = express()

mongoose.connect(process.env.MONGODB_URL)
    .then((res) => {
        console.log("DB Connected");
    }).catch((err) => {
        console.log(err.message);
    })

app.use(express.json())
app.use(cors())
app.use('/api', allRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})