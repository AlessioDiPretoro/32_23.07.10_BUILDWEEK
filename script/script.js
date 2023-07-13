//generiamo numeri random da 0 a 24 con lettera assegnata
let lettere = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

//qui facciamo un numero random
let random = function () {
  randomNumber = Math.floor(Math.random() * 24);
  // console.log(randomNumber);
  // console.log(lettere[randomNumber]);
  return lettere[randomNumber];
};

random();

//qui componiamo parola random di 4 caratteri
let lettera1 = random();
let lettera2 = random();
let lettera3 = random();
let lettera4 = random();

let parolaFinale = lettera1 + lettera2 + lettera3 + lettera4;
// console.log(parolaFinale);

//creiamo stringa con url+ combinazione parola
const urlMain = "https://striveschool-api.herokuapp.com/api/deezer/";
const urlSearch = "search?q=";
const urlAlbum = "album/";
const urlArtist = "artist/";
let url = urlMain + urlSearch;
url = url + parolaFinale;
// console.log(url);

// 50 album casuali: https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50
// recupero da url dinamico
let carousellItems = [];
const maxCarousellItems = 5;
const carousellContainer = document.getElementById("carouselExample");
const dataSync = async function () {
  let response;
  let data;
  try {
    let rnd = Math.floor(Math.random() * 999999);
    console.log("rnd", rnd);
    response = await fetch(urlMain + urlAlbum + rnd);
    data = await response.json();
    console.log("dinamico", data);

    return data;
    // ;
  } catch (err) {
    console.log("ERRORE rilevato", err);
  }
};

//creaiamo il carosello

const populateCarousel = async function (data) {
  for (let i = 0; i < maxCarousellItems; i++) {
    let thisReading = await dataSync(data);

    console.log("thisReading", thisReading);
    if (thisReading.hasOwnProperty("error")) {
      if (thisReading.error.code === 800) {
        i--;
        console.log("Errore 800");
      } else {
        carousellItems.push(thisReading);
      }
    } else {
      carousellItems.push(thisReading);
    }
    console.log("carousellItems", carousellItems);
    carousellContainer.innerHTML = "";
    carousellItems.forEach((e, i) => {
      const carousellItem = document.createElement("div");
      if (i === 0) {
        carousellItem.classList.add("active");
      }
      carousellItem.classList.add("carousel-item");
      carousellItem.innerHTML = `
    <div class="">
    <div class="row bg-black p-4">
      <div class="col col-3">
        <div class="">
          <img src="${e.cover}" class="w-100" alt="Album Top" />
        </div>
      </div>
      <div class="col col-9">
        <div class="row">
          <div class="col"><p>ALBUM</p></div>
          <div class="col text-end"><p>NASCONDI ANNUNCI</p></div>
        </div>
        <div class="row">
          <div class="col"><h2>${e.title}</h2></div>
        </div>
        <div class="row">
          <div class="col"><p>${e.artist.name}</p></div>
        </div>
        <div class="row">
          <div class="col">
            <p>Ascolta il nuovo singolo di ${e.artist.name}!</p>
          </div>
        </div>
        <div class="d-flex">
          <div>
            <button type="button" class="btn btn-success rounded-4 text-black m-1">
              Play
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-dark rounded-4 border m-1">
              Salva
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-dark rounded-4 m-1">...</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
      carousellContainer.appendChild(carousellItem);
      console.log("Appeso");
    });
  }
};
populateCarousel();

//qui facciamo fetch di quello che è stato generato

const popolaPlaylist = async function () {
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log("data: ", data);
    //prendiamo riferimetno a classe playlist
    let playlist = document.querySelectorAll(".playlist");
    //cicliamo gli elementi con i loro numero
    playlist.forEach((elemento, numero) => {
      //ad ogni eleemnto mettiamo un listenere al click che porta alla pagina con il proprio id
      elemento.addEventListener("click", () => {
        window.location.assign(`playlist.html?id=${data.data[numero].album.id}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
// popolaPlaylist();

// chiude la barra di sinistra
const search = document.getElementById("searchNavBarSx");
// console.log(search);
search.addEventListener("click", function () {
  window.location.assign("search_static.html");
});
