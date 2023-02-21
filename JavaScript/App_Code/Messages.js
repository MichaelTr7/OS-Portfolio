
var Long_Press_Timer;
var Suggested_Contact_Index = 0;

const Create_New_Recent_Chat = (Name,Initials) => {
  return `
  <div class="Recent_Chat_Boxes"> <div class="Chat_Bubbles">${Initials}</div> <label class="Name_Headers">${Name}</label> <label class="Chat_Previews"></label> <div class="Chat_Dividers"></div><div class="Swipe_Actions_Menu">
    <button class="Pin_Buttons" type="button" name="button"></button>
    <button class="Delete_Chat_Buttons" type="button" name="button"></button>
  </div></div>
  `;
};

const Pinned_Chat_Component = (Name,Initials) => {
  return `
  <div class="Pinned_Chat_Containers">
    <div class="Pinned_Chats">${Initials}</div>
    <label class="Name_Labels">${Name}</label>
    <button class="Chat_Bubble_Remove_Buttons">✕</button>
  </div>
  `;
};

const New_Message_Sent_Component = (Contents) => {
  return `
  <div class="Message_Chunk Sender_Message_Chunk">
    <div class="Sender_Bubbles Message_Bubbles">
    ${Contents}
    </div>
  </div>
  `;
};

const New_Message_Received_Component = (Contents) => {
  return `
  <div class="Message_Chunk Recipient_Message_Chunk">
    <div class="Recipient_Bubbles Message_Bubbles">
    ${Contents}
    </div>
  </div>
  `;
};

const Create_New_Contact_Suggestion = (Initials,Name) => {
  return `
    <div class="Suggested_Contacts">
    <div class="Suggested_Contact_Initials">${Initials}</div><div class="Suggested_Contact_Names">${Name}</div>
    <div class="Blue_Contact_Highlights"></div>
    </div>
  `;
};


function Setup_Messages_App(){
  document.getElementById('Back_Button').addEventListener('click',Retract_Messages_Compose_Panel);
  document.getElementById('Compose_Chat_Button').addEventListener('click',Show_Compose_Chat_Panel);

  let Chat_Rows = document.getElementsByClassName('Recent_Chat_Boxes');
  for(let Chat_Row of Chat_Rows){
    Chat_Row.addEventListener('click',Show_Compose_Chat_Panel);
    Chat_Row.addEventListener('click',Existing_Chat_Pressed);
  }

  let Pinned_Chat_Containers = document.getElementsByClassName('Pinned_Chat_Containers');
  for(let Pinned_Chat_Container of Pinned_Chat_Containers){
    Pinned_Chat_Container.addEventListener('click',Existing_Chat_Pressed);
  }
  
  let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
  for(let Chat_Row of Recent_Chat_Boxes){
    Chat_Row.addEventListener('scroll',Chat_Sliding);
  }
  document.getElementById('Messages_Window').addEventListener('click',Clicked_Messages_Window);
  document.getElementById('Message_Window_Title_Bar').addEventListener('click',Hide_Compose_Window);
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
  var Messages_Bank = document.getElementById('Messages_Bank');
  Messages_Bank.scrollTop = Messages_Bank.scrollHeight;
  Setup_Bubble_Auto_Scroll();
  
  let Message_Contact_Input = document.getElementById('Message_Contact_Input');
  Message_Contact_Input.addEventListener('input',Live_Update_Compose_Window);
  let Suggested_Contacts = document.getElementsByClassName('Suggested_Contacts');
  for(let Contact_Box of Suggested_Contacts){
    Contact_Box.addEventListener('click',Recipient_Just_Selected);
  }
  
  Message_Contact_Input.addEventListener('focus',Recipient_Field_Focussed);
  Message_Contact_Input.addEventListener('blur',Recipient_Field_Not_Focussed);
  
  document.addEventListener('keydown',Resolve_Active_Components);
  document.getElementById('Messages_Bank').addEventListener('click',Launch_Escape);
  document.getElementById('Contact_Selector').addEventListener('click',Focus_On_Recipient_Field);
}

