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
Tableau des recettes filtrés par ingredient depuis la barre prinicpale 
*/
let recipesByIngredients = [];

let recipesByAppliances = [];

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
      recipesByIngredients = tableau de recette comportant ingredient recherché dans la barre principale remplie dans getRecipesByIngredients(value) 
      recipeIngredients = tableau des ingredients de testArray
      newRecipes - tableau vide qui se remplie avec des recettes comprenant le mot depuis la barre de recherche puis le tag 
      
      */
    
      /*
      pour commencer par les tag 
      if (recipesByIngredients.length == 0) {
          //else {ci dessous
*/

      //v1 
      
      let newRecipes = [];
      recipesByIngredients.forEach((element) => {
        let recipeIngredients = [];
        let newRecipeIngredients = [];
        let newRecipeAppliances = [];
        let newRecipeUtensils = [];

        for (let ingredient of element.ingredients) {
          //on remplie le tableau par des ingredients de chaque recette
          recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient))].sort();
        }


        if (recipeIngredients.includes(value)) {
          //on remplie le nouveau tableau par des recettes filtrée par click au tag
          newRecipes.push(element);
        }
      
       

         sectionRecipes.innerHTML = "";
         searchByKeywordsIng(value, newRecipes, newRecipeIngredients);
         searchByKeywordsDropdowns(value, newRecipes, "#container-appliances", newRecipeAppliances, "appliance");
         searchByKeywordsDropdowns(value, newRecipes, "#container-ustensils", newRecipeUtensils, "ustensils");
        
     });
        
        


 //v2 avec recipesArrayIncludingKeyword
      /*
      let newRecipes = [];
      let recipeIngredients = [];
      let newRecipeIngredients = [];
      let newRecipeAppliances = [];
      let newRecipeUtensils = [];
      recipesArrayIncludingKeyword.forEach((element) => {

        for (let ingredient of element.ingredients) {
          //on remplie le tableau par des ingredients de chaque recette
          recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient))].sort();
        }

        //test appareils

        if (recipeIngredients.includes(value) || element.appliance.includes(value)) {
          //on remplie le nouveau tableau par des recettes filtrée par click au tag
         /*
        
          newRecipes.push(element);
        }
        sectionRecipes.innerHTML = "";
        searchByKeywordsIng(value,  newRecipes, newRecipeIngredients);
        searchByKeywordsDropdowns(value,  newRecipes, "#container-appliances", newRecipeAppliances, "appliance");
        searchByKeywordsDropdowns(value,  newRecipes, "#container-ustensils", newRecipeUtensils, "ustensils");
        // à regarder la condition , actuellement la recherche esrt uniquement dan sles ingredient  recipeIngredients
        //peut etre il faut recuperer les tableaux des ustensils et appareils?
      });
*/



        // }
        //...........................................
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
let recipesArrayIncludingKeyword = [];
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

function searchByKeywordsIng(value,arrayRecipes, arrayIngredients) {
  //arrayRecipes- recipesArrayIncludingKeyword
  //arrayIngredients - filteredIngredients

  /* a partir de tableau filtré de recette (par mots cles) 
  on remplie le tableau des ingredients restants */
  arrayRecipes.forEach((element) => {
    for (let ingredient of element.ingredients) {
      arrayIngredients = [...new Set(arrayIngredients.concat(ingredient.ingredient))].sort();
    }
    /* on affiche le nouveau dropdown avec une nouvelle liste filteringredients */
    displayDropdown("#container-ingredient", arrayIngredients);

    //test d'affichage recette filtrée ici au lieu de mainsearch

    new Recipe(element);
  });
}

/*
Fonction de creation d'un nouveau tableau des appareils et ustensils
MAJ la liste dans les dropdown des ustensils et appareils par rapport aux mots clés tapés dans la barre de recherche principale
*/
function searchByKeywordsDropdowns(value, arrayRecipes, container, array, name) {
  /*array = filteredUtensils;filteredAppliances
  container = "#container-ustensils"
  element[name] = element.ustensils, element.appliance
*/
  /* a partir de tableau filtré de recette (par mots cles) 
  on remplie le tableau des appareils et ustensils(dans le sparametres) restants */

  arrayRecipes.forEach((element) => {
    // on accede aux ustensils filtrés de chaque recette
    let newRecipeEl = element[name];

    // on affiche le nouveau dropdown avec une nouvelle liste filteredAppliances, filteredUstensils

    array = [...new Set(array.concat(newRecipeEl))].sort();
  });
  displayDropdown(container, array);
}
//............................................................................

