let calculatorInput = $("#calculatorInput");
let btn = $("#btn");
let display = $("#display");



//FUNCTIONS
function checkNumberValue(number){
    temp = '';
    switch (number) {
        case 1:
            temp = 'one';
            break;
        case 2:
            temp = 'two';
            break;
        case 3:
            temp = 'three';
            break;
        case 4:
            temp = 'four';
            break;
        case 5:
            temp = 'five';
            break;
        case 6:
            temp = 'six';
            break;
        case 7:
            temp = 'seven';
            break;
        case 8:
            temp = 'eight';
            break;
        case 9:
            temp = 'nine';
            break;
        case 10:
            temp = 'ten';
            break;
        case 11:
            temp = 'eleven';
            break;
        case 12:
            temp = 'twelve';
            break;
        case 13:
            temp = 'thirteen';
            break;
        case 14:
            temp = 'fourteen';
            break;
        case 15:
            temp = 'fifteen';
            break;
        case 16:
            temp = 'sixteen';
            break;
        case 17:
            temp = 'seventeen';
            break;
        case 18:
            temp = 'eighteen';
            break;
        case 19:
            temp = 'nineteen';
            break;
        case 20:
            temp = 'twenty';
            break;
        case 30:
            temp = 'thirty';
            break;
        case 40:
            temp = 'fourty';
            break;
        case 50:
            temp = 'fifty';
            break;
        case 60:
            temp = 'sixty';
            break;
        case 70:
            temp = 'seventy';
            break;
        case 80:
            temp = 'eighty';
            break;
        case 90:
            temp = 'ninety';
            break;
        default:
            temp = ' '
            break;
    }
    return temp;
}//Finds the name

function separateDigits(number){
    let array = [];
    for(const digit of number){
        array.push(parseInt(digit));
    }
    return array;
}//Returns an array with all the digits of a number

separateDigits('-1')

function lengthOne(display,number){
    display.append(`${checkNumberValue(parseInt(number))}`);
}//One Digit Number

function lengthTwo(display,number){
    if(number[0]>=2){
        let temp = separateDigits(number);
        temp[0]*=10;
        if(temp[1] !== 0){
            display.append(`
            ${checkNumberValue(temp[0])}-${checkNumberValue(temp[1])}`);
        }else{
            display.append(`${checkNumberValue(temp[0])}`);
        }
    }else{
        number[0]*=10;
        number[0]+=number[1];
        lengthOne(display,number);
    }
}//Two Digits Number

function lengthThree(display, number){
    if(number[0] === 0){
        number.splice(0,1);
        lengthTwo(display, number);
    }else{
        let temp = separateDigits(number);
        display.append(`${checkNumberValue(temp[0])} hundred `);
        temp.splice(0,1);
        lengthTwo(display, temp);
    }
}//Hundred

function lengthFourFiveSix (display, number){
    if(number[0] === 0){
        number.splice(0,1);
        if(number.length<=3){
            lengthThree(display, number)
        }else{
            lengthFourFiveSix(display, number);
        }
    }else{
        let temp = separateDigits(number);
        switch (number.length) {
            case 4:
                display.append(`${checkNumberValue(temp[0])} thousand `);
                temp.splice(0,1);
                lengthThree(display, temp);
                break;
            case 5:
                let twoDigits = [temp[0], temp[1]];
                lengthTwo(display,twoDigits);
                temp.splice(0,2);
                display.append(` thousand `);
                lengthThree(display, temp);
                break;
            case 6:
                let threeDigits = [temp[0], temp[1], temp[2]];
                lengthThree(display,threeDigits);
                temp.splice(0,3);
                display.append(` thousand `);
                lengthThree(display,temp);
                break;
            default:
                display.append('');
                break;
        }
    }
}//Thousand

