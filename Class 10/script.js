function Academy(name, students, subjects, start, end){
    this.name = name;
    this.students = students;
    this.subjects = subjects;
    this.start = start;
    this.end = end;
    this.numberOfClasses = this.subjects.length *10;
    this.printStudents = function(){
        this.students.forEach(student => {
            console.log(`${student.firstName} ${student.lastName}`);
        });
    }
    this.printSubjects = function(){
        this.subjects.forEach(subject => {
            console.log(subject.title);
        });
    }
}

function Subject(title, isElective, academy, students){
    this.title = title;
    this.numberOfClasses = 10;
    this.isElective = isElective;
    this.academy = academy;
    this.students = students;
    this.overrideClasses = function(number){
        if(number<3) return;
        else this.numberOfClasses = number;
    }
}

function Student(firstName, lastName, age){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = [];
    this.academy = null;
    this.currentSubject = null;
    this.startAcademy = function(academyObject){
        this.academy = academyObject;
        academyObject.students.push({firstName,lastName,age});
    }
    this.startSubject = function(subject){
        if(this.academy === null) return;
        else{
            this.academy.subjects.forEach(sub => {
                if(sub.title.toLowerCase() === subject.title.toLowerCase()){
                    if(this.currentSubject !== null) this.completedSubjects.push(this.currentSubject);
                    this.currentSubject = subject;
                    subject.students.push({firstName,lastName,age});
                }
            });
            if(this.currentSubject === null) console.log('This is not a valid subject!');
        }
    }
}


