function displayMessage(sectionRecipes) {
  let message = document.createElement("h2");
  message.className = "message";
  message.innerHTML = `Aucune recette ne correspond à votre critère...vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

  sectionRecipes.appendChild(message);
}
export { displayMessage };
