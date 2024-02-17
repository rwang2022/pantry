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
var pantry = { "spices": {}, "fruits": {}, "veggies": {}, "meat": {} };
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
