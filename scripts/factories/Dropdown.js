import { recipes } from "../pages/index.js";
import { Recipe } from "../factories/Recipe.js";
import { getIngredients } from "../utils/getIngredients.js";

const sectionRecipes = document.querySelector(".recipes");
const mainSearch = document.querySelector(".search");

class Dropdown {
  constructor() {}

  displayDropdown = (container, array, arrayRecipes) => {
    let arrow = document.querySelectorAll(`${container} .btn-dropdown-container__arrow-down`)[0];
    let title = document.querySelectorAll(`${container} .btn-dropdown`)[0];
    let liste = document.querySelectorAll(`${container} .popup-input`)[0];
    let cont = document.querySelectorAll(`${container}`)[0];

    this.createListe(container, array, arrayRecipes);
    arrow.addEventListener("click", (e) => {
      if (arrow.dataset.open === "false") {
        cont.className = "btn-dropdown-container--onclick";
        liste.classList.add("popup-input--onclick");
        title.classList.add("btn-dropdown--onclick");
        document.querySelector(".wrapper-btns-dropdown").classList.add("wrapper-btns-dropdown--onclick");
        arrow.classList.add("btn-dropdown-container__arrow-down--onclick");
        arrow.setAttribute("data-open", "true");
      } else {
        title.classList.remove("btn-dropdown--onclick");
        liste.classList.remove("popup-input--onclick");
        arrow.classList.remove("btn-dropdown-container__arrow-down--onclick");
        cont.className = "btn-dropdown-container";
        document.querySelector(".wrapper-btns-dropdown").classList.remove("wrapper-btns-dropdown--onclick");
        arrow.setAttribute("data-open", "false");
      }
    });
  };
/*
Creation de la liste pour chaque element -ingredients, appareils, ustensiles
Creation  de tags
*/
  createListe = (container, array, arrayRecipes) => {
    let ulElement = document.querySelector(`${container} .elements-liste`);

    //on vide le contenu pour repartir à chaque fois avec une nouvelle liste maj en fonction des mots clés
    ulElement.innerHTML = "";

    array.forEach((element) => {
      const liElement = document.createElement("li");

      ulElement.appendChild(liElement);
      liElement.innerHTML = element;

      /*
    Creation  de tags :on rajoute evenement au click pour rajouter des tags (n 7,8)
    */

      liElement.addEventListener("click", (e) => {
        this.addTags(e, container, arrayRecipes,array);
      });
    });
  };
  addTags = (e, container, arrayRecipes,array) => {
    /*
Create tag 
*/

    let value = e.target.childNodes[0].data;
    let tagContainer = document.querySelector(".tag-container");
    let tag = document.createElement("div");
    tag.className = "tag";
    tagContainer.appendChild(tag);

    tag.style.display = "flex";
    tagContainer.style.display = "flex";
    //" \u00a0" rajoute espace !
    tag.innerHTML +=
      value +
      " \u00a0" +
      `<i class="fa-regular fa-circle-xmark"></i>
`;
    //on attribue id de container pour avoir la couleur
    tag.setAttribute("id", `${container}`.replace("#", ""));

    /*
Trie de recette par tag 
*/

    let recipesByTags = [];

    //arrayRecipes = recipesArrayIncludingKeyword(array des recettes)
    arrayRecipes.forEach((element) => {
      let listeIngredients = [];

      for (let ingredient of element.ingredients) {
        //on remplie le tableau par des ingredients de chaque recette
        listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient))].sort();
      }

      if (container.replace("#", "") == "container-ingredient") {
        if (listeIngredients.includes(value)) {
          recipesByTags.push(element);
        }
      }

      if (container.replace("#", "") == "container-appliances") {
        if (element.appliance == `${value}`) {
          recipesByTags.push(element);
        }
      }

      if (container.replace("#", "") == "container-ustensils") {
        if (element.ustensils.includes(`${value.toLowerCase()}`)) {
          recipesByTags.push(element);
        }
      }
      //on attribue la valeur du tableau obtenu au tableau de travail recipesArrayIncludingKeyword - qui recupere les recettes filtrées ici par tag
      arrayRecipes = recipesByTags;

