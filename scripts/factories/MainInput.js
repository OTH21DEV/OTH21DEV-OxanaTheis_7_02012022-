import { recipes } from "../pages/index.js";
import { displayMessage } from "../utils/displayMessage.js";
import { getIngredients } from "../utils/getIngredients.js";
import { Dropdown } from "./Dropdown.js";
const mainSearch = document.querySelector(".search");
const sectionRecipes = document.querySelector(".recipes");

class MainInput {
  constructor(arrayRecipes) {
    this.display(arrayRecipes);
  }

  display = (arrayRecipes) => {
    let tagContainer = document.querySelector(".tag-container");
    let selectedTags = tagContainer.children.length;
    mainSearch.addEventListener("input", (e) => {
      let valueInput = e.target.value.toLowerCase();

      if (valueInput.length >= 3) {
        sectionRecipes.innerHTML = "";
        e.preventDefault();
        this.searchRecipesMainInput(valueInput, arrayRecipes);

        //si le tag est choisi en premier puis on cherche dans l'input principal-alors on fait un tri
        if (selectedTags >= 1) {
          new Dropdown().filterTags(arrayRecipes);
        }
      } else {
        //si on efface le mot dans l'input on affiche toutes les recettes
        if (valueInput.length === 0) {
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

  searchRecipesMainInput = (value, arrayRecipes) => {
    let newArray = [];

    arrayRecipes.forEach((element) => {
      let recipeIngredients = getIngredients(element);

      if (element.name.toLowerCase().includes(value.toLowerCase()) || element.description.toLowerCase().includes(value.toLowerCase()) || recipeIngredients.includes(value)) {
        //les recettes correpondantes sont envoyées vers nouveau tableau filtré
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
      displayMessage(sectionRecipes);
      arrayRecipes = recipes;
    }
  };
}

export { MainInput };
