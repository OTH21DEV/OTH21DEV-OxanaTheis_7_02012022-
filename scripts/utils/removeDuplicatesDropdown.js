import { recipes } from "./../../data/recipes.js";
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
export { removeDuplicatesDropdown, utensilsListDropdown, appliancesListDropdown, ingredientsListDropdown };
