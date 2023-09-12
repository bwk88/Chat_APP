import { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";


const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState();
  const { user, setSelectedChat,chats,setChats } = ChatState();

  const fetchChats = async() =>{
    try {
        const config = {
          headers: {
              Authorization:`Bearer ${user.token}`
          }
      }

      const { data } = await axios.get('http://localhost:5000/api/chat',config);
      // console.log(data);
      setChats(data);

    } catch (error) {
      console.log(error.message)
      alert("Error Occured");
    }
  }
  
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[]);

  return (
    <div>MyChats</div>
  )
}

export default MyChats