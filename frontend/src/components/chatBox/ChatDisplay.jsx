import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage } from "./chatLogic";
import { ChatState } from '../../Context/ChatProvider';
// ${isLastMessage(m,i,user._id) ? 'bg-green-400': ' bg-slate-50' }
const ChatDisplay = ({messages}) => {
    const { user } = ChatState();
    // console.log(messages)
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i)=>(
            <div className='flex ' key={m._id}>
                <span className={` m-2 p-1 rounded-lg  ${m.sender._id === user._id ? ` bg-blue-500 ml-[49rem] ` : `bg-white`}`}>
                    {m.content}
                </span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ChatDisplay