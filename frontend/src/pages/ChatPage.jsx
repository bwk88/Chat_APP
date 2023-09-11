import NavBar from "../components/NavBar";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../Components/MyChats/MyChats";
import ChatBox from "../Components/ChatBox/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();
  // console.log(user.name);

  return (
    <div className='w-full'>
      {/* hello */}
      <NavBar />

      <div className="flex justify-between w-full p-5 dhruv@gmail.com">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatPage