alert("Welcome to M-Tube");

function loadCategories() {
  // 1-fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2-convert the promise into json format
    .then((response) => response.json())

    // 3- display the data
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");

  //loop operation on array of container
  for (let cat of categories) {
    //create a element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm bg-[#25252550] text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `;

    //append the element to the container
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-[#171717] px-2">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="title">
                <h2 class="text-base font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-500 flex gap-1">${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=FNbnqlDTjR45&format=png&color=000000" alt="">
                </p>
                <p class="text-sm text-gray-500">${video.others.views}</p>
              </div>
            </div>
          </div>
        `;
    videosContainer.appendChild(videoCard);
    console.log(video)
  });
};

loadVideos();
loadCategories();
