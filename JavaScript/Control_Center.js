
function Setup_Control_Centre(){
  let Album_1 = document.getElementById('Album_1');
  Album_1.classList.add('State_1');
  let Album_2 = document.getElementById('Album_2');
  Album_2.classList.add('State_2');
  let Album_3 = document.getElementById('Album_3');
  Album_3.classList.add('State_3');
  let Album_4 = document.getElementById('Album_4');
  Album_4.classList.add('State_4');
  let Album_5 = document.getElementById('Album_5');
  Album_5.classList.add('State_5');
  let Dock = document.getElementById('Dock');
  Dock.addEventListener("mouseleave",Icon_Left);
  let Background = document.getElementById('Background');
  Background.addEventListener("mousedown",Unfocus_Cards);
  WIFI_Toggle_Switch = document.getElementById('WIFI_Toggle_Switch');
  let Network_Card = document.getElementsByClassName('Network_Card')[0];
  Network_Card.classList.toggle("Network_Card_Collapsed");
  WIFI_Toggle_Switch.addEventListener("click",Toggle_Network_Card);
  let White_WIFI_Symbol_1 = document.getElementsByClassName('White_WIFI_Symbol_1')[0];
  White_WIFI_Symbol_1.style.fillOpacity = "0.9";
  let Starlink_Toggle = document.getElementById('Select_Element_1');
  Starlink_Toggle.addEventListener("click",Starlink_Wifi_Clicked);
  let Mars_Base_Station_Toggle = document.getElementById('Select_Element_2');
  Mars_Base_Station_Toggle.addEventListener("click",Mars_Base_Station_Clicked);
  let Other_Networks_Toggle = document.getElementById('Select_Element_3');
  let Network_Preferences_Toggle = document.getElementById('Select_Element_4');
  let WIFI_Symbol_2 = document.getElementsByClassName('WIFI_Symbols')[1];
  WIFI_Symbol_2.classList.add("Off_Wifi_Toggle");
  let Display_Slider = document.getElementById('Display_Slider'); 
  let Sound_Slider = document.getElementById('Sound_Slider')
  Display_Slider.addEventListener('input',Adjust_Slider_Background);
  Sound_Slider.addEventListener('input',Adjust_Slider_Background);
  document.getElementById('WIFI_Toggle_Switch').click();
  let Main_Control_Toggles = document.getElementsByClassName('Control_Centre_Main_Toggle_Touch_Zones');
  for(Index=0; Index < Main_Control_Toggles.length; Index++){
    Main_Control_Toggles[Index].addEventListener('click',Toggle_Main_Control);
  }
  let Symbol_1 = document.getElementById('Control_Center_WIFI_Symbol');
  Symbol_1.classList.toggle("White_Fill_Toggle");
  let Main_Toggle_Container_1 = Symbol_1.parentElement.parentElement;
  Main_Toggle_Container_1.classList.toggle('Main_Toggle_Background');
  let Symbol_2 = document.getElementById('Control_Center_Bluetooth_Symbol');
  Symbol_2.classList.toggle("White_Fill_Toggle");
  let Main_Toggle_Container_2 = Symbol_2.parentElement.parentElement;
  Main_Toggle_Container_2.classList.toggle('Main_Toggle_Background');
  let Symbol_3 = document.getElementById('Control_Center_FileDrop_Symbol');
  Symbol_3.classList.toggle("White_Fill_Toggle");
  let Main_Toggle_Container_3 = Symbol_3.parentElement.parentElement;
  Main_Toggle_Container_3.classList.toggle('Main_Toggle_Background');
  let Do_Not_Disturb_Container = document.getElementById('Do_Not_Disturb_Container');
  Do_Not_Disturb_Container.addEventListener('click',Do_Not_Disturb_Toggled);
  document.getElementById('Fast_Forward_Button').addEventListener('click',Fast_Forward_Button_Pressed);
  let App_Icons = document.getElementsByClassName('App_Icons');
  for(Index=0; Index < App_Icons.length; Index++){
    App_Icons[Index].addEventListener("click",Launch_Application);
    App_Icons[Index].addEventListener("mouseover",Icon_Hovered);
  }
  let About_Button = document.getElementById('About_Button');
  About_Button.dispatchEvent(new Event('mousedown'));
  let Play_Button = document.getElementById('Play_Button');
  Play_Button.addEventListener('click',Play_Pause_Song);
  document.getElementById('Battery_Percentage_Container').addEventListener('click',Toggle_Battery_Button);
  document.getElementById('Keyboard_Brightness_Container').addEventListener('click',Adjust_Keyboard_Brightness);
  document.getElementById('Screen_Mirroring_Container').addEventListener('click',Toggle_Screen_Mirroring);
  document.getElementById('Audio_Selector').addEventListener('click',Toggle_Audio_Selector);
  document.getElementById('Accessibility_Container').addEventListener('click',Toggle_Accessibility_Features);
}

