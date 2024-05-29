document.addEventListener("DOMContentLoaded", start);

function start() {
  const btn = document.querySelector(".searchBtn");
  const bar = document.querySelector(".searchBar");
  const input = document.getElementById("searchInput");
  const closeBtn = document.getElementById("searchClose");

  btn.addEventListener("click", (e) => {
    bar.style.visibility = "visible";
    bar.classList.add("open");
    e.target.setAttribute("aria-expanded", "true");
    input.focus();
  });

  closeBtn.addEventListener("click", (e) => {
    bar.style.visibility = "hidden";
    bar.classList.remove("open");
    e.target.setAttribute("aria-expanded", "false");
  })
}
