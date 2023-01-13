const buttons = document.querySelectorAll('.buttons > .button');
const equation = document.querySelector('.equation');
const answer = document.querySelector('.answer');

let previousInput = '';
let calculation = '';
let decimalPressed = '';

function roundDecimals(number) {
    if(number.toString().indexOf('.') !== -1) {
        if(number.toString().split('.')[1].length > 8) {
            return number.toFixed(8);
        }
    }
    return number;
}

function calculate(num1, operator, num2) {
        num1 = Number(num1);
        num2 = Number(num2);

    if(operator === '+') return num1 + num2;
    if(operator === '-') return num1 - num2;
    if(operator === 'x') return num1 * num2;
    if(operator === '/') {
        if(num2 === 0) {
            return 'ERROR';
        }
        return num1 / num2;
    };
}

function handleCalculation(calculation) {
    calculation = calculation.split(" ");
    const operators = ['/', 'x', '+', '-'];
    let num1;
    let num2;
    let operator;
    let operatorIndex;
    let result;

    for(let i = 0; i < operators.length; i++) {
        while(calculation.includes(operators[i])) {
            operatorIndex = calculation.findIndex(element => element === operators[i]);
            num1 = calculation[operatorIndex-1];
            operator = calculation[operatorIndex];
            num2 = calculation[operatorIndex+1];
            result = calculate(num1, operator, num2);
            calculation.splice(operatorIndex - 1, 3, result);
        }
    }
    return result;
}

buttons.forEach(button => button.addEventListener('click', function(e) {

    const input = e.target;
    const value = input.textContent;
    const inputDisplay = equation.textContent;
    const answerDisplay = answer.textContent;

    if(button.classList.contains('number')) {
        equation.textContent = (previousInput === 'equals') ? value : inputDisplay + value;
        previousInput = 'number';
        calculation += value;
        decimalPressed += value;
    }

    if(button.classList.contains('operator') && previousInput !== 'operator' && previousInput !== 'decimal-point') {
        equation.textContent = (previousInput === 'equals') ? `${answerDisplay} ${value} ` : `${inputDisplay} ${value} `;
        previousInput = 'operator';
        calculation = (previousInput === 'equals') ? `${answerDisplay} ${value} ` : `${inputDisplay} ${value} `;
        decimalPressed = '';
    }

    if(button.classList.contains('decimal-point') && previousInput === 'number') {
        if(!decimalPressed.includes('.')) {
            equation.textContent += value;
            previousInput = 'decimal-point';
            calculation += value;
            decimalPressed += value;
        }
    }

    if(button.classList.contains('delete')) {
        equation.textContent = inputDisplay.slice(0, -1);
        calculation = calculation.slice(0, -1);
        decimalPressed = decimalPressed.slice(0, -1);
    }

    if(button.classList.contains('clear')) {
        previousInput = '';
        calculation = '';
        decimalPressed = '';
        equation.innerHTML = '&nbsp;';
        answer.textContent = 0;
    }

    if(button.classList.contains('equals') && previousInput === 'number' && previousInput !== 'equals') {
        previousInput = 'equals';
        const finalResult = handleCalculation(calculation);

        if (finalResult || finalResult === 0) {
	    	answer.textContent = roundDecimals(finalResult);

    }   else{
            answer.textContent = 'ERROR';
    }
}
}))
