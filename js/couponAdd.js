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
var addBtn = document.querySelector("button.add");
escBtn.addEventListener("click", function () {
  window.location.href = "./../couponList.html";
});

//toastBox
const toastBox = document.querySelector(".toastBox");
var successMsg = `<i class="fa-solid fa-circle-check"></i> Thêm thành công`;
var errorMsg = `<i class="fa-solid fa-circle-xmark"></i> Thêm thất bại,vui lòng nhập đủ thông tin`;
var showToast = function (msg) {
  let toast = document.createElement("div");
  toast.classList.add("customToast");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);
  setTimeout(function () {
    toastBox.removeChild(toast);
  }, 2000);
};

//kiểm tra dữ liệu khi bấm nút sửa
var inputs = document.querySelectorAll(`input[type="text"]`);
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var check = false;
  inputs.forEach(function (input) {
    if (input.value.trim() === "") {
      check = true;
    }
  });
  if (check) {
    showToast(errorMsg);
  } else {
    showToast(successMsg);
  }
});
