
const GroupList = ({user,handleFunction}) => {
  return (
    <div>
        <button className=" relative flex-col  my-2 h-[60px] p-1 bottom-0 w-full" 
            onClick={handleFunction}
            >
            <span >
            {user.name}
            </span>
            </button> 
    </div>
  )
}

export default GroupList