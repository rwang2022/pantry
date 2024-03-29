var ingredientList = /** @class */ (function () {
    function ingredientList(initialList) {
        this.ingredients = initialList;
    }
    ingredientList.prototype.addList = function (other) {
        var _this = this;
        Object.entries(other.ingredients).forEach(function (_a) {
            var ingredient = _a[0], quantity = _a[1];
            _this.addIngredient(ingredient, quantity);
        });
    };
    ingredientList.prototype.hasIngredient = function (ingredient, quantity) {
        if (this.ingredients[ingredient] === undefined)
            return false;
        return (this.ingredients[ingredient] >= quantity);
    };
    ingredientList.prototype.addIngredient = function (ingredient, quantity) {
        if (this.ingredients[ingredient])
            this.ingredients[ingredient] += quantity;
        else
            this.ingredients[ingredient] = quantity;
    };
    ingredientList.prototype.removeList = function (other) {
        var _this = this;
        // if other has an ingredient that is not present or there isn't enough of
        var isSubset = true;
        Object.entries(other.ingredients).forEach(function (_a) {
            var ingredient = _a[0], quantity = _a[1];
            if (_this.ingredients[ingredient] === undefined || _this.ingredients[ingredient] < quantity) {
                isSubset = false;
                return;
            }
        });
        if (!isSubset)
            return false;
        // at this point we can be sure this is a superset of other
        Object.entries(other.ingredients).forEach(function (_a) {
            var ingredient = _a[0], quantity = _a[1];
            _this.removeIngredient(ingredient, quantity);
        });
        return true;
    };
    ingredientList.prototype.removeIngredient = function (name, quantity) {
        if (this.ingredients[name] >= quantity) {
            this.ingredients[name] -= quantity;
            if (this.ingredients[name] == 0)
                delete this.ingredients[name];
        }
        else
            console.log("you're trying to remove " + quantity + " " + name + " but you only have " + this.ingredients[name] + ". nothing happened.");
    };
    ingredientList.prototype.toString = function () {
        var logStr = "";
        Object.entries(this.ingredients).forEach(function (_a) {
            var ingredient = _a[0], quantity = _a[1];
            logStr += ingredient + ": " + quantity + ", ";
        });
        return logStr;
    };
    return ingredientList;
}());
var pantry1 = new ingredientList({ "a": 1, "b": 2 });
var recipes1 = [];
recipes1.push(new ingredientList({ "a": 1, "b": 2 }));
recipes1.push(new ingredientList({ "b": 1, "c": 2 }));
function showPantry() {
    document.getElementById("pantry-list").innerHTML = convertToTable(pantry1);
}
function addIngredientToPantry() {
    var ingredient1 = document.getElementById("name").value;
    var amountAdd = parseInt(document.getElementById("amount").value);
    if (amountAdd > 0)
        pantry1.addIngredient(ingredient1, amountAdd);
    else if (amountAdd < 0)
        pantry1.removeIngredient(ingredient1, -amountAdd);
    else { }
    showPantry();
}
function displayRecipes() {
    document.getElementById("pantry-list").innerHTML = "";
    for (var i = 0; i < recipes1.length; i++) {
        document.getElementById('pantry-list').innerHTML += "<h2 style=\"text-align: center\">Recipe #" + (i + 1) + "</h2>";
        document.getElementById('pantry-list').innerHTML += convertToTable(recipes1[i]);
    }
}
// Function to display recipe in HTML
function convertToTable(ingredientList) {
    var listHTML = '<table><thead><th>Name</th><th>Amount</th></thead><tbody>';
    Object.entries(ingredientList.ingredients).forEach(function (_a) {
        var ingredient = _a[0], amount = _a[1];
        if (ingredientList !== pantry1 && pantry1.hasIngredient(ingredient, amount)) {
            listHTML +=
                "<tr class=\"ingredient\" style=\"background-color: #86BA90\";>\n                    <th class=\"ingredient\">" + ingredient + "</th>\n                    <th class=\"amount\">" + amount + "</th>        \n                </tr>";
        }
        else {
            listHTML +=
                "<tr class=\"ingredient\">\n                    <th class=\"ingredient\">" + ingredient + "</th>\n                    <th class=\"amount\">" + amount + "</th>\n                </tr>";
        }
    });
    listHTML += '</tbody></table>';
    return listHTML;
}
