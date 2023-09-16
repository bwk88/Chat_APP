import { useEffect, useState } from "react"
import { ChatState } from "../../Context/ChatProvider";
import ChatDisplay from "./ChatDisplay";
import axios from "axios";


const ChatInput = () => {
    const [newMessage,setNewMessage] = useState();
    const [messages,setMessages] = useState([]);
    const { user,selectedChat,setSelectedChat } = ChatState();

    const typingHandler = (e) =>{
        e.preventDefault();
        setNewMessage(e.target.value);

    }

    const fetchMessages = async () =>{
        try {
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,config)

            console.log(selectedChat)
            setMessages(data);

        }catch(error){
            alert("Error OCcured")
        }
    }

    const sendMessage = async(e) =>{
        // e.preventDefault();
        if(e.key === 'Enter' && newMessage){
            e.preventDefault();
            try {
                const config = {
                    headers: {
                        "Content-type":"application/json", 
                        Authorization:`Bearer ${user.token}`
                    }
                }
                
                setMessages(" ")

                const { data } = await axios.post('http://localhost:5000/api/message',{
                    content:newMessage,
                    chatId:selectedChat._id,
                },config);
                console.log(data);
                
                setMessages([...messages,data])


            } catch (error) {
                alert("Error in Sending Message");
            }
        } 
    }

    useEffect(()=>{
        fetchMessages();
    },[selectedChat])
  return (
    <>
    <div className=" absolute  h-[100%] w-[100%]">
        <ChatDisplay messages={messages} />
    </div>
    <div className=" absolute -bottom-[25px]  p-4 w-[100%]">
        <form onKeyDown={sendMessage}>
        <input value={newMessage}
        onChange={typingHandler}
         className="bg-[#e0e0e0] border-0.5 rounded-3xl border-black">
        </input>
        {/* <button>Send</button> */}

        </form>
        
    </div>
    </>
  )
}

export default ChatInput