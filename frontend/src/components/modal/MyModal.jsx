import GroupChatModal from "./modalComponents/GroupChatModal";

const MyModal = ({visible ,onClose }) => {
    if(!visible) return null;
     
    const handleClose = (e) => {
        if(e.target.id === "container") 
            onClose(!false) 
    }
  return (
    <div id="container"
    onClick={handleClose}
    className=" fixed flex inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center"
    >
      <GroupChatModal />
        
    </div>
  )
}

export default MyModal