function Retract_Messages_Compose_Panel(){
  document.getElementById('Compose_Chat_Button').click();
}

function Focus_On_Recipient_Field(){
  document.getElementById('Message_Contact_Input').focus();
}

function Launch_Escape(){
  var Messages_Bank = document.getElementById('Messages_Bank');
  var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
  if(Left_Over_Messages.length == 0){
  for(let Message of Left_Over_Messages){
    Message.remove();
  }
  document.getElementById('Message_Contact_Input').value = '';
  let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
  Contact_Suggestion_List.innerHTML = '';
  }
}

function Delete_Entire_Chat(){
  console.log("Delete Entire Chat");
  Show_Compose_Chat_Panel();
  let Chat_Row_To_Delete = (this.parentElement).parentElement;
  let Chat_Name_To_Delete = String(Chat_Row_To_Delete.querySelector("label").innerHTML);
  
  let Name_Labels = document.getElementsByClassName('Name_Labels');
  for(let Name of Name_Labels){
    if(String(Name.innerHTML) == Chat_Name_To_Delete){
      Name.parentElement.remove();
      for(let Chat of Chat_Log.chats){
        console.log();
        if(String(Chat.name) == String(Name.innerHTML)){
          Chat.messages = [];
          Chat.message_direction = [];
        }
      }
    }
  }
  Chat_Row_To_Delete.remove();  
  
}

function Unpin_Chat(){
  (this.parentElement).remove();
}

var Long_Press_Duration = 300;
var Start_Time = new Date();

function Bubble_Pressed(){
  Start_Time = new Date();
  var Selected_Bubble = this;
  Long_Press_Timer = setTimeout(function () {
    Chat_Bubble_Long_Pressed(Selected_Bubble);
  }, Long_Press_Duration);  
}

function Bubble_Released(){
  var End_Time = new Date();
  var Elapsed_Time = End_Time.getTime() - Start_Time.getTime();
  if(Elapsed_Time < Long_Press_Duration){
    Show_Compose_Chat_Panel();
  }
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
    if(parseInt(Initials)){
      Initials = "#";
    }
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
    let Number_Of_Pinned_Messages = document.getElementsByClassName('Pinned_Chat_Containers').length;
    if(Number_Of_Pinned_Messages > 3){
    document.getElementsByClassName('Pinned_Chat_Containers')[0].remove();
    }
    
    
    
  }
  document.getElementById('Compose_Chat_Button').click();
  let Pinned_Chat_Containers = document.getElementsByClassName('Pinned_Chat_Containers');
  for(let Pinned_Chat_Container of Pinned_Chat_Containers){
    Pinned_Chat_Container.addEventListener('click',Existing_Chat_Pressed);
  }
  
  
}

