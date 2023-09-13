import { useState } from "react"
import axios from "axios";
import { ChatState } from "../../../Context/ChatProvider";


const GroupChatModal = () => {
  const [groupChatName,setGroupChatName] = useState();
  const [search,setSearch] = useState();
  const [searchResult,setSearchResult] = useState([]);

  const { user } = ChatState();
  
  const handleSearch = async (query) =>{
    setSearch(query);
    if(!query){
      return
    }

    try {
        const config = {
          headers:{
              Authorization:`Bearer ${user.token}`
          }

        }
        
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`,config)

      setSearchResult(data);
      // console.log(searchResult);

    } catch (error) {
      console.log(error.message)
      alert("Error: Failed to load the search")
    }

  }

  //Creating Group Chat
  const handleSubmit = () =>{

  }

  return (
    <div className=" flex justify-center items-center w-1/3 h-1/2 rounded-lg bg-white">
        <div className=" flex-col items-center justify-center" >
          {searchResult?.slice(0,4).map((user)=>{
              <li key={user.id}>
                {console.log(user)}
                {user.name} 
              </li>
          })}
        <form >
            <center>
            <label>Create Group</label>
            </center> 

            <input placeholder="Chat Name" type="text" value={groupChatName} onChange={(e)=>{e.target.value}}/>

            <input placeholder="Search Users" value={search} type="text" onChange={(e)=>handleSearch(e.target.value)}/>

            <center>

            {/* render searched User */}

                <button onClick={handleSubmit}>Create</button>

            </center>

          

        </form>

        </div>

    </div>
  )
}

export default GroupChatModal