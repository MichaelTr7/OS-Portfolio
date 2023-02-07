
function Setup_Messages_App(){
  console.log("Setup Messages App:");
  let Pinned_Chats = document.getElementsByClassName('Pinned_Chats');
  for(Index=0; Index < Pinned_Chats.length; Index++){
    // Pinned_Chats[Index].addEventListener('click',Pinned_Chats_Clicked);
  }
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  for(let Chat_Row of Recent_Chat_Boxes){
    Chat_Row.addEventListener('scroll',Chat_Sliding);
  }
}


function Chat_Sliding(){
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  let Skipped_Index = [].indexOf.call(Recent_Chat_Boxes, this);
  for(Index = 0; Index < Recent_Chat_Boxes.length; Index++){
    if(parseInt(Index) != parseInt(Skipped_Index)){
      if(Recent_Chat_Boxes[Index].scrollLeft >= 130){
        Recent_Chat_Boxes[Index].scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
}

  
  