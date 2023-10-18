function ChangeTheme() {
    let element = document.body;
    element.classList.toggle('light-mode')
}
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();

//form

const searchForm = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn= document.getElementById("show-more-btn");

const accessKey = "vFJzcZs6QRCDw9n6mm8uT94wH1sfe-33OibITYyjQk8";


//Access Key vFJzcZs6QRCDw9n6mm8uT94wH1sfe-33OibITYyjQk8
//Secret key cVLs1HDelY_GqpqjJPQVpDPHmsONYe13SbD74T62NWY


let keyWord = "" ;
let page = 1 ;

async function searchImage() {
    keyWord = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;

        imageLink.target = "_blank";

        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    });

    searchMoreBtn.style.display = "block";

};


searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImage();
});


searchMoreBtn.addEventListener("click",()=>{
    page++;
    searchImage();
})