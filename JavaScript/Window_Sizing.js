
function Setup_Window_Functionality(){
  
  document.getElementById('Close_About_Window_Button').addEventListener('click',function(){
    let Button_Identifier = String(this.id);
    let About_Card = document.getElementsByClassName('About_Card')[0];
    let Network_Card = document.getElementsByClassName('Network_Card')[0];
    let Battery_Card = document.getElementsByClassName('Battery_Card')[0];
    let Control_Center_Card = document.getElementsByClassName('Control_Center_Card')[0];
    let Widgets_Card = document.getElementsByClassName('Widgets_Card')[0];
    let Widgets_Card_Background = document.getElementsByClassName('Widgets_Glass_Background')[0];
    Network_Card.classList.remove("Show_Network_Card");
    Battery_Card.classList.remove("Show_Battery_Card");
    Control_Center_Card.classList.remove("Show_Control_Center_Card");
    Widgets_Card.classList.remove("Show_Widgets_Card");
    Widgets_Card_Background.classList.remove("Show_Widgets_Card");
    About_Card.classList.toggle("Show_About_Card");
  });
  
  let Application_Windows = document.getElementsByClassName('Window_Templates');
  for(Index=0; Index < Application_Windows.length; Index++){
    Setup_Draggable_Element(Application_Windows[Index]);
  }
  // Randomize_Windows();
}

function Randomize_Windows(){
  var All_Windows = document.getElementsByClassName('Window_Templates');
  var Dock_Height = document.getElementById("Dock").getBoundingClientRect().height;
  var Menu_Bar_Height = 32;
  var Minimum_Margin = 20;
  var Minimum_X = Minimum_Margin;
  var Minimum_Y = Minimum_Margin + Menu_Bar_Height;
  var Viewport_Width = window.innerWidth;
  var Viewport_Height = window.innerHeight;
    
  for(Index=0; Index < All_Windows.length; Index++){
    Target_Window = All_Windows[Index];
    Window_Width = Target_Window.getBoundingClientRect().width;
    Window_Height = Target_Window.getBoundingClientRect().height;
    Maximum_X = Viewport_Width - Minimum_Margin - Window_Width;
    Maximum_Y = Viewport_Height - Minimum_Margin - Window_Height - Dock_Height;
    Random_X_Position = Math.random()*(Maximum_X - Minimum_X) + Minimum_X;
    Random_Y_Position = Math.random()*(Maximum_Y - Minimum_Y) + Minimum_Y;
    Target_Window.style.left = 100*Random_X_Position/Viewport_Width + "%";
    Target_Window.style.top = 100*Random_Y_Position/Viewport_Height + "%";
    
    Parent_Window = Target_Window;
    
    Window_Bounds = Parent_Window.getBoundingClientRect();
    Parent_Window_Height = Window_Bounds.width;
    Parent_Window_Width = Window_Bounds.height;
    App_Icon_ID = String(Parent_Window.id).replace("Window","Icon");
    App_Icon = document.getElementById(App_Icon_ID);
    App_Icons_Bounds = App_Icon.getBoundingClientRect();
    App_Icon_Size = App_Icons_Bounds.height;
    X_Position_1 = Window_Bounds.x + "px";
    Y_Position_1 = Window_Bounds.y + "px";
    X_Position_2 = App_Icons_Bounds.x + App_Icons_Bounds.width/2 - Parent_Window_Width/2 + "px";
    Y_Position_2 = App_Icons_Bounds.y + App_Icons_Bounds.height/2 - Parent_Window_Height/2 + "px";
    X_Scaler = App_Icon_Size/Parent_Window_Width;
    Y_Scaler = App_Icon_Size/Parent_Window_Height;
    Scaling_Factor = X_Scaler;
    
    X_Position_1_Percentage = 100*Window_Bounds.x/window.innerWidth + "%";
    Y_Position_1_Percentage = 100*Window_Bounds.y/window.innerHeight + "%";
    X_Position_2_Percentage = 100*(App_Icons_Bounds.x + App_Icons_Bounds.width/2 - Parent_Window_Width/2)/window.innerWidth + "%";
    Y_Position_2_Percentage = 100*(App_Icons_Bounds.y + App_Icons_Bounds.height/2 - Parent_Window_Height/2)/window.innerHeight + "%";  
    
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
  
  setTimeout(function () {
    for(Index=0; Index < All_Windows.length; Index++){
      Target_Window = All_Windows[Index];
      Target_Window.style.filter = "opacity(1)";
    }
  }, 720);
}

