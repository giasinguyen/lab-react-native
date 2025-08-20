class User {
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }
}

const user1 = new User("Si");
console.log(`Name Before UPDATE: ${user1.getName()}`)
user1.setName("Gia Si"); 
console.log(`Name After UPDATE: ${user1.getName()}`)