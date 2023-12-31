
const UserList = ({user, handleFunction, flag}) => {
  return (
    <button className={` ${!flag && `hidden`} items-center flex gap-2 p-2 m-2 w-[300px] rounded-md bg-white text-black`} onClick={handleFunction} >
            <h4 className=" bg-blue-500 p-2 rounded-md">
            {user.name}
            </h4>    
            <h4>
            {user.email}
            </h4>    
        </button>
        
  )
}

export default UserList