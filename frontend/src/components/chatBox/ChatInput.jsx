import { useEffect, useState } from "react"
import { ChatState } from "../../Context/ChatProvider";
import ChatDisplay from "./ChatDisplay";
import axios from "axios";
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000";
var socket,selectedChatCompare;

const ChatInput = ({fetchAgain, setFetchAgain}) => {

    const [newMessage,setNewMessage] = useState();
    const [messages,setMessages] = useState([]);
    const [socketConnected,setSocketConnected] = useState(false);
    const { user,selectedChat,setSelectedChat } = ChatState();

    const typingHandler = (event) =>{
        // event.preventDefault();
        setNewMessage(event.target.value);

    }

    const fetchMessages = async () =>{
        try {
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,config)

            // console.log(selectedChat)
            setMessages(data);

            
            socket.emit("join Chat", selectedChat._id);//emits an event to the slected user into a room 

        }catch(error){
            alert("Error OCcured")
        }
    }

    const sendMessage = async(event) =>{
        // e.key.preventDefault();
        if(event.key === 'Enter' && newMessage){
            event.preventDefault();
            try {
                const config = {
                    headers: {
                        "Content-type":"application/json", 
                        Authorization:`Bearer ${user.token}`
                    }
                }
                
                

                const { data } = await axios.post('http://localhost:5000/api/message',{
                    content:newMessage,
                    chatId:selectedChat._id,
                },config);
                // console.log(data);
                
                socket.emit("new message",data);

                setMessages([...messages,data])
                setNewMessage("");


            } catch (error) {
                alert("Error in Sending Message",error.message);
            }
        } 
    }
    useEffect(()=>{
        socket = io.connect(ENDPOINT); //connecting to the backend socket
        socket.emit("setup", user);
        socket.on("connected",()=> setSocketConnected(true))
    },[])

    useEffect(()=>{
        socket.on("message recieved", (newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                //give notification
            }else{
                setMessages([...messages,newMessageRecieved]);
            }
        })
    })


    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat; //storing the selected chat to variable to display notification or not
    },[selectedChat])



  return (
    <>
    <div className=" absolute h-[94%] w-[100%]">
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