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
    "spices": { "onion powder": new ingredient(2, new Date(Date.now())) },
    "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
    "veggies": {},
    "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
};

var recipe_names = ["Recipe #1", "Recipe #2", "Recipe #3"]
var recipes = [
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) },
    },
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) },
    },
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) },
    },
]

function haveIngredients(recipe) {
    let good: boolean = true;
    var needed = {
        "spices": {},
        "fruits": {},
        "veggies": {},
        "meat": {}
    };

    for (const [type, ingredientGroup] of Object.entries(recipes[0])) {
        for (const [ingredientName, ingredient] of Object.entries(ingredientGroup)) {
            const pantryIngredient = pantry[type][ingredientName];
            // console.log(pantryIngredient);
            if (pantryIngredient === undefined) {
                good = false;
                console.log("you don't enough " + ingredientName + " (need " + ingredient.amount + ")");
                if (needed[type] === undefined) needed[type] = ingredientName;
                if (needed[type][ingredientName] === undefined) needed[type][ingredientName] = ingredient;
            }
            else if (pantryIngredient.amount < ingredient.amount) {
                good = false;
                const diff: number = ingredient.amount - pantryIngredient.amount;
                console.log("you don't enough " + ingredientName + " (need " + diff + ")");
                if (needed[type] === undefined) needed[type] = ingredientName;
                if (needed[type][ingredientName] === undefined) {
                    needed[type][ingredientName] = ingredient;
                    needed[type][ingredientName].amount = diff;
                }
            }
        }
    }

    return needed;
}

function makeRecipe(recipe): Boolean {
    const haveAllIngredients: boolean = Object.keys(haveIngredients(recipe)).length === 0;
    if (!haveAllIngredients) return false; 

    for (const [type, ingredientGroup] of Object.entries(recipes[0])){
        for (const [ingredientName, ingredient] of Object.entries(ingredientGroup)) {
            pantry[type][ingredientName].amount -= ingredient.amount;
        }
    }

    return true;
}

function addIngredient() {
    const type: string = (document.getElementById("type") as HTMLInputElement).value;
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const amountAdd: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);

    console.log(name, type, amountAdd);
    

    if (pantry[type][name] !== undefined) {
        pantry[type][name].amount += amountAdd;
        if (pantry[type][name].amount <= 0) delete pantry[type][name];
    }
    else {
        const now: Date = new Date(Date.now());
        pantry[type][name] = new ingredient(amountAdd, now);
    }

    showPantry();
}

