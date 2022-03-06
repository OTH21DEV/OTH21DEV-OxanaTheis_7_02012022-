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
Creation de la liste pour chaque element -ingredients, appareils, ustensiles
Creation  de tags
*/
function createListe(container, array) {
  let ulElement = document.querySelector(`${container} .elements-liste`);

  //on vide le contenu pour repartir à chaque fois avec une nouvelle liste maj en fonction des mots clés
  ulElement.innerHTML = "";

  //on cree le container pour les tags (n 7,8)
  // let tagContainer = document.createElement("div");
  let tagContainer = document.querySelector(".tag-container");
  // tagContainer.className = "tag-container";
  // ulElement.appendChild(tagContainer);
  //document.querySelector('section').appendChild(tagContainer);

  array.forEach((element) => {
    const liElement = document.createElement("li");
    //  liElement.classList.add("input-liste");
    ulElement.appendChild(liElement);
    liElement.innerHTML = element;

    /*
    Creation  de tags
    */
    //on rajoute evenement au click pour rajouter des tags (n 7,8)
    liElement.addEventListener("click", (e) => {
      let value = e.target.childNodes[0].data;

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
      //.....................................................................
      //V1 TEST de trie de recette par tag
      //.........................................................

      /*
      let newTest = [];
      let newIngred = [];
      console.log(filteredRecipes)
      filteredRecipes.forEach((element) => {
        for (let ingredient of element.ingredients) {
          //si ingredient existe parmi des ingredients de recettes filtrées
          if (ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) {
            //on rajoute cette recette au tableau filtré
            // newIngred.push(ingredient);
            // console.log(newIngred);
            /*
            element.ingredients.forEach((ingredient) => {
              console.log(ingredient)
              newIngred = [...new Set(newIngred.concat(ingredient))].sort();*/
      //newIngred.push(ingredient);
      //     console.log(newIngred);
      //console.log(element.ingredients);
      //  })
      //   }
      //displayDropdown("#container-ingredient", ingredientsListDropdown);
      //on recrée la liste de recette à partir de nouveau tableau de recette actualisé
      /*
          
            element.ingredients.forEach((ingredient) => {
              console.log(ingredient);
              newIngred = [...new Set(newIngred.concat(ingredient))].sort();
              //newIngred.push(ingredient);
            });*/
      // filteredIngredients = [];
      //  filteredIngredients = [...new Set(filteredIngredients.concat(ingredient.ingredient))].sort();

      //Version fonctionnelle
      /*        newTest.push(element);
         
         
         
        }


      }
    });
*/
      //............................................
      /*
    sectionRecipes.innerHTML = "";
    newTest.forEach((recipe) => {
      new Recipe(recipe);
    })*/
      /*
    sectionRecipes.innerHTML = "";
    newTest.forEach((recipe) => {
      new Recipe(recipe);
    });*/
    });
  });
}

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

displayDropdown("#container-ingredient", ingredientsListDropdown);
displayDropdown("#container-appliances", appliancesListDropdown);
displayDropdown("#container-ustensils", utensilsListDropdown);

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
MAJ la liste dans le dropdown des ingredients par rapport aux mots clés tapés dans la barre de recherche principale
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

  displayDropdown("#container-ingredient", filteredIngredients);
}

/*
Fonction de creation d'un nouveau tableau des appareils et ustensils
MAJ la liste dans les dropdown des ustensils et appareils par rapport aux mots clés tapés dans la barre de recherche principale
*/
function searchByKeywordsDropdowns(value, container, array, name) {
  /*array = filteredUtensils;filteredAppliances
  container = "#container-ustensils"
  element[name] = element.ustensils, element.appliance
*/
  /*a partir de tableau filtré de recette (par mots cles)
  on filtre chaque recette*/

  filteredRecipes.forEach((element) => {
    // on accede aux ustensils filtrés de chaque recette
    let newRecipeEl = element[name];

    //on remplie le nouveau tableau des ustensiles filtrés par les ustensils de chaque recette

    array = [...new Set(array.concat(newRecipeEl))].sort();
  });

  displayDropdown(container, array);
}
//............................................................................


/*
Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent dans leurs noms et/ou dans la description ou dans les ingredients 
les mots clés renseignés dans la barre de recherche

Recherche dans les ingredients - correspondance stricte - trouve huile d'olive mais n'affiche rien pour huile

*/



function searchByKeywords(value) {
  recipes.forEach((element) => {
    //tableau des ingredients par recette
    let recipeIngredients = [];
    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient.toLowerCase()))].sort();
    }
    if (element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase()) || recipeIngredients.includes(value)) {
      filteredRecipes.push(element);
    }
    //les recettes correpondantes sont envoyées vers nouveau tableau filtré
  });
}

/*
Barre de recherche principale reCherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 

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
    /*
   recherche dans le nom et description de recette depuis la barre principale 
    */

    searchByKeywords(valueInput);

    filteredRecipes.forEach((recipe) => {
      new Recipe(recipe);
    });

   
    /*

MAJ des listes de dropdowns (ing, ust, app) par rapport au mot clé renseigné dans
la barre de recherche principale
*/

    searchByKeywordsIng(valueInput);
    searchByKeywordsDropdowns(valueInput, "#container-appliances", filteredAppliances, "appliance");
    searchByKeywordsDropdowns(valueInput, "#container-ustensils", filteredUtensils, "ustensils");

    // test d'appel des fonctions

    searchInDropdown("#container-ingredient", ingredientsListDropdown);
    searchInDropdown("#container-appliances", appliancesListDropdown);
    searchInDropdown("#container-ustensils", utensilsListDropdown);

    //a partir de nouveau tableau reconstitué grace à la fonction searchByKeywords, recrée la recette pour chauqe recette de tableau
    /*
    filteredRecipes.forEach((recipe) => {
      new Recipe(recipe);
    });
    */
  }
});

let newListe;

function searchInDropdown(container, array) {
  const dropdownInput = document.querySelectorAll(`${container} .input`)[0];

  dropdownInput.addEventListener("input", (e) => {
    let inputValue = e.target.value.toLowerCase();

    newListe = array.filter((element) => {
      return element.toLowerCase().includes(inputValue);
    });

    displayDropdown(container, newListe);
  });
}
/*
searchInDropdown("#container-ingredient", ingredientsListDropdown);
searchInDropdown("#container-appliances", appliancesListDropdown);
searchInDropdown("#container-ustensils", utensilsListDropdown);
*/
