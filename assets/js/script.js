// display the current date the top of the page
$("#currentDay").text(moment().format('MMMM Do, YYYY'));
console.log("this is a test");//this is a test
// turn timeblocks into object "<div class="col-md-1" id="time1">9 AM</div>"
let workHours = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
    "6 PM": ""
  };
  //use function with switch statement to get numeric value from string value, return in military time 8-18
  function hourNumberFromString(hourString) {
    switch(hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
      case "6 PM": return 18;
    }
  };

//document is "ready"
  $(document).ready(function(){
    if(!localStorage.getItem('workHours')) {
      updateCalendarTasks(workHours);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workHours')));
    }
  });

  function updateCalendarTasks(dayObject) {
    $(".schedule-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }; 
  
  let counter = 0;//let counter equals number
  //for loop need let/var to get textArea id and time row id, refernce workHours
  //property of workHours is a string
  for(const property in workHours) {//"8AM", "9AM" etc
    let textEntry = "#textInput" + counter; //id for textarea + increment to go through through each text area
    $(textEntry).text(workHours[property]); //use bracket notation bc workHours property contains spaces
    let timeId = "#time" + counter; //id for timeblock: time1, time2, etc
    let presentHour = moment().hour();//present time
    let timeString = $(timeId).text();
    let timeNumber = hourNumberFromString(timeString);  //got numeric values to change row colors
    
    //change row colors based on time of day, gray(past) for time < than present, red for present, green(future) for time > present.  Use preloaded css classes
    if(timeNumber < presentHour) {
      $(textEntry).addClass("past");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future");
    } else {
      $(textEntry).addClass("present");
    }
    counter ++;
  };
  // listening for button click
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });
  
  
  //saving tasks to local storage
  function loadSavedData() {
    result = localStorage.getItem('workHours')
    return (result ? result : workHours);
  };
  
  function primeLocalStorage() {
    localStorage.setItem('workHours', JSON.stringify(workHours));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workHours', JSON.stringify(dayObj));
  };
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('workHours')) {
      primeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workHours'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  };
  
  