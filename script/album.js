const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const url1 = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;
console.log("e");
const artist = async function () {
  try {
    let response = await fetch(url1);
    console.log(response);
    let artist = await response.json();
    let artistName = document.getElementById("albumDaCompilare");
    console.log(artist);
    artistName.innerHTML = `        
<div class="cartArtistMain card text-bg-dark" style="height: 400px">
<img
  src="${artist.cover_big}"
  class="card-img"
  style="height: 400px"
  alt="${artist.title} foto"
/>
<div class="card-img-overlay" style="top: auto">
  <p class="card-text">
    <i class="fa-solid fa-circle-check"></i
    ><small>Artista verificato</small>
  </p>
  <h5 class="card-title fs-1">${artist.title}</h5>
  <p class="card-text"> ${artist.fans} fan attuali  </p>
</div>
</div>`;
  } catch (err) {
    console.log(err);
  }
};
artist();
