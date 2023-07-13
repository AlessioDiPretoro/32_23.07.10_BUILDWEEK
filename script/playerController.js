// const addressUrl = new URLSearchParams(location.search);
// console.log("addressUrl in player", addressUrl);
// const albumID = addressUrl.get("id");

// const urlMain = "https://striveschool-api.herokuapp.com/api/deezer/";
// const urlAlbum = "album/";

// const dataSync = async function () {
//   let response;
//   let data;
//   try {
//     response = await fetch(urlMain + urlAlbum + albumID);
//     data = await response.json();

//     return data;
//     // ;
//   } catch (err) {
//     console.log("ERRORE rilevato", err);
//   }
// };

// const startPlayer = async (data) => {
//   if (addressUrl) {
//     await dataSync(data);
//     console.log("response player", data);
//   }
// };
// startPlayer();
// const id = addressUrl.get("id");
