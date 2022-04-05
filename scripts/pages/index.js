import { recipes } from "./../../data/recipes.js";
import { Recipe } from "../factories/Recipe.js";
import { Dropdown } from "../factories/Dropdown.js";
import { MainInput } from "../factories/MainInput.js";
import { removeDuplicatesDropdown, utensilsListDropdown, appliancesListDropdown, ingredientsListDropdown } from "../utils/removeDuplicatesDropdown.js";

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
Recherche initiale dans la liste complete  (ing, ust, app) 
*/

new Dropdown().searchInDropdown("#container-ingredient", ingredientsListDropdown,recipesArrayIncludingKeyword);
new Dropdown().searchInDropdown("#container-appliances", appliancesListDropdown,recipesArrayIncludingKeyword);
new Dropdown().searchInDropdown("#container-ustensils", utensilsListDropdown,recipesArrayIncludingKeyword);

export { recipes };

//v1 test de filtrage du 35 au 29 pour premiere recette reste a supprimer la ponctuation"
let filtered = [];

recipes.forEach((element) => {
  let filteredWords = [];
  let test = [];
  let words = [];
  let listeIngredients = [];

  for (let ingredient of element.ingredients) {
    listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient.toLocaleLowerCase()))].sort();
  }
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
  filteredWords = arrayWords.filter(function (word) {
    return word.length > 2;
  });


//supression de doublon
  filtered = [...new Set(filteredWords)].sort();

  console.log(filtered);
});