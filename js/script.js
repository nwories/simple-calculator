const display = document.querySelector('.display');
const calculatorSwitch = document.querySelector('.switch');
const switchON = document.querySelector('.switch-on');
const switchOFF = document.querySelector('.switch-off');
const numberBtn = document.querySelectorAll('.number-btn');
const allClearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const evaluateButton = document.querySelector('.equal-btn');
const displayTime = document.querySelector('.display-time');

// Using event listener to switch OFF/ON the calculator
calculatorSwitch.addEventListener('click', () => {
    if(switchON.classList.contains('check')) {
        switchON.style.display = 'none'
        switchOFF.style.display = 'block'
        switchON.classList.remove('check')
        display.style.backgroundColor = '#000000'
        display.style.borderColor = '#000000'
        clearScreen()
    } else {
        switchON.style.display = 'block'
        switchOFF.style.display = 'none'
        switchON.classList.add('check')
        display.style.backgroundColor = '#d5e3e4'
    }
});

// clock
setInterval(() => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    const amORpm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;  // set the hour to 12 once hours = 0
    hours = String(hours).padStart(2, '0');

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    

    const timeData = `${hours}:${minutes}${amORpm}`;
    displayTime.textContent = timeData;
},1000);

// setting the display value as an empty variable for easy reassigning of values and task performance
let displayValue = ''

// function to clear all screen
const clearScreen = () => {
    displayValue = ''
    display.value = displayValue
};


// clear all screen
allClearButton.addEventListener('click', clearScreen);
// delete single data from the screen
deleteButton.addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1)
    display.value = displayValue
});

// function to insert numbers
const insertData = (data) => {
    if(data === `*`) {
        displayValue += `\u00d7`
    } else if(data === `/`) {
        displayValue += `\u00f7`
    } else {
        displayValue += data
    }
    display.value = displayValue
};

// function to evaluate
const evaluate = () => {
    try {
    let expression = displayValue.replace(`\u00d7`, `*`).replace(`\u00f7`, `/`)    
    let result = eval(expression);
    display.value = result;
    displayValue = result.toString();
} catch (error) {
    display.value = 'Error';
    displayValue = '';
}
};
evaluateButton.addEventListener('click', evaluate)