class Book {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number){
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayInfo(): void {
        console.log(`[Book Info] Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`)
    }
}

const book1 = new Book("Book Test", "Tac Gia", 2000);
book1.displayInfo();