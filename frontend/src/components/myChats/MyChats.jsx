import { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import MyModal from "../modal/MyModal";


const MyChats = ({ fetchAgain }) => {
  const [loggedUser,setLoggedUser] = useState();
  const { user,selectedChat, setSelectedChat,chats,setChats,showModal,setShowModal } = ChatState();

  console.log(chats)
  const handleClose = () => setShowModal(!showModal);

  const fetchChats = async () =>{
    // console.log("here");
    try {
        const config = {
          headers: {
              Authorization:`Bearer ${user.token}`
          }
      }

      const { data } = await axios.get('http://localhost:5000/api/chat',config);
      console.log(data);
      setChats(data);

    } catch (error) {
      console.log(error.message)
      alert("Error Occured");
    }
  }
  
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
    className={` ${selectedChat ? `hidden` : `flex ` } flex-col bg-[#f9f9f9] h-[90vh] w-[30%] shadow-2xl rounded-xl sm:flex bottom-2 border-black `}>

      <div className=" flex justify-between p-2">

        <h1 className=" p-1 rounded-md font-sans font-medium  text-2xl text-[#262626]" >My chats</h1>

        <button onClick={()=>setShowModal(!showModal)}>
          <img src="assets/add_icon.png" className=" w-[30px]" alt=""  />
        </button>

      </div>

      <div className=" text-black flex-col ">
        {chats && chats.map((chat)=>(
          <div onClick={()=>setSelectedChat(chat)}
              
              className={

              `${selectedChat === chat ? `bg-[#262626]`:` bg-[#44d7b6]`} 
               ${selectedChat === chat ? ` text-white`:` text-black`} 
              p-5 m-2
              
              rounded-xl
              cursor-pointer
               hover:bg-[#262626] hover:text-white
               
              `
              
            }
            key={chat._id}>
              {/* if chat is type Group chat then show group chat name else show chat user name */}
              {chat.isGroupChat ? chat.chatname : chat.users[1].name } 
          </div>
        ))}
      </div>
      <MyModal visible={showModal} onClose={handleClose} />
    </div>
  )
}

export default MyChats