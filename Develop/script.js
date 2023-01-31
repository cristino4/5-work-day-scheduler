// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

day = dayjs().format('dddd, MMMM DD' )
interval = 1000

slotContainer = $('.container-fluid')
hr9El = $('#hour-9');
hr10El = $('#hour-10');
hr11El = $('#hour-11');
hr12El = $('#hour-12');
hr1El = $('#hour-1');
hr2El = $('#hour-2');
hr3El = $('#hour-3');
hr4El = $('#hour-4');
hr5El = $('#hour-5');
dayEl = $('#currentDay')
timeSlots = [hr9El,hr10El,hr11El,hr12El,hr1El,hr2El,hr3El,hr4El,hr5El];

function init(){
//setup timer to update date constantly
interval = setInterval(updateDate, interval)
}


$(function (){
  init()
  updateClasses()
});


function updateDate(){
  dayEl.text(day)
  log(`date updated: ${day}`)
}



function updateClasses(){
  log(`\nUpdating classes:`)
  for (let i = 0; i<timeSlots.length; i++){
    assignClass(timeSlots[i]);
  }
}

function convert12To24(timeSlotID){
  log(`\nconverting 12 to 24 hrs with ID: ${timeSlotID}`)
  if(timeSlotID === 'hour-9'){
    return 9;
  } else if (timeSlotID ==='hour-10'){
    return 10
  } else if (timeSlotID === 'hour-11'){
    return 11
  } else if (timeSlotID === 'hour-12'){
    return 12
  } else if (timeSlotID === 'hour-1'){
    return 13
  } else if (timeSlotID === 'hour-2'){
    return 14
  } else if (timeSlotID === 'hour-3'){
    return 15
  } else if (timeSlotID === 'hour-4'){
    return 16
  } else if (timeSlotID === 'hour-5'){
    return 17
  } 
}

function assignClass(slotElement){
  pastClass = 'row time-block past';
  presentClass = 'row time-block present';
  futureClass = 'row time-block future'
  assignedClass = ''
  timeSlotID = slotElement.attr('id')
  hour = dayjs().format('HH')
  slotHour = convert12To24(timeSlotID);
  currentClass = slotElement.attr('class');

  if(slotHour < hour){
    slotElement.removeClass(currentClass);
    slotElement.addClass(pastClass);
    assignedClass = pastClass;
  }
  if(slotHour > hour ){
    slotElement.removeClass(currentClass);
    slotElement.addClass(futureClass);
    assignedClass = futureClass;
  }
  if(slotHour == hour ){
    slotElement.removeClass(currentClass);
    slotElement.addClass(presentClass);
    assignedClass = presentClass;
  }
  log(`\nclass assigned: ${assignedClass} to element ${slotElement.attr('id')}
  \nParameters: hour ${hour} slotHour ${slotHour} currentClass ${currentClass}`)
}

//************UTILITIES*************
function log(message){
  console.log(message)
}