/*
Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent dans leurs noms et/ou dans la description ou dans les ingredients 
les mots clés renseignés dans la barre de recherche

Recherche dans les ingredients - correspondance stricte - trouve huile d'olive mais n'affiche rien pour huile

Probleme : blocage aleatoire de dropdown à l'ouverture apres l'input de la barre de recherche!

*/

function createRecipesArrayIncludedKeyword(value) {
  recipes.forEach((element) => {
    let recipeIngredients = [];
    //tableau des ingredients par recette
    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient.toLowerCase()))].sort();
    }
    if (element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase()) || recipeIngredients.includes(value)) {
      recipesArrayIncludingKeyword.push(element);
    }
    console.log(recipeIngredients);
    //les recettes correpondantes sont envoyées vers nouveau tableau filtré
  });
}

function getRecipesByIngredients(value) {
  recipes.forEach((element) => {
    //tableau des ingredients par recette
    let recipeIngredients = [];
    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      recipeIngredients = [...new Set(recipeIngredients.concat(ingredient.ingredient.toLowerCase()))].sort();
    }
    if (recipeIngredients.includes(value)) {
      recipesByIngredients.push(element);
    }
    //les recettes correpondantes sont envoyées vers nouveau tableau filtré
  });
}

function getRecipesByAppliances(value) {
  recipes.forEach((element) => {
    //tableau des ingredients par recettet
    let recipeAppliances = [];
    //on remplie le tableau par des ingredients de chaque recette
    recipeAppliances = [...new Set(recipeAppliances.concat(element.appliance.toLowerCase()))].sort();

    if (recipeAppliances.includes(value)) {
      recipesByAppliances.push(element);
    }

    //les recettes correpondantes sont envoyées vers nouveau tableau filtré
  });
}

/*
Barre de recherche principale reCherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 

*/
//filteredRecipes - [] recettes par nom, description, ingrediets confondus
// recipesByIngredients - [] recette filtré uniquement par ingredient comprenant le mot clé*
// recipesByAppliances = [] recette filtré uniquement par iappliances comprenant le mot clé*

mainSearch.addEventListener("input", (e) => {
  let valueInput = e.target.value.toLowerCase();
  sectionRecipes.innerHTML = "";

  if (valueInput.length >= 3) {
    e.preventDefault();
    //efface le contenu initial
    //vide le tableau de recettes
    recipesArrayIncludingKeyword = [];
    filteredUtensils = [];
    filteredAppliances = [];
    filteredIngredients = [];
    /*
    recherche dans le nom et description de recette depuis la barre principale 
    */

    createRecipesArrayIncludedKeyword(valueInput);
    getRecipesByIngredients(valueInput);
    getRecipesByAppliances(valueInput);
  
    console.log(recipesByIngredients);

    /*

MAJ des listes de dropdowns (ing, ust, app) par rapport au mot clé renseigné dans
la barre de recherche principale
*/

    searchByKeywordsIng(valueInput,recipesArrayIncludingKeyword, filteredIngredients);
    searchByKeywordsDropdowns(valueInput, recipesArrayIncludingKeyword, "#container-appliances", filteredAppliances, "appliance");
    searchByKeywordsDropdowns(valueInput, recipesArrayIncludingKeyword, "#container-ustensils", filteredUtensils, "ustensils");
  } else {
    recipes.forEach((recipe) => {
      new Recipe(recipe);
    });
  }
});

/*
INPUT DROPDOWN
Recherche dans  les inputs dropdowns (ing, ust, app) 
*/
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
searchInDropdown("#container-ingredient", ingredientsListDropdown);
searchInDropdown("#container-appliances", appliancesListDropdown);
searchInDropdown("#container-ustensils", utensilsListDropdown);
