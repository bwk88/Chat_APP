import React from 'react'
import { ChatState } from '../../../Context/ChatProvider'


const ViewModal = () => {
  const { selectedChat } = ChatState();
  // console.log(selectedChats)
  return (
    <div className=" relative flex w-1/3 h-1/5 rounded-lg bg-white">

      <div className='flex-col m-4 '>
        
              {/* <h2> {selectedChats.users[1].name} </h2> */}
              {!selectedChat.isGroupChat &&
                <h1>{selectedChat.users[1].name} </h1> 
              }
              <button className=' bg-[#252525] text-white p-2 rounded-md absolute bottom-0 right-0 mx-8 my-3 '> Close</button>

      </div>

    </div>
  )
}

export default ViewModal