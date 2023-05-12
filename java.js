const calcDisplay = document.querySelector('.calc-display');
calcDisplay.textContent = '0'
let decimalOn = false
let decimalBypass = false
let operator = 'inactive'
let firstVar = 0
let secondVar = 0
let newNum = 0
let solution = 0

const numBtn = document.querySelectorAll('.num-btn');
numBtn.forEach((numPress) => {
    numPress.addEventListener('click', function (e) {
    if (decimalBypass == true) {
        decimalBypass == false
    } else if (decimalBypass == false) {
        calcDisplay.textContent = newNum.toString();
    }
    let num = calcDisplay.textContent + numPress.textContent;
    let noZeroNum = removeLeadingZeros(num);
    newNum = Number(noZeroNum)
    calcDisplay.textContent = newNum.toString();   
  });
});

const clrBtn = document.querySelector('#clear-btn');
clrBtn.onclick = () => {
    calcDisplay.textContent = '0'
    decimalOn = false
    operator = 'inactive'
    firstVar = 0
    secondVar = 0
    newNum = 0
    solution = 0
};

const signBtn = document.querySelector('#sign-btn');
signBtn.onclick = () => {
    let num = Number(calcDisplay.textContent)
    newNum = num * -1
    calcDisplay.textContent = newNum.toString();
}

const percentBtn = document.querySelector('#percent-btn');
percentBtn.onclick = () => {
    let num = Number(calcDisplay.textContent)
    newNum = num / 100
    calcDisplay.textContent = newNum.toString();
}

const decimalBtn = document.querySelector('#decimal-btn');
decimalBtn.onclick = () => {
    if (decimalOn != true) {
        calcDisplay.textContent = calcDisplay.textContent + '.'
        decimalOn = true
        decimalBypass = true
    }
};

const plusBtn = document.querySelector('#plus-btn');
plusBtn.onclick = () => {
    operator = 'addition'
    memoryFunc()
};

const equalsBtn = document.querySelector('#equals-btn');
equalsBtn.onclick = () => memoryFunc();

function memoryFunc() {
    if (firstVar == 0) {
        firstVar = newNum;
        newNum = 0
    } else if (firstVar != 0 && secondVar == 0) {
        secondVar = newNum;
        newNum = 0
        operate()
    } else if (firstVar != 0 && secondVar != 0) {
        firstVar = newNum;
        operate()
    }
}

function operate() {
    if (operator = 'addition') {
        solution = firstVar + secondVar
    } else if (operator = 'subtraction') {
        solution = firstVar - secondVar
    } else if (operator = 'multiplication') {
        solution = firstVar * secondVar
    } else if (operator = 'division') {
        solution = firstVar / secondVar
    }
    newNum = solution
    calcDisplay.textContent = newNum.toString();
}



function removeLeadingZeros(num) {
    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) != '0') {
            let res = num.substr(i);
            return res;
        }
    }
    return "0";
}
