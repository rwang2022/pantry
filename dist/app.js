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
    "spices": {},
    "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
    "veggies": {},
    "meat": {}
};
var recipe1 = {
    "spices": { "onion powder": new ingredient(1, new Date(Date.now())) },
    "fruits": { "tomato": new ingredient(1, new Date(Date.now())) },
    "veggies": { "green onion": new ingredient(1, new Date(Date.now())) },
    "meat": { "pork belly": new ingredient(1, new Date(Date.now())) }
};
function haveIngredients(recipe) {
    var good = true;
    for (var _i = 0, _a = Object.entries(recipe1); _i < _a.length; _i++) {
        var _b = _a[_i], type = _b[0], ingredientGroup = _b[1];
        for (var _c = 0, _d = Object.entries(ingredientGroup); _c < _d.length; _c++) {
            var _e = _d[_c], ingredientName = _e[0], ingredient_1 = _e[1];
            var pantryIngredient = pantry[type][ingredientName];
            // console.log(pantryIngredient);
            if (pantryIngredient === undefined || pantryIngredient.amount < ingredient_1.amount) {
                good = false;
                console.log("you don't enough " + ingredientName + " (need " + ingredient_1.amount + ")");
            }
        }
    }
    return good;
}
function addIngredient() {
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var amountAdd = parseInt(document.getElementById("amount").value);
    if (pantry[type][name] !== undefined) {
        pantry[type][name].amount += amountAdd;
    }
    else {
        var now = new Date(Date.now());
        pantry[type][name] = new ingredient(amountAdd, now);
    }
}
function showPantry() {
    console.log(pantry);
}
