import { ChatState } from '../../Context/ChatProvider'
import PreviewIcon from '@mui/icons-material/Preview';
import MyModal from '../modal/MyModal';
import { useState } from 'react';

const ChatBoxHeader = ({ fetchAgain,setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat} = ChatState();
    const [info,setInfo] = useState(false);


    const handleClose = () => setInfo(!info);

    
    
  return (
    <>
    {/* if a user is selected , display group name if it is group else display user name at the header of chat box */}

    {selectedChat &&   

        <div className=" flex items-center absolute top-0 text-2xl font-serif font-medium left-0 my-2 p-2 w-full">

            {selectedChat.isGroupChat ? (
                <>
                    <div > {selectedChat.chatname.toUpperCase()} </div>
                    <PreviewIcon className=' absolute right-0 mx-8 cursor-pointer ' fontSize='large' 
                    onClick={()=>setInfo(!info)}
                    />
                </>
            ):(
                <>
                    <div> {selectedChat.users[1].name} </div>
                    <PreviewIcon className=' absolute right-0 mx-8 cursor-pointer ' 
                    onClick={()=>setInfo(!info)}
                    
                    fontSize='large'
                    
                     />
                </>
            ) 
        }
        
        <MyModal visible={info} onClose={handleClose} info={info} />
        </div>
    
    }
    </>

  )
}

export default ChatBoxHeader