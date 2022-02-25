import { recipes } from "./../../data/recipes.js";
import { Recipe } from "../factories/Recipe.js";

const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

for (let i = 0; i < recipes.length; i++) {
  let recipe = recipes[i];
  // createRecipe(recipe);
  new Recipe(recipe);
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
Const des elements Dropdowns
*/

//Ingredients
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

function createListe(container) {
  let ulElement = document.querySelector(`${container} .elements-liste`);
  console.log(ulElement);
  for (let ingredient of ingredientsListDropdown) {
    let liElement = document.createElement("li");
    ulElement.appendChild(liElement);
    liElement.textContent = `${ingredient}`;
    //ulElement.appendChild(`<li> ${ingredient}</li>`);
  }
}

/*
function createElementsListe(array, ulElement) {
  array.forEach((element) => {
    const liElement = document.createElement("li");
    liElement.classList.add("input-liste");
    ulElement.appendChild(liElement);
    liElement.innerHTML = element;
  });
}

*/

function displayDropdown(container) {
  //container-ingredient, container-appliances, container-utensils
  let arrow = document.querySelectorAll(`${container} .btn-dropdown-container__arrow-down`)[0];
  arrow.setAttribute("data-open", "false");

  createListe(container);

  arrow.addEventListener("click", (e) => {
    arrow.setAttribute("data-open", "true");
    let title = document.querySelectorAll(`${container} .btn-dropdown`)[0];
    let liste = document.querySelectorAll(`${container} .popup-input`)[0];
    let cont=  document.querySelectorAll(`${container}`)[0];
    console.log(cont)

    if (arrow.dataset.open === false) {
      title.style.display = "flex";
      liste.style.display = "none";
      let test = arrow.getAttribute("data-open");
      console.log(test);
    } else {
      console.log(e.target);
      // arrow.setAttribute('data-open', 'true')
      cont.style.width= '42%';
      cont.style.marginLeft = '5px';
      liste.style.display = "flex";
      title.style.display = "none";
      document.querySelector(".wrapper-btns-dropdown").classList.add("wrapper-btns-dropdown--onclick");
    }

    arrow.style.transform = "rotate(180deg)";
  });
}
displayDropdown("#container-ingredient");
displayDropdown("#container-appliances");
displayDropdown("#container-ustensils");

function displayDropdownIng(elementPopup, array, ulElement, btn, elementContainer) {
  window.addEventListener("click", (e) => {
    if (e.target.classList[0] == "btn-dropdown-container__arrow-down-ing") {
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);
      createElementsListe(array, ulElement);
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
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);
      createElementsListe(array, ulElement);
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
      OpenPopup(elementPopup, array, ulElement, btn, elementContainer);

      createElementsListe(array, ulElement);
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
  /*
 version initiale avec creation LI dans cette fonction
 */
  // createElementsListe(array, ulElement);
}

function ClosePopup(elementPopup, btn, elementContainer) {
  elementPopup.style.display = "none";
  document.querySelector(".wrapper-btns-dropdown").classList.remove("wrapper-btns-dropdown--onclick");
  btn.style.display = "flex";
  elementContainer.classList.remove("btn-dropdown-container--onclick");
}

//displayDropdownIng(popupIng, ingredientsListDropdown, ulElementIng, btnIng, dropDownContainerIng);
//displayDropdownAppl(popupAppl, appliancesListDropdown, ulElementAppl, btnAppl, dropDownContainerAppl);
//displayDropdownUts(popupUts, utensilsListDropdown, ulElementUts, btnUts, dropDownContainerUts);

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
tableau vide de recettes( rempli au fur et au mesure par les recettes en fonction de 
mots clés depuis  la barre de recherche)
*/
let filteredRecipes = [];
/*
tableaux vides des ingredients, appareils, ustensils(remplis au fur et au mesure 
en fonction de recettes restantes lors de recherche par mots clés depuis la barre de recherche)
*/
let filteredUtensils = [];
let filteredAppliances = [];
let filteredIngredients = [];

/*
Fonction de creation d'un nouveau tableau des ingredients 
*/

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

  ulElementIng.innerHTML = "";
  createElementsListe(filteredIngredients, ulElementIng);
  //displayDropdownIng(popupIng,filteredIngredients, ulElementIng, btnIng, dropDownContainerIng);
}

/*
Fonction de creation d'un nouveau tableau des appareils
*/

function searchByKeywordsAppliances(value) {
  /* a partir de tableau filtré de recette (par mots cles) 
  on filtre chaque recette */
  filteredRecipes.forEach((element) => {
    let newRecipeAppliances = element.appliance;

    filteredAppliances = [...new Set(filteredAppliances.concat(newRecipeAppliances))].sort();
  });

  //tri bien si popup ouvert pas quand il est fermé
  ulElementAppl.innerHTML = "";
  createElementsListe(filteredAppliances, ulElementAppl);

  //displayDropdownAppl(popupAppl, filteredAppliances, ulElementAppl, btnAppl, dropDownContainerAppl);
}

/*
Fonction de creation d'un nouveau tableau des appareils
*/
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

  ulElementUts.innerHTML = "";
  createElementsListe(filteredUtensils, ulElementUts);

  // displayDropdownUts(popupUts,filteredUtensils, ulElementUts, btnUts, dropDownContainerUts);
}

/*
Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent dans leurs noms et/ou dans la description
les mots clés renseignés dans la barre de recherche

*/

function searchByKeywords(value) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLowerCase().includes(value.toLowerCase()) || recipes[i].description.toLowerCase().includes(value.toLowerCase())) {
      filteredRecipes.push(recipes[i]);
    }
  }
}
/*
Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent des ingredients correspondants
aux mots clés renseignés dans la barre de recherche

*/

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
    filteredUtensils = [];
    filteredAppliances = [];
    filteredIngredients = [];
    //reapplique la fonction de mots clés
    searchByKeywords(valueInput);
    searchByKeywordsIngredients(valueInput);
    searchByKeywordsUtensils(valueInput);
    searchByKeywordsAppliances(valueInput);
    searchByKeywordsIng(valueInput);
    //a partir de nouveau tableau reconstitué grace à la fonction searchByKeywords, recrée la recette pour chauqe recette de tableau

    filteredRecipes.forEach((recipe) => {
      new Recipe(recipe);
    });
  }
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
