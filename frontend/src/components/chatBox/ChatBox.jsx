import { ChatState } from "../../Context/ChatProvider"
import ChatBoxHeader from "../chatBoxHeader/chatBoxHeader";

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();
  // console.log(selectedChat)
  return (
    <div className=" relative flex items-center justify-center bg-[#f9f9f9] h-[90vh] w-[68%] shadow-2xl">
      <ChatBoxHeader />

      { selectedChat ? (
        <div className=" flex justify-center items-center absolute bg-[#e0e0e0] h-[85%] w-[95%] top-[5rem] rounded-2xl"> </div>

      ) : (
            <div> Click on user to start chatting </div>
      )}
      
        
      </div>
  )
}

export default ChatBox