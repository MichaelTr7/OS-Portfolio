
window.onload = function(){
  let Menu_Bar_Icons = document.getElementsByClassName('Menu_Bar_Buttons');
  for(Index=0; Index < Menu_Bar_Icons.length; Index++){
    Menu_Bar_Icons[Index].addEventListener('mousedown',Display_Card); 
  }

  Setup_Control_Centre();
  Setup_Spectrum_Analyzer();
  Setup_Window_Functionality();
  
}









