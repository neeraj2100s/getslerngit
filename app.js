const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require('./Models/user-model');

app.set("view engine", "ejs"); // Corrected view engine setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/register", (req, res) => {
    user= userModel.findOne({email})
   if(user){
    res.send("User already exists");
   }else{
    
   }
    let { username, name, email, password } = req.body;


    res.render("register",user);

});

app.post("/register", async (req, res) => {
    try {
        let { username, name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Use async hash method
        const user = new userModel({
            username,
            name,
            email,
            password: hashedPassword
        });

        user.save((err, user) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error registering user");
            } else {
                res.send("User registered successfully");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
// hello word