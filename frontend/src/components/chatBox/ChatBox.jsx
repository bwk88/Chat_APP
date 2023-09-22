import Lottie from "lottie-react";
import { ChatState } from "../../Context/ChatProvider"
import ChatBoxHeader from "../chatBoxHeader/chatBoxHeader";
import ChatInput from "./ChatInput";
// import ChatDisplay from "./ChatDisplay";
import animationData from '../animations/chat.json'
import { useEffect } from "react";

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();
  // console.log(selectedChat)
  useEffect(()=>{

  },[fetchAgain])
  
  return (
    <div className=" relative flex items-center ms justify-center bg-[#f9f9f9] h-[90vh] w-[68%] shadow-2xl rounded-2xl">
      <ChatBoxHeader fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

      { selectedChat ? (
        <div className=" absolute bg-[#e0e0e0] h-[85%] w-[95%] top-[5rem] rounded-2xl">

          <ChatInput />
        </div>

      ) : (
        <div className=" flex-col">
          <Lottie
          style={{width:"200px"}}
          animationData={animationData} 
          />
          <div> Click on a user to start chatting </div>
        
        </div>
      )}
      
        
      </div>
  )
}

export default ChatBox