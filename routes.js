const router = require("express").Router()

const user = require("./db")
const passport = require("./passport")
const utils = require("./utils")

router.post("/register", (req, res, next) => {

    const saltHash = utils.generatePassword(req.body.password)

    const newUser = new user({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt
    })

    newUser.save()
        .then((user) => {
            const tokenData = utils.issueJwt(user)

            res.json({ success: true, user: user, token: tokenData.token, expiresIn: tokenData.expiresIn})
        })
        .catch(err => next(err))
})

router.post("/login", (req, res, next) => {
    user.findOne({ username: req.body.username })
        .then((user) => {
            
            if(!user){
                res.status(401).json({ success: false, msg: "could not find user" })
            }

            const isValid = utils.validatePassword(req.body.password, user.hash, user.salt)

            if(isValid){
                const tokenData = utils.issueJwt(user)
                res.status(200).json({ success: true, user: user, token: tokenData.token, expiresIn: tokenData.expiresIn})
            } else {
                res.status(404).json({ success: false, msg: "entered either/both wrong password and username" })
            }
        })
        .catch(err => next(err)) // not able to execute the findOne() function
})

router.get("/protected", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "you are authenticated" })
})

module.exports = router
