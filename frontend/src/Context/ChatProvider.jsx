import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [user,setUser] = useState();
    const [selectedChat,setSelectedChat] = useState();
    const [chats,setChats] = useState([]);
    const [showModal,setShowModal] = useState(false);

    const history = useHistory();

    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo")) 
        setUser(userInfo);
        
        if(!userInfo) {
            // console.log(userInfo);
            history.push('/')
        }
    },[history]);

    return <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,showModal,setShowModal}}> {children} </ChatContext.Provider>;
}

export const ChatState = () =>{
    return useContext(ChatContext);
}


export default ChatProvider;