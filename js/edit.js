let myLabels = document.querySelectorAll(".label");
let pName = document.getElementById("p-name");
let pCategory = document.getElementById("p-category");
let pPrice = document.getElementById("p-price");
let pDescription = document.getElementById("p-description");
let pImage = document.getElementById("p-image");
let myToggleButton = document.getElementById("myToggleButton");
let myForm = document.getElementById("form");
let updateProduct = document.getElementById("update");
let added = document.getElementById("added");
let darkadd = localStorage.getItem("modeedit");
if (darkadd) {
  pName.classList.add("dark");
  pCategory.classList.add("dark");
  pPrice.classList.add("dark");
  pDescription.classList.add("dark");
  myLabels.forEach((label) => label.classList.add("dark"));
  document.body.classList.add("dark");
  myForm.classList.add("dark");

  myToggleButton.classList.add("on");
}

myToggleButton.addEventListener("click", function () {
  pName.classList.toggle("dark");
  pCategory.classList.toggle("dark");
  pPrice.classList.toggle("dark");
  pDescription.classList.toggle("dark");
  myForm.classList.toggle("dark");

  myLabels.forEach((label) => label.classList.toggle("dark"));
  document.body.classList.toggle("dark");

  myToggleButton.classList.toggle("on");

  addModeToLocalStorage();
});
const productIdToUpdate = localStorage.getItem("productIdToUpdate");

let data = JSON.parse(localStorage.getItem("test"));

const productToUpdate = data.find(
  (product) => product.id === productIdToUpdate
);

if (productToUpdate) {
  pCategory.value = productToUpdate.category;
  pName.value = productToUpdate.name;
  pPrice.value = productToUpdate.price;
  pDescription.value = productToUpdate.description;
  pImage.src = productToUpdate.image;
}

function addModeToLocalStorage() {
  localStorage.setItem("modeedit", myToggleButton.classList.contains("on"));
}
myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", pName.value);
  formData.append("category", pCategory.value);
  formData.append("price", pPrice.value);
  formData.append("description", pDescription.value);
  formData.append("image", pImage.files[0]);

  fetch(
    `https://contemptuous-custom.000webhostapp.com/products.php?id=${productIdToUpdate}&method=put`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((data) => {
      console.log(data);
    })
    .then(() => {
      pName.value = "";
      pCategory.value = "";
      pPrice.value = "";
      pDescription.value = "";
      pImage.value = null;
      added.style.cssText = "color:green;font-weight=900";
      added.innerHTML = "Product updated successfully";
      setTimeout(() => {
        added.innerHTML = "";
      }, 1000);
       setTimeout(() => {
  window.location.href = "index.html";
}, 1000);
    })
    .catch((err) => console.log(err));
});
