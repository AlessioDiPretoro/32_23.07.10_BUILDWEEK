//popoliamo le polaylist con canzoni randomiche

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
  console.log(randomNumber);
  console.log(lettere[randomNumber]);
  return lettere[randomNumber];
};

random();

//qui componiamo parola random di 4 caratteri
let lettera1 = random();
let lettera2 = random();
let lettera3 = random();
let lettera4 = random();

let parolaFinale = lettera1 + lettera2 + lettera3 + lettera4;
console.log(parolaFinale);

//creiamo stringa con url+ combinazione parola

let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
url = url + parolaFinale;
console.log(url);

//qui facciamo fetch di quello che è stato generato

const popolaPlaylist = async function () {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    //prendiamo riferimetno a classe playlist
    let playlist = document.querySelectorAll(".playlist");
    //cicliamo gli elementi con i loro numero
    playlist.forEach((elemento, numero) => {
      //ad ogni eleemnto mettiamo un listenere al click che porta alla pagina con il proprio id
      elemento.addEventListener("click", () => {
        window.location.assign(
          `playlist.html?id=${data.data[numero].album.id}`
        );
      });
    });
  } catch (err) {
    console.log(err);
  }
};
popolaPlaylist();
