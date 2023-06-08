const express = require("express")

const app = express()

const passport = require("./passport")
app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({extended: true}))



const routes = require("./routes")
app.use(routes)

function errHandler(err, req, res, next){
    if(err){
        res.send(`<h1>OOPS! Error</h1> <p>${err.message}</p>`)
    }
}

app.use(errHandler)

app.listen(3000, () => {
    console.log("server started")
})