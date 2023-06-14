class NewSetDrink {
    constructor(resultsContainer) {
      this.setWordInput = resultsContainer.querySelector('#set-name-input');
      this.setDefInput = resultsContainer.querySelector('#set-def-input');      
    }

    show(drinkDefinition) {
      this.setNameInput.value = drinkDefinition.word;
      this.setDefInput.value = drinkDefinition.definition;
    }

    read() {
      const result = {
        word: this.setNameInput.value,
        definition: this.setDefInput.value
      };
      return result;
    }
}

export default NewSetDrink;

