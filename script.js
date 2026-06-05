emailjs.init("N2j-GXJ7sG9TmFDum");

let selectedProduct = "";

// выбор товара
function addToOrder(productName) {
    selectedProduct = productName;

    document.getElementById("orderForm").scrollIntoView({ behavior: "smooth" });

    alert("Товар: " + productName);
}

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("orderForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // вставляем товар в hidden input
    document.getElementById("productField").value = selectedProduct;

    // ВАЖНО: sendForm, а не send
    emailjs.sendForm(
      "service_xt3ba4m",
      "template_j1keq2c",
      form
    )
    .then(() => {
      alert("Замовлення відправлено!");
      form.reset();
      selectedProduct = "";
    })
    .catch((error) => {
      console.log("EMAILJS ERROR:", error);
      alert("Помилка відправки");
    });

  });

});


// фильтры
function filterProducts(category) {
    const products = document.querySelectorAll('.products .product');
    products.forEach(p=>{
        if(category==='all') p.style.display='block';
        else p.style.display = p.classList.contains(category)?'block':'none';
    });
}

function filterFurniture(category) {
  const products = document.querySelectorAll('.products .product');
  products.forEach(p=>{
    if(category==='all') p.style.display='block';
    else p.style.display = p.classList.contains(category)?'block':'none';
  });
}

function changeDelivery() {
  const delivery = document.getElementById("delivery").value;

  document.getElementById("novaPost").style.display =
    delivery === "Нова Пошта" ? "block" : "none";

  document.getElementById("ukrPost").style.display =
    delivery === "Укрпошта" ? "block" : "none";
}