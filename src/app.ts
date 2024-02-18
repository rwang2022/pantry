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

var recipe1 = {
    "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
    "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
    "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
    "meat": { "pork belly": new ingredient(1, new Date(Date.now())) },
}

function haveIngredients(recipe) {
    let good: boolean = true;
    var needed = {
        "spices": {},
        "fruits": {},
        "veggies": {},
        "meat": {}
    };

    for (const [type, ingredientGroup] of Object.entries(recipe1)) {
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

    for (const [type, ingredientGroup] of Object.entries(recipe1)){
        for (const [ingredientName, ingredient] of Object.entries(ingredientGroup)) {
            pantry[type][ingredientName].amount -= ingredient.amount;
        }
    }

    return true;
}

function addIngredient() {
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const type: string = (document.getElementById("type") as HTMLInputElement).value;
    const amountAdd: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);

    console.log(name, type, amountAdd);
    

    if (pantry[type][name] !== undefined) {
        pantry[type][name].amount += amountAdd;
    }
    else {
        const now: Date = new Date(Date.now());
        pantry[type][name] = new ingredient(amountAdd, now);
    }
}

function showPantry() {
    displayRecipe(pantry);
    console.log(pantry);
}

// Function to create HTML for ingredients
function createIngredientHTML(category, ingredient, amount, dateAdded) {
    return `
        <tr class="ingredient">
            <th class="category">${category}</th>
            <th class="name">${ingredient}</th>
            <th class="amount">${amount}</th>
            <th class="expiry">${dateAdded.toLocaleString('en-US', { timeZone: 'EST' })}</th>
        </tr>
    `;
}

// Function to display recipe in HTML
function displayRecipe(recipe) {
    var recipeHTML = '<table><thead><th>Type</th><th>Name</th><th>Amount</th><th>Date Added</th></thead><tbody>';
    for (var category in recipe) {
        for (var ingredient in recipe[category]) {
            var amount = recipe[category][ingredient].amount;
            var dateAdded = recipe[category][ingredient].dateAdded;
            recipeHTML += createIngredientHTML(category, ingredient, amount, dateAdded);
        }
    }
    recipeHTML += '</tbody></table>';

    (document.getElementById('pantry-list') as HTMLElement).innerHTML = "";
    (document.getElementById('pantry-list') as HTMLElement).innerHTML = recipeHTML;
}