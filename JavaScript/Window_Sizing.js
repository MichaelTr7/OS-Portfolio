
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
}
