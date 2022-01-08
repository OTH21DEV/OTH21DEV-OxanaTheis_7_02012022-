import { recipes } from "/recipes.js";

for (let i = 0; i < recipes.length; i++) {
  //tous les recettes
  const allRecipes = recipes[i];

  // des Ingredients pour chaque recette
  const ingredientsDetails = allRecipes.ingredients;

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
<article class="wrapper-recipe">
<div class= "recipe-img"></div>
<div class="wrapper">
<div class="wrapper-recipe-tittle-time">
<h2 class="recipe-tittle">${allRecipes.name}</h2>
<div class = "recipe-time">
<i class="far fa-clock"></i>
<div>${allRecipes.time} min</div>
</div>
</div>
<div class="wrapper-recipe-ingredients-making">
<ul class="recipe-ingredients">
${listIngredients}
</ul>
<div class="recipe-making">${allRecipes.description}
</div>
</div>
</div>
</article>
`;
}
//}
/*


function createRecipe(data){
    const sectionRecipes = document.querySelector(".recipes");
    let listIngredients ="";
    for (let ingredient of data.ingredients){
   //   console.log(ingredient)
      listIngredients+=`<li class="recipe-ingredients"><strong>${ingredient}:</strong> 400ml <br></li>`
    }

    sectionRecipes.innerHTML = `
    <article class="wrapper-recipe">
    <div class= "recipe-img"></div>
    <div class="wrapper">
  <div class="wrapper-recipe-tittle-time">
    <h2 class="recipe-tittle">${data.name}</h2>
  <div class = "recipe-time">
    <i class="far fa-clock"></i>
    <div>${data.time}</div>
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
    `

}
*/
