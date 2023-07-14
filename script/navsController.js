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

const userInfoReference = document.getElementById("userInfo");
// console.log("userInfoReference", userInfoReference);
const userInfo = () => {
  const userInfoImg = userInfoReference.querySelector("img");
  console.log("userInfoImg", userInfoImg);
  userInfoImg.src = `${"https://www.chenews.it/wp-content/uploads/2021/11/Gabibbo-4.jpg"}`;
  userInfoImg.style.height = "30px";
  const userInfoName = userInfoReference.querySelector("span");
  userInfoName.innerText = "Gabibbo";
};
userInfo();
