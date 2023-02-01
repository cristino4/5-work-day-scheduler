
///variables
day = dayjs().format('dddd, MMMM DD' )
interval = 1000

//elements
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
textAreaEl = $('')

//initialize script after HTML is loaded
$(function (){
  init()
});

function init(){
  //setup timer to update date constantly
  interval = setInterval(updateDate, interval)
  //setup event listener for the buttons
  $("button").on('click',function(){
    slotID = $(this).parent().attr('id')
    log(`EVENT: click on time slot ${slotID}`)
    storeData(slotID)
  })
  updateClasses()
  getData()

}
//stores data into local storage
function storeData(slotID){
  data = $(`#${slotID}`).children().eq(1)[0].value;
  log(`Storing data: ${data} in key ${slotID}`)
  localStorage.setItem(slotID,data)
}
//retreives data from local storage
function getData(){
  for(let i = 0; i<timeSlots.length; i++){
    key = timeSlots[i].attr('id');
    data = localStorage.getItem(key);
    timeSlots[i].children().eq(1)[0].value = data;
    log(`Retreived data: ${data} in key ${key}`);
  }
}
//updates the date 
function updateDate(){
  dayEl.text(day)
  // updateClasses();
  log(`date and classes updated: ${day}`)
}

//converts the AM/PM hours to 24 hours using the row ID
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
//updates the classes of ALL rows to apply styling
function updateClasses(){
  log(`\nUpdating classes:`)
  for (let i = 0; i<timeSlots.length; i++){
    assignClass(timeSlots[i]);
  }
}
//updates the calss of a SINGLE row to apply styling based on the rules
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