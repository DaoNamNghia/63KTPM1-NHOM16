document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".couponList .action .addBtn");
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./couponAdd.html";
    console.log("chuyển hướng");
  });

  // gọi API
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
  const tbody = document.querySelector("tbody");
  function handleDeleteProducts(productId) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(productsAPI + "/" + productId, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
  function renderProducts(products) {
    var interface = products.map(function (product) {
      return `
      <tr class="product-${product.id}">
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
    tbody.innerHTML = interface.join("");
    console.log("render lại");

    var trashicons = document.querySelectorAll(`.action i.fa-trash`);
    trashicons.forEach(function (icon) {
      icon.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var productId = icon.getAttribute("data-id");
        console.log(productId);
        var header = document.querySelector("#header");
        var body = document.querySelector("body");
        var noti = document.createElement("div");
        noti.classList.add("noti");
        noti.innerHTML = `
          <div class="noti-content">
          <div class="noti-title">Thông báo xác nhận</div>
          <div class="noti-ask">Bạn có chắc chắn xóa không ?</div>
          <div class="btn-wrapper">
            <button class="yes"><span>Có</span></button>
            <button class="no">Không</button>
          </div>
        </div>
          `;
        body.insertBefore(noti, header);

        noti.querySelector(".yes").addEventListener("click", function () {
          var deleteItem = document.querySelector(`tr.product-${productId}`);
          deleteItem.remove();
          handleDeleteProducts(productId);
          body.removeChild(noti);
        });
        noti.querySelector(".no").addEventListener("click", function () {
          body.removeChild(noti);
        });
      });
    });

    //  bấm vào icon bút --> sang giao diện sửa
    var updateIcons = document.querySelectorAll(".action .fa-pencil");
    updateIcons.forEach(function (updateicon) {
      updateicon.addEventListener("click", function () {
        var updateiconId = updateicon.getAttribute("data-id");
        console.log(updateiconId);
        localStorage.setItem("updateId", updateiconId);
        window.location.href = "./couponUpdate.html";
      });
    });
  }
});

//cách cũ
/*
document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".couponList .action .addBtn");
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./couponAdd.html";
    console.log("chuyển hướng");
  });

  // gọi API
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
    var interface = products.map(function (product) {
      return `
      <tr class="product-${product.id}">
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
    console.log("render lại");
    localStorage.setItem("couponList", JSON.stringify(interface)); //Lưu tại interface trên localStrorage qua couponList
  }
  const tbody = document.querySelector("tbody");
  const saveCounpons = localStorage.getItem("couponList"); // lấy ra saveCoupons trên localStrorage thông qua couponList
  tbody.innerHTML = JSON.parse(saveCounpons).join("");

  //hàm xóa
  function handleDeleteProducts(productId) {
    var option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(productsAPI + "/" + productId, option)
      .then(function (response) {
        return response.json();
      })
      .then(function () {});
  }
  var trashicons = document.querySelectorAll(`.action i.fa-trash`);
  trashicons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var productId = icon.getAttribute("data-id");
      console.log(productId);
      var header = document.querySelector("#header");
      var body = document.querySelector("body");
      var noti = document.createElement("div");
      noti.classList.add("noti");
      noti.innerHTML = `
        <div class="noti-content">
        <div class="noti-title">Thông báo xác nhận</div>
        <div class="noti-ask">Bạn có chắc chắn xóa không ?</div>
        <div class="btn-wrapper">
          <button class="yes"><span>Có</span></button>
          <button class="no">Không</button>
        </div>
      </div>
        `;
      body.insertBefore(noti, header);

      noti.querySelector(".yes").addEventListener("click", function () {
        var deleteItem = document.querySelector(`tr.product-${productId}`);
        deleteItem.remove();
        handleDeleteProducts(productId);
        body.removeChild(noti);
        f;
      });
      noti.querySelector(".no").addEventListener("click", function () {
        body.removeChild(noti);
      });
    });
  });

  //  bấm vào icon bút --> sang giao diện sửa
  var updateIcons = document.querySelectorAll(".action .fa-pencil");
  updateIcons.forEach(function (updateicon) {
    updateicon.addEventListener("click", function () {
      var updateiconId = updateicon.getAttribute("data-id");
      console.log(updateiconId);
      localStorage.setItem("updateId", updateiconId);
      window.location.href = "./couponUpdate.html";
    });
  });
});
*/
