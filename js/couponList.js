const addBtn = document.querySelector(".couponList .action .addBtn");
addBtn.addEventListener("click", function () {
  window.location.href = "./../couponAdd.html";
});

var updateIcons = document.querySelectorAll(".action .fa-pencil");

updateIcons.forEach(function (updateicon) {
  updateicon.addEventListener("click", function () {
    window.location.href = "./../couponUpdate.html";
  });
});
