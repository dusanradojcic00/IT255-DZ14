export class Room {
    name: string;
    description: string;
    price: number;
    image: string;
    score: number;
    constructor(name: string, description: string, price: number, image: string, score: number){
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.score = score;
    }


}