function Setup_Bubble_Auto_Scroll(){
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

function Send_Message(){
  console.log("Send Message");
  let Send_Message_Box = document.getElementById('Send_Message_Box');
  const Message_Contents = Send_Message_Box.innerHTML;
  let Sender_Name = document.getElementById('Message_Contact_Input').value;  
  if((Message_Contents != '') & (Sender_Name != '')){
    let Message_Recipient = document.getElementById('Message_Contact_Input').value; 
    let Displayed_Recent_Chats = document.getElementsByClassName('Recent_Chat_Boxes');
    let Displayed_Chat_Names = [];
    for(let Chat of Displayed_Recent_Chats){
      Displayed_Chat_Names.push(String(Chat.getElementsByClassName('Name_Headers')[0].innerHTML));
    }
    
    if(!Displayed_Chat_Names.includes(Message_Recipient)){
      let Name_Portions = String(Message_Recipient).split(" ");
      let Initials_Array = Name_Portions.map(Name_Part => Name_Part[0]);
      Initials = Initials_Array.join("");
      Initials = Initials.slice(0, 2);
      if(parseInt(Initials)){
        Initials = "#";
      }
      let New_Recent_Contact = Create_New_Recent_Chat(Message_Recipient,Initials);
      let Recents_Panel = document.getElementById('Recent_Chats_Container');
      Recents_Panel.innerHTML += New_Recent_Contact;
      let Pin_Buttons = document.getElementsByClassName('Pin_Buttons');
      for(let Button of Pin_Buttons){
        Button.addEventListener('click',Pin_Chat);
      }
      let Delete_Chat_Buttons = document.getElementsByClassName('Delete_Chat_Buttons');
      for(let Delete_Chat_Button of Delete_Chat_Buttons){
        Delete_Chat_Button.addEventListener('click',Delete_Entire_Chat);
      }
      let Chat_Rows = document.getElementsByClassName('Recent_Chat_Boxes');
      for(let Chat_Row of Chat_Rows){
        Chat_Row.addEventListener('click',Show_Compose_Chat_Panel);
        Chat_Row.addEventListener('click',Existing_Chat_Pressed);
      }
    }
    
    
    
    var New_Message = New_Message_Sent_Component(Message_Contents);
    var Messages_Bank = document.getElementById('Messages_Bank');
    let Padding_Element = document.getElementById('Message_Temporary_Spacer');
    Padding_Element.insertAdjacentHTML('beforebegin', New_Message);
    Padding_Element.style.height = 0;
    Messages_Bank.scrollTop = Messages_Bank.scrollHeight;
    Send_Message_Box.innerHTML = '';    
    Update_Message(Sender_Name,Message_Contents,"Sender");
  }
}

function Update_Message(Message_Recipient,Message_Content,Message_Direction){
    let Recent_Chat_Boxes = document.getElementsByClassName('Recent_Chat_Boxes');
    for(let Chat of Recent_Chat_Boxes){
      if(String(Chat.getElementsByClassName('Name_Headers')[0].innerHTML) == Message_Recipient){
        Chat.getElementsByClassName('Chat_Previews')[0].innerHTML = '';
        Chat.getElementsByClassName('Chat_Previews')[0].innerHTML = Message_Content;
      }
    }
  
  
    console.log("Save Message");
    let Active_Chats = Chat_Log.chats;
    for(let Chat of Active_Chats){
      if(String(Chat.name) == Message_Recipient){
        let Current_Messages = Chat.messages;
        Chat.messages.push(Message_Content);
        Chat.message_direction.push(Message_Direction);        
      }
    }
}

function Show_Compose_Chat_Panel(){
  let Compose_Panel = document.getElementsByClassName('Message_Panel')[0];
  if(!Compose_Panel.classList.contains("Toggle_Message_Panel")){
    document.getElementsByClassName("Back_Button")[0].classList.add('Show_Back_Button');
  }else{
    document.getElementsByClassName("Back_Button")[0].classList.remove('Show_Back_Button');
  }
  var Messages_Bank = document.getElementById('Messages_Bank');
  var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
  for(let Message of Left_Over_Messages){
    Message.remove();
  }
  let Recipient_Contact = document.getElementById('Message_Contact_Input');
  Recipient_Contact.value = '';
  let Message_Panel = document.getElementById('Message_Panel');
  Message_Panel.classList.toggle('Toggle_Message_Panel');
  if(Message_Panel.classList.contains('Toggle_Message_Panel')){
    setTimeout(function () {
      if(document.getElementById('Message_Contact_Input').value == ''){
      document.getElementById('Contact_Selector').click();
      }
    }, 300);
  }

}

function Existing_Chat_Pressed(){
  let Message_Recipient = String(this.querySelector('label').innerHTML);
  let Recipient_Contact = document.getElementById('Message_Contact_Input');
  Recipient_Contact.value = Message_Recipient;
  Populate_Compose_Chat_Window(Message_Recipient);
}

function Populate_Compose_Chat_Window(Message_Recipient){ 
  let Shown_Chats = document.getElementsByClassName('Name_Headers');
  let Shown_Chat_Names = [];
  for(let Chat_Name of Shown_Chats){
    Shown_Chat_Names.push(Chat_Name.innerHTML);
  }
  if(!Shown_Chat_Names.includes(Message_Recipient)){
    for(let Chat of Chat_Log.chats){
      if(String(Chat.name) == String(Message_Recipient)){
        Chat.messages = [];
        Chat.message_direction = [];
      }
    }
  }
  var Messages_Bank = document.getElementById('Messages_Bank');
  var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
  for(let Message of Left_Over_Messages){
    Message.remove();
  }
  for(let Chat of Chat_Log.chats){
    if(String(Chat.name) == Message_Recipient){
      let Loaded_Messages = Chat.messages;
      let Loaded_Message_Directions = Chat.message_direction;      
      for(Index = 0; Index < Loaded_Messages.length; Index++){
        let Chat_Body = document.getElementById('Messages_Bank');
          if(Loaded_Message_Directions[Index] == 'Sender'){
            var New_Message = New_Message_Sent_Component(Loaded_Messages[Index]);
          }else{
            var New_Message = New_Message_Received_Component(Loaded_Messages[Index]);
          }
          let Padding_Element = document.getElementById('Message_Temporary_Spacer');
          Padding_Element.insertAdjacentHTML('beforebegin', New_Message);
          Padding_Element.style.height = 0;
          Messages_Bank.scrollTop = Messages_Bank.scrollHeight;
          Send_Message_Box.innerHTML = '';
      }
    }
  }
}

function Live_Update_Compose_Window(){
    let Current_Query = String(document.getElementById('Message_Contact_Input').value);
    let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
    Contact_Suggestion_List.innerHTML = '';
    for(let Chat of Chat_Log.chats){
      if(String(Chat.name).toLowerCase().includes(Current_Query.toLowerCase()) & Current_Query != ""){
        let Name_Portions = String(Chat.name).split(" ");
        let Initials_Array = Name_Portions.map(Name_Part => Name_Part[0]);
        Initials = Initials_Array.join("");
        Initials = Initials.slice(0, 2);
        if(parseInt(Initials)){
          Initials = "#";
        }
        let New_Contact_Suggestion  = Create_New_Contact_Suggestion(Initials,String(Chat.name));
        Contact_Suggestion_List.innerHTML += New_Contact_Suggestion;
      }
    }
    
    let Suggested_Contacts = document.getElementsByClassName('Suggested_Contacts');
    for(let Contact_Box of Suggested_Contacts){
      Contact_Box.addEventListener('click',Recipient_Field_Just_Filled);
    }
}

function Recipient_Field_Just_Filled(){
  let Selected_Recipient = String((this.getElementsByClassName('Suggested_Contact_Names')[0]).innerHTML);
  document.getElementById('Message_Contact_Input').value = Selected_Recipient;
  let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
  Contact_Suggestion_List.innerHTML = '';
  Query_Corresponding_Messages();
}

function Recipient_Name_Just_Entered(event){
  let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
  Contact_Suggestion_List.innerHTML = '';
  let Key = String(event.key);
  if(Key == "Backspace"){
    var Messages_Bank = document.getElementById('Messages_Bank');
    var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
    for(let Message of Left_Over_Messages){
      Message.remove();
    }
  }
  if(Key == "Enter"){
    let Recipient = String(document.getElementById('Message_Contact_Input').value);
    let Chat_Names = [];
    for(let Chat of Chat_Log.chats){
      Chat_Names.push(String(Chat.name));
    }
    if(!Chat_Names.includes(Recipient)){
      var Messages_Bank = document.getElementById('Messages_Bank');
      var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
      for(let Message of Left_Over_Messages){
        Message.remove();
      }
      let Current_Recipient_Field = String(document.getElementById('Message_Contact_Input').value);
      let Phone_Number = Current_Recipient_Field;
      let Phone_Format_1 = /^\d{3}-\d{3}-\d{4}$/;
      let Phone_Format_2 = /^\d{10}$/;
      
      let Format_1_Check = Phone_Format_1.test(Phone_Number);
      let Format_2_Check = Phone_Format_2.test(Phone_Number);
      let Phone_Check = Format_1_Check | Format_2_Check;
      
      if (Phone_Check) {
        if(Format_2_Check){
        Phone_Number = Current_Recipient_Field.substring(0, 3) + "-" + Current_Recipient_Field.substring(3, 6) + "-" + Current_Recipient_Field.substring(6, 10);
        document.getElementById('Message_Contact_Input').value = Phone_Number;
        
        
        }
        let New_Recent_Contact = Create_New_Recent_Chat(String(Phone_Number),"#");
        let New_Chat = {
          name: String(Phone_Number),
          messages: [],
          message_direction: []
        };
        
        Chat_Log.chats.push(New_Chat);
        
        let Recents_Panel = document.getElementById('Recent_Chats_Container');
        let Pin_Buttons = document.getElementsByClassName('Pin_Buttons');
        for(let Button of Pin_Buttons){
          Button.addEventListener('click',Pin_Chat);
        }
        let Delete_Chat_Buttons = document.getElementsByClassName('Delete_Chat_Buttons');
        for(let Delete_Chat_Button of Delete_Chat_Buttons){
          Delete_Chat_Button.addEventListener('click',Delete_Entire_Chat);
        }
        let Chat_Rows = document.getElementsByClassName('Recent_Chat_Boxes');
        for(let Chat_Row of Chat_Rows){
          Chat_Row.addEventListener('click',Show_Compose_Chat_Panel);
          Chat_Row.addEventListener('click',Existing_Chat_Pressed);
        }
      } else {
        document.getElementById('Message_Contact_Input').value = '';
      }
    }    
    document.getElementById('Message_Contact_Input').blur();
    let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
    Contact_Suggestion_List.innerHTML = '';
    Query_Corresponding_Messages();
  }
  
}

function Recipient_Field_Focussed(){
  document.addEventListener('keydown',Recipient_Name_Just_Entered);
  document.addEventListener('keydown',Arrow_Selection);
}

function Recipient_Field_Not_Focussed(){
  document.removeEventListener('keydown',Recipient_Name_Just_Entered);
  document.removeEventListener('keydown',Arrow_Selection);
  Suggested_Contact_Index = 0;
  let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
  let Current_Contact = (document.getElementById('Message_Contact_Input').value);
}

function Query_Corresponding_Messages(){
  Populate_Compose_Chat_Window(String(document.getElementById('Message_Contact_Input').value));
}

function Arrow_Selection(event){

}

function Resolve_Active_Components(event){
  let Key = event.key;  
  if(Key == "Escape" & document.getElementById('Message_Contact_Input').value == ''){
    document.getElementById('Message_Panel');
    Message_Panel.classList.toggle('Toggle_Message_Panel');
  }  
  if(Key == "Escape"){
    var Messages_Bank = document.getElementById('Messages_Bank');
    var Left_Over_Messages = Messages_Bank.getElementsByClassName('Message_Chunk');
    for(let Message of Messages_Bank.children){
      if(Message.classList.contains('Message_Chunk')){
        Message.remove();
      }
    }
    Messages_Bank.innerHTML = '<div id="Message_Temporary_Spacer"></div>';
    document.getElementById('Message_Contact_Input').value = '';
    let Contact_Suggestions_Container = document.getElementById('Contact_Suggestion_List');
    Contact_Suggestion_List.innerHTML = '';
  }

}

let Chat_Log = {
  "chats": [
      {
      "name": "Michael",
      "messages": ["Hi! Thank you for taking the time to take a look at my portfolio! :)"],
      "message_direction": ['Recipient']
      },
      {
      "name": "Tom Nook",
      "messages": ["Update: The brick bridge build has been completed."],
      "message_direction": ['Recipient']
      },
      {
      "name": "Starman",
      "messages": ["We've landed on Mars! Over and out!"],
      "message_direction": ['Recipient']
      }
  ]
}

function Hide_Compose_Window(event){

}




  
  