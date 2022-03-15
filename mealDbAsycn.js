document.getElementById('error-message').style.display ='none';

const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    //clear data
    searchField.value = '';
    //error
    document.getElementById('error-message').style.display ='none';
    //load data
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}` 
            fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            //error
             .catch(error => displayError(error));  // site a nai amon kicu search korle jate error msg ase seta (catch) diye korese.
  
}
const displayError = error =>{
    document.getElementById('error-message').style.display ='block';
}


const displaySearchResult = meals =>{
    //console.log(meals);
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    //error handle

    meals.forEach(meal => {
        //console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
      <div onclick ="loadMealDetail(${meal.idMeal})" class="card">
         <img w-200 src="${meal.strMealThumb}"      class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
}


 //fetch ar bodole r akti niyom use kora jay.(async and await) diye.****
 const loadMealDetail = async mealId => {
  //console.log(mealId);
  const url =`https://www.themealdb.com/api/json/v1/1/lookup.php? i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);
}

const displayMealDetail = meal => {
  //console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  //clear data
  mealDetails.innerHTML ='';
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML =`
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        <a href=${meal.strYoutube} class='btn btn-primary'>Go somewhere</a>
      </div>
      `;
      mealDetails.appendChild(div);
  }