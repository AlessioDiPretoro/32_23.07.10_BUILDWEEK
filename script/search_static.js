let input = document.getElementById("search");
input.addEventListener("click", function () {
  window.location.assign("search.html");
});
let card = document.querySelectorAll(".cardMainSearch");
card.forEach((e, n) => {
  e.addEventListener("click", function () {
    let pCard = document.querySelectorAll(".cardMainSearch p");
    console.log(pCard[n].innerText);
    window.location.assign(`search.html?id=${pCard[n].innerText}`);
  });
});
