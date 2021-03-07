class Animal{
    constructor(name, age, type, size){
        this.name = name;
        this.age = age;
        this.type = type;
        this.size = size;
        this.isEaten = false;
    }

    eat(animal){
        if(animal instanceof Animal){
            if(this.type.toLowerCase() === 'herbivore') console.log(`The animal ${this.name} is a herbivore and does not eat other animals`);
            else{
                if(this.size*2 <= animal.size) console.log(`The animal ${this.name} tried to eat ${animal.name} but it was too large.`);
                else{
                    animal.isEaten = true;
                    console.log(`The animal ${this.name} ate the animal ${animal.name}`);
                }
            }
        }else console.log(`The animal ${this.name} is eating ${animal}...`);
    }
    static getType(animal){
        if(animal instanceof Animal) console.log(`The animal ${animal.name} is a ${animal.type} type of animal!`);
        else console.log(`Unknown type of animal!`);
    }
}

class Carnivore extends Animal{
    constructor(name, age, size){
        super(name, age, 'carnivore', size);
    }
}

class Herbivore extends Animal{
    constructor(name, age, size){
        super(name, age, 'herbivore', size);
    }
}

class Omnivore extends Animal{
    constructor(name, age, size){
        super(name, age, 'omnivore', size);
    }
}

let lion = new Carnivore('Simba', 5, 500);
let zebra = new Herbivore('Marty', 10, 200);
let bear = new Omnivore('Beary', 1, 200);
let food = 'Carrots';

lion.eat(zebra);
zebra.eat(lion);
zebra.eat(food);
bear.eat(lion);
bear.eat(zebra);
bear.eat(food);

Animal.getType(lion);
Animal.getType(zebra);
Animal.getType(food);

