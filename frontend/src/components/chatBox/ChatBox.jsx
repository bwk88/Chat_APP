import { ChatState } from "../../Context/ChatProvider"
import ChatBoxHeader from "../chatBoxHeader/chatBoxHeader";
import ChatInput from "./ChatInput";
// import ChatDisplay from "./ChatDisplay";

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();
  // console.log(selectedChat)
  return (
    <div className=" relative flex items-center justify-center bg-[#f9f9f9] h-[90vh] w-[68%] shadow-2xl">
      <ChatBoxHeader />

      { selectedChat ? (
        <div className=" flex absolute bg-[#e0e0e0] h-[85%] w-[95%] top-[5rem] rounded-2xl">

          <ChatInput />
        </div>

      ) : (
            <div> Click on user to start chatting </div>
      )}
      
        
      </div>
  )
}

export default ChatBox