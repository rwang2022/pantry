var ingredient = /** @class */ (function () {
    function ingredient(amount, dateAdded) {
        this.amount = 0;
        this.amount = amount;
        this.dateAdded = dateAdded;
    }
    ingredient.prototype.toString = function () {
        return "amount: " + this.amount + ", dateAdded: " + this.dateAdded;
    };
    return ingredient;
}());
var pantry = {
    "spices": { "onion powder": new ingredient(2, new Date(Date.now())) },
    "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
    "veggies": {},
    "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
};
var recipe_names = ["Recipe #1", "Recipe #2", "Recipe #3"];
var recipes = [
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
    },
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
    },
    {
        "spices": { "onion powder": new ingredient(3, new Date(Date.now())) },
        "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
        "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
        "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
    },
];
function haveIngredients(recipe) {
    var good = true;
    var needed = {
        "spices": {},
        "fruits": {},
        "veggies": {},
        "meat": {}
    };
    for (var _i = 0, _a = Object.entries(recipes[0]); _i < _a.length; _i++) {
        var _b = _a[_i], type = _b[0], ingredientGroup = _b[1];
        for (var _c = 0, _d = Object.entries(ingredientGroup); _c < _d.length; _c++) {
            var _e = _d[_c], ingredientName = _e[0], ingredient_1 = _e[1];
            var pantryIngredient = pantry[type][ingredientName];
            // console.log(pantryIngredient);
            if (pantryIngredient === undefined) {
                good = false;
                console.log("you don't enough " + ingredientName + " (need " + ingredient_1.amount + ")");
                if (needed[type] === undefined)
                    needed[type] = ingredientName;
                if (needed[type][ingredientName] === undefined)
                    needed[type][ingredientName] = ingredient_1;
            }
            else if (pantryIngredient.amount < ingredient_1.amount) {
                good = false;
                var diff = ingredient_1.amount - pantryIngredient.amount;
                console.log("you don't enough " + ingredientName + " (need " + diff + ")");
                if (needed[type] === undefined)
                    needed[type] = ingredientName;
                if (needed[type][ingredientName] === undefined) {
                    needed[type][ingredientName] = ingredient_1;
                    needed[type][ingredientName].amount = diff;
                }
            }
        }
    }
    return needed;
}
function makeRecipe(recipe) {
    var haveAllIngredients = Object.keys(haveIngredients(recipe)).length === 0;
    if (!haveAllIngredients)
        return false;
    for (var _i = 0, _a = Object.entries(recipes[0]); _i < _a.length; _i++) {
        var _b = _a[_i], type = _b[0], ingredientGroup = _b[1];
        for (var _c = 0, _d = Object.entries(ingredientGroup); _c < _d.length; _c++) {
            var _e = _d[_c], ingredientName = _e[0], ingredient_2 = _e[1];
            pantry[type][ingredientName].amount -= ingredient_2.amount;
        }
    }
    return true;
}
function addIngredient() {
    var type = document.getElementById("type").value;
    var name = document.getElementById("name").value;
    var amountAdd = parseInt(document.getElementById("amount").value);
    console.log(name, type, amountAdd);
    if (pantry[type][name] !== undefined) {
        pantry[type][name].amount += amountAdd;
        if (pantry[type][name].amount <= 0)
            delete pantry[type][name];
    }
    else {
        var now = new Date(Date.now());
        pantry[type][name] = new ingredient(amountAdd, now);
    }
    showPantry();
}
