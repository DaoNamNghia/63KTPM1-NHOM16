var escBtn = document.querySelector(".escBtn");
var addBtn = document.querySelector("button.add");
var index = localStorage.getItem("index")
  ? parseInt(localStorage.getItem("index"))
  : 0;

escBtn.addEventListener("click", function () {
  window.location.href = "/63KTPM1-NHOM16/couponList.html";
});
// var form = document.querySelector("form");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log("hello");
// });

//Thêm mới dữ liệu
var productsAPI = "http://localhost:3000/products";
function start() {
  getProducts(function (products) {
    // Cập nhật index dựa trên số lượng sản phẩm hiện có
    index = products.length;
    localStorage.setItem("index", index); // Lưu giá trị index mới vào localStorage
    renderProducts(products);
    // handleCreateProducts();
  });
}
start();
function getProducts(callback) {
  fetch(productsAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function createProducts(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productsAPI, option)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}

function renderProducts(products) {
  var interface = products.map(function (product, index) {
    return `
    <tr class="product-${index}">
    <th scope="row"><input type="radio" name="option" /></th>
    <td>${product.ma}</td>
    <td>${product.thoiGian}</td>
    <td>${product.giaTriGiam}</td>
    <td>${product.luotSuDung}</td>
    <td>${product.minUse}đ</td>
    <td>${product.trangThai}</td>
    <td>
      <div class="action">
        <i class="fa-solid fa-eye"></i>
        <i class="fa-solid fa-pencil" data-id="${product.id}"></i>
           <i class="fa-solid fa-trash" data-id="${product.id}"></i>
      </div>
    </td>
  </tr>
    `;
  });
  localStorage.setItem("couponList", JSON.stringify(interface)); //Lưu tại interface trên localStrorage qua couponList
}
function handleCreateProducts() {
  index++;
  localStorage.setItem("index", index); // Lưu giá trị index mới vào localStorage
  var name = document.querySelector(`input[name="name"]`).value;
  var startDay = document.querySelector(`input[name="startDay"]`).value;
  var endDay = document.querySelector(`input[name="endDay"]`).value;
  var discountValue = document.querySelector(
    `input[name="discountValue"]`
  ).value;
  var limitUse = document.querySelector(`input[name="limitUse"]`).value;
  var limitValue = document.querySelector(`input[name="limitValue"]`).value;
  var status = document.querySelector(`select[name="status"]`);
  var selectedIndex = status.selectedIndex;
  var selectedOption = status.options[selectedIndex].value;
  if (
    !name ||
    !startDay ||
    !endDay ||
    !discountValue ||
    !limitUse ||
    !limitValue ||
    !selectedOption
  ) {
    showToast(errorMsg);
    return;
  }
  var formData = {
    id: `${index}`,
    ma: name,
    thoiGian: `${startDay}-${endDay}`,
    giaTriGiam: discountValue,
    luotSuDung: limitUse,
    minUse: limitValue,
    trangThai: selectedOption,
  };

  createProducts(formData, function () {
    getProducts(renderProducts);
    showToast(successMsg);
    setTimeout(function () {
      window.location.href = "/63KTPM1-NHOM16/couponList.html";
    }, 2000);
  });
  console.log(index);
}

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
  }, 5000);
};

//thêm dữ liệu khi bấm nút thêm

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  handleCreateProducts(e);
});
