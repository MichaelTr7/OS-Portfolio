
function Setup_Courses_App(){
  // console.log("Setup Courses App:");
  let Books = document.getElementsByClassName('Books');
  for(let Book of Books){
    Book.addEventListener('click',Open_Course_Info);
  }
  document.getElementById('Back_To_Library_Button').addEventListener('click',Close_Course_Info);
  document.getElementById('Book_Shelf').addEventListener('mousedown',Close_Course_Info);
  
}


function Open_Course_Info(){
  let Course_Links_Appendix = {
    "CMOS Mixed-Mode Circuits": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/727/",
    "Image Processing": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/882/",
    "Electronics I": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/404/",
    "Communication Systems": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/635/",
    "Digital Signal Processing": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/792/",
    "Electric Circuit Analysis": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/202/",
    "Calculus II": "https://www.torontomu.ca/calendar/2022-2023/courses/mathematics/MTH/240/",
    "Physics: Waves and Fields": "https://www.torontomu.ca/calendar/2022-2023/courses/physics/PCS/125/",
    "Software Systems": "https://www.torontomu.ca/calendar/2022-2023/courses/computer-engineering/COE/318/",
    "Digital Systems": "https://www.torontomu.ca/calendar/2022-2023/courses/computer-engineering/COE/328/",
    "Electric Networks": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/302/",
    "Solid State Physics": "https://www.torontomu.ca/calendar/2022-2023/courses/physics/PCS/224/",
    "Discrete Mathematics": "https://www.torontomu.ca/calendar/2022-2023/courses/mathematics/MTH/314/",
    "Field Theory": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/401/",
    "Microprocessor Systems": "https://www.torontomu.ca/calendar/2022-2023/courses/computer-engineering/COE/538/",
    "Electronic Circuits II": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/504/",
    "Control Systems": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/639/",
    "Signals and Systems I": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/532/",
    "Electromagnetics": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/531/",
    "Energy Conservation": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/637/",
    "Power, Change and Technology": "https://www.torontomu.ca/calendar/2022-2023/courses/politics-and-public-administration/POL/507/",
    "Thermodynamics and Fluids": "https://www.torontomu.ca/calendar/2022-2023/courses/mechanical-engineering/MEC/511/",
    "Law and Ethics": "https://www.torontomu.ca/calendar/2022-2023/courses/common-engineering/CEN/800/",
    "Writing Skills": "https://www.torontomu.ca/calendar/2022-2023/courses/common-engineering/CEN/199/",
    "Engineering Capstone Design": "https://www.torontomu.ca/calendar/2022-2023/courses/electrical-engineering/ELE/70A/",
    "Course Calendar": "https://www.torontomu.ca/calendar/2022-2023/programs/feas/electrical/",
    "General Chemistry": "https://www.torontomu.ca/calendar/2022-2023/courses/chemistry/CHY/102/",
    "Introduction to Engineering": "https://www.torontomu.ca/calendar/2022-2023/courses/common-engineering/CEN/100/"
  }
  let Course_Info_Link = Course_Links_Appendix[String(this.children[0].innerHTML)];
  let Course_iFrame = document.getElementById('Course_Info_Frame');
  Course_iFrame.src = Course_Info_Link;
  let Book_Summary = document.getElementById('Book_Summary');
  Book_Summary.classList.remove('Display_Course_Info');
  void Book_Summary.offsetWidth;
  Book_Summary.classList.add('Display_Course_Info');
  document.getElementById("Display_Course_Info").contentWindow.scrollTo(0, 500);
}

function Close_Course_Info(){
  let Book_Summary = document.getElementById('Book_Summary');
  console.log(Book_Summary);
  Book_Summary.classList.remove('Display_Course_Info');
  void Book_Summary.offsetWidth;
  Book_Summary.classList.remove('Display_Course_Info');
}