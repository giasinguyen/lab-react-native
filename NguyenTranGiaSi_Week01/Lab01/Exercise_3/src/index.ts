class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayCarInfo(): void{
        console.log(`[Car Info] Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`)
    }
}

 const car1 = new Car("Vinfast", "A", 2024);
    car1.displayCarInfo();