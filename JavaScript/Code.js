
window.onload = function(){
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
  
  let Progress_Bar = document.getElementById('Progress_Bar');
  Setup_Control_Centre();
  Progress_Bar.style.setProperty('--Progress_Percentage','5%');
  Setup_Spectrum_Analyzer();
  Setup_Window_Functionality();
  Progress_Bar.style.setProperty('--Progress_Percentage','15%');
  Setup_Window_Layering();
  Setup_Window_Controls();
  Progress_Bar.style.setProperty('--Progress_Percentage','25%');
  Setup_Certifications_App();
  Setup_Courses_App();
  Progress_Bar.style.setProperty('--Progress_Percentage','35%');
  Setup_Education_App();
  Setup_Links_App();
  Progress_Bar.style.setProperty('--Progress_Percentage','45%');
  Setup_Mail_App();
  Setup_Messages_App();
  Progress_Bar.style.setProperty('--Progress_Percentage','55%');
  Setup_Projects_App();
  Setup_Skills_App();
  Progress_Bar.style.setProperty('--Progress_Percentage','65%');
  Setup_Toybox_App();
  Setup_Volunteer_Work_App();
  Progress_Bar.style.setProperty('--Progress_Percentage','75%');
}








