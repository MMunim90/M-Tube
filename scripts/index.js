alert("Welcome to M-Tube");

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
}

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
    .then((data) => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            displayVideos(data.category)

        });
};

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailContainer = document.getElementById("details-container");

    detailContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-2xl font-extrabold">${video.title}</h2>
    <p>${video.description}</p>
    <img src="${video.authors[0].profile_picture}" alt="${video.authors[0].profile_name}" />
  </div>
</div>
    `;
}

function displayCategories(categories) {
  //get the container
  const categoryContainer = document.getElementById("category-container");

  //loop operation on array of container
  for (let cat of categories) {
    //create a element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm bg-[#25252550] text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `;

    //append the element to the container
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");

  videosContainer.innerHTML = "";

if(videos.length === 0){
    videosContainer.innerHTML = `
     <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="" />
        <h1 class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h1>
      </div>
    `;
    return;
}


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
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">More</button>
          </div>
        `;
    videosContainer.appendChild(videoCard);
  });
};

loadCategories();
