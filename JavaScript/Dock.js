
function Icon_Hovered(){  
  let Dock_Boundaries = document.getElementById('Dock').getBoundingClientRect();
  let Dock_Left = Dock_Boundaries.left;  
  let Bounds = this.getBoundingClientRect();  
  let Icon_Center_X = Bounds.x + Bounds.width/2;
  let Icon_Top_Y = Bounds.y;
  let Icon_Label = document.getElementById('Icon_Label');
  Icon_Label.style.opacity = 1;
  let X_Position = Icon_Center_X - Dock_Left;
  Icon_Name = (String(this.id).split("_Icon")[0]).replace("_"," ");  
  Icon_Label.innerHTML = Icon_Name;
  let Name_Length = Icon_Name.length;
  let Label_Boundaries = document.getElementById('Icon_Label').getBoundingClientRect();
  let Label_Width = Label_Boundaries.width + "px";
  Icon_Label.style.left = "calc(" + X_Position + "px - " + Label_Width + "/2)";
  Icon_Label.style.top = "-3em";
  let Hovered_Icon = this;
  Magnify_Focussed_Icons(Hovered_Icon);
}

function Icon_Left(){
  let Icon_Label = document.getElementById('Icon_Label');
  Icon_Label.style.opacity = 0;
  
  
}


function Magnify_Focussed_Icons(Target_Icon){
  // console.log("Magnify focussed items...");
  let Icons_Class = document.getElementsByClassName('App_Icons');
  let Central_Index = parseInt(Target_Icon.dataset.index);
  let Immediate_Neighbouring_Indices = [Central_Index-1, Central_Index+1];
  let Secondary_Neighbouring_Indices = [Central_Index-2, Central_Index+2];
  
  let Left = 0;
  let Right = 1;
  
  // Central Icon
  Target_Icon.classList.add('Scale_Level_0');
  
  // Magnify - Level 1
  let Immediate_Left_Icon = Icons_Class[Immediate_Neighbouring_Indices[Left]];
  let Immediate_Right_Icon = Icons_Class[Immediate_Neighbouring_Indices[Right]];
  if((Immediate_Left_Icon >= 0) & (Immediate_Left_Icon < Icons_Class.length)){    
  }  

  // Magnify - Level 2
  let Secondary_Left_Icon = Icons_Class[Secondary_Neighbouring_Indices[Left]];
  let Secondary_Right_Icon = Icons_Class[Secondary_Neighbouring_Indices[Right]];
  
}



