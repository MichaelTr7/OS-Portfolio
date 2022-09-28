
function Setup_Window_Layering(){
  let App_Windows = document.getElementsByClassName('Window_Templates');
  for(Index=0; Index < App_Windows.length; Index++){
    App_Windows[Index].addEventListener('mousedown',Sort_Windows);
  }  
}

var Window_Stack = ["Toybox_Window",
                    "Messages_Window",
                    "Projects_Window",
                    "Skills_Window",
                    "Education_Window",
                    "Courses_Window",
                    "Certifications_Window",
                    "Volunteer_Work_Window",
                    "Mail_Window",
                    "Links_Window"];

var Z_Stack = ["50","51","52","53","54","55","56","57","58","59"];


function Sort_Windows(){
  var Window_ID = String(this.id);
  Window_Stack = Remove_Array_Item(Window_Stack,Window_ID);
  Window_Stack.push(Window_ID);
  for(Index=0; Index < Window_Stack.length; Index++){
    document.getElementById(Window_Stack[Index]).style.zIndex = Z_Stack[Index];
  }  
  return Window_Stack;
}

function Remove_Array_Item(Array,Target_Element){
  const Index = Array.indexOf(Target_Element);
  if (Index > -1) {
    Array.splice(Index, 1);
  }
  return Array;
}

function Pop_To_Top(Target_Window){
  var Window_ID = String(Target_Window.id);
  Window_Stack = Remove_Array_Item(Window_Stack,Window_ID);
  Window_Stack.push(Window_ID);
  for(Index=0; Index < Window_Stack.length; Index++){
    document.getElementById(Window_Stack[Index]).style.zIndex = Z_Stack[Index];
  }  
  return Window_Stack;
}



