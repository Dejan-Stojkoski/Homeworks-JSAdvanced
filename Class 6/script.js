let display = document.getElementById("display");
let gradeHigher3 = document.getElementById("gradeHigher3");
let femaleWithGrade5 = document.getElementById("femaleWithGrade5");
let maleSkoje18 = document.getElementById("maleSkoje18");
let femaleOver24 = document.getElementById("femaleOver24");
let maleOver2StartsB = document.getElementById("maleOver2StartsB");

fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
.then(function(response){
    return response.json();
}).then(function(response){
    gradeHigher3.addEventListener('click',function(){
        displayResults(studentsWithAverageHigherThan3(response), display, gradeHigher3);
    });
    femaleWithGrade5.addEventListener('click',function(){
        displayResults(femaleStudentsWithAverage5(response), display, femaleWithGrade5);
    });
    maleSkoje18.addEventListener('click',function(){
        displayResults(maleWhoLiveInSkopjeOver18(response), display, maleSkoje18);
    });
    femaleOver24.addEventListener('click',function(){
        displayResults(averageGradeOfFemalesOver24(response), display, femaleOver24);
    });
    maleOver2StartsB.addEventListener('click',function(){
        displayResults(maleWithNameBAndGradeOver2(response), display, maleOver2StartsB);
    });
});

function studentsWithAverageHigherThan3(students){
    let averageGradeHigherThan3 = students
    .filter(student=> student.averageGrade>3)
    .map((student,index) => `${index+1}. ${student.firstName} ${student.lastName}`);
    return averageGradeHigherThan3;
}

function femaleStudentsWithAverage5(students){
    let femaleWhithAverage5 = students
    .filter(student=> student.gender.toLowerCase() === 'female' && student.averageGrade === 5)
    .map((student, index)=> `${index+1}, ${student.firstName} ${student.lastName}`);
    return femaleWhithAverage5;
}

function maleWhoLiveInSkopjeOver18(students){
    let skopjeMalesOver18 = students
    .filter(student=> student.gender.toLowerCase() === 'male' && student.city.toLowerCase() === 'skopje' && student.age > 18)
    .map((student, index)=> `${index+1}. ${student.firstName} ${student.lastName}`);
    return skopjeMalesOver18;
}

function averageGradeOfFemalesOver24(students){
    let femalesOver24Grades = students
    .filter(student=> student.gender.toLowerCase() === 'female' && student.age > 24)
    .map((student, index)=> `${index+1}. ${student.firstName} ${student.lastName} -  Average Grade: ${student.averageGrade}`);
    return femalesOver24Grades;
}

function maleWithNameBAndGradeOver2(students){
    let malesThatStartWithBGradeOver2 = students
    .filter(student=> student.gender.toLowerCase() === 'male' && student.averageGrade>2 && student.firstName[0] === 'B')
    .map((student, index)=> `${index+1}. ${student.firstName} ${student.lastName}`);
    return malesThatStartWithBGradeOver2;
}

function displayResults(students, display, btn){
    display.innerHTML = "";
    display.innerHTML += `
    <b>${btn.innerText} :</b>
    <ul>`;
    students.forEach(student => display.innerHTML+= `<li style="list-style-type: none;">${student}</li>`);
}





