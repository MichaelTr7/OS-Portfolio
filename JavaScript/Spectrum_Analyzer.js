
let Microphone;
let Fourier_Transform;

function setup() {
  Microphone = new p5.AudioIn();  
  Fourier_Transform = new p5.FFT();
  Fourier_Transform.setInput(Microphone);
}

function Setup_Spectrum_Analyzer(){
  // console.log("Setting up spectrum analyzer ...");
  let Red_LED = document.getElementById('Red_LED');
  let Green_LED = document.getElementById('Green_LED');
  Turn_Off_Spectrum_Analyzer();  
  Red_LED.addEventListener("click",Turn_Off_Spectrum_Analyzer);
  Green_LED.addEventListener("click",Turn_On_Spectrum_Analyzer);
  let Power_Knob = document.getElementById('Power_Knob');
  Power_Knob.addEventListener("click",Toggle_Power);
  let Gain_Knob = document.getElementById('Gain_Knob');
  Gain_Knob.addEventListener("click",Adjust_Gain);
}

function Adjust_Gain(){
  let Current_Multipler = (document.getElementsByClassName('Knob_Nubs')[1]).innerHTML[1];
  let Gain_Multipliers = [1,2,3,5];
  let New_Multiplier = Gain_Multipliers[(Gain_Multipliers.indexOf(parseInt(Current_Multipler))+1) % 4];
  console.log(New_Multiplier);
  document.getElementsByClassName('Knob_Nubs')[1].innerHTML = "x" + String(New_Multiplier);
  let Gain_Knob = document.getElementById('Gain_Knob');
  Gain_Knob.classList.remove('Pressed_Knob');
  void Gain_Knob.offsetWidth
  Gain_Knob.classList.add('Pressed_Knob');
}

function Toggle_Power(){
  let Power_Knob = document.getElementsByClassName('Control_Knobs')[0];
  var Power_Nub = document.getElementById('Power_Nub');
  Power_Knob.classList.remove('Pressed_Knob');
  void Power_Knob.offsetWidth
  Power_Knob.classList.add('Pressed_Knob');
  if(document.getElementById("Green_LED").classList.contains("Turn_On_Green_LED")){
    Turn_Off_Spectrum_Analyzer();
    Power_Nub.style.transform = "rotate(-28deg)";
  }else{
    Turn_On_Spectrum_Analyzer();
    Power_Nub.style.transform = "rotate(28deg)";
  }  
}

function Turn_On_Spectrum_Analyzer(){
  Red_LED.classList.remove('Turn_On_Red_LED');
  Red_LED.style.backgroundColor = "rgba(230,60,60,0.3)";
  Green_LED.classList.add('Turn_On_Green_LED');
  Green_LED.style.backgroundColor = "rgba(0,128,0,1)";
  Start_Analyzing_Spectral_Bars(Update_Spectral_Interval);
}

function Turn_Off_Spectrum_Analyzer(){
  Red_LED.classList.add('Turn_On_Red_LED');
  Red_LED.style.backgroundColor = "rgba(230,60,60,1)";
  Green_LED.classList.remove('Turn_On_Green_LED');
  Green_LED.style.backgroundColor = "rgba(0,128,0,0.3)";
  Stop_Analyzing_Spectral_Bars(Update_Spectral_Interval);
  
}

var Spectral_Column_1 = document.getElementById("Column_1_Spectral_Bars");
var Spectral_Column_2 = document.getElementById("Column_2_Spectral_Bars");
var Spectral_Column_3 = document.getElementById("Column_3_Spectral_Bars");
var Spectral_Column_4 = document.getElementById("Column_4_Spectral_Bars");
var Spectral_Column_5 = document.getElementById("Column_5_Spectral_Bars");
var Spectral_Column_6 = document.getElementById("Column_6_Spectral_Bars");

var Update_Spectral_Interval = setInterval(Analyze_Audio, 1000);  
var First_Time = true;
function Start_Analyzing_Spectral_Bars(){
    getAudioContext().resume();
    Microphone.start();
    First_Time = false;
    Update_Spectral_Interval = setInterval(Analyze_Audio, 1); 
    return Update_Spectral_Interval,First_Time;
}

