import { useState } from "react"
import { ChatState } from "../Context/ChatProvider";
import SideBar from "./SideBar";

const  NavBar = () => {
    const[search,setSearch] = useState();
    const[searchResult,setSearchResult] = useState();
    const [flag,setFlag] = useState(false);

    const {user} = ChatState();

  return (
    <div className="flex items-center justify-between bg-white w-full p-2 border-4">
        
        <SideBar flag={flag} setFlag={setFlag} />
        
        <h1>CHAT </h1>

        <div>Log Out</div>

        
    </div>
  )
}

export default NavBar