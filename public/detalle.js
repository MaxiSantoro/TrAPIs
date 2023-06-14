  const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1';
    
    // Obtener los datos de la bebida almacenados en el localStorage
    const drinkData = JSON.parse(localStorage.getItem('selectedDrink'));
    
    // Obtener el contenedor de detalles de bebida
    const drinkDetailsContainer = document.getElementById('drinkDetailsContainer');
    
    // Crear elementos HTML para mostrar los detalles de la bebida
    const drinkName = document.createElement('h2');
    drinkName.innerText = drinkData.name;
    
    const drinkImg = document.createElement('img');
    drinkImg.src = drinkData.image;
    
    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.innerText = 'Ingredientes:';
    
    const ingredientsList = document.createElement('ul');
    drinkData.ingredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.innerText = ingredient;
      ingredientsList.appendChild(listItem);
    });
    
    // Agregar los elementos al contenedor de detalles de bebida
    drinkDetailsContainer.appendChild(drinkName);
    drinkDetailsContainer.appendChild(drinkImg);
    drinkDetailsContainer.appendChild(ingredientsTitle);
    drinkDetailsContainer.appendChild(ingredientsList);

// Botones
const startBtn = document.getElementById('start');
const drinksBtn = document.getElementById('drinks');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Contenedores
const drinksContainer = document.getElementById('drinksContainer');
const detailsContainer = document.getElementById('detailsContainer');

// Event listeners para los botones
startBtn.addEventListener('click', showStart);
drinksBtn.addEventListener('click', showDrinkOptions);
searchBtn.addEventListener('click', searchDrinks);

// Mostrar sección de inicio
function showStart() {
  window.location.href = 'index.html';
  drinksContainer.innerHTML = '';
  drinkDetailsContainer.innerHTML = '';
  drinksContainer.style.display = 'none';
  drinkDetailsContainer.style.display = 'none';

}

// Mostrar opciones de bebidas
function showDrinkOptions() {
  drinksContainer.innerHTML = '';
  drinkDetailsContainer.innerHTML = '';
  drinkDetailsContainer.style.display = 'flex';
  
  const alcoholicBtn = createDrinkTypeButton('Alcoholic');
  const nonAlcoholicBtn = createDrinkTypeButton('Non_Alcoholic');
  
  drinkDetailsContainer.appendChild(alcoholicBtn);
  drinkDetailsContainer.appendChild(nonAlcoholicBtn);
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
  drinkDetailsContainer.innerHTML = '';

  drinks.forEach(drink => {
    const drinkDiv = document.createElement('div');
    drinkDiv.className = 'drink';
    
    const drinkName = document.createElement('h3');
    drinkName.innerText = drink.strDrink;
    
    const drinkImg = document.createElement('img');
    drinkImg.src = drink.strDrinkThumb;
    
    drinkDiv.appendChild(drinkName);
    drinkDiv.appendChild(drinkImg);
    drinkDetailsContainer.appendChild(drinkDiv);
    
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
