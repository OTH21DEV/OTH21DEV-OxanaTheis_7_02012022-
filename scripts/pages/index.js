import { recipes } from "./../../data/recipes.js";
import { Recipe } from "../factories/Recipe.js";
import { Dropdown } from "../factories/Dropdown.js";

const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

/*
Tableau des ustensils vide ( puis trier sans doublon pour appeler dans displayDropDown)
*/
let utensilsListDropdown = [];
/*
Tableau des appareils vide ( puis trier sans doublon pour appele rdans  displayDropDown)
*/
let appliancesListDropdown = [];
/*
Tableau des ingredients vide ( puis trier sans doublon pour appeler dans displayDropDown)
*/
let ingredientsListDropdown = [];

/*
tableau vide de recettes( rempli au fur et au mesure par les recettes en fonction de 
mots clés depuis la barre de recherche principale)
*/
let recipesArrayIncludingKeyword = recipes;

//Creation des recettes au chargement de la page

for (let i = 0; i < recipes.length; i++) {
  let recipe = recipes[i];
  // createRecipe(recipe);
  new Recipe(recipe);
}

/*
Fonction pour supprimer des doublons afin de recreer le contenu initial de dropdown
*/

function removeDuplicatesDropdown() {
  recipes.forEach((recipe) => {
    let recipeUtensils = recipe.ustensils;
    let recipeAppliances = recipe.appliance;

    let recipeIngredients = recipe.ingredients;

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

let test = new Dropdown();
test.displayDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
test.displayDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
test.displayDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);


/*
Creation de la liste pour chaque element -ingredients, appareils, ustensiles
Creation  de tags
*/

/*
function createListe(container, array) {
  let ulElement = document.querySelector(`${container} .elements-liste`);

  //on vide le contenu pour repartir à chaque fois avec une nouvelle liste maj en fonction des mots clés
  ulElement.innerHTML = "";

  //on cree le container pour les tags (n 7,8)

  let tagContainer = document.querySelector(".tag-container");
  array.forEach((element) => {
    const liElement = document.createElement("li");

    ulElement.appendChild(liElement);
    liElement.innerHTML = element;

    /*
    Creation  de tags :on rajoute evenement au click pour rajouter des tags (n 7,8)
    */


    /*
    liElement.addEventListener("click", (e) => {
      addTags(e, container);

    });
  });
}
*/


function addTags(e, container) {
  /*
  Create tag 
  */
  let value = e.target.childNodes[0].data;
  let tagContainer = document.querySelector(".tag-container");
  let tag = document.createElement("div");
  tag.className = "tag";
  tagContainer.appendChild(tag);

  tag.style.display = "flex";
  tagContainer.style.display = "flex";
  //" \u00a0" rajoute espace !
  tag.innerHTML +=
    value +
    " \u00a0" +
    `<i class="fa-regular fa-circle-xmark"></i>
`;
  //on attribue id de container pour avoir la couleur
  tag.setAttribute("id", `${container}`.replace("#", ""));

  /*
Trie de recette par tag 
*/

  let recipesByTags = [];

  recipesArrayIncludingKeyword.forEach((element) => {
    let listeIngredients = [];

    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient))].sort();
    }

    if (container.replace("#", "") == "container-ingredient") {
      if (listeIngredients.includes(value)) {
        recipesByTags.push(element);
      }
    }

    if (container.replace("#", "") == "container-appliances") {
      if (element.appliance == `${value}`) {
        recipesByTags.push(element);
      }
    }

    if (container.replace("#", "") == "container-ustensils") {
      if (element.ustensils.includes(`${value.toLowerCase()}`)) {
        recipesByTags.push(element);
      }
    }
    //on attribue la valeur du tableau obtenu au tableau de travail recipesArrayIncludingKeyword - qui recupere les recettes filtrées ici par tag
    recipesArrayIncludingKeyword = recipesByTags;
    displayRecipes(recipesArrayIncludingKeyword);
  });

  console.log(recipesArrayIncludingKeyword);

  /*
Fermeture tag
*/

  let cross = tag.children[0];

  cross.addEventListener("click", function (e) {
    removeTags(e, container);
  });
}


