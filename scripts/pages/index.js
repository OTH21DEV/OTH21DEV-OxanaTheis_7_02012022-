import { recipes } from "./../../data/recipes.js";
import { Recipe } from "../factories/Recipe.js";
import { Dropdown } from "../factories/Dropdown.js";

import { MainInput} from "../factories/MainInput.js";
//import { removeDuplicatesDropdown } from "../utils/removeDuplicatesDropdown.js";

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

//removeDuplicatesDropdown(ingredientsListDropdown,appliancesListDropdown,utensilsListDropdown);
removeDuplicatesDropdown()

new Dropdown().displayDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
new Dropdown().displayDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
new Dropdown().displayDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);


/*
 reCherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 
*/
new MainInput(recipesArrayIncludingKeyword)








/*
INPUT DROPDOWN
Recherche dans  les inputs dropdowns (ing, ust, app) 
*/
/*
function searchInDropdown(container, array,arrayRecipes) {
  const dropdownInput = document.querySelectorAll(`${container} .input`)[0];
  let newListe;

  dropdownInput.addEventListener("input", (e) => {
    let inputValue = e.target.value.toLowerCase();

    newListe = array.filter((element) => {
      return element.toLowerCase().includes(inputValue);
    });
    new Dropdown().createListe(container, newListe,arrayRecipes);
  });
}

searchInDropdown("#container-ingredient", ingredientsListDropdown);
searchInDropdown("#container-appliances", appliancesListDropdown);
searchInDropdown("#container-ustensils", utensilsListDropdown);
*/

/*
let searchDropdown = new Dropdown();


searchDropdown.searchInDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);
*/



export{recipes}