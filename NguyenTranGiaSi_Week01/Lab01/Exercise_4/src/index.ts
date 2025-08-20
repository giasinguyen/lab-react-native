class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    perimeterOfRectangle(width: number, height: number): number{
        return (width + height) * 2;
    }

    acreageOfRectangle(width: number, height: number): number{
        return width * height;
    }
    
}


let width: number = 10;
let height: number = 20;

let rect = new Rectangle(width, height);

console.log(`Perimeter of Rectangle: ${rect.perimeterOfRectangle(width, height)}`);
console.log(`Area of Rectangle: ${rect.acreageOfRectangle(width, height)}`);


