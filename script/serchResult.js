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
      console.log(data.data[0].artist.name.toLowerCase());
      console.log(input.toLowerCase());
      if (
        data.data[0].artist.name.toLowerCase() === input.toLowerCase() &&
        data.data[1].artist.name.toLowerCase() === input.toLowerCase()
      ) {
        const artistaConFoto = document.createElement("div");
        console.log("m");
        artistaConFoto.innerHTML = `
        <div class="m-1 border rounded-circle " id= "artist">
        <img src="${data.data[0].artist.picture_medium}" class="w-100" \>
        </div>
        <div> <h4> ${data.data[0].artist.name} </h4>
        <p> ${data.data[0].artist.type}</p> </div>
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
        artistaConFoto.innerHTML = `
      <div class="m-1 border rounded-circle " id= "artist">
      <img src="${data.data[1].artist.picture_medium}" class="w-100" \>
      </div>
      <div> <h4> ${data.data[1].artist.name} </h4>
      <p> ${data.data[1].artist.type}</p> </div>
      `;
        contenitoreRicerca.appendChild(artistaConFoto);
        let artist = document.getElementById("artist");
        artist.addEventListener("click", function () {
          window.location.assign(`artist.html?id=${data.data[2].artist.id}`);
        });
      }
      // ora collegiamo foto artista a pagina artista
      data.data.forEach((dato) => {
        let titolo = dato.album.title;
        arrayAlbum.push(titolo);
        //creiamo i contenitori per gli album
        const albumConFoto = document.createElement("div");
        albumConFoto.innerHTML = `
        <div class="m-1">
        <img src="${dato.album.cover_small}" \>
        </div>
        <div> <h4> ${dato.album.title} </h4>
        <p> ${dato.album.type}</p> </div>
        `;

        contenitoreRicerca.appendChild(albumConFoto);
      });
      console.log(arrayAlbum);
    } catch (a) {
      console.log(a);
    }
  };
  console.log(form);
  serch();
});
