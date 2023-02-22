
var Game_State = false;
var Sequence_Length = 1;
const Button_Colours = ['Green','Red','Yellow','Blue'];
var Generated_Sequence = [];
var Players_Sequence = [];
var Score = 0;
var Highscore = 0;

function Setup_Toybox_App(){
  // console.log("Setup Toybox App:");
  document.getElementsByClassName('Start_Memory_Game_Button')[0].addEventListener('click',Start_Game);
  let Coloured_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Coloured_Buttons){
    Button.style.pointerEvents = 'none';
    Button.addEventListener('mousedown',Playing_Game);
    Button.addEventListener('mousedown',Strobe_Buttons);
  }
}

function Start_Game(){
  let Game_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Game_Buttons){
    Button.innerHTML = 0;
  }  
  
  var Retry_Delay = 0;
  if(this.innerHTML == 'Retry'){
    Retry_Delay = 600;
  }
  
  document.getElementById('Game_Over_Panel').classList.remove('Show_Game_Over_Panel');
  Score = 0; 
  document.getElementById('Highscore_Container').innerHTML = `HIGHSCORE: ${Highscore} &nbsp;&nbsp; SCORE: 0`;
  Sequence_Length = 1
  Game_State = true;
  let Start_Memory_Game_Button = document.getElementById('Start_Memory_Game_Button');
  Start_Memory_Game_Button.removeEventListener('click',Start_Game);
  Start_Memory_Game_Button.addEventListener('click',End_Game);
  Start_Memory_Game_Button.innerHTML = 'End Game';
  document.getElementsByClassName('Start_Memory_Game_Button')[0].addEventListener('click',End_Game);
  setTimeout(function () {
    Generate_Sequence();
  }, Retry_Delay);
}

function End_Game(){
  Update_Highscore();

  Game_State = false;
  if(this.innerHTML == 'End Game'){
  Sequence_Length = 1;
  let Start_Memory_Game_Button = document.getElementById('Start_Memory_Game_Button');
  Start_Memory_Game_Button.addEventListener('click',Start_Game);
  Start_Memory_Game_Button.removeEventListener('click',End_Game);
  Start_Memory_Game_Button.innerHTML = 'Start Game';
  
  let Controller_Screen = document.getElementById('Controller_Screen');
  Start_Memory_Game_Button.innerHTML = 'Retry';
  // Controller_Screen.classList.remove('Retry_Game_Animation');
  // void Controller_Screen.offsetWidth;
  // Controller_Screen.classList.add('Retry_Game_Animation');
  }
}


function Generate_Sequence(){
  let Game_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Game_Buttons){
    Button.innerHTML = Sequence_Length;
  }
  Disable_Game_Buttons();
  var Current_Sequence = [];
  for(Index = 0; Index < Sequence_Length; Index++){
    var Random_Number = parseInt(Math.round(3*Math.random()));
    var Random_Colour = Button_Colours[Random_Number];
    Current_Sequence.push(Random_Colour);
  }
  Sequence_Length = Sequence_Length + 1;
  Generated_Sequence = Current_Sequence;
  
  
const Delay = 800;

for (let Index = 0; Index < Generated_Sequence.length; Index++) {
    setTimeout(function() {
        let Colour = Generated_Sequence[Index];
        let LED_ID = String(`Controller_${Colour}_Button`);
        let LED_Button = document.getElementById(LED_ID);
        LED_Button.classList.remove('Strobe_Animation');
        LED_Button.classList.remove('Long_Strobe_Animation');
        void LED_Button.offsetWidth;
        LED_Button.classList.add('Long_Strobe_Animation');
    }, Index * Delay);
}

    setTimeout(function () {
      Enable_Game_Buttons();
    }, Generated_Sequence.length * Delay);

  return Current_Sequence;
} 

function Playing_Game(){
  let Pressed_Colour = String(this.dataset.colour);
  Players_Sequence.push(Pressed_Colour);
  
  if(Generated_Sequence.length == Players_Sequence.length){

    if(stringArraysEqual(Generated_Sequence,Players_Sequence)){
      Score = Sequence_Length - 1;
      document.getElementById('Highscore_Container').innerHTML = `HIGHSCORE: ${Highscore} &nbsp;&nbsp; SCORE: ${Score}`;

          Players_Sequence = [];
          Generated_Sequence = [];
          setTimeout(function () {
            Generated_Sequence = Generate_Sequence();
          }, 1000);
    }else{
      Sequence_Length = 1;
      Game_Over();
      Disable_Game_Buttons();
    }
  }
}

function Strobe_Buttons(){
  let Game_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Game_Buttons){
    Button.innerHTML = parseInt(Button.innerHTML) - 1;
    if(Button.innerHTML == 0){
      Button.style.pointerEvents = 'none';
    }
    
  }
  this.classList.remove('Long_Strobe_Animation');
  this.classList.remove('Strobe_Animation');
  void this.offsetWidth;
  this.classList.add('Strobe_Animation');
}

function Game_Over(){
  document.getElementById('Game_Over_Panel').classList.add('Show_Game_Over_Panel');
  document.getElementsByClassName('Start_Memory_Game_Button')[0].click();
  Players_Sequence = [];
  Generated_Sequence = [];
  Game_State = false;
  Sequence_Length = 1;
}

function stringArraysEqual(a, b) {
    if (a === b) return true; 
    if (a == null || b == null) return false; 
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function Disable_Game_Buttons(){
  let Coloured_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Coloured_Buttons){
    Button.style.pointerEvents = 'none';
  }
}

function Enable_Game_Buttons(){
  let Coloured_Buttons = document.getElementsByClassName('Controller_Buttons');
  for(let Button of Coloured_Buttons){
    Button.style.pointerEvents = 'all';
  }
}

function Update_Highscore(){
  Highscore = Math.max(Highscore,Score);
}