function Stop_Analyzing_Spectral_Bars(Update_Spectral_Interval){
    clearInterval(Update_Spectral_Interval);
    if(!First_Time){
      Microphone.stop();
    }
    var LED_Bars = document.getElementsByClassName('LED_Bars');
    for(Index=0; Index < LED_Bars.length; Index++){  
      LED_Bars[Index].classList.remove("LED_Bars_On")
    }
    return Update_Spectral_Interval;
}

function Analyze_Audio(){
  
  let Multiplier = parseInt((document.getElementById('Multiplier_Knob').innerHTML)[1]);
  
  var Spectrum_Magnitudes = Fourier_Transform.analyze();
  var Noise_Threshold = 100;
  var Select_Frequencies = [
    Math.max(parseInt(Spectrum_Magnitudes[20])-Noise_Threshold,0),
    Math.max(parseInt(Spectrum_Magnitudes[30])-Noise_Threshold,0),    
    Math.max(parseInt(Spectrum_Magnitudes[40])-Noise_Threshold,0),    
    Math.max(parseInt(Spectrum_Magnitudes[50])-Noise_Threshold,0),    
    Math.max(parseInt(Spectrum_Magnitudes[60])-Noise_Threshold,0),
    Math.max(parseInt(Spectrum_Magnitudes[70])-Noise_Threshold,0) 
  ];
  
  var Spectral_Column_1 = document.getElementById("Column_1_Spectral_Bars").children;
  var Spectral_Column_2 = document.getElementById("Column_2_Spectral_Bars").children;
  var Spectral_Column_3 = document.getElementById("Column_3_Spectral_Bars").children;
  var Spectral_Column_4 = document.getElementById("Column_4_Spectral_Bars").children;
  var Spectral_Column_5 = document.getElementById("Column_5_Spectral_Bars").children;
  var Spectral_Column_6 = document.getElementById("Column_6_Spectral_Bars").children;
  var Max = 100;
  var Step_Size = Max/7;
  var Bar_Count_1 = Math.round(Multiplier*Select_Frequencies[0]/Step_Size);
  var Bar_Count_2 = Math.round(Multiplier*Select_Frequencies[1]/Step_Size);
  var Bar_Count_3 = Math.round(Multiplier*Select_Frequencies[2]/Step_Size);
  var Bar_Count_4 = Math.round(Multiplier*Select_Frequencies[3]/Step_Size);
  var Bar_Count_5 = Math.round(Multiplier*Select_Frequencies[4]/Step_Size);
  var Bar_Count_6 = Math.round(Multiplier*Select_Frequencies[5]/Step_Size);

  var LED_Bars = document.getElementsByClassName('LED_Bars');
  for(Index=0; Index < LED_Bars.length; Index++){  
    LED_Bars[Index].classList.remove("LED_Bars_On")
  }

  for(Index=6; Index >= Math.max(7-Bar_Count_1,0); Index--){  
    Spectral_Column_1[Index].classList.add("LED_Bars_On");
  }

  for(Index=6; Index >= Math.max(7-Bar_Count_2,0); Index--){  
    Spectral_Column_2[Index].classList.add("LED_Bars_On");
  }
  
  for(Index=6; Index >= Math.max(7-Bar_Count_3,0); Index--){  
    Spectral_Column_3[Index].classList.add("LED_Bars_On");
  }

  for(Index=6; Index >= Math.max(7-Bar_Count_4,0); Index--){  
    Spectral_Column_4[Index].classList.add("LED_Bars_On");
  }

  for(Index=6; Index >= Math.max(7-Bar_Count_5,0); Index--){  
    Spectral_Column_5[Index].classList.add("LED_Bars_On");
  }

  for(Index=6; Index >= Math.max(7-Bar_Count_6,0); Index--){  
    Spectral_Column_6[Index].classList.add("LED_Bars_On");
  }

}












