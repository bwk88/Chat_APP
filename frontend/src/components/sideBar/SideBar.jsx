import { useState } from "react"
import { ChatState } from "../../Context/ChatProvider";
import UserList from "./UserList";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const SideBar = () => {
    const [flag,setFlag] = useState(false);
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
            console.log(data);
        } catch (error) {
            // console.log(error);
            alert("Error Occured");
        }
    }
    // console.log(searchResult)
    //chat Create function
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
                ${flag ? `rotate-0`: 'rotate-180' } duration-700 
                absolute w-[3.5rem] h-[3.5rem] -right-4
                top-1/2 rounded-full border-[5.5px] border-[#262626] z-10  hover:scale-110 hover:border-[0px]`}
                onClick={()=>setFlag(!flag)} > 
                
                </img> 

             <div className={`${flag ? 'opacity-1 transition-all delay-700' : `opacity-0  w-[0] `} flex
             items-center justify-end  w-64 p-7 top-0`}>

                <input type="text" placeholder="Search Users" className=" w-[12rem] relative left-[3rem]  " value={search} onChange={(e)=> setSearch(e.target.value)} ></input>
                <button className=" bg-[#16c28c] rounded-md p-2 relative left-20 bottom-1" onClick={handleSearch} >Search</button>
            </div>
            
            

            {/* </form> */}
            <div className={`${flag ? 'opacity-1 transition-all delay-700' : `opacity-0  w-[0] `}`}>
                {searchResult&& searchResult?.map(user=>(
                    <UserList 
                        key={user._id}
                        user={user}
                        flag={flag}
                        handleFunction={()=>accessChat(user._id)}
                    />
                ))
                }
            </div>

        </div>
        <PersonSearchOutlinedIcon className=" cursor-pointer" onClick={()=>setFlag(!flag)} />
        {/* <button onClick={()=>setFlag(!flag)}>Search</button> */}
    </>

  )
}

export default SideBar

// ${flag ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300 `}
// ${flag ? 'w-[8vw]': 'w-[10vw]'}