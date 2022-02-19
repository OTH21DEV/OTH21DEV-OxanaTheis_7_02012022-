import { recipes } from "/data/recipes.js";

const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

for (let i = 0; i < recipes.length; i++) {
  let recipe = recipes[i];
  createRecipe(recipe);
}
function createRecipe(data) {
  // des Ingredients pour chaque recette
  const ingredientsDetails = data.ingredients;

  const sectionRecipes = document.querySelector(".recipes");
  let listIngredients = "";
  for (let ingredient of ingredientsDetails) {
    if (ingredient.unit) {
      listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}${ingredient.unit}</li>`;
    } else {
      listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}</li>`;
    }
  }

  sectionRecipes.innerHTML += `
<article class="wrapper-recipe" ${data.id}>
<div class= "recipe-img"></div>
<div class="wrapper">
<div class="wrapper-recipe-tittle-time">
<h2 class="recipe-tittle">${data.name}</h2>
<div class = "recipe-time">
<i class="far fa-clock"></i>
<div>${data.time} min</div>
</div>
</div>
<div class="wrapper-recipe-ingredients-making">
<ul class="recipe-ingredients">
${listIngredients}
</ul>
<div class="recipe-making">${data.description}
</div>
</div>
</div>
</article>
`;
}

/*
Tableau des ustensils vide ( puis trier sans doublon)
*/
let utensilsListDropdown = [];
/*
Tableau des appareils vide ( puis trier sans doublon)
*/
let appliancesListDropdown = [];
/*
Tableau des ingredients vide ( puis trier sans doublon)
*/
let ingredientsListDropdown = [];

//....................................................

/*
Fonction pour supprimer des doublons afin de recreer le contenu initial de dropdown
*/
function removeDuplicatesDropdown() {
  recipes.forEach((recipe) => {
    let recipeUtensils = recipe.ustensils;
    let recipeAppliances = recipe.appliance;
    /*tableau des ingredients (chaque ingredient est un objet du tableau)
    (5) [{…}, {…}, {…}, {…}, {…}]
0: {ingredient: 'Pâte feuilletée', quantity: 400, unit: 'g'}
1: {ingredient: 'Oeuf', quantity: 6}

    */
    let recipeIngredients = recipe.ingredients;
    // console.log(recipeIngredients);

    recipeIngredients.forEach((ingredient) => {
      //ingredient - un objet contenant {ingredient: 'Beurre', quantity: 500, unit: 'g'}
      ingredientsListDropdown = [...new Set(ingredientsListDropdown.concat(ingredient.ingredient))].sort();
      //ingredient.ingredient - un seul ingredient de l'objet

      //on remplie (concate)  le tableau vide utensilsListDropdown par les tableaux recipe.ustensils par recette
      //on imbrique les tableaux recipeUtensils dans le tableau cree utensilsListDropdown
      utensilsListDropdown = [...new Set(utensilsListDropdown.concat(recipeUtensils))].sort();

      //on remplie (concate)  le tableau vide appliancesListDropdown par les tableaux recipe.appliance par recette
      appliancesListDropdown = [...new Set(appliancesListDropdown.concat(recipeAppliances))].sort();
    });
  });
}

removeDuplicatesDropdown();

/*
A verifier cette const...
*/
const btnDropdownUstensiles = document.querySelector(".btn-dropdown-utensils");

/*
TEST
*/
//Element Dom UL pour le dropdown Ingredient

const ulElementIng = document.querySelector(".elements-liste-ing");
const btnIng = document.querySelector(".btn-dropdown-ingredients");
const dropDownContainerIng = document.querySelector(".btn-dropdown-container");
const popupIng = document.querySelector(".popup-input-ing");

//Appareils
const ulElementAppl = document.querySelector(".elements-liste-appl");
const btnAppl = document.querySelector(".btn-dropdown-appliances");
const dropDownContainerAppl = document.querySelector(".btn-dropdown-container-appliances");
const popupAppl = document.querySelector(".popup-input-appl");


//Ustensils
const ulElementUts = document.querySelector(".elements-liste-uts");
const btnUts = document.querySelector(".btn-dropdown-utensils");
const dropDownContainerUts = document.querySelector(".btn-dropdown-container-utensils");
const popupUts = document.querySelector(".popup-input-uts");


function displayDropdownIng(elementPopup,array, ulElement, btn, elementContainer) {
  window.addEventListener("click", (e) => {
    if (e.target.classList[0] == "btn-dropdown-container__arrow-down-ing") {
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);
    }

    if (e.target.classList[0] == "btn-dropdown-container__arrow-up-ing") {
      ClosePopup(elementPopup, btn, elementContainer);

      // window.location.reload();
    }
  });
}
function displayDropdownAppl(elementPopup, array, ulElement, btn, elementContainer) {
  window.addEventListener("click", (e) => {
    if (e.target.classList[0] == "btn-dropdown-container__arrow-down-appl") {
      console.log(e.target.classList[0]);
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);
    }

    if (e.target.classList[0] == "btn-dropdown-container__arrow-up-appl") {
      ClosePopup(elementPopup, btn, elementContainer);

      // window.location.reload();
    }
  });
}

function displayDropdownUts(elementPopup, array, ulElement, btn, elementContainer) {
  window.addEventListener("click", (e) => {
    if (e.target.classList[0] == "btn-dropdown-container__arrow-down-uts") {
      console.log(e.target.classList[0]);
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);
    }

    if (e.target.classList[0] == "btn-dropdown-container__arrow-up-uts") {
      ClosePopup(elementPopup, btn, elementContainer);

      // window.location.reload();
    }
  });
}