function Toggle_Main_Control(){
  let Lookup_Table = {"Main_Toggle_Touch_Zone_1":"Control_Center_WIFI_Symbol",
                      "Main_Toggle_Touch_Zone_2":"Control_Center_Bluetooth_Symbol",
                      "Main_Toggle_Touch_Zone_3":"Control_Center_FileDrop_Symbol"};
  
  let Target_Element = document.getElementById(Lookup_Table[String(this.id)]);
  Target_Element.classList.toggle("White_Fill_Toggle");
  let Main_Toggle_Container = Target_Element.parentElement.parentElement;
  Main_Toggle_Container.classList.toggle('Main_Toggle_Background');
  let Corresponding_Label = Lookup_Table[String(this.id)].replace("Symbol","Label").replace("Control_Center_","");
  let Network_Card = document.getElementsByClassName('Network_Card')[0];
  let WIFI_Toggle_Switch = document.getElementById('WIFI_Toggle_Switch');
  if(Corresponding_Label == "WIFI_Label"){
    let Network_Selector_Indicator = document.getElementsByClassName('White_WIFI_Symbol_1')[0];
    let Starlink_Flag = parseInt(Math.round(parseFloat(Network_Selector_Indicator.style.fillOpacity)));
    let Available_Network_Names = ["Mars Base Station","Starlink"];
    let Current_Network_Name = String(Available_Network_Names[Starlink_Flag]);      
    let WIFI_Label = document.getElementById('WIFI_Label');
    if(String(WIFI_Label.innerHTML).includes("Off")){
      WIFI_Label.innerHTML = "Wi-Fi<br><span>"+Current_Network_Name+"</span>"
      Network_Card.classList.remove("Network_Card_Collapsed");
      WIFI_Toggle_Switch.checked = true;
    }else{
      WIFI_Label.innerHTML = "Wi-Fi<br><span>Off</span>"
      let WIFI_Toggle_Switch = document.getElementById('WIFI_Toggle_Switch');
      Network_Card.classList.add("Network_Card_Collapsed");
      WIFI_Toggle_Switch.checked = false;
    }
  
  }
  if(Corresponding_Label == "Bluetooth_Label"){
    let Bluetooth_Label = document.getElementById('Bluetooth_Label');
    let FileDrop_Toggle = document.getElementById('Main_Toggle_Touch_Zone_3');
    if(String(Bluetooth_Label.innerHTML).includes("On")){
      Bluetooth_Label.innerHTML = "Bluetooth<br><span>Off</span>";
      let FileDrop_Label = document.getElementById('FileDrop_Label');
      if(String(FileDrop_Label.innerHTML).includes("Contacts Only")){
        FileDrop_Toggle.click();      
      }
    }else{
      Bluetooth_Label.innerHTML = "Bluetooth<br><span>On</span>";
    }
  }
  if(Corresponding_Label == "FileDrop_Label"){
    let FileDrop_Label = document.getElementById('FileDrop_Label');
    if(String(FileDrop_Label.innerHTML).includes("Contacts Only")){
      FileDrop_Label.innerHTML = "FileDrop<br><span>Off</span>";
    }else{
      FileDrop_Label.innerHTML = "FileDrop<br><span>Contacts Only</span>";
      if(String(Bluetooth_Label.innerHTML).includes("Off")){
        let Bluetooth_Toggle = document.getElementById('Main_Toggle_Touch_Zone_2');
        Bluetooth_Toggle.click();
      }
    }  
  }  
}

function Do_Not_Disturb_Toggled(){
  let Moon_Symbol = document.getElementById('Moon_Symbol');
  Moon_Symbol.classList.toggle("White_Fill_Toggle");
  let Moon_Symbol_Container = document.getElementById('Do_Not_Disturb_Circle');
  Moon_Symbol_Container.classList.toggle('Toggle_Purple_Background');
}

function Toggle_Battery_Button(){
  console.log("Toggle Battery Button");
  let About_Card = document.getElementsByClassName('About_Card')[0];
  let Network_Card = document.getElementsByClassName('Network_Card')[0];
  let Battery_Card = document.getElementsByClassName('Battery_Card')[0];
  let Control_Center_Card = document.getElementsByClassName('Control_Center_Card')[0];
  let Widgets_Card = document.getElementsByClassName('Widgets_Card')[0];
  let Widgets_Card_Background = document.getElementsByClassName('Widgets_Glass_Background')[0];
  About_Card.classList.remove("Show_About_Card");
  Network_Card.classList.remove("Show_Network_Card");
  Control_Center_Card.classList.remove("Show_Control_Center_Card");
  Widgets_Card.classList.remove("Show_Widgets_Card");
  Widgets_Card_Background.classList.remove("Show_Widgets_Card");
  Battery_Card.classList.toggle("Show_Battery_Card");
}

var Current_Keyboard_Brightness = 0;

function Adjust_Keyboard_Brightness(){
  console.log("Activate Keyboard Brightness Slider");
  let Discrete_Meter_Levels = [0,20,40,60,80,100];
  let Percentage = Discrete_Meter_Levels[(Discrete_Meter_Levels.indexOf(Current_Keyboard_Brightness)+1)%Discrete_Meter_Levels.length];  
  let Brightness_Meter = document.getElementById('Keyboard_Brightness_Meter');
  Brightness_Meter.style.backgroundPosition = "0% " + Percentage + "%";
  Current_Keyboard_Brightness = Percentage;
  return Current_Keyboard_Brightness;
}

function Toggle_Screen_Mirroring(){
   this.classList.toggle("Toggle_Screen_Mirroring");  
}

function Toggle_Audio_Selector(){
  this.classList.toggle("Toggle_Audio_Selector");
  document.getElementById('Audio_Selector_Icon').classList.toggle("White_Fill_Toggle");
  document.getElementById('Audio_Selector_Icon_Part_2').classList.toggle("White_Fill_Toggle");
}

function Toggle_Accessibility_Features(){
  this.classList.toggle("Toggle_Screen_Mirroring");

  
}






