let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="220" height="300" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

function submitProduct() {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const imageInput = document.getElementById('image');
  if (!title || !price || !imageInput.files[0]) {
      alert('Please fill in all fields');
      return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
      const image = e.target.result;

      const newProductBox = document.createElement('div');
      newProductBox.className = 'product-box';

      const productHTML = `
    <img src="${image}" alt="${title}" width="200" class="product-img">
    <h2 class="product-title">${title}</h2>
    <span class="product-price">$${price}</span>
    <i class='bx bx-shopping-bag add-cart'></i>`;
      newProductBox.innerHTML = productHTML;
      const newProductsSection = document.getElementById('newProducts');
      newProductsSection.insertBefore(newProductBox, newProductsSection.firstChild);
      document.getElementById('title').value = '';
      document.getElementById('price').value = '';
      document.getElementById('image').value = '';
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function search() {
  let filter = document.getElementById("search").value.toUpperCase();
  let item = document.querySelectorAll(".item");
  let l = document.getElementsByTagName("h3");
  for (var i = 0; i <= l.length; i++) {
    let a = item[i].getElementsByTagName("h3")[0];
    let value = a.innerHTML || a.innerText || a.textContent;
    if (value.toUpperCase().indexOf(filter) > -1) {
      item[i].style.display = "";
    } else {
      item[i].style.display = "none";
    }
  }
}