const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const drinksContainer = document.getElementById('drinks');

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  let url;
  if (searchTerm === '') {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  }
  getDrinks(url);
});

async function getDrinks(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const drinks = data.drinks;
    drinksContainer.innerHTML = '';
    if (drinks === null) {
      drinksContainer.innerHTML = '<p>No drinks found. Please try again.</p>';
    } else {
      drinks.forEach(drink => {
        const drinkDiv = document.createElement('div');
        drinkDiv.classList.add('drink');
        drinkDiv.innerHTML = `
          <h2>${drink.strDrink}</h2>
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
          <p>${drink.strInstructions}</p>
        `;
        drinksContainer.appendChild(drinkDiv);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
