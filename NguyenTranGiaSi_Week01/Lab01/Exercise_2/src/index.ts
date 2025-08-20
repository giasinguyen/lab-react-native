class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

class Student extends Person{
    grade: string;

    constructor(name: string, age: number, grade: string){
        super(name, age);
        this.grade = grade;
    }

    displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`)
    }

}

const person1 = new Person("Gia Si", 20);
person1.displayInfo(); 

const person2 = new Student("Gia Si", 20, "A");
person2.displayInfo(); 
