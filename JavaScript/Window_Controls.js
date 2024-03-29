
var Root = document.querySelector(':root')
var Root_Styles = getComputedStyle(Root);


function Setup_Window_Controls(){
  // console.log("Setting Up Windows Controls");
  var Close_Buttons = document.getElementsByClassName('Close_Toggles');
  var Minimize_Buttons = document.getElementsByClassName('Minimize_Toggles');
  var Maximize_Buttons = document.getElementsByClassName('Expand_Toggles');
  for(Index=0; Index < Close_Buttons.length; Index++){
    Close_Buttons[Index].parentElement.addEventListener('click',Close_Window);
    Minimize_Buttons[Index].parentElement.addEventListener('click',Minimize_Window);
    Maximize_Buttons[Index].parentElement.addEventListener('click',Maximize_Window);  
  }
  
  let Window_Whitelist = ["Projects_Window"];
  // let Window_Whitelist = ["Courses_Window"];

  for(let Button of Minimize_Buttons){
    let Window_ID = Button.parentElement.parentElement.parentElement.id;
    if(!Window_Whitelist.includes(Window_ID)){
      Button.parentElement.click();
    }
  }
  
  Setup_Operating_System();
  
  var App_Icons = document.getElementsByClassName('App_Icons');
  for(Index=0; Index < App_Icons.length; Index++){
    App_Icons[Index].addEventListener('click',Toggle_Window);
  }
  
  var Window_Bodies = document.getElementsByClassName('Window_Bodies');
  for(Index=0; Index < Window_Bodies.length; Index++){
    Window_Bodies[Index].addEventListener("hover",Prevent_Dragging_On_Child_Elements);
  }
  
}

function Synchronize_Time(){
  
  
  
}


function Close_Window(){
  // console.log("Close Window ...");
  var Parent_Window = this.parentElement.parentElement;
  Parent_Window.classList.add('Close_Window');
}

function Minimize_Window(){
  var Parent_Window = this.parentElement.parentElement;
  var Window_Bounds = Parent_Window.getBoundingClientRect();
  var Parent_Window_Height = Window_Bounds.height;
  var Parent_Window_Width = Window_Bounds.width;
  var App_Icon_ID = String(Parent_Window.id).replace("Window","Icon");
  var App_Icon = document.getElementById(App_Icon_ID);
  var App_Icons_Bounds = App_Icon.getBoundingClientRect();
  var App_Icon_Size = App_Icons_Bounds.height;
  var X_Position_1 = Window_Bounds.x + "px";
  var Y_Position_1 = Window_Bounds.y + "px";
  var X_Position_2 = App_Icons_Bounds.x + App_Icons_Bounds.width/2 - Parent_Window_Width/2 + "px";
  var Y_Position_2 = App_Icons_Bounds.y + App_Icons_Bounds.height/2 - Parent_Window_Height/2 + "px";
  var X_Scaler = App_Icon_Size/Parent_Window_Width;
  var Y_Scaler = App_Icon_Size/Parent_Window_Height;
  var Scaling_Factor = X_Scaler;
    
  var X_Position_1_Percentage = 100*Window_Bounds.x/window.innerWidth + "%";
  var Y_Position_1_Percentage = 100*Window_Bounds.y/window.innerHeight + "%";
  var X_Position_2_Percentage = 100*(App_Icons_Bounds.x + App_Icons_Bounds.width/2 - Parent_Window_Width/2)/window.innerWidth + "%";
  var Y_Position_2_Percentage = 100*(App_Icons_Bounds.y + App_Icons_Bounds.height/2 - Parent_Window_Height/2)/window.innerHeight + "%";  
  
  Root.style.setProperty('--App_Icon_Size',App_Icon_Size);  
  Root.style.setProperty('--X_Position_1',X_Position_1_Percentage);
  Root.style.setProperty('--X_Position_2',X_Position_2_Percentage);
  Root.style.setProperty('--Y_Position_1',Y_Position_1_Percentage);
  Root.style.setProperty('--Y_Position_2',Y_Position_2_Percentage);
  Parent_Window.dataset.origin_x1 = String(X_Position_1_Percentage);
  Parent_Window.dataset.origin_x2 = String(X_Position_2_Percentage);
  Parent_Window.dataset.origin_y1 = String(Y_Position_1_Percentage);
  Parent_Window.dataset.origin_y2 = String(Y_Position_2_Percentage);
  Parent_Window.dataset.original_window_height = String(Parent_Window_Height);
  Parent_Window.dataset.original_window_width = String(Parent_Window_Width);

  Parent_Window.classList.remove('Unshrink_Window');
  Parent_Window.classList.remove('Shrink_Window');
  void Parent_Window.offsetWidth;   
  Parent_Window.classList.add('Shrink_Window');  
  
}

