const calcDisplay = document.querySelector('.calc-display');
calcDisplay.textContent = '0'
let decimalOn = false
let decimalBypass = false
let operator = 'inactive'
let contOperate = false
let firstVar = 0
let secondVar = 0
let newNum = 0
let solution = 0

const numBtn = document.querySelectorAll('.num-btn');
numBtn.forEach((numPress) => {
    numPress.addEventListener('click', function (e) {
        if (newNum.toString().length < 9) {
            if (decimalBypass != true) {
                calcDisplay.textContent = newNum.toString();
            }
            decimalBypass = false;
            let num = calcDisplay.textContent + numPress.textContent;
            let noZeroNum = Number(num) * 1;
            newNum = noZeroNum;
            calcDisplay.textContent = newNum.toString();  
        };
    });
});

const clrBtn = document.querySelector('#clear-btn');
clrBtn.onclick = () => {
    calcDisplay.textContent = '0';
    decimalOn = false;
    operator = 'inactive';
    firstVar = 0;
    secondVar = 0;
    newNum = 0;
    solution = 0;
};

const signBtn = document.querySelector('#sign-btn');
signBtn.onclick = () => {
    if (newNum != 0) {
        let num = Number(calcDisplay.textContent);
        newNum = num * -1;
        calcDisplay.textContent = newNum.toString();
    };
};

const percentBtn = document.querySelector('#percent-btn');
percentBtn.onclick = () => {
    let num = Number(calcDisplay.textContent)
    newNum = num / 100;
    newNum = newNum.toFixed(4) * 1;
    calcDisplay.textContent = newNum.toString();
}

const decimalBtn = document.querySelector('#decimal-btn');
decimalBtn.onclick = () => {
    if (decimalOn != true && newNum.toString().length < 9) {
        calcDisplay.textContent = calcDisplay.textContent + '.';
        decimalOn = true;
        decimalBypass = true;
    }
};

const plusBtn = document.querySelector('#plus-btn');
plusBtn.onclick = () => {
    operatorVal();
    operator = 'addition';
};

const minusBtn = document.querySelector('#minus-btn');
minusBtn.onclick = () => {
    operatorVal();
    operator = 'subtraction';
};

const multipyBtn = document.querySelector('#multipy-btn');
multipyBtn.onclick = () => {
    operatorVal();
    operator = 'multiplication';
};

const divideBtn = document.querySelector('#divide-btn');
divideBtn.onclick = () => {
    operatorVal();
    operator = 'division';
};

const equalsBtn = document.querySelector('#equals-btn');
equalsBtn.onclick = () => {
    if (operator != 'inactive'){
        memoryFunc();
        operate();
    };
};

// KEYBOARD SUPPORT

window.addEventListener('keydown', function (e) {
    const keyPress = e.key
    if (onlyNumbers(keyPress) == false) {
        if (newNum.toString().length < 9) {
            if (decimalBypass != true) {
                calcDisplay.textContent = newNum.toString();
            }
            decimalBypass = false;
            let num = calcDisplay.textContent + keyPress;
            let noZeroNum = Number(num) * 1;
            newNum = noZeroNum;
            calcDisplay.textContent = newNum.toString();  
        };
    } else if (keyPress == "+") {
        operatorVal();
        operator = 'addition'
    } else if (keyPress == "-") {
        operatorVal();
        operator = 'subtraction'
    } else if (keyPress == "*") {
        operatorVal();
        operator = 'multiplication'
    } else if (keyPress == "/") {
        operatorVal();
        operator = 'division'
    } else if (keyPress == ".") {
        if (decimalOn != true && newNum.toString().length < 9) {
            calcDisplay.textContent = calcDisplay.textContent + '.';
            decimalOn = true;
            decimalBypass = true;
        }
    } else if (keyPress == "Backspace" || keyPress == "Escape") {
        e.preventDefault();
        calcDisplay.textContent = '0';
        decimalOn = false;
        operator = 'inactive';
        firstVar = 0;
        secondVar = 0;
        newNum = 0;
        solution = 0;
    } else if (keyPress == "%") {
        let num = Number(calcDisplay.textContent)
        newNum = num / 100;
        newNum = newNum.toFixed(4) * 1;
        calcDisplay.textContent = newNum.toString();
    } else if (keyPress == "Tab") {
        e.preventDefault();
        if (newNum != 0) {
            let num = Number(calcDisplay.textContent);
            newNum = num * -1;
            calcDisplay.textContent = newNum.toString();
        };
    } else if (keyPress == "=" || keyPress == "Enter") {
        if (operator != 'inactive'){
            memoryFunc();
            operate();
        };
    };
});


// FUNCTIONS

function memoryFunc() {
    if (firstVar == 0) {
        firstVar = newNum;
        newNum = 0;
    } else if (firstVar != 0 && secondVar == 0) {
        secondVar = newNum;
        newNum = 0;
    } else if (firstVar != 0 && secondVar != 0 && contOperate == false) {
        firstVar = newNum;
        secondVar = 0;
        newNum = 0;
    } else if (firstVar != 0 && secondVar != 0 && contOperate == true) {
        firstVar = newNum;
        newNum = 0;
    };
};

function operatorVal() {
    contOperate = false
    memoryFunc()
    if (firstVar != 0 && secondVar != 0) {
        operate();
        firstVar = newNum;
        secondVar = 0;
        newNum = 0;
    };
};

function operate() {
    if (operator == 'addition') {
        solution = firstVar + secondVar;
    } else if (operator == 'subtraction') {
        solution = firstVar - secondVar;
    } else if (operator == 'multiplication') {
        solution = firstVar * secondVar;
    } else if (operator == 'division') {
        solution = firstVar / secondVar;
    }
    printSolution();
    
};

function printSolution() {
    if (solution > 999999999) {
        calcDisplay.textContent = 'NaN'
    } else {
        contOperate = true;
        newNum = solution.toFixed(4) * 1;
        calcDisplay.textContent = newNum.toString();
    }  
};

function onlyNumbers(str) {
    return /[^0-9]/g.test(str);
}