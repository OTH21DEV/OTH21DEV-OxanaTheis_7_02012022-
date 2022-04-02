
function searchInDropdown(container, array) {
    const dropdownInput = document.querySelectorAll(`${container} .input`)[0];
    let newListe;
  
    dropdownInput.addEventListener("input", (e) => {
      let inputValue = e.target.value.toLowerCase();
  
      newListe = array.filter((element) => {
        return element.toLowerCase().includes(inputValue);
      });
      createListe(container, newListe);
    });
  }