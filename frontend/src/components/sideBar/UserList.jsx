
const UserList = ({user, handleFunction, flag}) => {
  return (
    <button className={` ${!flag && `hidden`} flex-col items-center justify-center p-2 m-2 w-[300px] rounded-md bg-white text-black`} onClick={handleFunction} >
            <h4>
            {user.name}
            </h4>    
            <h4>
            {user.email}
            </h4>    
        </button>
        
  )
}

export default UserList