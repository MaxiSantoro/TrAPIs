class DrinkDefinition {
    constructor(resultsContainer, drinkDefinition) {
        const wordDisplay = resultsContainer.querySelector('#word');
        const defDisplay = resultsContainer.querySelector('#definition');
        wordDisplay.textContent = drinkDefinition.word;
        defDisplay.textContent = drinkDefinition.definition;
    }
}

export default DrinkDefinition;
