class ingredient {
    constructor(name, type, amount) {
        this.name = name;
        this.type = type;
        this.amount = amount;
    }

    toString() {
        return `name: ${this.name}, type: ${this.type}, amount: ${this.amount}`;
    }
}

var pantry = []

function addIngredient() {
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var amount = document.getElementById("amount").value;

    var x = new ingredient(name, type, amount); 
    pantry.push(x);
}

function showPantry() {
    for (let i = 0; i < pantry.length; i++) {
        console.log(pantry[i].toString());
    }
}
