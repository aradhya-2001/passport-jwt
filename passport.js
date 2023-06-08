const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const fs = require("fs");

/* const fullPassportJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: pubKey || secretPhrase,
  issuer: "enter issuer ",
  audience: "enter audience",
  algorithms: ["RS256"],
  ignoreExpiration: false,
  passReqToCallback: false,
  jsonWebTokenOptions: {
    complete: false,
    clockTolerance: " ",
    maxAge: "2d",
    clockTimestamp: "100",
    nonce: "string here for OpenID",
  },
};
 */

const pubKey = fs.readFileSync("./publicKey.pem", "utf8")

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: pubKey,
    algorithms: ["RS256"]
}

const user = require("./db");

function verifyCallback(payload, done){
    user.findOne({ _id: payload.sub})
    .then((user)=>{
        if(user){
            return done(null, user) // after this passport attaches the user with req.user 
        }else{
            return done(null, false)
        }
    })
    .catch(err => done(err, null))    
}

const strategy = new jwtStrategy(options, verifyCallback)

passport.use(strategy)

module.exports = passport
