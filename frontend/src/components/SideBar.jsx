import { useState } from "react"
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const SideBar = ({ flag,setFlag }) => {
    const [search,setSearch] = useState();
    const [searchResult,setSearchResult] = useState([]);

    const { user } = ChatState();
    // console.log(user.name)
    const history = useHistory();

    const handleSearch = async (e) =>{
        e.preventDefault();
        console.log(searchResult[0].name)
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
            // console.log(search);
        } catch (error) {
            console.log(error);
            alert("Error Occured");
        }
    }


  return (
    <>
        <div className={`transition ease-in-out duration-500 top-0 left-0 fixed  bg-blue-500 h-full ${flag && ' w-80'} `}>
        <button className={`${!flag && 'hidden' }`} onClick={()=> setFlag(!flag)}>Close</button>

            <form className={` flex gap-x-5 items-center justify-end p-7 w-64  ${!flag && 'hidden' }`}>
                <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} ></input>
            <button onClick={handleSearch} >Search</button>
            </form>
            <div>
                {/* this result */}
                {searchResult[0].name}
                {/* {searchResult?.map((user)=>{
                    <li key={user._id} >{user.name}</li>
                })} */}
            </div>

        </div>
        <button onClick={()=>setFlag(!flag)}>Search</button>
        <div>{searchResult.name} </div>
    </>

  )
}

export default SideBar

// ${flag ? 'translate-x-0' : 'translate-x-full'} ease-in-out duration-300 `}
// ${flag ? 'w-[8vw]': 'w-[10vw]'}