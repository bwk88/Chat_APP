import GroupChatModal from "./modalComponents/AddGroupChatModal";
import GroupViewModal from "./modalComponents/GroupViewModal";
// import ViewModal from "./modalComponents/ViewModal";

const MyModal = ({visible ,onClose , info }) => {
    if(!visible) return null;
     
    const handleClose = (e) => {
        if(e.target.id === "container") 
            onClose(!false) 
    }
  return (
    <div id="container"
    onClick={handleClose}
    className=" fixed flex font-Promt text-lg font-light inset-0 bg-black bg-opacity-10 backdrop-blur-sm justify-center items-center z-10"
    >
      {info ? <GroupViewModal/> : <GroupChatModal />} 
    </div>
  )
}

export default MyModal