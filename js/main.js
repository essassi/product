//DOM variable

let photo = document.getElementById("photo");
let nameProduct = document.getElementById("name");
let description = document.getElementById("des");
let category = document.getElementById("category");
let price = document.getElementById("price");
let updateBtn = document.getElementById("update");
let deleteBtn = document.getElementById("delete");
let addBtn = document.getElementById("add");
let myCard = document.querySelectorAll(".card");
let cardContent = document.querySelectorAll(".card-content");
let title = document.getElementById("title");
let myToggleButton = document.getElementById("myToggleButton");
let test = document.getElementById("test");
let myLabels = document.querySelectorAll(".label");
let pName = document.querySelectorAll(".p-named");
let pCategory = document.querySelectorAll(".p-category");
let pPrice = document.querySelectorAll(".p-price");
let pDescription = document.querySelectorAll(".p-description");
let pImage = document.querySelectorAll(".p-image");
let myForm = document.getElementById("form");
let updateProduct = document.getElementById("update-product");
let added = document.getElementById("added");
const loadingContainer = document.getElementById("loading");

addBtn.addEventListener("click", () => {
  open("/add.html", "_blank", "width=500 ,height=500,top=100,left=200");
});
function showLoadingAnimation() {
  loadingContainer.style.display = "flex"; // Show loading animation
}
function hideLoadingAnimation() {
  loadingContainer.style.display = "none"; // Hide the loading animation
}
let array = [];

//end Dark/Light mode
function testFetch() {
  showLoadingAnimation();

  fetch("https://contemptuous-custom.000webhostapp.com/products.php")
    .then((res) => {
      let data = res.json();
      hideLoadingAnimation();

      return data;
    })
    .then((data) => {
      data.slice("").forEach((element) => {
        let archive = {
          id: element.id,
          name: element.name,
          category: element.category,
          description: element.description,
          price: element.price,
          image: element.image,
        };
        array.push(archive);

        localStorage.setItem("test", JSON.stringify(array));

        test.innerHTML += `
         <div class="card" id="card">
            <div class="card-content" id="card-content" >
                <img src="${element.image}" alt="" id="photo" class="photo">
                <div class="product-des">
                    <p class="name" id="name"><strong>Product name :</strong> ${element.name}</p>
                    <p class="des" id="des"><strong>Description:</strong> ${element.description} </p>
                </div>
                <div class="info">
                    <p class="category" id="category"><strong>Category:</strong> ${element.category}</p>
                    <p class="price" id="price" ><strong>Price:</strong> ${element.price}$</p>
                </div>
                <div class="action">
                    <button class="update" id="update" data-id="${element.id}">Update</button>
                    <button class="delete" id="delete"   data-id="${element.id}">Delete</button>
                </div>
            </div>


        </div>
      `;
      });
    })
    .catch((err) => {
      console.log(err);
      hideLoadingAnimation();
    });
}
testFetch();

test.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    const productId = target.getAttribute("data-id");
    const deleteUrl = `https://contemptuous-custom.000webhostapp.com/products.php?id=${productId}&method=delete`;

    fetch(deleteUrl)
      .then(() => {
        const cardContent = target.closest(".card");

        cardContent.remove();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
});
let productId;
//
test.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("update")) {
    productId = target.getAttribute("data-id");
    localStorage.setItem("productIdToUpdate", productId);

    open(
      `/edit.html?id=${productId}`,
      "_blank",
      "width=500 ,height=500,top=100,left=200"
    );
  }
});

let dark = JSON.parse(localStorage.getItem("mode"));

if (dark) {
  cardContent.forEach((content) => content.classList.add("dark"));
  myCard.forEach((card) => card.classList.add("dark"));
  document.body.classList.add("dark");
  title.classList.add("dark");
  test.classList.add("dark");

  myToggleButton.classList.add("on");
}

myToggleButton.addEventListener("click", function () {
  cardContent.forEach((content) => content.classList.toggle("dark"));
  myCard.forEach((card) => card.classList.toggle("dark"));
  document.body.classList.toggle("dark");
  title.classList.toggle("dark");
  test.classList.toggle("dark");

  myToggleButton.classList.toggle("on");

  addModeToLocalStorage();
});

function addModeToLocalStorage() {
  localStorage.setItem("mode", myToggleButton.classList.contains("on"));
}
