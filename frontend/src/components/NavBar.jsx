
// import { ChatState } from "../Context/ChatProvider";
import { ChatState } from "../Context/ChatProvider";
import SideBar from "./sideBar/SideBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const  NavBar = () => {
  const { user } = ChatState();
    const history = useHistory();
    // console.log(user.name)


    const logoutHandler = () =>{
      localStorage.removeItem("userInfo");
      // setUser(null)
      history.push("/");
    }

    

  return (
    <div className="flex items-center justify-between bg-[#44d7b6] text-black w-full p-2 ">
          <SideBar />

        <h1 className="  text-lg" >{user.name.toUpperCase()}</h1>
        

        <button onClick={logoutHandler}>
          Logout
        </button>

        
    </div>
  )
}

export default NavBar