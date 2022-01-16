import { recipes } from "/recipes.js";
/*
for (let i = 0; i < recipes.length; i++) {
  //tous les recettes
  const allRecipes = recipes[i];

  createRecipes(allRecipes);
}

function createRecipes(data) {
  // des Ingredients pour chaque recette
  const ingredientsDetails = data.ingredients;

  const sectionRecipes = document.querySelector(".recipes");

  let listIngredients = "";
  for (let ingredient of ingredientsDetails) {
    console.log(ingredient.ingredient)
    if (ingredient.unit) {
      listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}${ingredient.unit}</li>`;
    } else {
      listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}</li>`;
    }
  }

  sectionRecipes.innerHTML += `
<article class="wrapper-recipe">
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
*/

for (let i = 0; i < recipes.length; i++) {
  //une recette
  const recipe = recipes[i];

  createRecipe(recipe);
}

function createRecipe(data) {
  // des Ingredients pour chaque recette
  const ingredientsDetails = data.ingredients;

  const sectionRecipes = document.querySelector(".recipes");

  let listIngredients = "";
  for (let ingredient of ingredientsDetails) {
    //  btnDropdownIngredients.innerHTML += `

    //    <option class= "listbox__date" value="">${ingredient.ingredient}</option>

    //  `;
    // console.log(ingredient.ingredient);
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
Tableau des ustensils vide ( puis trier sans doublon)
*/
let appliancesListDropdown = [];
/*
Tableau des ustensils vide ( puis trier sans doublon)
*/
let ingredientsListDropdown = [];
/*
Fonction pour creer le contenu initial de dropdown
*/
function createContentDropdown() {
  recipes.forEach((recipe) => {
    let recipeUtensils = recipe.ustensils;
    let recipeAppliances = recipe.appliance;
    /*tableau des ingredients (chaque ingredient est un objet du tableau)
    (5) [{…}, {…}, {…}, {…}, {…}]
0: {ingredient: 'Pâte feuilletée', quantity: 400, unit: 'g'}
1: {ingredient: 'Oeuf', quantity: 6}

    */
    let recipeIngredients = recipe.ingredients;
    console.log(recipeIngredients);

    recipeIngredients.forEach((ingredient) => {
      //ingredient - un objet contenant {ingredient: 'Beurre', quantity: 500, unit: 'g'}
      ingredientsListDropdown = [
        ...new Set(ingredientsListDropdown.concat(ingredient.ingredient)),
      ].sort();
      //ingredient.ingredient - un seul ingredient de l'objet
      console.log(recipeIngredients);
      console.log(ingredient);
      console.log(ingredient.ingredient);
      console.log(ingredientsListDropdown);
    });

    //on remplie (concate)  le tableau vide utensilsListDropdown par les tableaux recipe.ustensils par recette
    utensilsListDropdown = [
      ...new Set(utensilsListDropdown.concat(recipeUtensils)),
    ].sort();
    //  console.log(utensilsListDropdown);

    //on remplie (concate)  le tableau vide appliancesListDropdown par les tableaux recipe.appliance par recette
    appliancesListDropdown = [
      ...new Set(appliancesListDropdown.concat(recipeAppliances)),
    ].sort();

    
  });
}
createContentDropdown();

function showUtensilsDropdown() {
  const btnDropdownIngredients = document.querySelector(
    ".btn-dropdown-ingredients"
  );
  const btnDropdownAppliances = document.querySelector(
    ".btn-dropdown-appliances"
  );
  const btnDropdownUstensiles = document.querySelector(
    ".btn-dropdown-utensils"
  );

  utensilsListDropdown.forEach((utensil) => {
    btnDropdownUstensiles.innerHTML += `
          <option class= "listbox__date" value="">${utensil}</option>
          `;
  });
  appliancesListDropdown.forEach((appliance) => {
    btnDropdownAppliances.innerHTML += `
          <option class= "listbox__date" value="">${appliance}</option>
          `;
  });

  ingredientsListDropdown.forEach((ingredient) => {
    btnDropdownIngredients.innerHTML += `
          <option class= "listbox__date" value="">${ingredient}</option>
          `;
  });
}
showUtensilsDropdown();
/*
document.querySelector(".listbox__popular").addEventListener("click", function () {
  document.querySelector(".listbox__popular").style.display = "none";
})
*/