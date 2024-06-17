var escBtn = document.querySelector(".action .escBtn");
var updateBtn = document.querySelector("button.update");
var form = document.querySelector("form");

escBtn.addEventListener("click", function () {
  window.location.href = "./../couponList.html";
});

//toastBox
const toastBox = document.querySelector(".toastBox");
var successMsg = `<i class="fa-solid fa-circle-check"></i> Sửa thành công`;
var errorMsg = `<i class="fa-solid fa-circle-xmark"></i> Sửa thất bại,vui lòng nhập đủ thông tin`;
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
var inputs = document.querySelectorAll(`input`);

updateBtn.addEventListener("click", function (e) {
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
