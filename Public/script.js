document.addEventListener("DOMContentLoaded", function () {
  const submit_data = document.getElementById("submit_data");
  submit_data.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nameCros = document.getElementById("nameCros").value;
    const shoesSize = document.getElementById("size").value;
    const clientname = document.getElementById("clientname").value;
    const phone = document.getElementById("phone").value;

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameCros,
          shoesSize,
          clientname,
          phone,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Помилка при створені:", response.statusText);
      }
    } catch (error) {
      console.error("Помилка при відправці:", error);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const getDataButton = document.getElementById("getDataButton");
  getDataButton.addEventListener("click", async function () {
    try {
      const response = await fetch("/api/shoes");
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const getDataButton = document.getElementById("getDataButton");
  getDataButton.addEventListener("click", async function () {
    try {
      const response = await fetch("/api/shoes");
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
});

function displayData(data) {
  const shoesContainer = document.getElementById("shoes-container");
  shoesContainer.innerHTML = "";

  data.forEach((shoes) => {
    const shoesDiv = document.createElement("div");
    shoesDiv.classList.add("apartment-item");

    shoesDiv.innerHTML = `
      <p>Модель: ${shoes.nameCros}</p>
      <p>Розмір: ${shoes.shoesSize}</p>
      <p>Ім'я: ${shoes.clientname}</p>
      <p>Телефон: ${shoes.phone}</p>
      <br>
    `;

    shoesContainer.appendChild(shoesDiv);
  });
}

const photo1 = document.getElementById("photo1");
const photo2 = document.getElementById("photo2");
const photo3 = document.getElementById("photo3");
const photoactive = document.getElementById("myimage");

function changeActive(src) {
  const path = `img/${src}.webp`;
  photoactive.src = path;
}

photo1.addEventListener("click", () => {
  clear();
  document.querySelector(".img-zoom-lens").remove();
  imageZoom("myimage", "myresult");
  photo1.classList.add("active");
});
photo2.addEventListener("click", () => {
  clear();
  document.querySelector(".img-zoom-lens").remove();
  imageZoom("myimage", "myresult");
  photo2.classList.add("active");
});
photo3.addEventListener("click", () => {
  clear();
  document.querySelector(".img-zoom-lens").remove();
  imageZoom("myimage", "myresult");
  photo3.classList.add("active");
});

function clear() {
  photo1.classList.remove("active");
  photo2.classList.remove("active");
  photo3.classList.remove("active");
}

imageZoom("myimage", "myresult");

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  img.parentElement.insertBefore(lens, img);
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

function reloadPage() {
  location.reload();
}
