const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const url1 = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id;

const artist = async function () {
  try {
    let response = await fetch(url1);
    let artist = await response.json();
    let artistName = document.getElementById("artist");

    artistName.innerHTML = `        
<div class="cartArtistMain card text-bg-dark" style="height: 400px">
<img
  src="${artist.picture_big}"
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
    let braniArtistaPopolari = document.getElementById("braniArtistaPopolari");
    console.log(braniArtistaPopolari);
    for (let i = 0; i < 3; i++) {
      let div = document.createElement("div");
      div.classList.add(
        "cardArtistSongs",
        "d-flex",
        "align-items-center",
        "justify-content-evenly",
        "my-3",
        "my-md-4"
      );

      let visual = album.data[i].rank;
      let string = visual.toString();
      let arr = string.split("");
      let arr1 = [];
      let arr2 = [];
      arr.forEach((e, n) => {
        if (n < 3) {
          arr1.push(e);
        } else {
          arr2.push(e);
        }
      });
      let string1 = arr1.join("");
      let string2 = arr2.join("");
      let duration = album.data[i].duration / 60;
      let minute = Math.floor(duration);
      let second = album.data[i].duration - minute * 60;

      if (second < 10) {
        second = `0${second}`;
      }

      div.innerHTML = `  
        <div class="col col-1">${i + 1}</div>

        <div
          class="col col-8 d-flex flex-column justify-content-between align-items-md-center flex-md-row ps-2"
        >
          <div class="">
            <h2>${album.data[i].title}</h2>
          </div>
          <div class="">
            <p> ${string1}<span>.</span>${string2} ascolti</p>
          </div>
          <div></div>
        </div>
        <div class="col col-2">
          <p class="d-none d-md-flex">${minute}:${second} durata</p>
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