function getIngredients(element) {
  let listeIngredients = [];

  for (let ingredient of element.ingredients) {
    //on remplie le tableau par des ingredients de chaque recette
    listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient.toLowerCase().trim()))].sort();
  }
  return listeIngredients;
}
/*
Affiche les recettes suite au filtre , maj la liste et la recherche dropdown
*/
/*
function displayRecipes(array) {
  sectionRecipes.innerHTML = "";
  searchByKeywordsIng(array);
  searchByKeywordsDropdowns(array, "#container-appliances", "appliance");
  searchByKeywordsDropdowns(array, "#container-ustensils", "ustensils");
  array.forEach((element) => {
    new Recipe(element);
  });
}
*/

/*
function removeTags(e, container) {
  e.target.parentElement.remove();
  let tagContainer = document.querySelector(".tag-container");
  let selectedTags = tagContainer.children.length;

  let recipesSearch = recipes;
  let newArray = [];

  if (mainSearch.value.length >= 3) {
    recipesSearch.forEach((element) => {
      let recipeIngredients = getIngredients(element);

      if (
        element.name.toLowerCase().includes(mainSearch.value.toLowerCase()) ||
        element.description.toLowerCase().includes(mainSearch.value.toLowerCase()) ||
        recipeIngredients.includes(mainSearch.value)
      ) {
        newArray.push(element);
      }
    });
    recipesSearch = newArray;
  }

  if (selectedTags >= 1) {
    newArray = [];
    for (let i of tagContainer.childNodes) {
      let tagTxt = i.innerText.toLowerCase().trim();

      recipesSearch.forEach((element) => {
        let listeIngredients = getIngredients(element);

        if (container.replace("#", "") == "container-ingredient") {
          if (listeIngredients.includes(tagTxt)) {
            newArray.push(element);
          }
        }

        if (container.replace("#", "") == "container-appliances") {
          if (element.appliance == `${tagTxt}`) {
            newArray.push(element);
          }
        }

        if (container.replace("#", "") == "container-ustensils") {
          if (element.ustensils.includes(`${tagTxt}`)) {
            newArray.push(element);
          }
        }
      });

      recipesSearch = newArray;
      newArray = [];
    }
  }
  //.............

  displayRecipes(recipesSearch);

  console.log(recipesSearch);
}
*/
/*
function displayDropdown(container, array) {
  //container-ingredient, container-appliances, container-utensils
  let arrow = document.querySelectorAll(`${container} .btn-dropdown-container__arrow-down`)[0];
  let title = document.querySelectorAll(`${container} .btn-dropdown`)[0];
  let liste = document.querySelectorAll(`${container} .popup-input`)[0];
  let cont = document.querySelectorAll(`${container}`)[0];

  createListe(container, array);
  arrow.addEventListener("click", (e) => {
    if (arrow.dataset.open === "false") {
      cont.className = "btn-dropdown-container--onclick";
      liste.classList.add("popup-input--onclick");
      title.classList.add("btn-dropdown--onclick");
      document.querySelector(".wrapper-btns-dropdown").classList.add("wrapper-btns-dropdown--onclick");
      arrow.classList.add("btn-dropdown-container__arrow-down--onclick");
      arrow.setAttribute("data-open", "true");
    } else {
      title.classList.remove("btn-dropdown--onclick");
      liste.classList.remove("popup-input--onclick");
      arrow.classList.remove("btn-dropdown-container__arrow-down--onclick");
      cont.className = "btn-dropdown-container";
      document.querySelector(".wrapper-btns-dropdown").classList.remove("wrapper-btns-dropdown--onclick");
      arrow.setAttribute("data-open", "false");
    }
  });
}
*/

/*
displayDropdown("#container-ingredient", ingredientsListDropdown);
displayDropdown("#container-appliances", appliancesListDropdown);
displayDropdown("#container-ustensils", utensilsListDropdown);
*/

/*
new Dropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
new Dropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
new Dropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);
*/



/*
Fonction de creation d'une nouvelle liste  ingredients à partir de tableau de recettes filtrées par 
mots clés tapés dans la barre de recherche principale

*/

function searchByKeywordsIng(arrayRecipes) {
  //arrayRecipes- recipesArrayIncludingKeyword

  let listeIngredients = [];
  /* a partir de tableau filtré de recette (par mots cles) 
  on remplie le tableau des ingredients */
  arrayRecipes.forEach((element) => {
    for (let ingredient of element.ingredients) {
      listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient))].sort();
    }
  });
  // on crée la nouvelle liste
  createListe("#container-ingredient", listeIngredients);
}

