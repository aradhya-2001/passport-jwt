const crypto = require("crypto")
const fs = require("fs")

const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, 
    publicKeyEncoding: {
        type: "pkcs1", 
        format: "pem" 
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
    }
})

fs.writeFileSync("publicKey.pem", publicKey)
fs.writeFileSync("privateKey.pem", privateKey)
