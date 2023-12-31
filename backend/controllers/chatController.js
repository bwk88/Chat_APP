const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel')

const accessChat = asyncHandler(async(req,res) =>{
    const { userId } = req.body; //logged in user sending the userid of the user with which it wants to create the chat

    if(!userId){
        console.log("User ID param not sent with request");
        return res.sendStatus(400);
    }
     
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } }, //the user which is logged in and making the request
            { users: { $elemMatch: { $eq: userId } } } //the user with whome logged in user want to chat
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select: "name pic email",
    });


    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users:[req.user._id, userId],
        }
    }

    try {
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password");

        res.status(200).send(FullChat);


    } catch (error) {
         res.status(400);
         throw new Error(error.message); 
    }

})

const fetchChats = asyncHandler(async (req,res) =>{
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmin","-password")
        .sort({updatedAt: -1 })
        .then(async(results)=>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                select: "name pic email",
            });

            res.status(200).send(results);
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})


const createGroupChat = asyncHandler(async(req,res) =>{
    if(!req.body.users || !req.body.name ) {
        return res.status(400).send({ message: "Please Fill all the feilds" })
    }

    // getting all the users from frontend to form the group 
    var users = JSON.parse(req.body.users); //cant send all the userID in array fromat so sednig it in string format from Frontend and the parsing it into json object.
    
    if(users.length<2){
        return res.status(400).send("More Than 2 users required to form a group chat");
    }
        const groupChat = await Chat.create({
            chatname: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user //the loged in user will be the admin
        });

        const fullGroupChat = await Chat.findOne({_id: groupChat._id}).populate("users","-password").populate("groupAdmin","-password");

        res.status(200).json(fullGroupChat);

    try {
        res.status(400);
        throw new Error(error.message);
    } catch (error) {
        
    }

})

const renameGroup = asyncHandler(async(req,res) =>{
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatname: chatName,
        },
        {
            new: true, //shows the updated chatname
        }
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;
    
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId}
        },
        {new: true} //to return the latest feild
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})


const removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;
    
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId}
        },
        {new: true} //to return the latest feild
    ).populate("users","-password").populate("groupAdmin","-password");

    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})

module.exports = { accessChat,fetchChats, createGroupChat, renameGroup, addToGroup , removeFromGroup };