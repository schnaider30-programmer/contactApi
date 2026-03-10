const express = require('express')
const app = express()
const contactRoutes = require('./routes/contacts')
const mongoDb = require('./data/database')

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello WOrld")
})

app.use("/contacts", contactRoutes)

mongoDb.initDb((err, mongoClient) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(port, () => {
            console.log("Database connection established and running on port:", port)
        })
    }
})