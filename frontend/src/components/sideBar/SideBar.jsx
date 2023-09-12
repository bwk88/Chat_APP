import { useState } from "react"
import { ChatState } from "../../Context/ChatProvider";
import UserList from "./UserList";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const SideBar = ({ flag,setFlag }) => {
    const [search,setSearch] = useState();
    const [searchResult,setSearchResult] = useState([]);

    const { user, setSelectedChat,chats,setChats } = ChatState();
    // console.log(user.name)
    // const history = useHistory();

    const handleSearch = async (e) =>{
        e.preventDefault();
        if(!search){
            return alert("Enter search feilds");
        }

        try {
            const config = {
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`,config)

           

            setSearchResult(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
            alert("Error Occured");
        }
    }

    const accessChat = async (userId) =>{
        try {
            const config = {
                headers: {
                    "Content-type":"application/json", //since we are sending a ID as json
                    Authorization:`Bearer ${user.token}`
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/chat', {userId},config);

            if(!chats.find((c) => c.id === data._id)) setChats([data,...chats]);

            setSelectedChat(data);
            // console.log(data);

            
        } catch (error) {
            alert("Error fetching the chat")
        }
    }
  return (
    <>
        <div className={`${flag ? ' w-80': 'w-[60px]'} flex-col justify-center items-center duration-500 top-0 left-0 fixed  bg-[#262626] h-full  `}>
                <img src=" assets/left.png" alt="" className={` 
                ${flag && `border-[2.5px]` && `border-[#262626]` && `rotate-0` } duration-700 rotate-180
                absolute w-[3.5rem] h-[3.5rem] -right-4
                top-1/2 rounded-full border-[5.5px] border-[#262626] z-10 `}
                onClick={()=>setFlag(!flag)} > 
                
                </img> 

            <form className={`${!flag && 'hidden' } duration-500  flex  items-center justify-end  w-64 p-7 top-0 `}>
                <input type="text" className=" w-[12rem] relative left-[3rem]  " value={search} onChange={(e)=> setSearch(e.target.value)} ></input>
                <button className="relative left-20 bottom-1" onClick={handleSearch} >Search</button>

            </form>
            <div className=" relative  text-white">
                {searchResult&& searchResult?.map(user=>(
                    <UserList 
                        key={user._id}
                        user={user}
                        flag={flag}
                        handleFunction={()=>accessChat(user._id)}
                    />
                ))}
            </div>

        </div>
        <button onClick={()=>setFlag(!flag)}>Search</button>
    </>

  )
}

export default SideBar

// ${flag ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300 `}
// ${flag ? 'w-[8vw]': 'w-[10vw]'}