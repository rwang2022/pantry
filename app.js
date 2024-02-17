var pantry = {}

function addIngredient() {
    var ingredient = document.getElementById("ingredient").value;
    var amount = document.getElementById("amount").value;

    console.log("ingredient: " + ingredient);
    console.log("amount: " + amount);

    pantry[ingredient] = amount;
}

function showPantry() {
    console.log(JSON.stringify(pantry));
}
