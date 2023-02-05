
function Setup_Links_App(){
  console.log("Setup Links App:");
  document.getElementById('Links_Circle').addEventListener('click',Expand_Links);
  let Links_Bars = document.getElementsByClassName('Link_Containers');
  for(let Links of Links_Bars){
    Links.addEventListener('click',Go_To_Link);
  }
}

function Expand_Links(){
  let Links_Circle = document.getElementById('Links_Circle');
  let Link_Arms = document.getElementsByClassName('Stick_Label_Arms');
  let Link_Endpoints = document.getElementsByClassName('Stick_Endpoints');
  let Reveal_Links_Label = document.getElementById('Reveal_Links_Label');
  Links_Circle.classList.toggle('Links_Circle_Expand');
  for(let Arms of Link_Arms){
    Arms.classList.toggle('Stick_Label_Arms_Expand');
  }
  for(let Endpoints of Link_Endpoints){
    Endpoints.classList.toggle('Stick_Endpoints_Expand');
  }
  Reveal_Links_Label.classList.toggle('Hide_Reveal_Links_Label');
}

function Go_To_Link(){
  let Link_Name = String(this.children[1].innerHTML);
  console.log(Link_Name); 
   
  let Links_Dictionary = {
    "Stack Overflow": "https://stackoverflow.com/users/13669087/michaeltr7",
    "LinkedIn": "www.linkedin.com/in/michaeltr7",
    "GitHub": "https://github.com/MichaelTr7"
  }
  
  let URL = Links_Dictionary[Link_Name];
  window.open(URL, '_blank').focus();  
  
}