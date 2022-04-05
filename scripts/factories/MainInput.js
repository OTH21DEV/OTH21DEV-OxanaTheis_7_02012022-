import { recipes } from "../pages/index.js";
import { displayMessage } from "../utils/displayMessage.js";
import { Dropdown } from "./Dropdown.js";
import { getWords } from "../utils/getWords.js";
const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

class MainInput {
  constructor(arrayRecipes) {
    //arrayRecipes = recipesArrayIncludingKeyword

    this.arrayRecipes = arrayRecipes;
    this.display();
  }

  display = () => {
    mainSearch.addEventListener("input", (e) => {
      let valueInput = e.target.value.toLowerCase();

      if (valueInput.length >= 3) {
        //efface le contenu initial
        sectionRecipes.innerHTML = "";
        e.preventDefault();

        // recherche dans le nom et description de recette depuis la barre principale

        this.createRecipesArrayIncludedKeyword(valueInput);

        console.log(this.arrayRecipes);

        if (this.arrayRecipes.length == 0) {
          displayMessage(sectionRecipes);
          this.arrayRecipes = recipes;
        }
      } else {
        if (valueInput.length === 0) {
          this.arrayRecipes = recipes;

          new Dropdown().displayRecipes(this.arrayRecipes);
          //displayRecipes(recipesArrayIncludingKeyword);
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

  createRecipesArrayIncludedKeyword = (value) => {
    let newArray = [];
    //newArray = array vide à remplir par de recette en fonction de mots clés/tag
    this.arrayRecipes.forEach((element) => {
      let recipeWords = getWords(element);
      if (recipeWords.includes(value.toLowerCase())) {
        newArray.push(element);
      }
    });
    this.arrayRecipes = newArray;

    /*
    MAJ des listes de dropdowns (ing, ust, app) par rapport au mot clé renseigné dans
    la barre de recherche principale
    */

    new Dropdown().displayRecipes(this.arrayRecipes);
  };
}
export { MainInput };
