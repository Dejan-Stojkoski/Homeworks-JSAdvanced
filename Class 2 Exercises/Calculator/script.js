let calculator = document.getElementById("calculator");
let screen = document.getElementById("screen");
let clear = document.getElementById("clear");
let divide = document.getElementById("divide");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let multiply = document.getElementById("multiply");
let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let subtract = document.getElementById("subtract");
let seven = document.getElementById("seven");
let eight = document.getElementById("eight");
let nine = document.getElementById("nine");
let add = document.getElementById("add");
let zero = document.getElementById("zero");
let decimal = document.getElementById("decimal");
let equal = document.getElementById("equal");

//HOLDERS
let firstNumber = "";
let secondNumber = "";
let operator = "";

//FUNCTIONS
function holdFirstNumber (){
    firstNumber = parseFloat(screen.innerHTML);
    screen.innerHTML = "";
}

function equals(x,y){
    if(isNaN(secondNumber)){
        screen.innerHTML = 'Not valid operands';
    }else{
        switch (operator) {
            case '+':
                screen.innerHTML = firstNumber + secondNumber;
                break;
            case '-':
                screen.innerHTML = firstNumber - secondNumber;
                break;
            case '/':
                if(secondNumber === 0){
                    screen.innerHTML = `You can't divide by 0`;
                }else{
                    screen.innerHTML = firstNumber / secondNumber;
                }
                break;
            case '*':
                screen.innerHTML = firstNumber * secondNumber;
                break;
            case '':
                screen.innerHTML = 'ERROR!';
                break;
            default:
                screen.innerHTML = 'ERROR!';
                break;
        }
    }
} //Prints result

//EVENT LISTENERS
one.addEventListener('click', function(){
    screen.innerHTML+= 1;
})
two.addEventListener('click', function(){
    screen.innerHTML+= 2;
})
three.addEventListener('click', function(){
    screen.innerHTML+= 3;
})
four.addEventListener('click', function(){
    screen.innerHTML+= 4;
})
five.addEventListener('click', function(){
    screen.innerHTML+= 5;
})
six.addEventListener('click', function(){
    screen.innerHTML+= 6;
})
seven.addEventListener('click', function(){
    screen.innerHTML+= 7;
})
eight.addEventListener('click', function(){
    screen.innerHTML+= 8;
})
nine.addEventListener('click', function(){
    screen.innerHTML+= 9;
})
zero.addEventListener('click', function(){
    screen.innerHTML+= 0;
})
decimal.addEventListener('click', function(){
    screen.innerHTML += ".";
})

clear.addEventListener('click', function(){
    screen.innerHTML = "";
    firstNumber = 0;
    secondNumber = 0;
})
equal.addEventListener('click', function(){
    secondNumber = parseFloat(screen.innerHTML);
    equals(firstNumber,secondNumber);
})
add.addEventListener('click', function(){
    holdFirstNumber();
    operator = '+';
})
subtract.addEventListener('click', function(){
    if(screen.innerHTML === ""){
        screen.innerHTML = '-';
    }else{
        holdFirstNumber();
        operator = '-';
    }
})
divide.addEventListener('click', function(){
    holdFirstNumber();
    operator = '/';
})
multiply.addEventListener('click', function(){
    holdFirstNumber();
    operator = '*';
})
