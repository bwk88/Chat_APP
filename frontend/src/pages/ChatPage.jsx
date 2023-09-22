import NavBar from "../components/NavBar";
// import { ChatState } from "../Context/ChatProvider";
import MyChats from "../components/myChats/MyChats";
import ChatBox from "../Components/ChatBox/ChatBox";
import { ChatState } from "../Context/ChatProvider";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  // console.log(user.name);
  const [fetchAgain,setFetchAgain] = useState(); //to keep track of all the chats
  
  // useEffect(()=>{
  //   const logedIn = JSON.parse(localStorage.getItem('userInfo'))
  //   setUser(logedIn)
  // },[])

  return (
    // <div className="flex items-end"> 
      <div className='w-[calc(100%-60px)] absolute right-0 font-Promt font-light '>
        {/* hello */}
        {user
         && 
         <NavBar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        }

        <div className="flex justify-between w-full p-5  ">
          {user && <MyChats fetchAgain={fetchAgain} /> }
          {user && <ChatBox fetchAgain={fetchAgain}  setFetchAgain=
          {setFetchAgain}/> }
        </div>
      </div>

    // </div>
  )
}

export default ChatPage