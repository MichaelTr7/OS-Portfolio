
function Display_Card(){    
  let Button_Identifier = String(this.id);
  let About_Card = document.getElementsByClassName('About_Card')[0];
  let Network_Card = document.getElementsByClassName('Network_Card')[0];
  let Battery_Card = document.getElementsByClassName('Battery_Card')[0];
  let Control_Center_Card = document.getElementsByClassName('Control_Center_Card')[0];
  let Widgets_Card = document.getElementsByClassName('Widgets_Card')[0];
  let Widgets_Card_Background = document.getElementsByClassName('Widgets_Glass_Background')[0];
  
  // If notification centre is triggerred
  if(Button_Identifier == "Date_Button"){ 
    About_Card.classList.remove("Show_About_Card");
    Network_Card.classList.remove("Show_Network_Card");
    Battery_Card.classList.remove("Show_Battery_Card");
    Control_Center_Card.classList.remove("Show_Control_Center_Card");
    Widgets_Card.classList.toggle("Show_Widgets_Card");
    Widgets_Card_Background.classList.toggle("Show_Widgets_Card");
       
    // Entrance animation for activity rings widget
    var Movements = document.getElementsByClassName("Activity_Movements");
    var Blue_Movement = Movements[2];
    var Green_Movement = Movements[1];
    var Red_Movement = Movements[0];
    var Blue_Ring = document.getElementById("Blue_Ring");
    var Green_Ring = document.getElementById("Green_Ring");
    var Red_Ring = document.getElementById("Red_Ring");
    let Start_Nubs = document.getElementsByClassName("Start_Activity_Circles");
    let Red_Start_Nub = Start_Nubs[0];
    let Move_Label = document.getElementById("Move_Label");
    let Exercise_Label = document.getElementById("Exercise_Label");
    let Stand_Label = document.getElementById("Stand_Label");
    
    Blue_Movement.classList.remove("Rotate_Blue_Movements");
    Green_Movement.classList.remove("Rotate_Green_Movements");
    Red_Movement.classList.remove("Rotate_Red_Movements");
    Blue_Ring.classList.remove("Blue_Ring_Animation");
    Green_Ring.classList.remove("Green_Ring_Animation");
    Red_Ring.classList.remove("Red_Ring_Animation");    
    Start_Nubs[0].classList.remove("Show_Red_Nub");
    Start_Nubs[1].classList.remove("Show_Green_Nub");
    Start_Nubs[2].classList.remove("Show_Blue_Nub");
    Move_Label.classList.remove("Show_Move_Label");
    Exercise_Label.classList.remove("Show_Exercise_Label");
    Stand_Label.classList.remove("Show_Stand_Label");

    void Blue_Movement.offsetWidth;
    void Green_Movement.offsetWidth;
    void Red_Movement.offsetWidth;
    void Blue_Ring.offsetWidth;
    void Green_Ring.offsetWidth;
    void Red_Ring.offsetWidth;
    void Start_Nubs[0].offsetWidth;
    void Start_Nubs[1].offsetWidth;
    void Start_Nubs[2].offsetWidth;
    void Move_Label.offsetWidth;
    void Exercise_Label.offsetWidth;
    void Stand_Label.offsetWidth;
    
    Blue_Movement.classList.add("Rotate_Blue_Movements");
    Green_Movement.classList.add("Rotate_Green_Movements");
    Red_Movement.classList.add("Rotate_Red_Movements");
    Blue_Ring.classList.add("Blue_Ring_Animation");
    Green_Ring.classList.add("Green_Ring_Animation");
    Red_Ring.classList.add("Red_Ring_Animation");    
    Start_Nubs[0].classList.add("Show_Red_Nub");
    Start_Nubs[1].classList.add("Show_Green_Nub");
    Start_Nubs[2].classList.add("Show_Blue_Nub");
    Move_Label.classList.add("Show_Move_Label");
    Exercise_Label.classList.add("Show_Exercise_Label");
    Stand_Label.classList.add("Show_Stand_Label");

    // Entrance animation for notes widget
    let Notes_Icon = document.getElementById('Notes_Title');
    let Notes_Folder_Symbol = document.getElementById('Notes_Folder_Symbol');
    let Notes_Writing = document.getElementById('Notes_Content_Preview');
    
    Notes_Icon.classList.remove("Translate_Right_Animation_1");
    void Notes_Icon.offsetWidth;
    Notes_Icon.classList.add("Translate_Right_Animation_1");
    
    Notes_Folder_Symbol.classList.remove("Translate_Right_Animation_1");
    void Notes_Folder_Symbol.offsetWidth;
    Notes_Folder_Symbol.classList.add("Translate_Right_Animation_1");
    
    Notes_Writing.classList.remove("Fade_In_Animation");
    void Notes_Writing.offsetWidth;
    Notes_Writing.classList.add("Fade_In_Animation");

    // Entrance animation for weather widget
    let Weather_Widget_Title = document.getElementById('City_Label');
    let Weather_Widget_Temperature_Label = document.getElementById('Current_Temperature_Label');
    let Weather_Widget_Current_Summary = document.getElementById('Current_Weather_Summary');
    let Weather_Widget_Seperators = document.getElementsByClassName('Seperators');
    let Weather_Widget_Seperator_1 = Weather_Widget_Seperators[0];
    let Weather_Widget_Seperator_2 = Weather_Widget_Seperators[1];
    let Weather_Widget_Timestamps = document.getElementsByClassName('Time_Headers');
    let Weather_Widget_Temperature_Labels = document.getElementsByClassName('Temperature_Labels');  
    let Weather_Widget_Day_Headers = document.getElementsByClassName('Day_Of_The_Week_Headers');
    let Weather_Widget_Todays_Low = document.getElementsByClassName('Todays_Low');
    let Weather_Widget_Todays_High = document.getElementsByClassName('Todays_High');
    let Weather_Widget_Air_Quality_Containers = document.getElementsByClassName('Air_Quality_Bar_Containers');
    let Weather_Widget_Air_Air_Quality_Bars = document.getElementsByClassName('Air_Quality_Bars');
    
    Weather_Widget_Title.classList.remove("Translate_Up_Animation");
    void Weather_Widget_Title.offsetWidth;
    Weather_Widget_Title.classList.add("Translate_Up_Animation");
    
    Weather_Widget_Temperature_Label.classList.remove("Translate_Up_Animation_2");
    void Weather_Widget_Temperature_Label.offsetWidth;
    Weather_Widget_Temperature_Label.classList.add("Translate_Up_Animation_2");

    Weather_Widget_Current_Summary.classList.remove("Translate_Up_Animation_2");
    void Weather_Widget_Current_Summary.offsetWidth;
    Weather_Widget_Current_Summary.classList.add("Translate_Up_Animation_2");

    Weather_Widget_Seperator_1.classList.remove("Translate_Right_Animation");
    void Weather_Widget_Seperator_1.offsetWidth;
    Weather_Widget_Seperator_1.classList.add("Translate_Right_Animation");

    Weather_Widget_Seperator_2.classList.remove("Translate_Right_Animation");
    void Weather_Widget_Seperator_2.offsetWidth;
    Weather_Widget_Seperator_2.classList.add("Translate_Right_Animation");

    for(Index=0; Index < Weather_Widget_Timestamps.length; Index++){
      Weather_Widget_Timestamps[Index].classList.remove("Translate_Up_Animation_3");
      Weather_Widget_Temperature_Labels[Index].classList.remove("Translate_Up_Animation_3");
      void Weather_Widget_Timestamps[Index].offsetWidth;
      void Weather_Widget_Temperature_Labels[Index].offsetWidth;
      Weather_Widget_Timestamps[Index].classList.add("Translate_Up_Animation_3"); 
      Weather_Widget_Temperature_Labels[Index].classList.add("Translate_Up_Animation_3");     
   }
    
  
   for(Index=0; Index < Weather_Widget_Day_Headers.length; Index++){
      Weather_Widget_Day_Headers[Index].classList.remove('Translate_Up_Animation_3');
      Weather_Widget_Todays_Low[Index].classList.remove('Translate_Up_Animation_3');
      Weather_Widget_Todays_High[Index].classList.remove('Translate_Up_Animation_3');
      Weather_Widget_Air_Air_Quality_Bars[Index].classList.remove('Translate_Air_Quality_Index_Bars');
      Weather_Widget_Air_Quality_Containers[Index].classList.remove('Fade_In_Air_Quality_Containers_Animation');

      
      void Weather_Widget_Day_Headers[Index].offsetWidth;
      void Weather_Widget_Todays_Low[Index].offsetWidth;
      void Weather_Widget_Todays_High[Index].offsetWidth;
      void Weather_Widget_Air_Air_Quality_Bars[Index].offsetWidth;
      void Weather_Widget_Air_Quality_Containers[Index].offsetWidth;

      Weather_Widget_Day_Headers[Index].classList.add('Translate_Up_Animation_3');
      Weather_Widget_Todays_Low[Index].classList.add('Translate_Up_Animation_3');
      Weather_Widget_Todays_High[Index].classList.add('Translate_Up_Animation_3');
      Weather_Widget_Air_Air_Quality_Bars[Index].classList.add('Translate_Air_Quality_Index_Bars');
      Weather_Widget_Air_Quality_Containers[Index].classList.add('Fade_In_Air_Quality_Containers_Animation');

   }
  
    

  }
  
  // If about panel is triggered
  if(Button_Identifier == "About_Button"){
    Network_Card.classList.remove("Show_Network_Card");
    Battery_Card.classList.remove("Show_Battery_Card");
    Control_Center_Card.classList.remove("Show_Control_Center_Card");
    Widgets_Card.classList.remove("Show_Widgets_Card");
    Widgets_Card_Background.classList.remove("Show_Widgets_Card");
    About_Card.classList.toggle("Show_About_Card");
  }
  // If network panel is triggered
  else if(Button_Identifier == "Network_Button"){
    About_Card.classList.remove("Show_About_Card");
    Battery_Card.classList.remove("Show_Battery_Card");
    Control_Center_Card.classList.remove("Show_Control_Center_Card");
    Widgets_Card.classList.remove("Show_Widgets_Card");
    Widgets_Card_Background.classList.remove("Show_Widgets_Card");
    Network_Card.classList.toggle("Show_Network_Card");
  }
  // If battery status panel is triggered
  else if(Button_Identifier == "Battery_Button"){
    About_Card.classList.remove("Show_About_Card");
    Network_Card.classList.remove("Show_Network_Card");
    Control_Center_Card.classList.remove("Show_Control_Center_Card");
    Widgets_Card.classList.remove("Show_Widgets_Card");
    Widgets_Card_Background.classList.remove("Show_Widgets_Card");
    Battery_Card.classList.toggle("Show_Battery_Card");
  }
  // If control centre panel is triggered
  else if(Button_Identifier == "Notification_Button"){
    About_Card.classList.remove("Show_About_Card");
    Network_Card.classList.remove("Show_Network_Card");
    Battery_Card.classList.remove("Show_Battery_Card");
    Widgets_Card.classList.remove("Show_Widgets_Card");
    Widgets_Card_Background.classList.remove("Show_Widgets_Card");
    Control_Center_Card.classList.toggle("Show_Control_Center_Card");
  }

}

function Unfocus_Cards(){
  let About_Card = document.getElementsByClassName('About_Card')[0];
  let Network_Card = document.getElementsByClassName('Network_Card')[0];
  let Battery_Card = document.getElementsByClassName('Battery_Card')[0];
  let Control_Center_Card = document.getElementsByClassName('Control_Center_Card')[0];
  let Widgets_Card = document.getElementsByClassName('Widgets_Card')[0];
  let Widgets_Card_Background = document.getElementsByClassName('Widgets_Glass_Background')[0];
  About_Card.classList.remove("Show_About_Card");
  Network_Card.classList.remove("Show_Network_Card");
  Battery_Card.classList.remove("Show_Battery_Card");
  Control_Center_Card.classList.remove("Show_Control_Center_Card");
  Widgets_Card.classList.remove("Show_Widgets_Card");
  Widgets_Card_Background.classList.remove("Show_Widgets_Card");
}


