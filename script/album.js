console.log("eila");
var length = 3;
var myString = "ABCDEFG";
var myTruncatedString = myString.substring(0, length);
console.log(myTruncatedString);

const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const url1 = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;
console.log("e");

const artist = async function () {
  try {
    let response = await fetch(url1);
    console.log(response);
    let artist = await response.json();
    let date = artist.release_date;
    date = date.substring(date, 4);
    console.log(date);
    let artistName = document.getElementById("albumDaCompilare");
    console.log(artist);

    let duration = artist.duration / 60;
    let minute = Math.floor(duration);
    let second = artist.duration - minute * 60;

    if (second < 10) {
      second = `0${second}`;
    }
    artistName.innerHTML = `
    <div id="immagineAlbum">
    <img
      src="
      ${artist.cover_medium}"
      alt="cover-album"
      class="m-4 shadow-lg"
      style="width: 200px"
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

    const scatolaTracce = document.getElementById("songsData");
    console.log(artist.tracks);
    artist.tracks.data.forEach((e, n) => {
      let durationSong = e.duration / 60;
      let minuteSong = Math.floor(durationSong);
      let secondSong = e.duration - minuteSong * 60;

      if (secondSong < 10) {
        secondSong = `0${secondSong}`;
      }
      let boxino = document.createElement("div");
      boxino.classList.add(
        "cardArtistSongs",
        "d-flex",
        "align-items-center",
        "justify-content-evenly",
        "my-3",
        "my-md-4"
      );
      boxino.innerHTML = `
      <div class="col col-1 d-none d-md-block">${n + 1}</div>

      <div
        class="col col-8 d-flex flex-column justify-content-between align-items-md-center flex-md-row ps-2"
      >
        <div class="">
          <h2>"${e.title}"</h2>
        </div>
        <div class="">
          <p>${e.rank}</p>
        </div>
      </div>
      <div class="col col-2">
        <p class="d-none d-md-flex justify-content-end">${minuteSong}:${secondSong}</p>
        <p class="d-md-none">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </p>
      </div>
      `;
      scatolaTracce.appendChild(boxino);
    });
  } catch (err) {
    console.log(err);
  }
};
artist();
