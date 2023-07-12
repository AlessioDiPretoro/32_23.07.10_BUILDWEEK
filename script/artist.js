const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id;

const artist = async function () {
  try {
    let response = await fetch(url);
    let artist = await response.json();
    console.log(artist);
    let artistName = document.getElementById("artist");
    artistName.innerHTML = `        
<div class="cartArtistMain card text-bg-dark" style="height: 400px">
<img
  src="${artist.picture_xl}"
  class="card-img"
  style="height: 400px"
  alt="${artist.name} foto"
/>
<div class="card-img-overlay" style="top: auto">
  <p class="card-text">
    <i class="fa-solid fa-circle-check"></i
    ><small>Artista verificato</small>
  </p>
  <h5 class="card-title fs-1">${artist.name}</h5>
  <p class="card-text"> ${artist.nb_fan} fan attuali  </p>
</div>
</div>`;
    let response2 = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist.name}`
    );
    let album = await response2.json();
    console.log(album);

    let braniArtistaPopolari = document.getElementById("braniArtistaPopolari");
    console.log(braniArtistaPopolari);
    for (let i = 0; i < 3; i++) {
      let div = document.createElement("div");
      div.classList.add("cardArtistSongs");
      div.classList.add("d-flex");
      div.classList.add("align-items-center");
      div.classList.add("justify-content-evenly");
      div.classList.add("my-3");
      div.classList.add("my-md-4");
      let visual = album.data[i].rank;
      let string = visual.toString();
      string.split("");
      console.log(string.split(""));
      console.log(div);
      div.innerHTML = `  
        <div class="col col-1">${i + 1}</div>

        <div
          class="col col-8 d-flex flex-column justify-content-between align-items-md-center flex-md-row ps-2"
        >
          <div class="">
            <h2>${album.data[i].title}</h2>
          </div>
          <div class="">
            <p>n°${album.data[i].rank} visualizzazioni</p>
          </div>
          <div></div>
        </div>
        <div class="col col-2">
          <p class="d-none d-md-flex">durata</p>
          <p class="d-md-none">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </p>
        </div>
      `;
      braniArtistaPopolari.appendChild(div);
    }
  } catch (err) {
    console.log(err);
  }
};
artist();
