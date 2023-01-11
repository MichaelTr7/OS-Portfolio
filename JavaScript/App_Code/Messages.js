
function Setup_Messages_App(){
  console.log("Setup Messages App:");
  let Pinned_Chats = document.getElementsByClassName('Pinned_Chats');
  for(Index=0; Index < Pinned_Chats.length; Index++){
    Pinned_Chats[Index].addEventListener('click',Pinned_Chats_Clicked);
  }
  
  
  
  
  
}