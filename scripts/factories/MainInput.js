import { recipes } from "../pages/index.js";
import { displayMessage } from "../utils/displayMessage.js";
import { Dropdown } from "./Dropdown.js";
import { getWords } from "../utils/getWords.js";
const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

class MainInput {
  constructor(arrayRecipes) {
    //arrayRecipes = recipesArrayIncludingKeyword

    // this.arrayRecipes = arrayRecipes;
    this.display(arrayRecipes);
  }

  display = (arrayRecipes) => {
    mainSearch.addEventListener("input", (e) => {
      let valueInput = e.target.value.toLowerCase();

      let tagContainer = document.querySelector(".tag-container");
      let selectedTags = tagContainer.children.length;

      if (valueInput.length >= 3) {
        sectionRecipes.innerHTML = "";
        e.preventDefault();
        this.createRecipesArrayIncludedKeyword(valueInput, arrayRecipes);

        //si le tag est choisi en premier puis on cherche dans l'input principal-alors on fait un tri
        if (selectedTags >= 1) {
          console.log("test3");
          new Dropdown().triTags(arrayRecipes);
        }
      } else {
        //si on efface le mot dans l'input on affiche toutes les recettes
        if (valueInput.length === 0) {
          console.log("test4");
          arrayRecipes = recipes;
          new Dropdown().displayRecipes(arrayRecipes);
        }
      }
    });
  };

  /*
  Fonction de remplissage de nouveau tableau de recettes par de recettes qui comportent dans leurs noms et/ou dans la description ou dans les ingredients 
  les mots clés renseignés dans la barre de recherche
  */

  /*
  Changement de l'algorithme de recherche de recettes - recherche par mots
  */

  createRecipesArrayIncludedKeyword = (value, arrayRecipes) => {
    let newArray = [];

    arrayRecipes.forEach((element) => {
      let recipeWords = getWords(element);
      if (recipeWords.includes(value.toLowerCase())) {
        newArray.push(element);
      }
    });
    arrayRecipes = newArray;

    /*
    MAJ des listes de dropdowns (ing, ust, app) par rapport au mot clé renseigné dans
    la barre de recherche principale
    */

    new Dropdown().displayRecipes(arrayRecipes);

    console.log(arrayRecipes);

    /*si  mot dans l'input  n'existe pas dans les recettes , on affiche message d'erreur, on affiche toutes les recettes*/
    if (arrayRecipes.length === 0) {
      console.log("test2");
      displayMessage(sectionRecipes);
      arrayRecipes = recipes;
    }
  };
}
export { MainInput };
