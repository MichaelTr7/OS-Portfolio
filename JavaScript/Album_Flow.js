
function Play_Pause_Song(){
  console.log("Play and pause song");
  let Sound_Slider = document.getElementById('Sound_Slider');
  let Volume_Percentage = parseInt(Sound_Slider.value);
  let Normalization_Factor = 1;
  let Output_Volume = (Volume_Percentage/100)*Normalization_Factor;
  let Current_Song = (document.getElementById('Song_Title').innerHTML).split("<br>")[0];
  let Audio_Appendix = {"Pac-Man":"Audio_Sample_1","The Transformers":"Audio_Sample_2","Super Mario Bros":"Audio_Sample_3"};
  let Audio_File_Name = Audio_Appendix[Current_Song];
  let Audio_File = document.getElementById(Audio_File_Name);
  Audio_File.volume = parseFloat(Output_Volume);
  
  let Play_Button = document.getElementsByClassName('Play_Button')[0];
  let State = Play_Button.dataset.state;
  
  if(State == "Play"){
    // Audio_File.play();
    Play_Button.style.backgroundImage="url('../Assets/Pause.svg')";
  }else{
    // Audio_File.pause();
    Play_Button.style.backgroundImage="url('../Assets/Play.svg')";
  }  
  Play_Button.dataset.state = (State == "Play") ? "Pause" : "Play";

}


var Song_Position = 0;
var Song_Index = 0;
let State_Machine_Array = ["State_0","State_1","State_2","State_3","State_4","State_5"];

function Fast_Forward_Button_Pressed(){
  let Sound_Slider = document.getElementById('Sound_Slider');
  let Volume_Percentage = parseInt(Sound_Slider.value);
  let Normalization_Factor = 1;
  let Output_Volume = (Volume_Percentage/100)*Normalization_Factor;
  let Current_Song = (document.getElementById('Song_Title').innerHTML).split("<br>")[0];
  let Audio_Appendix = {"Pac-Man":"Audio_Sample_1","The Transformers":"Audio_Sample_2","Super Mario Bros":"Audio_Sample_3"};
  let Audio_File_Name = Audio_Appendix[Current_Song];
  let Audio_File = document.getElementById(Audio_File_Name);
  Audio_File.volume = parseFloat(Output_Volume);
  
  let Play_Button = document.getElementsByClassName('Play_Button')[0];
  let State = Play_Button.dataset.state;
  
  if(State == "Pause"){
    Audio_File.pause();
  }
  
  let Song_Title = document.getElementById('Song_Title');
  let Song_Array = ["Pac-Man<br><span>Eat em All</span>","The Transformers<br><span>Robots in Disguise</span>","Super Mario Bros<br><span>Coin Run</span>"];
  Song_Index = Song_Index + 1;
  Song_Index = Song_Index % Song_Array.length;
  let Next_Song_Title = String(Song_Array[Song_Index]);
  Song_Title.innerHTML = Next_Song_Title;
  
  let Covers = document.getElementsByClassName('Album_Covers');
  for(Index=0; Index < Covers.length; Index++){
    Covers[Index].classList.remove("State_0");
    Covers[Index].classList.remove("State_1");
    Covers[Index].classList.remove("State_2");
    Covers[Index].classList.remove("State_3");
    Covers[Index].classList.remove("State_4");
    Covers[Index].classList.remove("State_5");
  }
  
  var Tail_State = String(State_Machine_Array.pop());
  State_Machine_Array.unshift(Tail_State)
    
  for(Index=0; Index < Covers.length; Index++){
    Covers[Index].classList.add(State_Machine_Array[Index]);
  }
  
  let Next_Song = (document.getElementById('Song_Title').innerHTML).split("<br>")[0];
  Audio_File_Name = Audio_Appendix[Next_Song];
  Audio_File = document.getElementById(Audio_File_Name);
  Audio_File.volume = parseFloat(Output_Volume);
  
  Audio_File.play();
  Play_Button.style.backgroundImage="url('../Assets/Pause.svg')";

  
  return Song_Index, State_Machine_Array;
}



