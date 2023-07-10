let url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const form = document.getElementById("search");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.querySelector("input").value;
  console.log(input);

  const serch = async function () {
    try {
      let response = await fetch(url + input);
      console.log(response);
      let data = await response.json();
      console.log(data);
    } catch (a) {
      console.log(a);
    }
  };
  console.log(form);
  serch();
});
