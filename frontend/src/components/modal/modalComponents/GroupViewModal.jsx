import { ChatState } from '../../../Context/ChatProvider'


const GroupViewModal = ({handleClose}) => {
  const { selectedChat } = ChatState();
  console.log(selectedChat)
  return (
    <div className=" relative flex w-1/3 h-1/5 rounded-lg bg-white">

      <div className='flex-col m-4 '>
        
              {selectedChat && !selectedChat.isGroupChat ?(
                <h1>{ selectedChat.users[1].name }</h1>
                ):(
                  <>
                  <h1>{ selectedChat.chatname.toUpperCase() }</h1>
                   <div className=' flex p-2 text-white'>
                      {selectedChat.users.map((u)=>(
                        <span className='m-2 p-2 rounded-md bg-[#252525]'
                        key={u._id}>
                          {u.name}
                        </span>
                      ))}

                   </div>
                   
                  </>
                  
              )
              }
              <button
              className=' bg-[#252525]
              text-white p-2 rounded-md absolute
              bottom-0 right-0 mx-8 my-3 '
                onClick={handleClose} 
              > 
                Close
              </button>

      </div>

    </div>
  )
}

export default GroupViewModal