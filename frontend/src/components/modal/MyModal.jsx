import GroupChatModal from "./modalComponents/GroupChatModal";
import ViewModal from "./modalComponents/ViewModal";

const MyModal = ({visible ,onClose }) => {
    if(!visible) return null;
     
    const handleClose = (e) => {
        if(e.target.id === "container") 
            onClose(!false) 
    }
  return (
    <div id="container"
    onClick={handleClose}
    className=" fixed flex inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center z-10"
    >
      
      <GroupChatModal />
      {/* <ViewModal /> */}
        
    </div>
  )
}

export default MyModal