const addressUrl = new URLSearchParams(location.search);
const id = addressUrl.get("id");
const urlPerFetch =
  "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;
console.log(id);

const tracceAlbum = async function () {
  let response = await fetch(urlPerFetch);
  let data = await response.json();
  console.log(data);
  //prendiamo l'ul dentro al div
  const listona = document.getElementById("listaCanzoni");
  data.tracks.data.forEach((canzone) => {
    let li = document.createElement("li");
    li.innerHTML = `
     <img src="${canzone.album.cover_medium}" />
     <li>${canzone.title}</li>
     `;
    listona.appendChild(li);
  });
};

tracceAlbum();
