document.addEventListener("DOMContentLoaded", function () {
  const log_in = document.querySelector(".registerButton");

  log_in.onclick = function () {
    this.classList.add("cuenta-creada");
    setTimeout(() => {
      this.innerHTML = "<div class='load '></div>";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 5000);
    }, 2000);
  };
});



document.addEventListener("DOMContentLoaded", function () {
  const log_in = document.querySelector(".loginButton");

  log_in.onclick = function () {
    this.classList.add("cuenta-creada");
    setTimeout(() => {
      this.innerHTML = "<div class='load'></div>";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }, 2000);
  };
  /* ------------------------------------------------
    -------------------------------------------------------------
    -------------------------------------------------- */
});


const fillButton = document.querySelector(".fill-button");

fillButton.addEventListener("click", () => {
  fillButton.classList.add("clicked");
});
