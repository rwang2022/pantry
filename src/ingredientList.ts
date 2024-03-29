class ingredientList {
    ingredients: { [key: string]: number };

    constructor(initialList: { [key: string]: number }) {
        this.ingredients = initialList;
    }

    addList(other: ingredientList) {
        Object.entries(other.ingredients).forEach(([ingredient, quantity]) => {
            this.addIngredient(ingredient, quantity);
        })
    }

    hasIngredient(ingredient: string, quantity: number): boolean {
        if (this.ingredients[ingredient] === undefined) return false;
        return (this.ingredients[ingredient] >= quantity);
    }

    addIngredient(ingredient: string, quantity: number): void {
        if (this.ingredients[ingredient]) this.ingredients[ingredient] += quantity;
        else this.ingredients[ingredient] = quantity;
    }

    removeList(other: ingredientList): boolean {
        // if other has an ingredient that is not present or there isn't enough of
        let isSubset = true;
        Object.entries(other.ingredients).forEach(([ingredient, quantity]) => {
            if (this.ingredients[ingredient] === undefined || this.ingredients[ingredient] < quantity) {
                isSubset = false;
                return;
            }
        })

        if (!isSubset) return false;

        // at this point we can be sure this is a superset of other
        Object.entries(other.ingredients).forEach(([ingredient, quantity]) => {
            this.removeIngredient(ingredient, quantity);
        })

        return true;
    }

    removeIngredient(name: string, quantity: number): void {
        if (this.ingredients[name] >= quantity) {
            this.ingredients[name] -= quantity;
            if (this.ingredients[name] == 0) delete this.ingredients[name];
        }
        else console.log(`you're trying to remove ${quantity} ${name} but you only have ${this.ingredients[name]}. nothing happened.`);
    }

    toString(): string {
        let logStr: string = "";
        Object.entries(this.ingredients).forEach(([ingredient, quantity]) => {
            logStr += `${ingredient}: ${quantity}, `;
        });
        return logStr;
    }
}

let pantry1: ingredientList = new ingredientList({ "a": 1, "b": 2 });

let recipes1: ingredientList[] = [];
recipes1.push(new ingredientList({ "a": 1, "b": 2 }));
recipes1.push(new ingredientList({ "b": 1, "c": 2 }));

function showPantry() {
    (document.getElementById("pantry-list") as HTMLElement).innerHTML = convertToTable(pantry1);
}

function addIngredientToPantry() {
    const ingredient1: string = (document.getElementById("name") as HTMLInputElement).value;
    const amountAdd: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    if (amountAdd > 0) pantry1.addIngredient(ingredient1, amountAdd);
    else if (amountAdd < 0) pantry1.removeIngredient(ingredient1, -amountAdd);
    else { }
    showPantry();
}

function displayRecipes() {
    (document.getElementById("pantry-list") as HTMLElement).innerHTML = "";
    for (let i = 0; i < recipes1.length; i++) {
        (document.getElementById('pantry-list') as HTMLElement).innerHTML += `<h2 style="text-align: center">Recipe #${i + 1}</h2>`;
        (document.getElementById('pantry-list') as HTMLElement).innerHTML += convertToTable(recipes1[i]);
    }
}

// Function to display recipe in HTML
function convertToTable(ingredientList: ingredientList) {
    var listHTML = '<table><thead><th>Name</th><th>Amount</th></thead><tbody>';
    Object.entries(ingredientList.ingredients).forEach(([ingredient, amount]) => {
        if (ingredientList !== pantry1 && pantry1.hasIngredient(ingredient, amount)) {
            listHTML += 
                `<tr class="ingredient" style="background-color: #86BA90";>
                    <th class="ingredient">${ingredient}</th>
                    <th class="amount">${amount}</th>        
                </tr>`
        }
        else {
            listHTML +=
                `<tr class="ingredient">
                    <th class="ingredient">${ingredient}</th>
                    <th class="amount">${amount}</th>
                </tr>`;
        }
    })
    listHTML += '</tbody></table>';
    return listHTML;
}