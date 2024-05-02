const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const router = require('../routes/auth');

// sign up user
const signup = async(req,res) => {
    try {
        const {email,username,password} = req.body;
        if(!email || !username || !password){
            return res.status(404).json({message: "Please fill all the inputs!"});
        }
        const isMatchedEmail = await User.findOne({email});
        if(isMatchedEmail){
            return res.status(400).json({
                message:"User is already registered",
                success:false
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password,salt);
        const newUser = new User({email,username,password:hashedPassword});
        await newUser.save();
        res.status(201).json({
            success:true,
            message:"User is registered successfully"
        })

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// login user
const login = async(req,res) => {
    try {
        // const {email,password} = req.body;
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser){
            return res.status(404).json({
                message:'User not found'
            })
        }
        const match = await bcrypt.compare(req.body.password,existingUser.password);
        if(!match){
            return res.status(401).json("Invalid credentials!")
        }

        // CREATING A TOKEN
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "2d",
        });
        
        const {password,...info} = existingUser._doc;
       
          return res.status(200).json({ message: "Sucessfully logged in",accessToken:token,data:info });
    } catch (error) {
        res.status(500).json(error.message);
    }
}


// Refetch user
const refresh = async(req,res) => {
    const token = req.cookies.token;
    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })  
}

module.exports = {signup,login,refresh}