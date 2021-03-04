function Person(firstName, lastName, age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    this.getFullName = function(){
        console.log(`${firstName} ${lastName}`);
    }
}

function Student(firstName, lastName, age, academyName, studentId){
    Object.setPrototypeOf(this, new Person(firstName, lastName, age));

    this.academyName = academyName;
    this.studentId = studentId;

    this.study = function(){
        console.log(`The student ${this.firstName} is studing in the ${this.academyName}`);
    }
    this.getAcademyName = function(){
        console.log(`The student ${this.firstName} is in ${this.academyName}`);
    }
}

let student1 = new Student('John', 'Johnsky', 20, 'SEDC', 1);
let student2 = new Student('Greg', 'Gregsky', 25, 'someAcademy', 2 );

/* Student.prototype.getAcademyName = function(student){
    console.log(student.academyName);
} */

/*  Student.getAcademyName = function(){
    console.log(`The student ${this.firstName} is in ${this.academyName} academy`);
}; */

function DesignStudent(firstName, lastName, age, studentId, isStudentOfTheMonth){
    Object.setPrototypeOf(this, new Student(firstName, lastName, age,"Academy for Design", studentId));

    this.isStudentOfTheMonth = isStudentOfTheMonth;

    this.attendAdobeExam = function(){
        console.log(`The student ${this.firstName} is doing an adobe exam!`);
    }

}

function CodeStudent(firstName,lastName, age, studentId, hasIndividualProject, hasGroupProject){
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, "Academy for Web Development", studentId));

    this.hasIndividualProject = hasIndividualProject;
    this.hasGroupProject = hasGroupProject;

    this.doProject = function(type){
        if(type.toLowerCase() === 'individual'){
            this.hasIndividualProject = true;
            console.log(`The student ${this.firstName} ${this.lastName} is working on the ${type} project!`);
        }else if(type.toLowerCase() === 'group'){
            this.hasGroupProject = true;
            console.log(`The student ${this.firstName} ${this.lastName} is working on the ${type} project!`);
        }else console.log('Invalid type od project!');
    }
}

function NetworkStudent(firstName, lastName, age, studentId, academyPart){
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, "Academy for Communication Networks and Security", studentId));

    this.academyPart = academyPart;

    this.attendCiscoExam = function(){
        console.log(`The student ${this.firstName} is doing a Cisco exam!`);
    }
}

let john = new DesignStudent('John', 'Johnsky', 23, 5, false);
let bob = new CodeStudent('Bob', 'Bobsky', 25, 23, true, false);
let greg = new NetworkStudent('Greg', 'Gregsky', 33, 34, 2);

john.getAcademyName();
bob.getAcademyName();
greg.getAcademyName();