/*
Fonction de creation d'une nouvelle liste des appareils et ustensils a partir de tableau de recettes filtrées par 
mots clés tapés dans la barre de recherche principale

*/

function searchByKeywordsDropdowns(arrayRecipes, container, name) {
  /*
  arrayRecipes- recipesArrayIncludingKeyword
  container = "#container-ustensils"
  element[name] = element.ustensils, element.appliance
*/

  let listeElements = [];
  arrayRecipes.forEach((element) => {
    // a partir de tableau filtré de recette (par mots cles) on remplie le tableau des appareils et ustensils

    listeElements = [...new Set(listeElements.concat(element[name]))].sort();
  });
  // on crée la nouvelle liste
  createListe(container, listeElements);
}

/*
Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent dans leurs noms et/ou dans la description ou dans les ingredients 
les mots clés renseignés dans la barre de recherche


*/


function createRecipesArrayIncludedKeyword(value) {
  let array = [];
  //array = array vide à remplir par de recette en fonction de mots clés/tag
  recipesArrayIncludingKeyword.forEach((element) => {
    let recipeIngredients = [];
    //tableau des ingredients par recette
    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient.toLowerCase()))].sort();
    }
    if (element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase()) || recipeIngredients.includes(value)) {
      //les recettes correpondantes sont envoyées vers nouveau tableau filtré
      array.push(element);
    }
  });
  recipesArrayIncludingKeyword = array;
  /*
    
    MAJ des listes de dropdowns (ing, ust, app) par rapport au mot clé renseigné dans
    la barre de recherche principale
    */

  //
  let newTest = new Dropdown();
  newTest.displayRecipes(recipesArrayIncludingKeyword)
 // displayRecipes(recipesArrayIncludingKeyword);
}

/*
Barre de recherche principale reCherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 

*/

mainSearch.addEventListener("input", (e) => {
  let valueInput = e.target.value.toLowerCase();

  if (valueInput.length >= 3) {
    //efface le contenu initial
    sectionRecipes.innerHTML = "";

    e.preventDefault();

    // recherche dans le nom et description de recette depuis la barre principale

    createRecipesArrayIncludedKeyword(valueInput);

    console.log(recipesArrayIncludingKeyword);

    if (recipesArrayIncludingKeyword.length == 0) {
      displayMessageV2();
      recipesArrayIncludingKeyword = recipes;
    }
  } else {
    if (valueInput.length === 0) {
      recipesArrayIncludingKeyword = recipes;
      displayRecipes(recipesArrayIncludingKeyword);
    }
  }
});

/*
INPUT DROPDOWN
Recherche dans  les inputs dropdowns (ing, ust, app) 
*/

function searchInDropdown(container, array) {
  const dropdownInput = document.querySelectorAll(`${container} .input`)[0];
  let newListe;

  dropdownInput.addEventListener("input", (e) => {
    let inputValue = e.target.value.toLowerCase();

    newListe = array.filter((element) => {
      return element.toLowerCase().includes(inputValue);
    });
    createListe(container, newListe);
  });
}

searchInDropdown("#container-ingredient", ingredientsListDropdown);
searchInDropdown("#container-appliances", appliancesListDropdown);
searchInDropdown("#container-ustensils", utensilsListDropdown);


/*
let searchDropdown = new Dropdown();


searchDropdown.searchInDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);
*/


function displayMessage() {
  let messageContainer = document.createElement("div");
  messageContainer.className = "message";
  let message = `Aucune recette ne correspond à votre critère...vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
  let arrayMessage = message.split("");
  let timeLooper;
  sectionRecipes.appendChild(messageContainer);

  function loop() {
    if (arrayMessage.length > 0) {
      messageContainer.innerHTML += arrayMessage.shift();
    } else {
      clearTimeout(timeLooper);
    }
    timeLooper = setTimeout(loop, 70);
  }

  loop();
}
function displayMessageV2() {
  let message = document.createElement("h2");
  message.className = "messageV2";
  message.innerHTML = `Aucune recette ne correspond à votre critère...vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

  sectionRecipes.appendChild(message);
}
export{recipes}