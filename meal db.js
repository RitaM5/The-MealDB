const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    //clear data
    searchField.value = '';
    //error
    if(searchText==''){
       alert('please write something to displat');
       return;
    }

     else{
         //load data
     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`            //the meal db search kore api link ante hbe, ${searchtext} diye diyanamic korse.
     //console.log(url);
     fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals)) ;
     }
}
const displaySearchResult = meals =>{
    //console.log(meals);
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = ''; //atao use kora jay.
    //error handle
    if(meals.length == 0){
      alert('show no result found');
      return;
    }

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

 const loadMealDetail = mealId => {
  //console.log(mealId);
 const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
 fetch(url)
 .then(res => res.json())
 .then(data => displayMealDetail(data.meals[0])); //jokhon mangulo kono object array ar index a thake orn [0] index a thake tokhon [0] index dite hoy.

 //fetch ar bodole r akti niyom use kora jay.(async and await) diye.****
/*  const loadMealDetail = async mealId => {
  //console.log(mealId);
 const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]) */
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