// file io
const fs = require('fs');
const readline = require('readline-sync'); // basically python input()

// read object from file
function read(filename) {
    return JSON.parse(fs.readFileSync(filename));
}

// write object to file
function write(filename, obj) {
    fs.writeFileSync(filename, JSON.stringify(obj), {encoding:'utf8',flag:'w'});
}

// Ingredient functions
function addIngredient(ingredients, name, amt) {
    if (ingredients.hasOwnProperty(name)) {
        ingredients[name] += amt;
    } else {
        ingredients[name] = amt;
    }
    write("ingredients.json", ingredients);
}

function updateIngredient(ingredients, name, amt) {
    if (!ingredients.hasOwnProperty(name)) {
        console.log("Ingredient not found.");
    } else {
        ingredients[name] = amt;
        write("ingredients.json", ingredients);
    }
}

function deleteIngredient(ingredients, name) {
    if (!ingredients.hasOwnProperty(name)) {
        console.log("Ingredient not found.");
    } else {
        delete ingredients[name];
        write("ingredients.json", ingredients);
    }
}

// Recipe functions
function addRecipe(recipes, name, recipeObj) {
    recipes[name] = recipeObj;
    write("recipes.json", recipes);
}

// because we have add and delete that work fine, I'm going to make update only change one parameter at a time
function updateRecipe(recipes, name, attr, value) {
    if (!recipes.hasOwnProperty(name)) {
        console.log("Recipe not found.");
    } else {
        recipes[name]["ingredients"][attr] = value;
        write("recipes.json", recipes);
    }
}

function deleteRecipe(recipes, name) {
    if (!recipes.hasOwnProperty(name)) {
        console.log("Recipe not found.");
    } else {
        delete recipes[name];
        write("recipes.json", recipes);
    }
}

// returns an object of all the things needed and how much is needed. The bool is a simple error
function checkRecipe(recipes, ingredients, name) {

    // check for recipe
    let returnObj = {};
    if (!recipes.hasOwnProperty(name)) {
        return [true, returnObj];
    }

    // compare ingredients
    let rec = recipes[name]["ingredients"];
    for (key in rec) {
        if (!ingredients.hasOwnProperty(key)) {
            returnObj[key] = rec[key];
        } else if (rec[key] > ingredients[key]) {
            returnObj[key] = rec[key] - ingredients[key];
        }
    }

    return [false, returnObj];
}

function main() {
    // recipe object
    var recipes = read("recipes.json");
    var ingredients = read("ingredients.json");

    // main interactive loop
    var isRunning = true;
    while (isRunning) {
        // Initial loop sorts by recipe or ingredient
        let command = readline.question("Command type {recipe | ingredient | quit}: ");
        switch (command) {
            case "quit":
                isRunning = false;
                break;

            // recipe switch statement
            case "recipe":
                command = readline.question("Recipe command {add | delete | update | check}: ");
                switch (command) {
                    case "add":
                        let newRec = {
                            name: readline.question("New recipe name: "),
                            ingredients: {}
                        };
                        // loop for ingredient entry
                        let ing = readline.question("Ingredient name (or 'done'): ");
                        while (ing != 'done') {
                            newRec.ingredients[ing] = Number.parseFloat(readline.question("Ingredient amount: "));
                            ing = readline.question("Ingredient name (or 'done'): ");
                        }
                        addRecipe(recipes, newRec.name, newRec);
                        break;

                    case "delete":
                        deleteRecipe(recipes, readline.question("Recipe to delete: "));
                        break;

                    case "update":
                        updateRecipe(
                            recipes,
                            readline.question("Name of recipe: "),
                            readline.question("Name of Ingredient: "),
                            Number.parseFloat(readline.question("Amount: "))
                        );
                        break;

                    case "check":
                        let [failure, result] = checkRecipe(
                            recipes,
                            ingredients,
                            readline.question("Recipe to check: ")
                        );
                        if (failure) {
                            console.log("Recipe not found.");
                        } else if (Object.keys(result).length === 0) {
                            console.log("Success! No ingredients needed");
                        } else {
                            // loop for printing required ingredients
                            console.log("Ingredients needed: ");
                            for (key in result) {
                                console.log(`${key}: ${result[key]}`);
                            }
                        }
                        break;

                    default:
                        console.log("Error: invalid argument");
                }
                break;

            // ingredient switch statement
            case "ingredient":
                command = readline.question("Ingredient command {add | delete | update}: ");
                switch (command) {
                    case "add":
                        addIngredient(
                            ingredients,
                            readline.question("Ingredient name: "),
                            Number.parseFloat(readline.question("Ingredient amount: "))
                        );
                        break;

                    case "delete":
                        deleteIngredient(
                            ingredients,
                            readline.question("Ingredient to delete: ")
                        );
                        break;

                    case "update":
                        updateIngredient(
                            ingredients,
                            readline.question("Ingredient name: "),
                            Number.parseFloat(readline.question("Ingredient amount: "))
                        );
                        break;
                    default:
                        console.log("Error: invalid argument");
                }
                break;
            default:
                console.log("Error: invalid argument");
        }
    }
}



if (require.main === module) {
    main();
}