const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatname : { type: String, trim: true },
        isGroupChat: { type:Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", //the User Model

            }
        ],
        latestMessage:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message" // the Message Model
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },{timestamps: true}
)

module.exports = mongoose.model("Chat", chatModel)