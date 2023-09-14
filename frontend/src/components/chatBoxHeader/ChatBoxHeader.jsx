import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import PreviewIcon from '@mui/icons-material/Preview';
import MyModal from '../modal/MyModal';

const ChatBoxHeader = ({ fetchAgain,setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat,showModal,setShowModal } = ChatState();
    // const [openModal,setOpenModel] = useState(false);


    const handleClose = () => setShowModal(!showModal);

    
    
  return (
    <>
    {selectedChat &&   
        <div className=" flex items-center absolute top-0 text-2xl font-serif font-medium left-0 my-2 p-2 w-full">
            {selectedChat.isGroupChat ? (
                <>
                    <div> {selectedChat.chatname} </div>
                    <PreviewIcon />
                </>
            ):(
                <>
                    <div> {selectedChat.users[1].name} </div>
                    <PreviewIcon className=' absolute right-0 mx-8 cursor-pointer ' 
                    // onClick={()=>setShowModal(!showModal)}
                    
                    fontSize='large'
                    
                     />
                     <MyModal visible={showModal} onClose={handleClose} />
                </>
            ) 
            }
        </div>
    
    }
    </>

  )
}

export default ChatBoxHeader