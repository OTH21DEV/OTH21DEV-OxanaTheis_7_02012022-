class Recipe {
  constructor(data) {
    this.createRecipe(data);
  }

  createRecipe(data) {
    // des Ingredients pour chaque recette
    const ingredientsDetails = data.ingredients;

    const sectionRecipes = document.querySelector(".recipes");
    let listIngredients = "";
    for (let ingredient of ingredientsDetails) {
      //si il y a de quantité et unité on affiche la quantité et unité de l'ingredient
      if (ingredient.quantity && ingredient.unit != undefined) {
        listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}${ingredient.unit}</li>`;
      }
      //si il y a de quantité mais pas d'unité on affiche juste la quantité de l'ingredient
      else if (ingredient.quantity != undefined && ingredient.unit == undefined) {
        listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}:</strong>${ingredient.quantity}</li>`;
      }
      //sinon (si il n'y a pas de quantité ni unité de l'ingredient) on affiche juste l'ingredient
      else {
        listIngredients += `<li class="recipe-ingredients__li"><strong>${ingredient.ingredient}</strong></li>`;
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
}
export { Recipe };
