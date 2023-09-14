import { useState } from "react"
// import { ChatState } from "../Context/ChatProvider";
import SideBar from "./sideBar/SideBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const  NavBar = () => {
    // const[search,setSearch] = useState();
    // const[searchResult,setSearchResult] = useState();
    const history = useHistory();
    const [flag,setFlag] = useState(false);
    const logoutHandler = () =>{
      localStorage.removeItem("userInfo");
      history.push("/");
    }

    // const {user} = ChatState();

  return (
    <div className="flex items-center justify-between bg-[#44d7b6] text-black w-full p-2 ">
          <SideBar flag={flag} setFlag={setFlag} />


        <button onClick={logoutHandler}>
          Log out
        </button>

        
    </div>
  )
}

export default NavBar