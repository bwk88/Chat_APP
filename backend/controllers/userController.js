const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const generateToken = require('../config/generateToken');

//Sign UP fnction
const registerUser = asyncHandler(async(req,res) =>{
    const { name, email, password, pic } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User ALready Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic:  user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create user");
    }

});

//LogIn Function
const authUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    
    // checking if the user is present in DB through its email
    const user = await User.findOne({ email }); 

    //if user Exists check if the entered password is correct with the DB
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic:  user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password");

    }
})

//user searching function
const allUsers = asyncHandler(async (req,res) =>{
    //req.params = getting the ids, req.query = getting the query

    //the keyword here returns the regex expression(if true)
    const keyword = req.query.search 
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    }: {}

    // the regex is passed to the mongodb find(keyboard) to execute semantic search
    const users = await User.find(keyword).find({_id: { $ne:req.user._id } })
    res.send(users);

})


module.exports = { registerUser , authUser, allUsers };