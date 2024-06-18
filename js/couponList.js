document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".couponList .action .addBtn");
  addBtn.addEventListener("click", function () {
    window.location.href = "./../couponAdd.html";
  });

  // hiển thị dữ liệu từ trường nhập vào bảng
  // var productsAPI = "http://localhost:3000/products";
  // function start() {
  //   getProducts(renderProducts);
  // }
  // start();
  // function getProducts(callback) {
  //   fetch(productsAPI)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(callback);
  // }

  // function renderProducts(products) {
  //   var tBody = document.querySelector(".table-wrapper tbody");
  //   var interface = products.map(function (product) {
  //     return `
  //     <tr>
  //     <th scope="row"><input type="radio" name="option" /></th>
  //     <td>${product.ma}</td>
  //     <td>${product.thoiGian}</td>
  //     <td>${product.giaTriGiam}</td>
  //     <td>${product.luotSuDung}</td>
  //     <td>${product.minUse}đ</td>
  //     <td>${product.trangThai}</td>
  //     <td>
  //       <div class="action">
  //         <i class="fa-solid fa-eye"></i>
  //         <i class="fa-solid fa-pencil"></i>
  //         <i class="fa-solid fa-trash"></i>
  //       </div>
  //     </td>
  //   </tr>
  //     `;
  //   });
  //   tBody.innerHTML = interface.join("");
  //   console.log(interface);
  //   //bấm vào icon bút --> sang giao diện sửa
  //   var updateIcons = document.querySelectorAll(".action .fa-pencil");
  //   updateIcons.forEach(function (updateicon) {
  //     updateicon.addEventListener("click", function () {
  //       window.location.href = "./../couponUpdate.html";
  //     });
  //   });
  // }
  var productsAPI = "http://localhost:3000/products";
  function start() {
    getProducts(renderProducts);
  }
  start();
  function getProducts(callback) {
    fetch(productsAPI)
      .then(function (response) {
        return response.json();
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
          <i class="fa-solid fa-pencil"></i>
          <i class="fa-solid fa-trash product-${index}"></i>
        </div>
      </td>
    </tr>
      `;
    });
    localStorage.setItem("couponList", JSON.stringify(interface)); //Lưu tại interface trên localStrorage qua couponList
  }
  const tbody = document.querySelector("tbody");
  const saveCounpons = localStorage.getItem("couponList"); // lấy ra saveCoupons trên localStrorage thông qua couponList
  tbody.innerHTML = JSON.parse(saveCounpons).join("");
  var trashicons = document.querySelectorAll(`.action i.fa-trash`);
  trashicons.forEach(function (icon, i) {
    icon.addEventListener("click", function () {
      var tr = document.querySelector(`tr[class=product-${i}]`);
      tbody.removeChild(tr);
    });
  });

  //  bấm vào icon bút --> sang giao diện sửa
  var updateIcons = document.querySelectorAll(".action .fa-pencil");
  updateIcons.forEach(function (updateicon) {
    updateicon.addEventListener("click", function () {
      window.location.href = "./../couponUpdate.html";
    });
  });
});
