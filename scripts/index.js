alert("Welcome to M-Tube");

function loadCategories() {
  // 1-fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2-convert the promise into json format
    .then((response) => response.json())
    // 3- display the data
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");
  //loop operation on array of container
  for (let cat of categories) {
    console.log(cat);
    //create a element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm bg-[#25252550] text-white">${cat.category}</button>
    `;
    //append the element to the container
    categoryContainer.appendChild(categoryDiv);
  }
}

loadCategories();