const food = {
    idMeal: "52771",
    strArea: "Italian",
    strCategory: "Vegetarian",
    strDrinkAlternate: null,
    strIngredient1: "penne rigate",
    strIngredient2: "olive oil",
    strIngredient3: "garlic",
    strIngredient4: "chopped tomatoes",
    strIngredient5: "red chile flakes",
    strIngredient6: "italian seasoning",
    strIngredient7: "basil",
    strIngredient8: "Parmigiano-Reggiano",
    strIngredient9: "",
    strIngredient10: "",
    strIngredient11: "dsfsadf",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "asdfasdf",
    strIngredient15: "",
    strIngredient16: null,
    strIngredient17: null,
    strIngredient18: null,
    strIngredient19: null,
    strIngredient20: null,
    strInstructions: "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.",
    strMeal: "Spicy Arrabiata Penne",
    strMealThumb: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    strMeasure1: "1 pound",
    strMeasure2: "1/4 cup",
    strMeasure3: "3 cloves",
    strMeasure4: "1 tin ",
    strMeasure5: "1/2 teaspoon",
    strMeasure6: "1/2 teaspoon",
    strMeasure7: "6 leaves",
    strMeasure8: "spinkling",
    strMeasure9: "",
    strMeasure10: "",
    strMeasure11: "asdfsadf",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "asdfasdf",
    strMeasure15: "",
    strMeasure16: null,
    strMeasure17: null,
    strMeasure18: null,
    strMeasure19: null,
    strMeasure20: null,
    strSource: null,
    strTags: "Pasta,Curry",
    strYoutube: "https://www.youtube.com/watch?v=1IszT_guI08"
}

console.log(food.strMeal);

let ingredientList = [];
let measurementList = [];
for (const element of Object.keys(food)) {
    let property = food[element];

    if ((property !== "") && (property !== null)) {
        if (isEqual(element, "strMeasure")) {
            measurementList.push(element);
        }
        else if (isEqual(element, "strIngredient")) {
            ingredientList.push(element);
        }
    }
}

console.log(measurementList);
console.log(ingredientList);

function isEqual(givenString, referenceString) {
    if (givenString.slice(0, givenString.length - 1) === referenceString ||
        givenString.slice(0, givenString.length - 2) === referenceString) {
        return true;
    } else {
        return false;
    }
}