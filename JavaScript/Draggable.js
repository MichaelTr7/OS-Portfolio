
function Setup_Draggable_Element(Target_Element){    
  Target_Element.addEventListener('mousedown',Drag_Start);

  function Drag_Start(e){
    // console.log("Dragging");
    Target_Element.classList.remove('Unshrink_Window'); 
    Target_Element.classList.remove('Shrink_Window');  
    document.addEventListener('mousemove',Dragging);
    document.addEventListener('mouseup',Drag_End);
    var Window_Height = document.getElementById("Background").getBoundingClientRect().height;
    var Window_Width = document.getElementById("Background").getBoundingClientRect().width;
    var App_Height = Target_Element.getBoundingClientRect().height;
    var App_Width = Target_Element.getBoundingClientRect().width;
    var Menu_Bar_Bottom = document.getElementById('Menu_Bar').getBoundingClientRect();
    var Window_Edge_Margin = 20;
    var Top_Constraint = 32;
    var Bottom_Constraint = Window_Height - Window_Edge_Margin;
    var Left_Constraint = Window_Edge_Margin - App_Width;
    var Right_Constraint = Window_Width - Window_Edge_Margin; 
    var Targets_Boundaries = Target_Element.getBoundingClientRect();
    var Left_Boundary = Targets_Boundaries.left;
    var Top_Boundary = Targets_Boundaries.top;
    var Initial_Cursor_X_Position = e.clientX;
    var Initial_Cursor_Y_Position = e.clientY;
    var Cursor_X_Difference = Math.abs(Initial_Cursor_X_Position - Left_Boundary);
    var Cursor_Y_Difference = Math.abs(Top_Boundary - Initial_Cursor_Y_Position);
    
    function Dragging(e){
      var Current_Cursor_X_Position = e.clientX;
      var Current_Cursor_Y_Position = e.clientY;
      var Current_Cursor_Position_Summary = ["X: " + String(Current_Cursor_X_Position), "Y: " + String(Current_Cursor_Y_Position)];      
      var Top_Position = Math.max(Current_Cursor_Y_Position - Cursor_Y_Difference,Top_Constraint);
      Top_Position = Math.min(Top_Position,Bottom_Constraint);
      var Left_Position = Math.max(Current_Cursor_X_Position - Cursor_X_Difference,Left_Constraint);
      Left_Position = Math.min(Left_Position,Right_Constraint);      
      Target_Element.style.top = 100*Top_Position/window.innerHeight + "%";
      Target_Element.style.left = 100*Left_Position/window.innerWidth + "%";
    }
    
    function Drag_End(e){
      Target_Element.removeEventListener('mousemove',Dragging);
      document.removeEventListener('mousemove',Dragging);
    }  
  }
}









