const addressBarContent = window.location.href;

// lascia all'home page la funzioni base del carosello
if (!addressBarContent.includes("index")) {
  document.querySelector(".prevPage").addEventListener("click", () => {
    history.back();
  });

  document.querySelector(".next-page").addEventListener("click", () => {
    history.forward();
  });
}

// chiude le card nella navBar DX
const navBarDxClose = document.getElementsByClassName("navBarDxClose")[0];
navBarDxClose.addEventListener("click", () => {
  navBarDxClose.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle(
    "d-none"
  );
});

// chiude le playlist nella navBar SX
const navBarSxClose = document.getElementsByClassName("navBarSxClose")[0];
navBarSxClose.addEventListener("click", () => {
  console.log(navBarSxClose.parentElement.nextElementSibling);
  navBarSxClose.parentElement.nextElementSibling.classList.toggle("d-md-none");
});