function Maximize_Window(){
  // console.log("Maximize Window ...");
  var Parent_Window = this.parentElement.parentElement;
  var Expand_ClassName = "Expand_" + String(Parent_Window.id);
  Parent_Window.classList.toggle(Expand_ClassName);
}

function Toggle_Window(){
  var Dock_Icon = document.getElementById(this.id);
  Dock_Icon.style.pointerEvents = 'none';
  var All_Windows = document.getElementsByClassName("Window_Templates");
  for(Index=0; Index<All_Windows.length; Index++){
    All_Windows[Index].classList.remove('Unshrink_Window'); 
  }

  // console.log("Toggle Window ...");
  var Window_ID = String(this.id).replace("Icon","Window");
  var Target_Window = document.getElementById(Window_ID);
  Pop_To_Top(Target_Window);
  var Contains_Minimize = Target_Window.classList.contains("Shrink_Window");
  var Contains_Close = Target_Window.classList.contains("Close_Window");
  
  // Updating 2nd state positions  
  var App_Icon_Bounds = this.getBoundingClientRect();
  var App_Icon_Center = [App_Icon_Bounds.x + App_Icon_Bounds.width/2 - Target_Window.dataset.original_window_width/2, App_Icon_Bounds.y + App_Icon_Bounds.height/2 - Target_Window.dataset.original_window_height/2];
  
  if(Contains_Minimize){
    Root.style.setProperty('--X_Position_1R',String(Target_Window.dataset.origin_x1));
    Root.style.setProperty('--Y_Position_1R',String(Target_Window.dataset.origin_y1));
    Root.style.setProperty('--X_Position_2R',String(App_Icon_Center[0] + "px"));
    Root.style.setProperty('--Y_Position_2R',String(App_Icon_Center[1] + "px"));
    Target_Window.classList.remove('Unshrink_Window'); 
    Target_Window.classList.remove('Shrink_Window');  
    void Target_Window.offsetWidth;
    Target_Window.classList.add('Unshrink_Window'); 
    Pop_To_Top(Target_Window); 
  }
  if(Contains_Close){
    Target_Window.classList.remove("Close_Window");
  }
  
  setTimeout(function () {
    Dock_Icon.style.pointerEvents = 'all';

  }, 1000);

}

function Prevent_Dragging_On_Child_Elements(e){
  console.log("Prevent dragging");
  e.preventDefault();
  
}


function Hot_Key_Pressed(e){
  let Typed_Letter = String(e.key).toLowerCase();
  console.log(Typed_Letter);
}


async function Setup_Operating_System() {
  await Minimize_All_Windows();
  Load_OS();
}

function Minimize_All_Windows() {
  return new Promise(function(resolve, reject) {
    // This function takes some time to complete
    setTimeout(function() {
      let Window_Whitelist = ["Projects_Window"];
      // let Window_Whitelist = ["Courses_Window"];
      let Minimize_Buttons = document.getElementsByClassName('Minimize_Toggles');

      for(let Button of Minimize_Buttons){
        let Window_ID = Button.parentElement.parentElement.parentElement.id;
        if(!Window_Whitelist.includes(Window_ID)){
          Button.parentElement.click();
        }
      }
      resolve();
    }, 0);
  });
}

function Load_OS() {
    let Loading_Window = document.getElementById('Loading_Window');
    Loading_Window.classList.add('OS_Loaded_Animation');
    setTimeout(function () {
      Loading_Window.remove();
    }, 2000);
}





