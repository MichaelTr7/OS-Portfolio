
var Game_State = false;
var Sequence_Length = 1
const Button_Colours = ['Green','Red','Yellow','Blue'];

function Setup_Toybox_App(){
  // console.log("Setup Toybox App:");
  document.getElementById('Start_Memory_Game_Button').addEventListener('click',Start_Game);
  // let Coloured_Buttons = document.get
}

function Start_Game(){
  Sequence_Length = 1
  Game_State = true;
  let Start_Memory_Game_Button = document.getElementById('Start_Memory_Game_Button');
  Start_Memory_Game_Button.removeEventListener('click',Start_Game);
  Start_Memory_Game_Button.addEventListener('click',End_Game);
  Start_Memory_Game_Button.innerHTML = 'End Game';
  Playing_Game();
}

function End_Game(){
  Game_State = false;
  let Start_Memory_Game_Button = document.getElementById('Start_Memory_Game_Button');
  Start_Memory_Game_Button.addEventListener('click',Start_Game);
  Start_Memory_Game_Button.removeEventListener('click',End_Game);
  Start_Memory_Game_Button.innerHTML = 'Start Game';
}


function Generate_Sequence(){
  console.log("Generate Sequence");
  var Current_Sequence = [];
  for(Index = 0; Index < Sequence_Length; Index++){
    var Random_Number = parseInt(Math.round(3*Math.random()));
    var Random_Colour = Button_Colours[Random_Number];
    Current_Sequence.push(Random_Colour);
  }
  Sequence_Length = Sequence_Length + 1;
  return Current_Sequence;
} 

function Playing_Game(){
  console.log("Playing Game");
  
  var Sequence = Generate_Sequence();
  
  
  // Playing_Game();

}










