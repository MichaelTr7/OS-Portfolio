
function Setup_Volunteer_Work_App(){
  // console.log("Setup Volunteer Work App:");
  document.getElementById('Heart_Monitor_Colour_Control_Knob_Backdrop').addEventListener('mousedown',Change_Heart_Colour);
  document.getElementById('Heart_Object').addEventListener('mousedown',Change_Heart_Colour);  
  document.getElementById('Heart_Container').classList.add('Heart_Pumping_Animation');
  document.getElementById('Heart_Knob_Spinner').classList.add('Spin_Knob');
  document.getElementById('Heart_Monitor_Speed_Control_Knob_Backdrop').addEventListener('mousedown',Change_Heart_Beat_Rate);
  Setup_Pulse_Graph();
}

function Change_Heart_Colour(){
  let Next_Colour_Lookup = {
    "R":"G",
    "G":"B",
    "B":"R"
  }
  let Next_Knob_Position = {
    "R":"90deg",
    "G":"180deg",
    "B":"0deg"
  }
  let Heart_Knob = document.getElementById('Heart_Monitor_Colour_Control_Knob_Backdrop');
  let Current_Colour = String(Heart_Knob.dataset.heart_colour);
  let Next_Colour = Next_Colour_Lookup[Current_Colour];
  Heart_Knob.dataset.heart_colour = Next_Colour;
  let Next_Angle = Next_Knob_Position[Current_Colour];
  document.getElementById('Heart_Knob_Spinner').style.setProperty('--Angle',Next_Angle);
  let Heart_Colours_1 = document.getElementsByClassName('Heart_Colours_1');
  let Heart_Colours_2 = document.getElementsByClassName('Heart_Colours_2');
  let Heart_Colours_3 = document.getElementsByClassName('Heart_Colours_3');
  let Colour_Lookup_Table = {
    "R": ["#E04F8C","#CA457D","#B44070"],
    "G": ["#50CEB7","#37A88F","#2B9785"],
    "B": ["#44C2F2","#5071DE","#4B4CDF"],
  }
  for(let Coloured_Object of Heart_Colours_1){
    Coloured_Object.style.stopColor = (Colour_Lookup_Table[Next_Colour])[0];
  }
  for(let Coloured_Object of Heart_Colours_2){
    Coloured_Object.style.stopColor = (Colour_Lookup_Table[Next_Colour])[1];
  }
  for(let Coloured_Object of Heart_Colours_3){
    Coloured_Object.style.stopColor = (Colour_Lookup_Table[Next_Colour])[2];
  }
  var Heart = document.getElementById('Heart_Container');
  var Heart_Contents = Heart.innerHTML;
  Heart.innerHTML = '';
  Heart.innerHTML = Heart_Contents;
  document.getElementById('Heart_Object').addEventListener('mousedown',Change_Heart_Colour);
}

function Change_Heart_Beat_Rate(){
  console.log("Change Heartbeat Rate");
  let Multiplier_Knob = document.getElementById('Heart_Monitor_Speed_Control_Knob');
  let Current_Speed = String(Multiplier_Knob.innerHTML);
  let Next_Speed_Lookup = {
    "x1":{"speed":"0.5s", "label": "x2"},
    "x2":{"speed":"0.3s", "label": "x3"},
    "x3":{"speed":"1s", "label": "x1"}
  }
  Multiplier_Knob.innerHTML = (Next_Speed_Lookup[Current_Speed]).label;
  let Heart = document.getElementById('Heart_Container');
  Heart.style.setProperty('--Heart_Rate',(Next_Speed_Lookup[Current_Speed]).speed);
}

function Setup_Pulse_Graph(){




}





