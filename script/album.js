// console.log("eila");
var length = 3;
var myString = "ABCDEFG";
var myTruncatedString = myString.substring(0, length);
// console.log(myTruncatedString);

const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const url1 = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;
// console.log("e");
let response;

const artist = async function () {
  try {
    response = await fetch(url1);
    // console.log(response);
    let artist = await response.json();
    response = artist;
    console.log(artist);
    let date = artist.release_date;
    date = date.substring(date, 4);
    // console.log(date);
    let artistName = document.getElementById("albumDaCompilare");
    // console.log(artist);

    let duration = artist.duration / 60;
    let minute = Math.floor(duration);
    let second = artist.duration - minute * 60;

    if (second < 10) {
      second = `0${second}`;
    }
    artistName.innerHTML = `
    <div id="immagineAlbum"">
    <img
      src="
      ${artist.cover_medium}"
      alt="cover-album"
      class="m-4 shadow-lg cardsAlbum"
      style="width: 200px;"
      
      id="albumIMg"
    />
  </div>
  <div class="descrizioneAlbum mt-1 mt-md-4 ms-3 ms-md-0">
    <p>Album</p>
    <h2>${artist.title}</h2>
    <div id="dettagliDescrizione" >
      <!-- qui anno durata ecc -->
      <div class="d-flex align-items-center"> <img id="fotoPiccolaArtista" class="rounded-circle" src="${artist.artist.picture_small}" alt="immagineAlbum" /> <p class="m-0 mt-1 ms-2"> ${artist.artist.name}· 
      ${date}  <span class="d-none d-md-inline">·${artist.nb_tracks}·${minute}:${second} </span></p> </div>
    </div>
  </div>
`;

    // console.log("artist", artist);
    const draw = function (img) {
      let canvas = document.createElement("canvas");
      let c = canvas.getContext("2d");
      c.width = canvas.width = img.clientWidth;
      c.height = canvas.height = img.clientHeight;
      c.clearRect(0, 0, c.width, c.height);
      c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
      return c;
    };

    // scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
    const getColors = function (c) {
      let col,
        colors = {};
      let pixels, r, g, b, a;
      r = g = b = a = 0;
      pixels = c.getImageData(0, 0, c.width, c.height);
      for (let i = 0, data = pixels.data; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        if (a < 255 / 2) continue;
        col = rgbToHex(r, g, b);
        if (!colors[col]) colors[col] = 0;
        colors[col]++;
      }
      return colors;
    };

    // trova il colore più ricorrente data una mappa di frequenza dei colori
    const findMostRecurrentColor = function (colorMap) {
      let highestValue = 0;
      let mostRecurrent = null;
      for (const hexColor in colorMap) {
        if (colorMap[hexColor] > highestValue) {
          mostRecurrent = hexColor;
          highestValue = colorMap[hexColor];
        }
      }
      return mostRecurrent;
    };

    // converte un valore in rgb a un valore esadecimale
    const rgbToHex = function (r, g, b) {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
      } else {
        return ((r << 16) | (g << 8) | b).toString(16);
      }
    };

    // inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
    const pad = function (hex) {
      return ("000000" + hex).slice(-6);
    };

    //da chiedere a stefano
    const start = function () {
      // prendo il riferimento all'immagine del dom
      let imgReference = document.querySelectorAll(".cardsAlbum");
      console.log("imgReference", imgReference);

      imgReference.forEach((immagine) => {
        console.log("immagine", immagine);
        immagine.crossOrigin = "Anonymous";
        // creo il context 2d dell'immagine selezionata
        let context = draw(immagine);
        console.log(context);
        // creo la mappa dei colori più ricorrenti nell'immagine
        let allColors = getColors(context);

        // trovo colore più ricorrente in esadecimale
        let mostRecurrent = findMostRecurrentColor(allColors);

        // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
        let mostRecurrentHex = pad(mostRecurrent);

        // console.log del risultato
        console.log(mostRecurrentHex);
        immagine.parentElement.parentElement.style.backgroundColor =
          "#" + mostRecurrentHex + "99";
      });
    };
    // start();

    // crea un canvas con l'immagine e ne ritorno il context 2d
  } catch (err) {
    console.log(err);
  }
};
artist();

let myAudio = new Audio();
let audioStarted = false;
let activeTrack = "";
const playerReference = document.querySelectorAll(".player");
const playButtonPlayer = document.querySelector(".playerPlayButton");

// pulsante play nella card
const buttonPlay = document.querySelectorAll(".buttonPlay");
buttonPlay.forEach((e) => {
  e.addEventListener("click", () => {
    //passo la prima track al player
    audioController(response.tracks.data[0].preview);
    activeTrack = response.tracks.data[0].preview;
    console.log("click Play", response.tracks.data[0].preview);
  });
});

// gestione player

const audioController = (passedtrack) => {
  if (!audioStarted) {
    myAudio.src = passedtrack;
    myAudio.autoplay = true;
    myAudio.loop = true;
    audioStarted = !audioStarted;
    playButtonPlayer.classList.toggle("fa-stop");
    buttonPlay.forEach((e) => {
      e.classList.toggle("fa-stop");
    });
  } else {
    myAudio.pause();
    audioStarted = !audioStarted;
    buttonPlay.forEach((e) => {
      e.classList.toggle("fa-stop");
    });
    playButtonPlayer.classList.toggle("fa-stop");
  }
};

playButtonPlayer.addEventListener("click", (e) => {
  audioController(activeTrack);
});
