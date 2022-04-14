import { getIngredients } from "../utils/getIngredients.js";

//v1
/*
function getWords(element) {
  let recipeWords = [];
  let test = [];
  let words = [];
  let listeIngredients = getIngredients(element);

  //concatenation des mots
  words = [...new Set(words.concat(element.name.toLocaleLowerCase(), listeIngredients, element.description.toLocaleLowerCase(), element.appliance.toLocaleLowerCase(), element.ustensils))].join(" ");
  //split en sous chaine
  let arrayWords = words.split(" ");

  //supression de ponctuation
  for (let word of arrayWords) {
    word = word.replace(/[,;.]$/, "");
    test.push(word);
  }

  arrayWords = test;

  //retour de mots contenant plus que 2 lettres
  let filteredWordsByLength = arrayWords.filter(function (word) {
    return word.length > 2;
  });

  //supression de doublon
  recipeWords = [...new Set(filteredWordsByLength)].sort();

  return recipeWords ;
}
*/
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
