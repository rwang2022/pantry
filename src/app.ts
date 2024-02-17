class ingredient {
    amount: number = 0; 
    dateAdded: Date;
    
    constructor(amount: number, dateAdded: Date) {
        this.amount = amount;
        this.dateAdded = dateAdded;
    }

    toString() {
        return `amount: ${this.amount}, dateAdded: ${this.dateAdded}`;
    }
}

var pantry = {"spices":{}, "fruits":{}, "veggies":{}, "meat":{}}

function addIngredient() {
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const type: string = (document.getElementById("type") as HTMLInputElement).value;
    const amountAdd: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);

    if (pantry[type][name] !== undefined) {
        pantry[type][name].amount += amountAdd;
    }
    else {
        const now: Date = new Date(Date.now());
        pantry[type][name] = new ingredient(amountAdd, now);
    }
}

function showPantry() {
    console.log(pantry);
}
