/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// To add:                                                                                     // 
//  ->input validation;                                                                        //
//  ->additional functionalities such as pause and resume buttons;                             //
//  -> sound indicator when a interval ends;                                                   //
//  -> music during the intervals, maybe be able to choose a music type in the initial page;   //
//  -> progress bar;                                                                           //
//  -> session count;                                                                          //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////


// Variables
let workPanel = document.getElementById('work');
let breakPanel = document.getElementById('break');

let workMinutesInput = document.getElementById("work-interval-minutes");
let workSecondsInput = document.getElementById("work-interval-seconds");
let breakMinutesInput = document.getElementById("break-interval-minutes");
let breakSecondsInput = document.getElementById("break-interval-seconds");

// Initial page
function nextPage() {
  // Change display
  document.getElementById('initial-page').style.display = 'none'
  document.getElementById('timer-panel').style.display = 'flex'

  // Get the values of the work and break intervals
  let workMinutes = workMinutesInput.value;
  let workSeconds = workSecondsInput.value;
  
  // Display
  document.getElementById('minutes').innerHTML = (workMinutes < 10 ? '0' : '') + workMinutes;
  document.getElementById('seconds').innerHTML = (workSeconds < 10 ? '0' : '') + workSeconds;

  workPanel.classList.add('active');  
}

// Start timer
function start() {
  // Change button
  document.getElementById('start').style.display = 'none';
  document.getElementById('reset').style.display = 'block';

  // Update values
  let workMinutes = workMinutesInput.value;
  let workSeconds = workSecondsInput.value;
  let breakMinutes = breakMinutesInput.value;
  let breakSeconds = breakSecondsInput.value;

  // Change variables to work with them and not change the original values
  let workTimeMin = workMinutes;
  let workTimeSec = workSeconds;
  let breakTimeMin = breakMinutes;
  let breakTimeSec = breakSeconds;

  if(workTimeSec === -1){
    workTimeSec = 59;
    workTimeMin -=1; 
  }
  
  breakCount = 0;
  
  let timerFunction = () => {
    // Change display
    document.getElementById('minutes').innerHTML = (workTimeMin < 10 ? '0' : '') + workTimeMin;
    document.getElementById('seconds').innerHTML = (workTimeSec < 10 ? '0' : '') + workTimeSec;
            
    workTimeSec -= 1;

    if (workTimeSec === -1){
      workTimeMin -= 1;
      workTimeSec = 59;
      if (workTimeMin === -1) {
        if(breakCount % 2 === 0) {
          // Start break
          workTimeMin = breakTimeMin;
          workTimeSec = breakTimeSec;
          breakCount++;
  
          // Change panel
          workPanel.classList.remove('active');
          breakPanel.classList.add('active');
        } else{
          // Continue work
          workTimeMin = workMinutes;
          workTimeSec = workSeconds;
          breakCount++;

          // Change panel
          breakPanel.classList.remove('active');
          workPanel.classList.add('active');
        }
      }
    }
  }
  setInterval(timerFunction, 1000); // Seconds argument is in milliseconds
}