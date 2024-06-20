var escBtn = document.querySelector(".action .escBtn");
var updateBtn = document.querySelector("button.update");
var form = document.querySelector("form");

escBtn.addEventListener("click", function () {
  window.location.href =
    "https://daonamnghia.github.io/63KTPM1-NHOM16/couponList.html";
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
  }, 3000);
};

//kiểm tra dữ liệu khi bấm nút sửa
var inputs = document.querySelectorAll(`input`);

updateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // var check = false;
  // inputs.forEach(function (input) {
  //   if (input.value.trim() === "") {
  //     check = true;
  //   }
  // });
  // if (check) {
  //   showToast(errorMsg);
  // } else {
  //   showToast(successMsg);
  // }
  handleUpdateProducts(e);
});

// sửa dữ liệu
var productsAPI = "http://localhost:3000/products";
function start() {
  getProducts(function (products) {
    // Cập nhật index dựa trên số lượng sản phẩm hiện có
    index = products.length;
    localStorage.setItem("index", index); // Lưu giá trị index mới vào localStorage
    renderProducts(products);
    // handleUpdateProducts();
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

function updateProducts(data, callback) {
  var updateiconId = localStorage.getItem("updateId");

  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(productsAPI + "/" + updateiconId, option)
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
function handleUpdateProducts(e) {
  index++;
  localStorage.setItem("index", index); // Lưu giá trị index mới vào localStorage
  e.preventDefault();
  e.stopPropagation();
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

  updateProducts(formData, function () {
    getProducts(renderProducts);
    showToast(successMsg);
    setTimeout(function () {
      window.location.href =
        "https://daonamnghia.github.io/63KTPM1-NHOM16/couponList.html";
    }, 3000);
  });
  console.log(index);
}
