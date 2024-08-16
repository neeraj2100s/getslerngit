const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dbms", {});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    username:String
})
module.exports =mongoose.model("user",userSchema)