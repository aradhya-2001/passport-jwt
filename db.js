const mongoose = require("mongoose");

const dbUrl = "mongodb://0.0.0.0:27017/usersDb";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options)
.then(() => {
console.log("db connected");
})
.catch((err) => {
console.log("error connecting to mongodb: ", err);
});

const schema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
})

const Users = mongoose.model("users", schema)

module.exports = Users