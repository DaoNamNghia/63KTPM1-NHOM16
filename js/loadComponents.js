document.addEventListener("DOMContentLoaded", function () {
  function loadHTML(file, element) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        element.innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
  }

  loadHTML("header.html", document.getElementById("header"));
  loadHTML("footer.html", document.getElementById("footer"));
});
