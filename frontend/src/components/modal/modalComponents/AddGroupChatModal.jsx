import { useState } from "react"
import axios from "axios";
import { ChatState } from "../../../Context/ChatProvider";
// import UserList from "../../sideBar/UserList";
import CloseIcon from '@mui/icons-material/Close';


const AddGroupChatModal = () => {
  const [groupChatName,setGroupChatName] = useState();
  const [search,setSearch] = useState();
  const [searchResult,setSearchResult] = useState([]);
  const [selectedUsers,setSelectedUsers] = useState([]);


  const { user,chats, setChats } = ChatState();
  
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

  const handleFunction = (userToAdd) =>{
    if(selectedUsers.includes(userToAdd)){
      return alert("User already added");
    }

      // console.log(userToAdd)
      setSelectedUsers([...selectedUsers,userToAdd]);
  }

  const handleDelete = (userToDel) =>{
    setSelectedUsers(selectedUsers.filter((sel)=>
    sel._id !== userToDel._id
  ))
  }

  //Creating Group Chat
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!groupChatName || !selectedUsers){
      alert ("Enter all feilds")
    }

    try {
      const config = {
        headers:{
            Authorization:`Bearer ${user.token}`
        }

      }
      const { data } = await axios.post("http://localhost:5000/api/chat/group",{
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map(u=>u._id))
      },config);

      setChats([data,...chats]) // data before chats, cuz adding to the of all the chats
      console.log(chats)
      alert("Group Created");


    } catch (error) {
      alert("Error creating Group chats");
      
    }

  }

  // console.log(searchResult)

  return (
    <div className=" flex justify-center items-center w-1/3 h-1/2 rounded-lg bg-white">
        <div className=" flex-col items-center justify-center" >
        <form className=" flex-col" >
            <center>
            <label>Create Group</label>
            </center> 

            <input placeholder="Chat Name" type="text" value={groupChatName} onChange={(e)=>{setGroupChatName( e.target.value)}}/>

            <input placeholder="Search Users" value={search} type="text" onChange={(e)=>handleSearch(e.target.value)}/>

            {selectedUsers.map((u)=>(
                <span className=" flex-row bg-blue-700 text-white m-1 my-2  p-1 rounded-md " 
                key={u._id}>
                  {u.name}
                  <CloseIcon className=" cursor-pointer" fontSize="small"
                  onClick={()=>handleDelete(u)}
                  />
                </span>
            ))}

            {searchResult?.slice(0,2).map((user) =>
              <div className=" relative cursor-pointer flex-col bg-[#44d7b6] rounded-lg my-2 h-[60px] p-1 bottom-0 w-full" 
              // type="button"
              key={user._id}
              onClick={()=>handleFunction(user)}
              >
                
                <span >
                {user.name}
                </span>
              </div> 
            )}


            <center>

            {/* render searched User */}

                <button className=" m-3 bg-[#262626]" onClick={handleSubmit}>Create</button>

            </center>

          

        </form>

        </div>

    </div>
  )
}

export default AddGroupChatModal