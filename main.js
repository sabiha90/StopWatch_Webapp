var table = document.getElementById('time');
var lat;
var lon;
var i = 0; //Initializing i for checking the clickcount
var start_time = 0;  

//Function when the start button is clicked
function start() {
  start_time = now();
  
  i = i+1; 
   //Creating a header for the table
  if(i==1) //If button is clicked once
  {

    var header = table.createTHead();
    var row = header.insertRow(0);  //Inserting a row
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<b><center>Start/End Time";   
    cell2.innerHTML = "<b><center>Time + TimeZone";   
    cell3.innerHTML = "<b><center>Latitude";   
    cell4.innerHTML = "<b><center>Longitude";   

  }
//Populating the table with Start time, Time-Timezone, Latitude and Longitude
  var row = table.insertRow(1);
  var cell_start = row.insertCell(0);
  var cell_timezone = row.insertCell(1);
  var cell_lat = row.insertCell(2);
  var cell_lon = row.insertCell(3);
  cell_lat.className = "cell3";
  cell_lon.className = "cell4";
  cell_start.innerHTML = "Start Time:  " + formatTime(0); 
  cell_timezone.innerHTML = currentTime();
  cell_lat.innerHTML = "Locating...";
  cell_lon.innerHTML = "Locating...";
  geoFindMe(); //Function for location retrieval
 

 //Start the timer when the start button is clicked
  timer = setInterval("updateTime()",5);
  document.getElementById("history_label").innerHTML = "History Table";
}

//Function when the stop button is clicked

function stop() {
  time_elapsed = now() - start_time; //Calculating the number of milliseconds elapsed since the start to stop
  clearInterval(timer); //Clearing the timer variable set
  i = i + 1; //Adding rows in the second iteraytion
  geoFindMe(); //Function for location retrieval
  
  //Inserting the data into the table when stop is clicked
  var row = table.insertRow(1);
  var cell_start = row.insertCell(0);
  var cell_timezone = row.insertCell(1);
  var cell_lat = row.insertCell(2);
  var cell_lon = row.insertCell(3);
  cell_lat.className = "cell3";
  cell_lon.className = "cell4";
  cell_start.innerHTML = "Time elapsed:   " + time_elapsed + "ms" + "<br>" + "Stop Time:  " + formatTime(time_elapsed);
  cell_timezone.innerHTML = currentTime();
  cell_lat.innerHTML = "Locating...";
  cell_lon.innerHTML = "Locating...";
}

//Clear the entire table when clicking the reset button
function reset()
{
  var res = confirm("It will clear the entire table. Are you sure?");
  if(res)
  {
    var table = document.getElementById("time");
    clearInterval(timer);
    table.innerHTML = "";
    i=0;
  }
  
}

//Getting the current time
function now() {
  return (new Date()).getTime(); 
}

//Populate the offline history table
function populate_offline(){
   i = 2;
   table.innerHTML = localStorage.getItem('timetable');   //populating the table offline using WebStorage API
}

//Function to Display timer 

function updateTime(){
    var timer_cell = document.getElementById("timerp");
    time_elapsed = now() - start_time;
    timer_cell.innerHTML = formatTime(time_elapsed);
}



//Function to extract the characters to display the time in a 00:00:00:000 format
function extract(num, size) {
  var s = "0000" + num;
  return s.substr(s.length - size);
}

//Function to display the start and end time in 00:00:00:000 format
function formatTime(time) {
  var h = m = s = ms = 0;
  h = Math.floor( (time/(1000*60*60)) % 24 ); //Extracting the hour from the current time
  m = Math.floor( (time / 1000/60) %60) ; //Extracting the minutes from the current time
  s = Math.floor( (time / 1000 ) % 60); //Extracting the seconds from the current time
  ms = time % 1000; //Extracting the milliseconds from the current time
  var showTime = extract(h, 2) + ':' + extract(m, 2) + ':' + extract(s, 2) + ':' + extract(ms, 3);
  return showTime;
}

//Function for getting the geographic location using geolocation

function geoFindMe() {
  var lat_cells = table.getElementsByClassName('cell3');//Getting the elements of the class cell3
  var lon_cells = table.getElementsByClassName('cell4');
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

//If unable to find location within 5 seconds, then return error
  var options = {
    timeout: 5000
  };

  function success(position) {
    lat  = position.coords.latitude; //Get the latitude of current location
    lon = position.coords.longitude; //Get the longitude of current location
    

    lat_cells[0].innerHTML = lat;
    
    lon_cells[0].innerHTML = lon;
    localStorage.setItem('timetable', table.innerHTML); //populating the table offline using WebStorage API
  }

  //If unable to retrieve the location
  function error() {
    lat_cells[0].innerHTML = "Latitude not retrieved";
    lon_cells[0].innerHTML = "Longitude not retrieved";
  }
  


  navigator.geolocation.getCurrentPosition(success, error,options);
}

//Function for displaying current time and the timezone(PDT in this case)
function currentTime() {
    var today = new Date();
    var zone = today.toString().match(/\(([A-Za-z\s].*)\)/)[1];
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    time_zone = h + ":" + m + ":" + s + " " + zone;
    return time_zone;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

