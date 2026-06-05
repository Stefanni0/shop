emailjs.init("N2j-GXJ7sG9TmFDum");

let cart = [];

const prices = {
  "Нитки": 40,
  "Гудзики": 25,
  "Блискавки": 18,
  "Ручки меблеві": 55,
  "Петлі": 35,
  "Ніжки для меблів": 80
};

function addToOrder(name) {
  let item = cart.find(i => i.name === name);

  if (item) item.qty++;
  else cart.push({ name, qty: 1 });

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("totalPrice");

  if (!list || !totalEl) return;

  document.getElementById("orderSection").style.display = "block";

  list.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    let sum = prices[item.name] * item.qty;
    total += sum;

    list.innerHTML += `
      <li>
        ${item.name} × 
        <input type="number" value="${item.qty}" min="1"
          onchange="changeQty(${i}, this.value)">
        = ${sum} грн
        <button type="button" onclick="removeItem(${i})">❌</button>
      </li>
    `;
  });

  totalEl.innerText = total;

  document.getElementById("cartField").value =
    cart.map(i => `${i.name} x${i.qty}`).join(", ");

  document.getElementById("totalField").value = total;
}

function changeQty(i, val) {
  cart[i].qty = parseInt(val);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();

  if (cart.length === 0) {
    document.getElementById("orderSection").style.display = "none";
  }
}

function changeDelivery() {
  let d = document.getElementById("delivery").value;

  document.getElementById("novaPost").style.display =
    d === "Нова Пошта" ? "block" : "none";

  document.getElementById("ukrPost").style.display =
    d === "Укрпошта" ? "block" : "none";
}

// отправка
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("orderForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let delivery = document.getElementById("delivery").value;

    let info =
      delivery === "Нова Пошта"
        ? document.querySelector('[name="nova_branch"]').value
        : document.querySelector('[name="postcode"]').value;

    document.getElementById("deliveryInfoField").value = info;

    document.getElementById("cartField").value =
      cart.map(i => `${i.name} x${i.qty}`).join(", ");

    let total = 0;
    cart.forEach(i => total += prices[i.name] * i.qty);
    document.getElementById("totalField").value = total;

    emailjs.sendForm(
      "service_xt3ba4m",
      "template_j1keq2c",
      form
    ).then(() => {
      alert("Замовлення відправлено!");

      cart = [];
      renderCart();
      form.reset();
      document.getElementById("orderSection").style.display = "none";
    });
  });

});