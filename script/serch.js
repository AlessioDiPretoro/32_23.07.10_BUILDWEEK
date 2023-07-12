let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const form = document.getElementById("search");
console.log(form);
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const contenitoreRicerca = document.getElementById("contenitoreRicerca");
  contenitoreRicerca.innerText = "";

  let input = document.querySelector("input").value;

  console.log(input);
  console.log("ok");
  const serch = async function () {
    try {
      let response = await fetch(url + input);
      console.log(response);
      let data = await response.json();
      console.log(data);
      // console.log(data.data[0]);

      //creo array vuoto da popolare con album
      let arrayAlbum = [];
      //ciclo array data, pesco gli album e lizeppo dentro l'array
      console.log(data.data[1].artist.name.toLowerCase());
      console.log(input.toLowerCase());
      if (data.data[0].artist.name.toLowerCase() === input.toLowerCase()) {
        const artistaConFoto = document.createElement("div");
        artistaConFoto.classList.add("d-flex", "align-items-center");
        console.log(artistaConFoto);
        console.log("m");
        artistaConFoto.innerHTML = `
        <div class="m-1 artist" id= "artist">
        <img src="${data.data[0].artist.picture_medium}" class="w-100 rounded-circle " \>
        </div>
        <div class="m-2"> <h4 class="fontSearch"  > ${data.data[0].artist.name} </h4>
        <p class="m-0"> ${data.data[0].artist.type}</p> </div>
        `;
        contenitoreRicerca.appendChild(artistaConFoto);
        let artist = document.getElementById("artist");

        artist.addEventListener("click", function () {
          window.location.assign(`artist.html?id=${data.data[0].artist.id}`);
        });
      } else if (
        data.data[1].artist.name.toLowerCase() === input.toLowerCase()
      ) {
        const artistaConFoto = document.createElement("div");
        console.log("m");
        artistaConFoto.classList.add("d-flex", "align-items-center", "mt-3");
        artistaConFoto.innerHTML = `
        <div class="m-1 artist" " id= "artist">
        <img src="${data.data[1].artist.picture_medium}" class="w-100 rounded-circle" \>
        </div>
        <div class="m-2"> <h4 class="fontSearch"> ${data.data[1].artist.name} </h4>
        <p class="m-0"> ${data.data[1].artist.type}</p> </div>
        `;
        contenitoreRicerca.appendChild(artistaConFoto);
        let artist = document.getElementById("artist");
        artist.addEventListener("click", function () {
          window.location.assign(`artist.html?id=${data.data[1].artist.id}`);
        });
      }
      // ora collegiamo foto artista a pagina artista
      data.data.forEach((dato) => {
        if (!arrayAlbum.includes(dato.album.title)) {
          let titolo = dato.album.title;
          console.log(titolo);
          arrayAlbum.push(titolo);
          //creiamo i contenitori per gli album
          const albumConFoto = document.createElement("div");
          albumConFoto.classList.add("d-flex", "align-items-center", "mt-3");
          albumConFoto.innerHTML = `
        <div class="m-1">
        <img class="artist" src="${dato.album.cover_small}" \>
        </div>
        <div class="m-2"> <h4 class="fontSearch align-items-center"> ${dato.album.title} </h4>
        <p class="m-0"> ${dato.album.type}</p> </div>
        `;

          contenitoreRicerca.appendChild(albumConFoto);
        }
        const canzoniConFoto = document.createElement("div");
        canzoniConFoto.classList.add("d-flex", "align-items-center", "mt-3");
        canzoniConFoto.innerHTML = `
      <div class="m-1">
      <img class="artist" src="${dato.album.cover_small}" \>
      </div>
      <div class="m-2"> <h4 class="fontSearch align-items-center"> ${dato.title} </h4>
      <p class="m-0"> ${dato.type}</p> </div>
      `;
        contenitoreRicerca.appendChild(canzoniConFoto);
      });
      console.log(arrayAlbum);
    } catch (a) {
      console.log(a);
    }
  };
  console.log(form);
  serch();
});
