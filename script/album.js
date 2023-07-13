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
      ${date}  <span class="d-none d-md-block">·${artist.nb_tracks}· </span></p> </div>
    </div>
  </div>
`;
  } catch (err) {
    console.log(err);
  }
};
artist();
