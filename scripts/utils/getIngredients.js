function getIngredients(element) {
    let listeIngredients = [];
  
    for (let ingredient of element.ingredients) {
      //on remplie le tableau par des ingredients de chaque recette
      listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient.toLowerCase().trim()))].sort();
    }
    return listeIngredients;
  }

  export{getIngredients}