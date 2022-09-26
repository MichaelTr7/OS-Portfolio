
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
  Setup_Control_Centre();
  Setup_Spectrum_Analyzer();
  Setup_Window_Functionality();
  Setup_Window_Layering();
  Setup_Window_Controls();
}








