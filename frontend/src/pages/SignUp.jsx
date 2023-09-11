import  { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [password,setPassword] = useState("");
    // const [pic,setPic] = useState("");
    const history = useHistory();

    // console.log(name);
    const submitHandler = async (e) =>{
        e.preventDefault()
        if( !name || !email || !password || !confirmpassword ){
            return alert("please fillup all feilds"); 
        }

        if(password != confirmpassword) return alert("password error")

        try {
            const config = {
                headers:{
                    "Content-type": "application/json",
                }
            }

            const { data } = await axios.post("http://localhost:5000/api/user",{name,email,password},config)

            alert("Registration Successful");
            localStorage.setItem("userInfo",JSON.stringify(data));
            history.push("/chats")
            
        } catch (error) {
            alert("error occured")
        }
        
    }
  return (
<div className="max-w-[280px] mx-auto">
        <div className="flex flex-col items-center mt-[10vh]">
            <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">Sign Up</h2>
            <form onSubmit={submitHandler}>
                <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
                <input type="text" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />


                <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Password"
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                 />


                <input type="password" className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Confirm password" value={confirmpassword}
                onChange={(e)=>{setConfirmpassword(e.target.value)}}
                />

                <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]" onClick={submitHandler}>Sign Up</button>
            </form>

            <p className="text-center mt-3 text-[14px]">Already have an account? 
                <a href="/login" className="text-gray-600" > Log In</a>
            </p>
            <p className="text-center mt-3 text-[14px]">By clicking continue, you agree to our 
                <a href="/terms" className="text-gray-600">Terms of Service</a> and <a href="/privacy" className="text-gray-600">Privacy Policy</a>.
            </p>
        </div>
    </div>
  )
}

export default SignUp