function OpenPopup(elementPopup, array, ulElement, btn, elementContainer) {
  btn.style.display = "none";
  elementPopup.classList.add("popup-input--onclick");
  elementContainer.classList.add("btn-dropdown-container--onclick");
  document.querySelector(".wrapper-btns-dropdown").classList.add("wrapper-btns-dropdown--onclick");
  createElementsListe(array, ulElement);
}


function ClosePopup(elementPopup, btn, elementContainer) {
  elementPopup.style.display = "none";
  document.querySelector(".wrapper-btns-dropdown").classList.remove("wrapper-btns-dropdown--onclick");
  btn.style.display = "flex";
  elementContainer.classList.remove("btn-dropdown-container--onclick");
}

displayDropdownIng(popupIng,ingredientsListDropdown, ulElementIng, btnIng, dropDownContainerIng);
displayDropdownAppl(popupAppl, appliancesListDropdown, ulElementAppl, btnAppl, dropDownContainerAppl);
displayDropdownUts(popupUts,utensilsListDropdown, ulElementUts, btnUts, dropDownContainerUts);

/*
Creation de la liste pour chaque element -ingredients, appareils, ustensiles
*/

function createElementsListe(array, ulElement) {
  array.forEach((element) => {
    const liElement = document.createElement("li");
    liElement.classList.add("input-liste");
    ulElement.appendChild(liElement);
    liElement.innerHTML = element;
  });
}



/*
tableau vide de recettes, rempli au fur et au mesure par les recettes en fonction de 
mots clés tapés dans la barre de recherche
*/
let filteredRecipes = [];

let filteredUtensils = [];
let filteredAppliances = [];
let filteredIngredients = [];

function searchByKeywordsUtensils(value) {
  /* a partir de tableau filtré de recette (par mots cles) 
 on filtre chaque recette 

*/
  filteredRecipes.forEach((element) => {
    // on accede aux ustensils filtrés de chaque recette
    let newRecipeUtensils = element.ustensils;

    //on remplie le nouveau tableau des ustensiles filtrés par les ustensils de chaque recette

    filteredUtensils = [...new Set(filteredUtensils.concat(newRecipeUtensils))].sort();
  });
  btnDropdownUstensiles.innerHTML = "";
  displayDropdown(filteredUtensils, btnDropdownUstensiles);
}

function searchByKeywordsAppliances(value) {
  /* a partir de tableau filtré de recette (par mots cles) 
  on filtre chaque recette */
  filteredRecipes.forEach((element) => {
    let newRecipeAppliances = element.appliance;

    filteredAppliances = [...new Set(filteredAppliances.concat(newRecipeAppliances))].sort();
  });

  // on recrée le contenu de dropdown Ustensil
  // displayDropdown(filteredAppliances , btnDropdownUstensiles);

  btnDropdownAppliances.innerHTML = "";
  displayDropdown(filteredAppliances, btnDropdownAppliances);
}

function searchByKeywordsIng(value) {
  /* a partir de tableau filtré de recette (par mots cles) 
  on filtre chaque recette */
  filteredRecipes.forEach((element) => {
    let newRecipeIngredients = element.ingredients;
    for (let i of newRecipeIngredients) {
      filteredIngredients = [...new Set(filteredIngredients.concat(i.ingredient))].sort();
    }
  });

  // on recrée le contenu de dropdown Ustensil
  // displayDropdown(filteredAppliances , btnDropdownUstensiles);

  btnDropdownIngredients.innerHTML = "";
  displayDropdown(filteredIngredients, btnDropdownIngredients);
}

//}
/*
Fonction de creation de nouveau tableau recettes par rapport aux mots clés renseignés dans la barre de recherche
Si le nom de recette , sa description ou ingredients comportent le mot clé tapé alors cette recette est ajouté dans 
le nouveau tableau filteredRecipes
*/

function searchByKeywords(value) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLowerCase().includes(value.toLowerCase()) || recipes[i].description.toLowerCase().includes(value.toLowerCase())) {
      filteredRecipes.push(recipes[i]);
    }
  }
}

function searchByKeywordsIngredients(value) {
  for (let i = 0; i < recipes.length; i++) {
    for (let ingredient of recipes[i].ingredients) {
      if (ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
        filteredRecipes.push(recipes[i]);
      }
    }
  }
}

/*
Cherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 

*/
mainSearch.addEventListener("input", (e) => {
  let valueInput = e.target.value.toLowerCase();

  if (valueInput.length >= 3) {
    e.preventDefault();
    //efface le contenu initial
    sectionRecipes.innerHTML = "";
    //vide le tableau de recettes
    filteredRecipes = [];

    //reapplique la fonction de mots clés
    searchByKeywords(valueInput);
    searchByKeywordsIngredients(valueInput);
    searchByKeywordsUtensils(valueInput);
    searchByKeywordsAppliances(valueInput);
    searchByKeywordsIng(valueInput);
    //a partir de nouveau tableau reconstitué grace à la fonction searchByKeywords, recrée la recette pour chauqe recette de tableau

    filteredRecipes.forEach((recipe) => {
      createRecipe(recipe);
      //showUtensilsDropdown();
    });
  }

  // console.log(filteredRecipes);
});

//.................................................
/*
/*
Fonction qui recupere le tableau des ingredients par mots clés 
 */
/*
let newArrayListeIngredients = [];
function searchByKeywordsIng(value) {
  for (let ingredient of ingredientsListDropdown) {
    console.log(ingredientsListDropdown)
    if (ingredient.toLowerCase().includes(value.toLowerCase())) {
      newArrayListeIngredients.push(ingredient);
      console.log(newArrayListeIngredients);
    }
  }
}
*/
