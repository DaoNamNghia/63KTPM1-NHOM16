// var inputDates = document.querySelectorAll(".timeUse .input-wrapper input");
// var iconDates = document.querySelectorAll(".timeUse .input-wrapper img");
// // var starDay = document.querySelector("#startDay");
// console.log(inputDates);
// console.log(iconDates);

// iconDates.forEach(function (icon, index) {
//   icon.addEventListener("click", function () {
//     if (!inputDates[index].open) {
//       inputDates[index].focus();
//       inputDates[index].open();
//     }
//   });
// });

var escBtn = document.querySelector(".escBtn");
escBtn.addEventListener("click", function () {
  window.location.href = "./../couponList.html";
});
