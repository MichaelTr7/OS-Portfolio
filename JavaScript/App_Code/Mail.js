
function Setup_Mail_App(){
  console.log("Setup Mail App:");
  var Form = document.getElementById("Mail_Form");
  Form.addEventListener('submit', Prevent_Form_Default);  
  document.getElementById('Start_Mail_Button').addEventListener('click',Open_Email);
}

function Prevent_Form_Default(e){
  e.preventDefault(); 
}

function Open_Email(){
  this.classList.remove('Squeeze_Animation');
  void this.offsetWidth;
  this.classList.add('Squeeze_Animation');
  
  
  console.log("Open Email");
  let Name = String(document.getElementById('Name_Input').value);
  if(Name == ""){
    Name = "Anonymous";
  }
  
  let Email_Body = document.getElementById('Body_Input').value;
  let email = "mail.os.portfolio+messages@gmail.com";
  let subject = 'OS Portfolio Message From ' + Name;
  var emailBody = Email_Body.replace(/(\r\n|\n)/g, "%0D%0A");  
  document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
}