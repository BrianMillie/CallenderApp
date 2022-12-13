// place todays date near top using moment

var currentDay = document.getElementById('currentDay');
var container = $('#container')[0];
var currentDayMoment = moment().format('MMMM Do YYYY');
currentDay.innerText = currentDayMoment
var cont = [];
var timer = ''
var clock = ''
var loaded = document.getElementById('loadConfirmed');
// pull any data from local storage or an empty array if there is none
loaded.innerText = ""
var newLoad = JSON.parse(localStorage.getItem('newLoad')) || [];
// create 9 containers with times input box and save button
for (var i = 9; i < 18; i++) {
    //create time in moment excepted format for each hour
    timer = (i + ':00')
    //create the moment
    formatted = (moment(timer, 'h:mm').format('LT'));
    //add container for times inner text to be the moment
    cont[i] = document.createElement('container');
    cont[i].id = ('container' + i);
    cont[i].className += 'contain';
    cont[i].innertext = (moment(timer, 'h:mm').format('LT'));
    container.appendChild(cont[i]);
    document.getElementById(cont[i].id).innerText = formatted
    // add container for text area next to the time element
    cont[i] = document.createElement('textarea');
    cont[i].id = ('conttextarea' + i);
    cont[i].className += 'texta';
    container.appendChild(cont[i]);
    document.getElementById(cont[i].id).innerText = (newLoad[i - 9]) || ""
    // based on the time element value and actual time colour code the boxes of the text inputs
    checktimeOne = moment(timer, 'H:00').hours()
    checktimeTwo = moment().hours()
    console.log(checktimeOne, checktimeTwo)
    if (checktimeOne === checktimeTwo) {

        cont[i].className += 'currentHour'
    } else if (checktimeOne > checktimeTwo) {
        cont[i].className += 'hourPassed'
    } else {
        cont[i].className += 'futureHour'
    }
    // add the buttons next to the input boxes with a description
    cont[i] = document.createElement('button');
    cont[i].id = ('button' + i);
    cont[i].className += 'buttona';
    cont[i].innerText = ('Save your item')
    container.appendChild(cont[i]);
    document.getElementById('button' + i).innertext = ('Save your item')
}
//Add an event listener for each item in the buttona class
document.querySelectorAll('.buttona').forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation
        //set an array of values based on whats in the content areas
        var finalValues = [
            document.getElementById('conttextarea9').value,
            document.getElementById('conttextarea10').value,
            document.getElementById('conttextarea11').value,
            document.getElementById('conttextarea12').value,
            document.getElementById('conttextarea13').value,
            document.getElementById('conttextarea14').value,
            document.getElementById('conttextarea15').value,
            document.getElementById('conttextarea16').value,
            document.getElementById('conttextarea17').value,
        ]
        // replace the local storage with the old already input value and the new entries
        newLoad = (finalValues)
        localStorage.setItem('newLoad', JSON.stringify(newLoad))
        //place a notification the local storage is updated that stays onscreen for 2 seconds then goes blank
        loaded.innerText = "Appointment added to local storage"
        setTimeout(() => {
            loaded.innerText = ""
        }, 2000);
    })
})
