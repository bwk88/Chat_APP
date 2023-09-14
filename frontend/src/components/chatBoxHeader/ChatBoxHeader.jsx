import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const ChatBoxHeader = ({ fetchAgain,setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    
  return (
    <>
    {selectedChat &&   
        <div className=" absolute top-0 text-2xl font-serif font-medium left-0  m-2 p-2 ">
            {selectedChat.isGroupChat ? (
                <div> {selectedChat.chatname} </div>
            ):(
                <div> {selectedChat.users[1].name} </div>
            ) 
            }
        </div>
    
    }
    </>

  )
}

export default ChatBoxHeader