function lengthSevenEightNine(display, number){
    if(number[0] === 0){
        number.splice(0,1);
        if(number.length<=3){
            lengthThree(display, number)
        }else if(number.length<=6){
            lengthFourFiveSix(display, number);
        }else{
            lengthSevenEightNine(display,number);
        }
    }else{
        let temp = separateDigits(number);
        switch (number.length) {
            case 7:
                display.append(`${checkNumberValue(temp[0])} milion `);
                temp.splice(0,1);
                lengthFourFiveSix(display,temp);
                break;
            case 8:
                let twoDigits = [temp[0], temp[1]];
                lengthTwo(display, twoDigits);
                temp.splice(0,2);
                display.append(` milion `);
                lengthFourFiveSix(display, temp);
                break;
            case 9:
                let threeDigits = [temp[0], temp[1], temp[2]];
                lengthThree(display, threeDigits);
                temp.splice(0,3);
                display.append(` milion `);
                lengthFourFiveSix(display, temp);
                break;
            default:
                display.append('');
                break;
        }
    }
}//Milion

function lengthTenElevenTwelve(display, number){
    if(number[0] === 0){
        number.splice(0,1);
        if(number.length<=3){
            lengthThree(display, number)
        }else if(number.length<=6){
            lengthFourFiveSix(display, number);
        }else if(number.length<=9){
            lengthSevenEightNine(display,number);
        }else{
            lengthTenElevenTwelve(display,number);
        }
    }else{
        let temp = separateDigits(number);
        switch (number.length) {
            case 10:
                display.append(`${checkNumberValue(temp[0])} bilion `);
                temp.splice(0,1);
                lengthSevenEightNine(display,temp);
                break;
            case 11:
                let twoDigits = [temp[0], temp[1]];
                lengthTwo(display, twoDigits);
                temp.splice(0,2);
                display.append(` bilion `);
                lengthSevenEightNine(display, temp);
                break;
            case 12:
                let threeDigits = [temp[0], temp[1], temp[2]];
                lengthThree(display, threeDigits);
                temp.splice(0,3);
                display.append(` bilion `);
                lengthSevenEightNine(display, temp);
                break;
            default:
                display.append('');
                break;
        }
    }
}//Bilion

function lengthThirteenFourteenFifteen(display, number){
    if(number[0] === 0){
        number.splice(0,1);
        if(number.length<=3){
            lengthThree(display, number)
        }else if(number.length<=6){
            lengthFourFiveSix(display, number);
        }else if(number.length<=9){
            lengthSevenEightNine(display,number);
        }else if(number.length<=12){
            lengthTenElevenTwelve(display,number);
        }else{
            lengthThirteenFourteenFifteen(display, number);
        }
    }else{
        let temp = separateDigits(number);
        switch (number.length) {
            case 13:
                display.append(`${checkNumberValue(temp[0])} trilion `);
                temp.splice(0,1);
                lengthTenElevenTwelve(display,temp);
                break;
            case 14:
                let twoDigits = [temp[0], temp[1]];
                lengthTwo(display, twoDigits);
                temp.splice(0,2);
                display.append(` trilion `);
                lengthTenElevenTwelve(display, temp);
                break;
            case 15:
                let threeDigits = [temp[0], temp[1], temp[2]];
                lengthThree(display, threeDigits);
                temp.splice(0,3);
                display.append(` trilion `);
                lengthTenElevenTwelve(display, temp);
                break;
            default:
                display.append('');
                break;
        }
    }
}//Trilion

function findRange(display, number){
    if(number<0){
        display.css("color", "#b85454")
        //display.append('The number is negative');
    }else if(parseInt(number) === 0){
        display.append('zero');
    }else if(number.length === 1){
        lengthOne(display, number);
    }else if(number.length === 2){
        lengthTwo(display, number);
    }else if(number.length === 3){
        lengthThree(display, number)
    }else if(number.length<=6 && number.length>=4){
        lengthFourFiveSix(display, number);
    }else if(number.length<=9 && number.length>=7){
        lengthSevenEightNine(display, number);
    }else if(number.length<=12 && number.length>=10){
        lengthTenElevenTwelve(display, number);
    }else if(number.length<=15 && number.length>=13){
        lengthThirteenFourteenFifteen(display,number);
    }else{
        display.css("color", "#b85454");
        display.append('The number is bigger than 999 999 999 999 999 (999+ trilion), or the input is not a valid number!');
    }
}//Finds The Range Ands Prints Results



//EVENT LISTENERS
$(document).ready(function(){
    $("#note").html(`<p>NUMBER TO WORDS CONVERTER<br>
    *You can use only positive numbers, up to 999 trilion*</p>`)
})

btn.click(function(){
    display.html("");
    display.css("color", "#89939e");
    findRange(display,calculatorInput.val());
})