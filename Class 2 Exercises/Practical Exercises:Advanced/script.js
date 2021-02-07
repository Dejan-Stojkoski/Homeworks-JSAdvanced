//Task 1
//Write a JavaScript program to check whether a matrix is a diagonal matrix or not.
//In linear algebra, a diagonal matrix is a matrix in which the entries outside
//the main diagonal are all zero (the diagonal from the upper left to the lower right).
//Hint: Matrix == 2 dimensional array(array of arrays)

matrix1 = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
];
matrix2 = [
    [1,0,0,0],
    [1,1,0,0],
    [0,0,0,1],
    [1,0,0,1]
];
matrix3 = [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0]
];

function checkIfDiagonal(x){
    for(let i=0; i<x.length; i++){
        for(let j=0; j<x.length; j++){
            if((i !== j) && (x[i][j] !== 0)){
                return false;
            }
        }
    }
    return true;
}

//Task 2
//Write a JavaScript program to remove duplicate items from an array

let array = ['dejan', 2, 3, 'dejan', 4, true, 2, false];

function cleanArray(x){
    for(let i=0; i<x.length; i++){
        for(let j=i+1; j<x.length; j++){
            if(x[i] === x[j]){
                x.splice(j,1);
            }
        }
    }
    return x;
}

////Task 3
//Write a JavaScript program which accept a number as input and insert dashes (-) between
//each two even numbers. For example if you accept 025468 the output should be 0-254-6-8.
let taskThreeNumber = document.getElementById("taskThreeNumber");
let taskThreeBtn = document.getElementById("taskThreeBtn");

taskThreeBtn.addEventListener('click', function(){
    let temp = taskThreeNumber.value;
    let result = '';
    for(let i=0; i<temp.length; i++){
        if(temp[i]%2 === 0 && temp[i+1]%2 === 0){
            result += temp[i] + '-';
        }else{
            result += temp[i];
        }
    }
    console.log(result);
})

//Task 4
//Write a JavaScript program which prints the elements of the following array. Note: Use nested for loops.
//Sample array: var a = [[1, 2], [8, 11], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];
let printArray = document.getElementById("printArray");
let a = [
    [1,2],
    [8,11],
    [7,0,7,27],
    [7,4,28,14],
    [3,10,26,7]
];

function printNestedArray(x){
    for(let i=0; i<x.length; i++){
        for(let j=0; j<x.length; j++){
            printArray.innerHTML += `[${x[i]}] <br>`;
            break;
        }
    }
}

//Task 5
//Find all the palindroms in the array. A palindrom is a word that is equal to the reversed word. Ex : "Ana" , "Bob" "boob"
let palindromArray = ['greg', 'ana', 'jill', 'bob', 'boob'];

function findPalindrom(x){
    let result = [];
    for(let i=0; i<x.length; i++){
        let temp='';
        for(let j=x[i].length-1; j>=0; j--){
            temp+=x[i][j];
        }
        if(x[i] === temp){
            result.push(x[i]);
        }
    }
    return result;
}

//Task 6
//Create a new array that the elements are the lenghts of the elements in the previous array.
let sampleArray = ['greg', 'bob', 'jill', 'mallory'];

function createString(x){
    let temp = '';
    let i=0;
    while(x>i){
        temp+='d';
        i++;
    }
    return temp;
}

function createArrayWithSameLength(x){
    let newArray = [];
    for(let i=0; i<x.length; i++){
        let temp = createString(x[i].length);
        newArray.push(temp);
    }
    return newArray;
}

//Task FizzBuzz
//Part 1
//Create a function that will take a number as parameter and print in console all the numbers to that number.
//number divisible by 3 print Fizz
//number divisible by 5 print Buzz
//number divisible by 3 and divisible by 5 print FizzBuzz
//Part 2
//Add input in the HTML and a button. On click of the button print the values up to the entered number.
let fizzBuzzButton = document.getElementById("fizzBuzzButton");
let fizzBuzzInput = document.getElementById("fizzBuzzInput");
let fizzBuzzPrint = document.getElementById("fizzBuzzPrint");

function fizzBuzz(x){
    let numbers = [];
    let number = x;
    let temp = 0;
    for(let i=0; i<x.length; i++){
        temp = parseInt(number)%10;
        number/=10;
        numbers.unshift(temp);
    }
    fizzBuzzPrint.innerHTML += `<br>`;
    for(let i=0; i<numbers.length; i++){
        fizzBuzzPrint.innerHTML += `${numbers[i]} `;
    }
    if(x%3 === 0 && x%5 ===0){
        fizzBuzzPrint.innerHTML += ` - FizzBuzz!`;
    }else if(x%5 === 0){
        fizzBuzzPrint.innerHTML += ` - Buzz!`;
    }else if(x%3 === 0){
        fizzBuzzPrint.innerHTML += ` -Fizz!`;
    }
}