      this.displayRecipes(arrayRecipes,array);
    });

    console.log(arrayRecipes);

    /*
Fermeture tag
*/

    let cross = tag.children[0];

    cross.addEventListener("click", (e) => {
      console.log(this);
      this.removeTags(e, container,array);
    });
  };

  removeTags = (e, container,array) => {
    e.target.parentElement.remove();
    let tagContainer = document.querySelector(".tag-container");
    let selectedTags = tagContainer.children.length;

    let recipesSearch = recipes;
    let newArray = [];

    if (mainSearch.value.length >= 3) {
      recipesSearch.forEach((element) => {
        let recipeIngredients = getIngredients(element);

        if (
          element.name.toLowerCase().includes(mainSearch.value.toLowerCase()) ||
          element.description.toLowerCase().includes(mainSearch.value.toLowerCase()) ||
          recipeIngredients.includes(mainSearch.value)
        ) {
          newArray.push(element);
        }
      });
      recipesSearch = newArray;
    }

    if (selectedTags >= 1) {
      newArray = [];
      for (let i of tagContainer.childNodes) {
        let tagTxt = i.innerText.toLowerCase().trim();

        recipesSearch.forEach((element) => {
          let listeIngredients = getIngredients(element);

          if (container.replace("#", "") == "container-ingredient") {
            if (listeIngredients.includes(tagTxt)) {
              newArray.push(element);
            }
          }

          if (container.replace("#", "") == "container-appliances") {
            if (element.appliance == `${tagTxt}`) {
              newArray.push(element);
            }
          }

          if (container.replace("#", "") == "container-ustensils") {
            if (element.ustensils.includes(`${tagTxt}`)) {
              newArray.push(element);
            }
          }
        });

        recipesSearch = newArray;
        newArray = [];
      }
    }

    this.displayRecipes(recipesSearch,array);
    console.log(recipesSearch);
  };
/*
Affiche les recettes suite au filtre , maj la liste et la recherche dropdown
*/
  displayRecipes = (arrayRecipes,array) => {
    sectionRecipes.innerHTML = "";
    this.searchByKeywordsIng(arrayRecipes, "#container-ingredient");
    this.searchByKeywordsDropdowns(arrayRecipes, "#container-appliances", "appliance");
    this.searchByKeywordsDropdowns(arrayRecipes, "#container-ustensils", "ustensils");
/*

    this.searchInDropdown("#container-ingredient",arrayRecipes,array);
    this.searchInDropdown("#container-appliances",arrayRecipes,array);
this.searchInDropdown("#container-ustensils",arrayRecipes,array);
*/
    arrayRecipes.forEach((element) => {
      new Recipe(element);
    });
  };
/*
Fonction de creation d'une nouvelle liste  ingredients à partir de tableau de recettes filtrées par 
mots clés tapés dans la barre de recherche principale

*/
  searchByKeywordsIng = (arrayRecipes, container) => {
    //arrayRecipes- recipesArrayIncludingKeyword

    let listeIngredients = [];
    /* a partir de tableau filtré de recette (par mots cles) 
on remplie le tableau des ingredients */

    arrayRecipes.forEach((element) => {
      for (let ingredient of element.ingredients) {
        listeIngredients = [...new Set(listeIngredients.concat(ingredient.ingredient))].sort();
      }
    });
    // on crée la nouvelle liste
    this.createListe(container, listeIngredients, arrayRecipes);
  };
  /*
Fonction de creation d'une nouvelle liste des appareils et ustensils a partir de tableau de recettes filtrées par 
mots clés tapés dans la barre de recherche principale

*/
  searchByKeywordsDropdowns = (arrayRecipes, container, name) => {
    let listeElements = [];
    arrayRecipes.forEach((element) => {
      // a partir de tableau filtré de recette (par mots cles) on remplie le tableau des appareils et ustensils

      listeElements = [...new Set(listeElements.concat(element[name]))].sort();
    });
    // on crée la nouvelle liste
    this.createListe(container, listeElements, arrayRecipes);
  };

  searchInDropdown = (container, array, arrayRecipes) => {
    const dropdownInput = document.querySelectorAll(`${container} .input`)[0];
    let newListe;

    dropdownInput.addEventListener("input", (e) => {
      let inputValue = e.target.value.toLowerCase();
console.log(array)
      newListe = array.filter((element) => {
        return element.toLowerCase().includes(inputValue);
      });
     
      this.createListe(container, newListe, arrayRecipes);
    });

  };
  
}
export { Dropdown };
