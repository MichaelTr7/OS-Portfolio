
var Long_Press_Timer;

function Setup_Messages_App(){
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  for(let Chat_Row of Recent_Chat_Boxes){
    Chat_Row.addEventListener('scroll',Chat_Sliding);
  }
  document.getElementById('Messages_Window').addEventListener('click',Clicked_Messages_Window);
  document.getElementById('Messages_Window').addEventListener('mousedown',Hide_Remove_Buttons);
  let Pin_Buttons = document.getElementsByClassName('Pin_Buttons');
  for(let Button of Pin_Buttons){
    Button.addEventListener('click',Pin_Chat);
  }

  let Pinned_Chats = document.getElementsByClassName('Pinned_Chats');
  for(let Pinned_Chat of Pinned_Chats){
    Pinned_Chat.addEventListener('mousedown',Bubble_Pressed);
    Pinned_Chat.addEventListener('mouseup',Bubble_Released);
    Pinned_Chat.removeEventListener('click',Clicked_Messages_Window);
  }
  
  let Remove_Pin_Buttons = document.getElementsByClassName('Chat_Bubble_Remove_Buttons');
  for(let Button of Remove_Pin_Buttons){
    Button.addEventListener('mousedown',Unpin_Chat);
  }
  let Delete_Chat_Buttons = document.getElementsByClassName('Delete_Chat_Buttons');
  for(let Delete_Chat_Button of Delete_Chat_Buttons){
    Delete_Chat_Button.addEventListener('click',Delete_Entire_Chat);
  }
  document.getElementById('Send_Button').addEventListener('click',Send_Message);
  var Messages_Bank = document.getElementById('Messages_Bank');
  document.getElementById('Message_Temporary_Spacer').scrollIntoView({ behavior: "smooth" });
    
  Setup_Bubble_Auto_Scroll();
}

function Delete_Entire_Chat(){
  console.log("Delete Entire Chat");
  let Chat_Row_To_Delete = (this.parentElement).parentElement;
  let Chat_Name_To_Delete = String(Chat_Row_To_Delete.querySelector("label").innerHTML);
  
  let Name_Labels = document.getElementsByClassName('Name_Labels');
  for(let Name of Name_Labels){
    if(String(Name.innerHTML) == Chat_Name_To_Delete){
      Name.parentElement.remove();
    }
  }
  Chat_Row_To_Delete.remove();  
}

function Unpin_Chat(){
  (this.parentElement).remove();
}

function Bubble_Pressed(){
  let Long_Press_Duration = 300;
  var Selected_Bubble = this;
  Long_Press_Timer = setTimeout(function () {
    Chat_Bubble_Long_Pressed(Selected_Bubble);
  }, Long_Press_Duration);  
}

function Bubble_Released(){
  clearTimeout(Long_Press_Timer); 
}

function Chat_Bubble_Long_Pressed(Selected_Chat_Bubble){
  let Chat_Bubbles = document.getElementsByClassName('Chat_Bubble_Remove_Buttons');  
  Selected_Chat_Bubble.parentElement.querySelector("button").classList.toggle("Show_Chat_Bubble_Remove_Button");  
}

function Hide_Remove_Buttons(){
  let Chat_Bubbles_Remove_Buttons = document.getElementsByClassName('Chat_Bubble_Remove_Buttons');  
  for(let Remove_Button of Chat_Bubbles_Remove_Buttons){
    Remove_Button.classList.remove('Show_Chat_Bubble_Remove_Button');
  }
}


function Clicked_Messages_Window(){
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  let Skipped_Index = [].indexOf.call(Recent_Chat_Boxes, this);
  for(Index = 0; Index < Recent_Chat_Boxes.length; Index++){
      if(Recent_Chat_Boxes[Index].scrollLeft >= 130){
        Recent_Chat_Boxes[Index].scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
}

function Chat_Sliding(){
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  let Skipped_Index = [].indexOf.call(Recent_Chat_Boxes, this);
  for(Index = 0; Index < Recent_Chat_Boxes.length; Index++){
    if(parseInt(Index) != parseInt(Skipped_Index)){
      if(Recent_Chat_Boxes[Index].scrollLeft >= 130){
        Recent_Chat_Boxes[Index].scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }
}

function Pin_Chat(){
  let Target_Chat = String((((this.parentElement).parentElement).getElementsByTagName('label')[0]).innerHTML);
  let Name_Labels = document.getElementsByClassName('Name_Labels');
  let Pinned_Chat_Names = [];
  for(Index = 0; Index < Name_Labels.length; Index++){
    Pinned_Chat_Names[Index] = Name_Labels[Index].innerHTML;
  }
  let Pinned = Pinned_Chat_Names.includes(Target_Chat);  
  if(Pinned){
    for(let Name of Name_Labels){
      if(String(Name.innerHTML) == Target_Chat){
        let Chat_To_Remove = Name.parentElement;
        Chat_To_Remove.remove();
    }
  }
  }else{
    let Chat_Selection_Container = document.getElementById('Chat_Selection_Container');
    console.log("Pinning Chat");
    let Name_Portions = Target_Chat.split(" ");
    let Initials_Array = Name_Portions.map(Name_Part => Name_Part[0]);
    Initials = Initials_Array.join("");
    Initials = Initials.slice(0, 2);
    var New_Pinned_Chat = Pinned_Chat_Component(Target_Chat,Initials);
    Chat_Selection_Container.innerHTML += New_Pinned_Chat;
    let Pinned_Chats = document.getElementsByClassName('Pinned_Chats');
    for(let Pinned_Chat of Pinned_Chats){
      Pinned_Chat.addEventListener('mousedown',Bubble_Pressed);
      Pinned_Chat.addEventListener('mouseup',Bubble_Released);
      Pinned_Chat.removeEventListener('click',Clicked_Messages_Window);
    }
    let Delete_Pin_Buttons = document.getElementsByClassName('Chat_Bubble_Remove_Buttons');
    for(let Delete_Buttons of Delete_Pin_Buttons){
      Delete_Buttons.addEventListener('mousedown',Unpin_Chat);
    }
    
  }
}

const Pinned_Chat_Component = (Name,Initials) => {
  return `
  <div class="Pinned_Chat_Containers">
    <div class="Pinned_Chats">${Initials}</div>
    <label class="Name_Labels">${Name}</label>
    <button class="Chat_Bubble_Remove_Buttons">✕</button>
  </div>
  `;
};

function Send_Message(){
  console.log("Send Message");
  

}

function Setup_Bubble_Auto_Scroll(){
  console.log("Setup Auto Scrolling");
  const Send_Message_Box = document.getElementById('Send_Message_Box');
  Send_Message_Box.addEventListener("focus",Typing_In_Progress);
  Send_Message_Box.addEventListener("blur",Typing_Not_In_Progress);
}

function Typing_In_Progress(){
  document.addEventListener('keyup',User_Typing);
}

function Typing_Not_In_Progress(){
  document.removeEventListener('keyup',User_Typing);
}

function User_Typing(){
  const Current_Message_Typed = document.getElementById('Send_Message_Box');
  var Number_Of_Lines = Math.round((Current_Message_Typed.getBoundingClientRect().height - 28.8125)/14.96875) + 1;
  var Pad_Height = Current_Message_Typed.getBoundingClientRect().height - 28.8125;
  let Message_Temporary_Spacer = document.getElementById('Message_Temporary_Spacer');
  Message_Temporary_Spacer.style.height = Pad_Height + "px";
  let Messages_Bank = document.getElementById('Messages_Bank');
  Messages_Bank.scrollTop = Messages_Bank.scrollHeight;
}






  
  