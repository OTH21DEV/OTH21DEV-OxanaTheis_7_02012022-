import { getIngredients } from "../utils/getIngredients.js";


function getWords(element) {
  let words = [];
  let recipeWords = [];
  let listeIngredients = getIngredients(element);

  //concatenation des mots, supression de ponctuation,split en sous chaine
  words = [...new Set(words.concat(element.name.toLocaleLowerCase(), listeIngredients, element.description.toLocaleLowerCase(), element.appliance.toLocaleLowerCase(), element.ustensils))]
    .join(" ")
    .replace(/[,;.]$/, "")
    .split(" ");

  //retour de mots contenant plus que 2 lettres

  words = words.filter(function (word) {
    return word.length > 2;
  });

  //supression de doublon

  recipeWords = [...new Set(recipeWords.concat(words))].sort();

  recipeWords = { id: element.id, mots: recipeWords };

  return recipeWords;
}
export { getWords };
