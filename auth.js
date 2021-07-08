const router = require("express").Router();
/*const User = require("../models/User")*/
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post("/login", async (req, res) =>{
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("User not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        jwt.sign({user},'secretkey',(err,token)=>{
  
        res.status(200).json({user,token})
        })
    }
    catch (err) {
        console.log(err)
    }

})
module.exports=router