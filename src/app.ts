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

var pantry = {
    "spices": {},
    "fruits": {"tomato": new ingredient(1, new Date(Date.now()))},
    "veggies": {},
    "meat": {}
};

var recipe1 = {
    "spices": {"onion powder": new ingredient(1, new Date(Date.now()))},
    "fruits": {"tomato": new ingredient(1, new Date(Date.now()))},
    "veggies": {"green onion": new ingredient(1, new Date(Date.now()))},
    "meat": {"pork belly": new ingredient(1, new Date(Date.now()))},
}

function haveIngredients(recipe): Boolean {
    let good: boolean = true;
    
    for (const [type, ingredientGroup] of Object.entries(recipe1)) {
        for (const [ingredientName, ingredient] of Object.entries(ingredientGroup)) {
            const pantryIngredient = pantry[type][ingredientName];
            // console.log(pantryIngredient);
            if (pantryIngredient === undefined || pantryIngredient.amount < ingredient.amount) {
                good = false;
                console.log("you don't enough " + ingredientName + " (need " + ingredient.amount + ")");
            }
        }
    }
    
    return good;
}

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
