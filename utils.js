const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const fs = require("fs")

function validPass(password, hash, salt){
    const hashCheck = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return hash === hashCheck
}

function genPass(password){
    const salt = crypto.randomBytes(32).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")

    return{
        salt: salt,
        hash: hash
    }
}

const privKey = fs.readFileSync("./privateKey.pem", "utf8")

function issueJwt(user){
    const _id = user._id

    const payload = {
        sub: _id,
        iat: Math.floor(Date.now()) / 1000 // Date.now() tells us time in millisec elapsed from jan 1, 1970. For jwt to sign and expire time shpould be in seconds
    }

    const signedToken = jwt.sign(payload, privKey, {expiresIn: "1d", algorithm: "RS256"}) // console.log(signedToken) = eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDgxZWQzNGYyZWMzZmQ0MTI0YzM0MzEiLCJpYXQiOjE2ODYyMzY0NjguMTIsImV4cCI6MTY4NjMyMjg2OH0.PaE19gFVaw-WJf2PVnonpS3FS40FDyZazmCYHbemxiCM9zcTPvigahyWZs9XjcqTSp6y3VQuYdHDE36uB2anxkdLOpLDEgXDISgvgSZDFGCRjvxGomnrkp-AQOmr4jbnaHG3qhS1wKjjkXebheQBr9X9MxuPjAtGpAwJXR_yb3C93FF_tNWl8VaBGaaUayiGXu3dBnX3WwYiDabE1NaDlHjRv0R6g9tNi-S76tdz68lToiqPEOuk_ZbBKd9FttKENM81SJk8zyN8m0x1_1RpFs51MR6xRBEYmofjAmevzL3WJ5klKsbkNXMUFHW0M8CNvfkOfIc4XyNP-wO4t44Hy1nmlAiUik8e4P8yV499rNIO5BPPyqGxK1LevLugHLqhpI02u0oYSu6TIflg1ENFKCNju-Y_npZB_GzRnmd0gJC3YnhvvxJ0rrbNA4-pXNyc6rOt7VQSKjqeq_VOossK2NbSIG0WupJQfVxo5MNwntsVEI7iHZ-mJXi0M6OS6Hnm5g-ViLisRuKowV52lYgAWoufdczjFbmr0HRmZH6Obx6hXXzdTXYuLLE4zOsTW0kXv6FsHyZj6umXwaSfDu836lBUTImkcUoGqx2gKziWpD_pTn4ce7qSym8DxMvbUVSnG1OhgO4t9yZjcHtE2K1iBnfqqIlQDH68qFT4-trV7m0
    
    return{
        token: "Bearer " + signedToken,
        expiresIn: "1d"
    }
}


module.exports.validatePassword = validPass
module.exports.generatePassword = genPass
module.exports.issueJwt = issueJwt