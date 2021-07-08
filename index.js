const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcryptjs');

//user modal
const User = require("./modals/User");

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);

//json paser
app.use(express.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//DB config
const db = require("./config/key");

//connect to Mongoose
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => { console.log("database connected"); })
    .catch((err) => { console.log(err); })

//register user
app.post('/register', (req, res) => {
    const { Fname, Lname, gender, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if (!Fname || !Lname || !gender || !email || !password || !password2) {
        errors.push({ msg: 'please fill in all the fields' });
    }

    //check password match
    if (password !== password2) {
        errors.push({ msg: 'passwords do not match' });
    }

    //check password length
    if (password.length < 6) {
        errors.push({ msg: 'password too short, minimum 6 characters' });
    }

    if (errors.length > 0) {
        res.send(errors);
    } else {
        //validation passes
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exists
                    errors.push({ msg: 'Email already registered' });
                    res.send(errors);
                } else {
                    const newUser = new User({
                        Fname,
                        Lname,
                        gender,
                        email,
                        password,
                        password2
                    });

                    //hash password
                    bcrypt.genSalt(5, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hashed
                            newUser.password = hash;

                            //save the user
                            newUser.save()
                                .then(() => {
                                    res.send("User registered successfully");
                                })
                                .catch(err => console.log(err));
                        })
                    });

                }
            });
    }


});
app.post("/login", async (req, res) => {
    let errors = [];

    //checking if any of the fields are empty

    if (!req.body.email || !req.body.password) {
        errors.push({ msg: 'please fill in all the fields' });
    }

    if (errors.length > 0) {
        res.send(errors);
    } 
    
    else {
        //Authentication passes
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            //No user exists with the input email id
            errors.push({ msg: 'No user registered with the given email' });
            res.send(errors);
        } 
        else {
            //hasing the password to verify it
            const validPassword = await bcrypt.compare(req.body.password, user.password)

            if (!validPassword) {
                res.status(400).json("Wrong password")
                res.send(errors)
            }

            //Login successfull
            res.send("User logged in Successfully")
        }
        
    }
})
app.listen(5000, console.log("server started running"));