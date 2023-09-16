export const isLastMessage = (messages,i,userId) =>{
    console.log('here')
    return(
        i ===messages.length-1 
        && messages[messages.length-1].sender._id !== userId 
        && messages[messages.length-1].sender._id
    )

}