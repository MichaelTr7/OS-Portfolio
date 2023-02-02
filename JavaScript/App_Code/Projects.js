

function Setup_Projects_App(){
  let Project_Selector_Buttons = document.getElementsByClassName('Project_Selector_Buttons');
  for(let Button of Project_Selector_Buttons){
    Button.addEventListener('mousedown',Filter_Projects);
  }
  let Launch_Buttons = document.getElementsByClassName('Link_Buttons');
  for(let Button of Launch_Buttons){
    Button.addEventListener('click',Open_New_Tab);
  }
}


function Open_New_Tab(){
  console.log("Open new tab");
  let URL = this.dataset.link;
  window.open(URL, '_blank').focus();
}


function Filter_Projects(){
  this.classList.remove('Squeeze_Animation');
  void this.offsetWidth;
  this.classList.add('Squeeze_Animation');
  let Project_Selector_Buttons = document.getElementsByClassName('Project_Selector_Buttons');
  for(let Button of Project_Selector_Buttons){
    Button.classList.remove('Filter_Indicator');
  }
  this.classList.add('Filter_Indicator');
  let Project_Type = String(this.innerHTML);
  let Project_Sections = document.getElementsByClassName('Project_Sections');
  let Index = 0;
  for(let Project of Project_Sections){
    // if(Index % 2 == 0){
    //   Project.classList.remove('Pulse_Fade_Animation');
    //   void Project.offsetWidth;
    //   Project.classList.add('Pulse_Fade_Animation');
    // }else{
    //   Project.classList.remove('Pulse_Fade_Animation_2');
    //   void Project.offsetWidth;
    //   Project.classList.add('Pulse_Fade_Animation_2');
    // }
  Project.style.display = "none";
  if(String(Project.dataset.type) == Project_Type){
    Project.style.display = "block";
  }
  if(Project_Type == 'All'){
    Project.style.display = "block";
  }
    Index = Index + 1;
  }  
  var Window_Bodies = document.getElementById('Window_Bodies');
  Window_Bodies.scrollTop = 0;
}




