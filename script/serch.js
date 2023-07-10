let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const form = document.getElementById("search");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.querySelector("input").value;
  console.log(input);

  const contenitoreRicerca = document.getElementById("contenitoreRicerca");

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

      data.data.forEach((dato) => {
        let titolo = dato.album.title;
        arrayAlbum.push(titolo);
        //creiamo i contenitori per gli album
        const artistaConFoto = document.createElement("div");
        artistaConFoto.innerHTML = `
        <div>
        <img src="${dato.album.cover_small}" \>
        </div>
        `;

        contenitoreRicerca.appendChild(artistaConFoto);
      });
      console.log(arrayAlbum);

      //compilare in abe alla ricerca delle card:
      //  let artistaTrovato = document.createElement('div')
      // il primo risultato è un div con background image l'artista e le scritte bla bla
      //e che fa da link alla pagina dell'artista con le canzoni
      //  artistaTrovato.style= "backgroundImage: url('')"
    } catch (a) {
      console.log(a);
    }
  };
  console.log(form);
  serch();
});