fizzBuzzButton.addEventListener('click', function(){
    fizzBuzz(fizzBuzzInput.value);
    fizzBuzzInput.value ="";
})

//TASK Coin Denomination
//Given these coin denominations: 1¢, 5¢, 10¢, 20¢, 50¢, find the smallest number of coins needed for a given amount
//Example 1: For 375 cents, 9 coins are needed
//Example 2: For 543 cents, 15 coins are needed
//bonus1 - Make the finite amount for each coin
//bonus2 - Make a report how many coins of each kind were used to return a change
//bonus3 - Make an UI :)
let coinDenominationInput = document.getElementById("coinDenominationInput");
let coinDenominationBtn = document.getElementById("coinDenominationBtn");
let coinDenominationResult = document.getElementById("coinDenominationResult");

function coinDenomination(x){
    let coins = [
        [50,3],
        [20,2],
        [10,20],
        [5,6],
        [1,50]
    ];
    let toReturn =[];
    let temp = parseInt(x);
    let coinsNumber = 0;
    let count = 0;

    for(let i=0; i<coins.length; i++){
        if(coins[i][0] > 0){
            if((temp/coins[i][0]) <= coins[i][1]){
                coinsNumber = temp/coins[i][0];
                toReturn.push(parseInt(coinsNumber));
                parseInt(temp%=coins[i][0]);
            }else{
                let tempAmount = 0;
                toReturn.push(coins[i][1]);
                tempAmount = (coins[i][0] * coins[i][1]);
                temp-=tempAmount;
            }
        }
    }
    coinDenominationResult.innerHTML = "";
    for(let i=0; i<toReturn.length; i++){
        coinDenominationResult.innerHTML += `${coins[i][0]}:${toReturn[i]}<br> `;
        count += parseInt(toReturn[i]);
    }
    coinDenominationResult.innerHTML += `\n<p style="background: #a0cd88; color: #6b9b51;">Total coins needed: ${count}</p>`;
}

coinDenominationBtn.addEventListener('click', function(){
    coinDenomination(coinDenominationInput.value);
    coinDenominationInput.value ="";
})

//TASK Number Checker
//Part 1
//Write a function that will give stats about an integer number.
//The function should return an object with the stats as properties. The stats required are:

//1. Whats the value of the number (value property)
//2. How many digits the number has (numDigits property)
//3. Is the number odd or even (isEven property)
//4. Is the number positive (isPositive property)
//Part 2
//Write user interface for the number checker. It should include an entry field for the number as well as a
//button to trigger the calculation. After the calculation, and appropriate response should be shown on the page.
let numberCheckerInput = document.getElementById("numberCheckerInput");
let numberCheckerBtn = document.getElementById("numberCheckerBtn");
let numberCheckerResults = document.getElementById("numberCheckerResults");

function Integer (value, numDigits, isEven, isPositive){
    this.value = value;
    this.numDigits = numDigits;
    this.isEven = isEven;
    this.isPositive = isPositive;
}//Integer Constuctor

function numDigits(x){
    if(x<0){
        x*=-1;
    }
    return x.toString().length;
}

function isEven(x){
    if(x%2 === 0){
        return true;
    }else{return false;}
}

function isPositive(x){
    if(x>=0){
        return true;
    }else{return false;}
}

function printIntegerStats(x){
    numberCheckerResults.innerText = "";
    numberCheckerResults.innerHTML +=
    `<table>
        <tr><th>Stats for ${x.value}</th></tr>
        <tr><td>Value:</td><td>${x.value}</td></tr>
        <tr><td>Number of digits:</td><td>${x.numDigits}</td></tr>
        <tr><td>Even number:</td><td>${x.isEven}</td></tr>
        <tr><td>Positive number:</td><td>${x.isPositive}</td></tr>
    </table>`;
}//Prints table with results

function numberChecker(x){
    let number = parseInt(x);
    let result = new Integer(number, numDigits(number), isEven(number), isPositive(number));
    printIntegerStats(result);
}

numberCheckerBtn.addEventListener('click', function(){
    numberChecker(numberCheckerInput.value);
    numberCheckerInput.value = "";
})




