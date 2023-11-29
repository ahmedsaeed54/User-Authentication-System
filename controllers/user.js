const userModel = require("../Schemas/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.register = async function (req, res) {
    try {
        let newUser = new userModel(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        newUser.password = hashedPassword;
        let user = await newUser.save();
        return res.json({
            message: "User registered successfully",
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        return res.status(400).send({ message: err });
    }
};

exports.login = async function (req, res) { 
    try{
        let user = await userModel.findOne({email: req.body.email})
        if (!user){
            return res.status(401).json({message:"authentication failed... invalid data"})
        }
        if ((await user.comparePassword(req.body.password)) === false ){
            return res.status(401).json({message:"authentication failed... invalid data"})
        }
        const token = jwt.sign({email:user.email, name:user.name, _id:user.id}, "fuck")
        return res.json({message:"user loggedin successfully", user:{ name:user.name, email:user.email, token:token }})
    }
    catch(err){
        return res.status(401).send({ message: err });
    }
};
