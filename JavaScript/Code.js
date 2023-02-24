
window.onload = function(){
  Detect_Touch_Device();

  let Menu_Bar_Icons = document.getElementsByClassName('Menu_Bar_Buttons');
  for(Index=0; Index < Menu_Bar_Icons.length; Index++){
    Menu_Bar_Icons[Index].addEventListener('mousedown',Display_Card); 
  }
    
    
  document.getElementById('Menu_Bar_Spacer').addEventListener("click",Unfocus_Cards);
  document.getElementById('Dock').addEventListener('click',Unfocus_Cards);
  let Application_Windows = document.getElementsByClassName('Window_Templates');
  for(Index=0; Index < Application_Windows.length; Index++){
    Application_Windows[Index].addEventListener('click',Unfocus_Cards);
  }  
  
  Setup_Control_Centre();
  Setup_Spectrum_Analyzer();
  Setup_Window_Functionality();
  Setup_Window_Layering();
  Setup_Window_Controls();
  Setup_Certifications_App();
  Setup_Courses_App();
  Setup_Education_App();
  Setup_Links_App();
  Setup_Mail_App();
  Setup_Messages_App();
  Setup_Projects_App();
  Setup_Skills_App();
  Setup_Toybox_App();
  Setup_Volunteer_Work_App();
  
}

function Detect_Touch_Device(){
  if ('ontouchstart' in window) {
    console.log("Detected a touch device");
    window.location.href = 'https://michaeltr7.github.io/Portfolio/';
  }
  
}






