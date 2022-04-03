import { recipes } from "./../../data/recipes.js";
import { Recipe } from "../factories/Recipe.js";
import { Dropdown } from "../factories/Dropdown.js";
import { MainInput } from "../factories/MainInput.js";
import { removeDuplicatesDropdown, utensilsListDropdown,appliancesListDropdown,ingredientsListDropdown } from "../utils/removeDuplicatesDropdown.js";


/*
tableau vide de recettes( rempli au fur et au mesure par les recettes en fonction de 
mots clés depuis la barre de recherche principale)
*/
let recipesArrayIncludingKeyword = recipes;

//Creation des recettes au chargement de la page

for (let i = 0; i < recipes.length; i++) {
  let recipe = recipes[i];
  new Recipe(recipe);
}

/*
Fonction pour supprimer des doublons afin de recreer le contenu initial de dropdown
*/

removeDuplicatesDropdown();

new Dropdown().displayDropdown("#container-ingredient", ingredientsListDropdown, recipesArrayIncludingKeyword);
new Dropdown().displayDropdown("#container-appliances", appliancesListDropdown, recipesArrayIncludingKeyword);
new Dropdown().displayDropdown("#container-ustensils", utensilsListDropdown, recipesArrayIncludingKeyword);

/*
 reCherche par mot clé et affiche uniquement les recettes correspondantes si comportent les mots 
*/
new MainInput(recipesArrayIncludingKeyword);

/*
INPUT DROPDOWN
Recherche dans  les inputs dropdowns (ing, ust, app) 
*/

function searchInDropdown(container, array,arrayRecipes) {
  const dropdownInput = document.querySelectorAll(`${container} .input`)[0];
  let newListe;
  dropdownInput.addEventListener("input", (e) => {
  //  arrayRecipes.forEach((element) => {
    let inputValue = e.target.value.toLowerCase();

    newListe = array.filter((element) => {
      console.log(array)
      console.log(element)
      return element.toLowerCase()== inputValue.toLowerCase();
    });
 
    new Dropdown().createListe(container, array,arrayRecipes);
  //})
  });
  console.log(newListe)
}
/*
searchInDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
searchInDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
searchInDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);
*/

/*
let searchDropdown = new Dropdown();


searchDropdown.searchInDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
searchDropdown.searchInDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);
*/

export { recipes };
