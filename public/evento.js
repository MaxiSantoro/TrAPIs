// URL de la API
const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Botones
const startBtn = document.getElementById('start');
const drinksBtn = document.getElementById('drinks');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Contenedores
const drinksContainer = document.getElementById('drinksContainer');
const detailsContainer = document.getElementById('detailsContainer');

function redirectToNewView() {
  window.location.href = 'newDrink.html';
}

// Event listeners para los botones
startBtn.addEventListener('click', showStart);
drinksBtn.addEventListener('click', showDrinkOptions);
searchBtn.addEventListener('click', searchDrinks);

// Mostrar sección de inicio
function showStart() {
  window.location.href = 'index.html';
  drinksContainer.innerHTML = '';
  detailsContainer.innerHTML = '';
  drinksContainer.style.display = 'none';
  detailsContainer.style.display = 'none';
}

// Mostrar opciones de bebidas
function showDrinkOptions() {
  drinksContainer.innerHTML = '';
  detailsContainer.innerHTML = '';
  drinksContainer.style.display = 'flex';
  
  const alcoholicBtn = createDrinkTypeButton('Alcoholic');
  const nonAlcoholicBtn = createDrinkTypeButton('Non_Alcoholic');
  
  drinksContainer.appendChild(alcoholicBtn);
  drinksContainer.appendChild(nonAlcoholicBtn);
}

// Crear botón de tipo de bebida
function createDrinkTypeButton(drinkType) {
  const button = document.createElement('button');
  button.innerText = drinkType;
  
  button.addEventListener('click', () => fetchDrinksByType(drinkType));
  
  return button;
}

// Obtener bebidas por tipo
function fetchDrinksByType(drinkType) {
  fetch(`${apiURL}/filter.php?a=${drinkType}`)
    .then(response => response.json())
    .then(data => displayDrinks(data.drinks));
}

// Mostrar bebidas
function displayDrinks(drinks) {
  drinksContainer.innerHTML = '';
  detailsContainer.innerHTML = '';

  drinks.forEach(drink => {
    const drinkDiv = document.createElement('div');
    drinkDiv.className = 'drink';
    
    const drinkName = document.createElement('h3');
    drinkName.innerText = drink.strDrink;
    
    const drinkImg = document.createElement('img');
    drinkImg.src = drink.strDrinkThumb;
    
    drinkDiv.appendChild(drinkName);
    drinkDiv.appendChild(drinkImg);
    drinksContainer.appendChild(drinkDiv);
    
    drinkImg.addEventListener('click', () => redirectToDetail(drink.idDrink));
  });
}

// Redirigir a la vista detalle.html y almacenar datos en el localStorage
function redirectToDetail(drinkId) {
  fetch(`${apiURL}/lookup.php?i=${drinkId}`)
    .then(response => response.json())
    .then(data => {
      const drink = data.drinks[0];
      
      const drinkData = {
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        ingredients: getIngredientsList(drink)
      };

      localStorage.setItem('selectedDrink', JSON.stringify(drinkData));
      
      window.location.href = 'detalle.html';
    });
}

// Obtener la lista de ingredientes
function getIngredientsList(drink) {
  const ingredientsList = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      const ingredientInfo = `${ingredient} - ${measure}`;
      ingredientsList.push(ingredientInfo);
    }
  }
  
  return ingredientsList;
}


// Obtener la lista de ingredientes
function getIngredientsList(drink) {
  const ingredientsList = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      const ingredientInfo = `${ingredient} - ${measure}`;
      ingredientsList.push(ingredientInfo);
    }
  }
  
  return ingredientsList;
}

// Buscar bebidas por nombre
function searchDrinks() {
  const searchValue = searchInput.value.trim();
  
  if (searchValue !== '') {
    fetch(`${apiURL}/search.php?s=${searchValue}`)
      .then(response => response.json())
      .then(data => displayDrinks(data.drinks));
  }
}

