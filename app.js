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
    console.log("added " + x.toString());
    pantry.push(x);
}

function showPantry() {
    var pantry_list = document.getElementById("pantry-list");
    pantry_list.innerHTML = "";
    for (let i = 0; i < pantry.length; i++) {
        pantry_list.innerHTML += "<p>" + pantry[i].toString() + "</p>";
    }
}
