import { useState } from "react"
// import { ChatState } from "../Context/ChatProvider";
import SideBar from "./sideBar/SideBar";

const  NavBar = () => {
    // const[search,setSearch] = useState();
    // const[searchResult,setSearchResult] = useState();
    const [flag,setFlag] = useState(false);

    // const {user} = ChatState();

  return (
    <div className="flex items-center justify-between bg-[#44d7b6] text-black w-full p-2 ">
          <SideBar flag={flag} setFlag={setFlag} />


        <div>Log Out</div>

        
    </div>
  )
}

export default NavBar