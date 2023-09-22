import  { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Lottie from 'lottie-react';
import animationData from '../components/animations/login.json'

const LoginPage = () => {
    // e.preventDefault();
    // const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    // const [confirmpassword,setConfirmpassword] = useState("");
    const [password,setPassword] = useState("");
    // const [pic,setPic] = useState("");
    const history = useHistory();

    // console.log(name);
    const submitHandler = async (e) =>{
        e.preventDefault();
        
        if(!email || !password ){
            return alert("please fillup all feilds"); 
        }

        // if(password != confirmpassword) return alert("password error")
        // console.log(password)

        try {
            const config = {
                headers:{
                    "Content-type": "application/json",
                }
            }

            const { data } = await axios.post("http://localhost:5000/api/user/login",{email,password},config)

            // console.log(data);

            alert("Registration Successful");
            localStorage.setItem("userInfo",JSON.stringify(data));
            history.push("/chats")
            
        } catch (error) {
            alert("error occured")
        }
        
    }
  return (
<div className="flex w-full h-screen">

        <div className='relative hidden lg:flex h-full w-full bg-gray-200 items-center justify-center'>
          <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full   hover:animate-spin'></div>
          <div className='absolute w-full h-1/2 bg-white/10 backdrop-blur-lg bottom-0'></div>
        </div>


    
        <div className="w-full flex items-center justify-center lg:w-full">
            <div className="max-w-[280px] mx-auto">
                {/* <Lottie
                style={{width:'10px'}}
                animationData={animationData} 
                /> */}
                <h2 
                className="mb-5 text-gray-900 
                font-mono font-bold
                text-xl text-center">Log In
                </h2>
                <form >
                    <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    />

                    <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />


                    <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]" onClick={submitHandler}>Log In</button>
                </form>

            </div>
            

        </div>


    </div>
  )
}

export default LoginPage