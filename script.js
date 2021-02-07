
let cachedData = [];
let flag = true;
function searchMeals() {
    const searchedMealIngredient = document.getElementById("searched-input-id").value;
    if (searchedMealIngredient.length > 0) {
        loadData(searchedMealIngredient);
    } else {
        alert("Write something to search");
    }
}

function loadData(searchedItem) {
    const API_link = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchedItem;
    let details = document.getElementById('show-details-section-id');
    deleteChild(details);
    let search = document.getElementById('search-result-section-id');
    deleteChild(search);

    fetch(API_link)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.meals.map((singleMeal) => {
                const mealName = singleMeal.strMeal;
                const mealThumb = singleMeal.strMealThumb;

                cachedData.push(singleMeal);


                const mainSectionContainer = document.getElementById('search-result-section-id');
                const responsiveDivContainer = createFoodItemCards(mealName, mealThumb);
                responsiveDivContainer.addEventListener('click', (event) => {
                    const parent = event.target.closest('.responsive');//----------------------
                    const foodName = parent.querySelector('.desc').innerHTML;
                    cachedData.forEach(element => {
                        if (element.strMeal === foodName) {
                            let [measurementList, ingredientList, mealImage] = findMealIngredients(element);
                            let responsiveDivContainer = createFoodDetailsCard(measurementList, ingredientList, singleMeal);
                            document.getElementById('show-details-section-id').appendChild(responsiveDivContainer);
                        }
                    });
                }
                );
                mainSectionContainer.appendChild(responsiveDivContainer);
            }
            );
        })
        .catch(error => {
            alert(`Something went Wrong !!\n\nError Message: ${error.message}`);
        });
}
function deleteChild(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}


function findMealIngredients(singleMeal) {
    let ingredientList = [];
    let measurementList = [];
    for (const element of Object.keys(singleMeal)) {
        let property = singleMeal[element];

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
    return [measurementList, ingredientList, singleMeal];
}

function createFoodDetailsCard(measurementList, ingredientList, singleMeal) {
    const responsiveDivContainer = document.createElement("div");
    responsiveDivContainer.className = "nonresponsive";

    const galleryDivContainer = document.createElement("div");
    galleryDivContainer.className = "gallery";
    const imageElement = document.createElement("img");
    imageElement.src = singleMeal.strMealThumb;

    const paragraphContainer = document.createElement("div");
    paragraphContainer.style.marginLeft = "10px";
    const foodNameHeader = document.createElement('h1');
    foodNameHeader.innerHTML = singleMeal.strMeal;
    foodNameHeader.style.textAlign = "center";

    const header = document.createElement('h3');
    header.innerHTML = "INGREDIENTS"
    header.style.marginLeft = "5px";

    const ul = document.createElement('ul');

    for (let i = 0; i < 5; i++) {
        description = singleMeal[measurementList[i]] + " " + singleMeal[ingredientList[i]];
        if (description.length > 0) {
            const li = document.createElement('li');
            li.innerHTML = description;
            ul.appendChild(li);
        }
    }
    galleryDivContainer.appendChild(imageElement);
    galleryDivContainer.appendChild(foodNameHeader);
    galleryDivContainer.appendChild(document.createElement('hr'))
    galleryDivContainer.appendChild(header);
    galleryDivContainer.appendChild(document.createElement('hr'))
    galleryDivContainer.appendChild(ul);
    responsiveDivContainer.appendChild(galleryDivContainer);

    return responsiveDivContainer;

}

function createFoodItemCards(mealName, mealPicture) {
    const responsiveDivContainer = document.createElement("div");
    responsiveDivContainer.className = "responsive";
    const galleryDivContainer = document.createElement("div");
    galleryDivContainer.className = "gallery";

    const anchorElement = document.createElement("a");
    anchorElement.href = "#";
    const imageElement = document.createElement("img");
    imageElement.src = mealPicture;

    const descDivContainer = document.createElement("div");
    descDivContainer.className = "desc";
    descDivContainer.innerHTML = mealName;

    anchorElement.appendChild(imageElement);
    galleryDivContainer.appendChild(anchorElement);
    galleryDivContainer.appendChild(descDivContainer);
    responsiveDivContainer.appendChild(galleryDivContainer);

    return responsiveDivContainer;
}