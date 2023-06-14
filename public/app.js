
import NewDefinions from "./newDefinions.js";
import DrinkDefinition from "./drinkDefinition.js";
import NewSetDrink from "./newSetDrink.js";

class App {
  constructor() {
    this.newDefinions = new NewDefinions();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const setForm = document.querySelector('#set');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);
  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const newSetDrink = new NewSetDrink(resultsContainer);
    const postBody = newSetDrink.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.newDefinions.save(postBody)
      .then(result => {
        // Update definition
        new DrinkDefinition(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const input = document.querySelector('#word-input');
    const word = input.value.trim();
    this.newDefinions.doLookup(word)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new DrinkDefinition(resultsContainer, result);

    // Prep set definition form.
    const newSetDrink = new NewSetDrink(resultsContainer);
    newSetDrink.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();
