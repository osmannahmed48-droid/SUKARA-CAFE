

// ===================================
// SUKARA - SUPABASE CONNECTION
// ===================================

const SUPABASE_URL = "https://guklbwfbtwcixqdoekei.supabase.co";

const SUPABASE_KEY = "sb_publishable_hR_LlXa0mD_CZcrwW5RM0w_dUQXdK9e";
const menuData = [
  {
    id: "coffee",
    name: "مشروبات القهوة",
    items: [
      ["اسبريسو", "70 / 60"],
      ["أمريكانو", "80 / 70"],
      ["لاتيه", "105 / 90"],
      ["كابتشينو", "105 / 90"],
      ["فلات وايت", "110 / 100"],
      ["ماكياتو", "80 / 70"],
      ["موكا (دارك، وايت)", "110 / 100"],
      ["كورتادو", "90"],
      ["سبانش لاتيه", "115 / 100"],
      ["كراميل ميكاتو", "115 / 105"],
      ["سولتد كراميل لاتيه", "115 / 105"],
      ["بستاشيو لاتيه", "155 / 140"],
      ["روز لاتيه", "155 / 140"],
      ["ريد فيلفيت لاتيه", "155 / 140"],
      ["زعفران لاتيه", "155 / 140"],
      ["مستكة لاتيه", "155 / 140"]
    ]
  },
  {
    id: "iced",
    name: "مشروبات مثلجة",
    items: [
      ["ايسد لاتيه", "105"],
      ["ايسد أمريكانو", "85"],
      ["ايسد موكا (دارك، وايت)", "140 / 115"],
      ["ايسد سولتد كراميل", "140 / 115"],
      ["ايسد سبانش لاتيه", "140 / 115"],
      ["ايسد بستاشيو لاتيه", "180 / 150"],
      ["ايسد روز لاتيه", "180 / 150"],
      ["ايسد ريد فيلفيت لاتيه", "180 / 150"],
      ["ايسد زعفران لاتيه", "180 / 150"],
      ["ايسد مستكة لاتيه", "180 / 150"],
      ["ايسد كراميل ميكاتو", "140 / 115"],
      ["ايسد شيكن سُكَره", "140 / 115"],
      ["ايسد فرابتشينو", "140 / 115", ["كراميل", "وايت موكا", "لوتس"]]
    ]
  },
  {
    id: "hot",
    name: "مشروبات ساخنة",
    items: [
      ["قهوة تركي", "65 / 50"],
      ["قهوة فرنساوي (كلاسيك، بندق)", "75 / 65"],
      ["قهوة عربية", "100"],
      ["شاي", "40"],
      ["شاي كرك", "70"]
    ]
  },
  {
    id: "matcha",
    name: "ماتشا",
    items: [
      ["ماتشا كلاسيك (هوت، ايسد)", "120"],
      ["ايسد ماتشا", "120"],
      ["ماتشا (فراولة، باشون فروت، توت)", "135"]
    ]
  },
  {
    id: "boba",
    name: "بوبا تي",
    items: [
      ["ايسد بوبا ميلك تي", "110"],
      ["ايسد بوبا ميلك ماتشا", "115"],
      ["ايسد بوبا ميلك باشون فروت", "115"],
      ["ايسد بوبا ميلك توت", "115"],
      ["ايسد بوبا ميلك فراولة", "115"]
    ]
  },
  {
    id: "frappe",
    name: "فرابيه",
    items: [
      ["فانيليا، شوكولاتة، فراولة", "115"],
      ["خوخ، كراميل، أوريو، لوتس", "115"],
      ["باشون فروت، جوز هند، سولتد كراميل", "115"],
      ["بستاشيو، روز، ريد فيلفيت، مستكة، زعفران", "155"]
    ]
  },
  {
    id: "milkshake",
    name: "ميلك شيك",
    items: [
      ["توت، فراولة، أوريو، لوتس", "115"],
      ["كراميل، باشون فروت، فانيليا، شوكولاتة، خوخ", "115"],
      ["جوز هند، كابتشينو", "155"],
      ["بستاشيو، روز، ريد فيلفيت، زعفران، مستكة", "155"]
    ]
  },
  {
    id: "mojito",
    name: "موهيتو",
    items: [
      ["باشون فروت، توت، مانجا", "90"],
      ["ليمون نعناع، فراولة، خوخ، كولا، ريدبول", "90"],
      ["موهيتو ريدبول", "130"]
    ]
  },
  {
    id: "icedtea",
    name: "شاي مثلج",
    items: [
      ["كركديه كلاسيك", "100"],
      ["خوخ، فراولة، توت", "100"],
      ["باشون فروت", "100"]
    ]
  },
  {
    id: "smoothie",
    name: "سموزي",
    items: [
      ["مانجا، توت، باشون فروت", "90"],
      ["كولا، فراولة، ليمون نعناع", "90"],
      ["تفاح أخضر", "90"]
    ]
  }
];

// عناصر الصفحة
const categoryTabs = document.getElementById("categoryTabs");
const productsGrid = document.getElementById("productsGrid");
const menuSearch = document.getElementById("menuSearch");
const menuCount = document.getElementById("menuCount");
const activeCategoryTitle = document.getElementById("activeCategoryTitle");
const emptyState = document.getElementById("emptyState");

// حالة المنيو
let activeCategory = "coffee";
let searchTerm = "";

// سلة الطلبات
let cart = [];

// الكميات والاختيارات داخل كروت المنتجات
const productSelections = {};

// تحويل السعر النصي إلى أرقام
function getPrices(priceText) {
  if (!priceText) return [];

  return priceText
    .split("/")
    .map(price => Number(price.trim()))
    .filter(price => Number.isFinite(price) && price > 0);
}

// تجهيز كل المنتجات بمعرف ثابت
function getAllProducts() {
  return menuData.flatMap(category =>
    category.items.map((item, index) => ({
      id: `${category.id}-${index}`,
      categoryId: category.id,
      categoryName: category.name,
      name: item[0],
      priceText: item[1],
      prices: getPrices(item[1]),
      flavors: item[2] || []
    }))
  );
}

// عرض أقسام المنيو
function renderCategories() {
  categoryTabs.innerHTML = menuData.map(category => `
    <button
      class="category-tab ${activeCategory === category.id ? "active" : ""}"
      data-category="${category.id}">
      ${category.name}
    </button>
  `).join("");
}

// عرض كروت المنتجات
function renderProducts() {
  const selectedCategory = menuData.find(
    category => category.id === activeCategory
  );

  activeCategoryTitle.textContent = selectedCategory
    ? selectedCategory.name
    : "نتائج البحث";

  let products = getAllProducts();

  if (searchTerm) {
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.categoryName.toLowerCase().includes(searchTerm)
    );
  } else {
    products = products.filter(product =>
      product.categoryId === activeCategory
    );
  }

  menuCount.textContent = `${products.length} صنف`;

  productsGrid.innerHTML = products.map((product, index) => {
    const selection = productSelections[product.id] || {
      quantity: 1,
      selectedPrice: null,
      selectedFlavor: null
    };

    const pricesHTML = product.prices.length > 1
      ? `
        <div class="product-price-options">
          ${product.prices.map((price, priceIndex) => `
            <button
              class="price-option ${
                selection.selectedPrice === priceIndex ? "selected" : ""
              }"
              data-action="select-price"
              data-id="${product.id}"
              data-price-index="${priceIndex}">
              ${price} <small>جنيه</small>
            </button>
          `).join("")}
        </div>
      `
      : product.prices.length === 1
        ? `<div class="single-price">${product.prices[0]} جنيه</div>`
        : `<div class="single-price">متاح للطلب · السعر عند الطلب</div>`;

    const flavorsHTML = product.flavors.length
      ? `
        <div class="product-flavor-options">
          <label for="flavor-${product.id}">اختار النكهة</label>
          <select
            id="flavor-${product.id}"
            class="flavor-select"
            data-action="select-flavor"
            data-id="${product.id}">
            <option value="">اختار النكهة</option>
            ${product.flavors.map(flavor => `
              <option value="${flavor}" ${selection.selectedFlavor === flavor ? "selected" : ""}>
                ${flavor}
              </option>
            `).join("")}
          </select>
        </div>
      `
      : "";

    // لا يمكن الإضافة إلا بعد اختيار السعر والنكهة المطلوبة.
    const hasSelectedPrice =
      product.prices.length <= 1 || selection.selectedPrice !== null;

    const hasSelectedFlavor =
      product.flavors.length === 0 || selection.selectedFlavor !== null;

    return `
      <article class="product-card" data-product="${product.id}">
        <div class="product-card-top">
          <h4>${product.name}</h4>
          <span class="product-number">${String(index + 1).padStart(2, "0")}</span>
        </div>

        ${pricesHTML}
        ${flavorsHTML}

        <div class="product-controls">
          <div class="quantity-control">
            <button
              type="button"
              data-action="decrease"
              data-id="${product.id}"
              aria-label="تقليل الكمية">−</button>

            <span>${selection.quantity}</span>

            <button
              type="button"
              data-action="increase"
              data-id="${product.id}"
              aria-label="زيادة الكمية">+</button>
          </div>

          <button
            type="button"
            class="add-to-cart"
            data-action="add"
            data-id="${product.id}"
            ${!hasSelectedPrice || !hasSelectedFlavor ? "disabled" : ""}>
            أضف للسلة +
          </button>
        </div>
      </article>
    `;
  }).join("");

  const noProducts = products.length === 0;
  emptyState.hidden = !noProducts;
  productsGrid.hidden = noProducts;
}

// اختيار قسم
categoryTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  searchTerm = "";
  menuSearch.value = "";

  renderCategories();
  renderProducts();
});

// البحث في كل الأقسام
menuSearch.addEventListener("input", () => {
  searchTerm = menuSearch.value.trim().toLowerCase();

  if (searchTerm) {
    categoryTabs.querySelectorAll(".category-tab").forEach(button => {
      button.classList.remove("active");
    });
  } else {
    renderCategories();
  }

  renderProducts();
});

// التعامل مع أزرار كروت المنتجات
productsGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const productId = button.dataset.id;
  const action = button.dataset.action;

  if (!productSelections[productId]) {
    productSelections[productId] = {
      quantity: 1,
      selectedPrice: null,
      selectedFlavor: null
    };
  }

  const selection = productSelections[productId];

  if (action === "increase") {
    selection.quantity++;
    renderProducts();
  }

  if (action === "decrease") {
    selection.quantity = Math.max(1, selection.quantity - 1);
    renderProducts();
  }

  if (action === "select-price") {
    selection.selectedPrice = Number(button.dataset.priceIndex);
    renderProducts();
  }

  if (action === "add") {
    addProductToCart(productId);
  }
});

// اختيار نكهة الآيسد فرابتشينو
productsGrid.addEventListener("change", event => {
  const select = event.target.closest('[data-action="select-flavor"]');
  if (!select) return;

  const productId = select.dataset.id;

  if (!productSelections[productId]) {
    productSelections[productId] = {
      quantity: 1,
      selectedPrice: null,
      selectedFlavor: null
    };
  }

  productSelections[productId].selectedFlavor = select.value || null;
  renderProducts();
});

// إضافة منتج للسلة
function addProductToCart(productId) {
  const product = getAllProducts().find(item => item.id === productId);
  if (!product) return;

  const selection = productSelections[productId] || {
    quantity: 1,
    selectedPrice: null,
    selectedFlavor: null
  };

  if (product.flavors.length && !selection.selectedFlavor) {
    showToast("اختار النكهة الأول.");
    return;
  }

  if (product.prices.length > 1 && selection.selectedPrice === null) {
    showToast("اختار السعر الأول أو الثاني.");
    return;
  }

  const priceIndex = product.prices.length === 1
    ? 0
    : selection.selectedPrice;

  // null تعني أن السعر غير معلن وسيتم تحديده عند تأكيد الطلب.
  const chosenPrice = product.prices.length === 0
    ? null
    : product.prices[priceIndex];

  const selectedProductName = selection.selectedFlavor
    ? `${product.name} - ${selection.selectedFlavor}`
    : product.name;

  const existingItem = cart.find(item =>
    item.productId === productId &&
    item.price === chosenPrice &&
    item.name === selectedProductName
  );

  if (existingItem) {
    existingItem.quantity += selection.quantity;
  } else {
    cart.push({
      productId,
      name: selectedProductName,
      categoryName: product.categoryName,
      flavor: selection.selectedFlavor,
      price: chosenPrice,
      quantity: selection.quantity
    });
  }

  selection.quantity = 1;

  renderProducts();
  renderCart();
  showToast("اتضاف للسلة بنجاح");

  // فتح السلة بعد الإضافة
  openCartDrawer();
}

// عناصر السلة
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartHeaderCount = document.getElementById("cartHeaderCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// فتح السلة
function openCartDrawer() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
  document.body.classList.add("no-scroll");
}

// إغلاق السلة
function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

document.getElementById("openCart").addEventListener("click", openCartDrawer);
document.getElementById("closeCart").addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);

document.getElementById("continueShopping").addEventListener("click", () => {
  closeCartDrawer();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// حساب عدد القطع في السلة
function getCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// حساب إجمالي الأسعار
function getCartTotal() {
  return cart.reduce(
    (total, item) => total + (Number.isFinite(item.price) ? item.price * item.quantity : 0),
    0
  );
}

// عرض السلة
function renderCart() {
  const quantity = getCartQuantity();
  const total = getCartTotal();

  cartCount.textContent = quantity;
  cartHeaderCount.textContent = `(${quantity})`;

  const hasUnpricedItems = cart.some(item => !Number.isFinite(item.price));

  cartTotal.textContent = hasUnpricedItems
    ? `${total} جنيه + أصناف بسعر عند الطلب`
    : `${total} جنيه`;

  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <h3>السلة لسه فاضية</h3>
        <p>اختار مشروبك المفضل وضيفه هنا.</p>
        <button class="continue-shopping" id="continueShopping">
          ابدأ الطلب
        </button>
      </div>
    `;

    document.getElementById("continueShopping").addEventListener("click", () => {
      closeCartDrawer();
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.categoryName} · ${Number.isFinite(item.price) ? `${item.price} جنيه للقطعة` : "السعر يتحدد عند الطلب"}</p>

        <div class="cart-item-actions">
          <div class="cart-quantity">
            <button
              type="button"
              data-cart-action="decrease"
              data-index="${index}">−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-cart-action="increase"
              data-index="${index}">+</button>
          </div>

          <button
            type="button"
            class="remove-item"
            data-cart-action="remove"
            data-index="${index}">
            حذف الصنف
          </button>
        </div>
      </div>

      <div class="cart-item-price">
        ${Number.isFinite(item.price) ? `${item.price * item.quantity} جنيه` : "السعر عند الطلب"}
      </div>
    </div>
  `).join("");
}

// تعديل الكميات أو حذف صنف من السلة
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.cartAction;

  if (!cart[index]) return;

  if (action === "increase") {
    cart[index].quantity++;
  }

  if (action === "decrease") {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  if (action === "remove") {
    cart.splice(index, 1);
  }

  renderCart();
});

// إفراغ السلة
document.getElementById("clearCart").addEventListener("click", () => {
  if (cart.length === 0) return;

  const confirmed = confirm("هل أنت متأكد إنك عايز تفضي السلة؟");
  if (!confirmed) return;

  cart = [];
  renderCart();
  showToast("تم إفراغ السلة");
});

// نافذة بيانات تأكيد الطلب
const checkoutModal = document.getElementById("checkoutModal");
const checkoutModalOverlay = document.getElementById("checkoutModalOverlay");
const closeCheckoutModalButton = document.getElementById("closeCheckoutModal");
const deliveryOption = document.getElementById("deliveryOption");
const inPlaceOption = document.getElementById("inPlaceOption");
const deliveryAreaField = document.getElementById("deliveryAreaField");

let selectedFulfillment = "";


function openCheckoutModal() {
  if (cart.length === 0) {
    return;
  }

  // إغلاق سلة الطلبات
  closeCartDrawer();

  // إظهار خلفية الـ Blur والكارت
  checkoutModalOverlay.classList.add("show");
  checkoutModal.classList.add("show");

  // منع تحريك الصفحة في الخلفية
  document.body.classList.add("no-scroll");

  checkoutModal.setAttribute("aria-hidden", "false");
}


function closeCheckoutModal() {
  checkoutModal.classList.remove("show");
  checkoutModalOverlay.classList.remove("show");
  checkoutModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");
}

function selectFulfillment(method) {
  selectedFulfillment = method;

  const isDelivery = method === "delivery";

  deliveryOption.classList.toggle("selected", isDelivery);
  inPlaceOption.classList.toggle("selected", !isDelivery);

  deliveryOption.setAttribute("aria-pressed", String(isDelivery));
  inPlaceOption.setAttribute("aria-pressed", String(!isDelivery));

  deliveryAreaField.hidden = !isDelivery;
}

checkoutBtn.addEventListener("click", openCheckoutModal);

closeCheckoutModalButton.addEventListener("click", closeCheckoutModal);

checkoutModalOverlay.addEventListener("click", closeCheckoutModal);

deliveryOption.addEventListener("click", () => {
  selectFulfillment("delivery");
});

inPlaceOption.addEventListener("click", () => {
  selectFulfillment("in-place");
});

// زر تأكيد الأوردر النهائي متروك بدون وظيفة حاليًا.

// أزرار نسخ الأوردر وفتح إنستجرام
const confirmOrderFinal = document.getElementById("confirmOrderFinal");

// تجهيز رسالة تفاصيل الأوردر
function generateOrderMessage() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const deliveryArea = document.getElementById("deliveryArea").value.trim();

  if (!customerName) {
    showToast("من فضلك اكتب اسم العميل.");
    return null;
  }

  if (!customerPhone) {
    showToast("من فضلك اكتب رقم التليفون.");
    return null;
  }

  if (!selectedFulfillment) {
    showToast("اختار طريقة الاستلام الأول.");
    return null;
  }

  if (selectedFulfillment === "delivery" && !deliveryArea) {
    showToast("من فضلك اكتب عنوان التوصيل.");
    return null;
  }

  if (cart.length === 0) {
    showToast("السلة فارغة.");
    return null;
  }

  let message = `☕ SÜKARA - NEW ORDER

👤 Customer Name: ${customerName}
📞 Phone Number: ${customerPhone}

`;

  if (selectedFulfillment === "delivery") {
    message += `🚚 Order Type: Delivery
📍 Delivery Address: ${deliveryArea}

`;
  } else {
    message += `🏠 Order Type: In Place

`;
  }

  message += `🛒 ORDER DETAILS

`;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}
   Category: ${item.categoryName}
   Quantity: ${item.quantity}
`;

    if (Number.isFinite(item.price)) {
      message += `   Unit Price: ${item.price} EGP
   Subtotal: ${item.price * item.quantity} EGP

`;
    } else {
      message += `   Price: To be confirmed

`;
    }
  });

  const total = getCartTotal();
  const hasUnpricedItems = cart.some(
    item => !Number.isFinite(item.price)
  );

  message += `💰 TOTAL: ${total} EGP`;

  if (hasUnpricedItems) {
    message += ` + Items with prices to be confirmed`;
  }

  message += `

Thank you for choosing SÜKARA ❤️`;

  return message;
}

// ===================================
 // SAVE ORDER TO SUPABASE
 // ===================================

async function saveOrderToSupabase() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const deliveryArea = document.getElementById("deliveryArea").value.trim();

  const orderData = {
    customer_name: customerName,
    customer_phone: customerPhone,

    fulfillment_type:
      selectedFulfillment === "delivery" ? "delivery" : "in_place",

    delivery_area:
      selectedFulfillment === "delivery" ? deliveryArea : null,

    items: cart.map(item => ({
      product_id: item.productId,
      name: item.name,
      category: item.categoryName,
      flavor: item.flavor || null,
      unit_price: item.price,
      quantity: item.quantity,
      subtotal: Number.isFinite(item.price)
        ? item.price * item.quantity
        : null
    })),

    total: getCartTotal()
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",

    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },

    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Supabase Error:", errorDetails);
    throw new Error("تعذر تسجيل الأوردر في قاعدة البيانات.");
  }

  return true;
}



// ===================================
// CUSTOMER INVOICE
// ===================================

// إنشاء نافذة الفاتورة من JavaScript حتى لا نحتاج لإضافة عناصر جديدة في HTML.
function ensureInvoiceStyles() {
  if (document.getElementById("sukaraInvoiceStyles")) return;

  const style = document.createElement("style");
  style.id = "sukaraInvoiceStyles";
  style.textContent = `
    #sukaraInvoiceOverlay {
      position: fixed; inset: 0; z-index: 99999;
      display: none; align-items: center; justify-content: center;
      padding: 18px; background: rgba(15, 12, 10, .58);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    #sukaraInvoiceOverlay.show { display: flex; }
    #sukaraInvoiceCard {
      width: min(100%, 520px); max-height: 90vh; overflow: auto;
      background: #fffdf9; color: #30251f; border-radius: 20px;
      padding: 25px; box-shadow: 0 24px 80px rgba(0,0,0,.28);
      font-family: inherit; direction: rtl;
    }
    #sukaraInvoiceCard * { box-sizing: border-box; }
    .sk-invoice-head { text-align:center; padding-bottom:16px; border-bottom:1px dashed #c9b8a9; }
    .sk-invoice-head h2 { margin:0 0 5px; font-size:27px; letter-spacing:2px; }
    .sk-invoice-head p { margin:0; color:#806b5d; font-size:13px; }
    .sk-invoice-meta { display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; margin:16px 0; font-size:13px; }
    .sk-invoice-customer { background:#f5eee7; border-radius:12px; padding:12px 14px; line-height:1.9; font-size:14px; }
    .sk-invoice-table { width:100%; border-collapse:collapse; margin:17px 0; font-size:13px; }
    .sk-invoice-table th,.sk-invoice-table td { padding:10px 5px; border-bottom:1px solid #eee4dc; text-align:right; }
    .sk-invoice-table th { color:#806b5d; font-weight:600; }
    .sk-invoice-total { display:flex; justify-content:space-between; font-weight:800; font-size:18px; padding:14px 0; border-top:2px solid #30251f; }
    .sk-invoice-thanks { text-align:center; color:#806b5d; font-size:13px; margin:8px 0 18px; }
    .sk-invoice-actions { display:flex; gap:10px; }
    .sk-invoice-actions button { flex:1; border:0; border-radius:10px; padding:12px; cursor:pointer; font:inherit; font-weight:700; }
    #skInvoicePrint { background:#30251f; color:white; }
    #skInvoiceClose { background:#eadfd5; color:#30251f; }
    @media print {
      body * { visibility:hidden !important; }
      #sukaraInvoiceOverlay, #sukaraInvoiceOverlay * { visibility:visible !important; }
      #sukaraInvoiceOverlay { display:block !important; position:absolute; inset:0; padding:0; background:white; }
      #sukaraInvoiceCard { width:100%; max-height:none; overflow:visible; box-shadow:none; border-radius:0; }
      .sk-invoice-actions { display:none !important; }
    }
  `;
  document.head.appendChild(style);
}

function escapeInvoiceText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function showCustomerInvoice(orderItems, orderTotal, orderReference) {
  ensureInvoiceStyles();

  let overlay = document.getElementById("sukaraInvoiceOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "sukaraInvoiceOverlay";
    overlay.innerHTML = `
      <section id="sukaraInvoiceCard" role="dialog" aria-modal="true" aria-label="Order invoice">
        <div class="sk-invoice-head">
          <h2>سُكَــــره</h2>
          <p>ORDER RECEIPT · إيصال الطلب</p>
        </div>
        <div class="sk-invoice-meta">
          <span>رقم الطلب: <strong id="skInvoiceNumber"></strong></span>
          <span id="skInvoiceDate"></span>
        </div>
        <div class="sk-invoice-customer" id="skInvoiceCustomer"></div>
        <table class="sk-invoice-table">
          <thead><tr><th>الصنف</th><th>الكمية</th><th>الإجمالي</th></tr></thead>
          <tbody id="skInvoiceItems"></tbody>
        </table>
        <div class="sk-invoice-total"><span>الإجمالي</span><span id="skInvoiceTotal"></span></div>
        <p class="sk-invoice-thanks">شكرًا لاختيارك سُكَــــره ❤️</p>
        <div class="sk-invoice-actions">
          <button type="button" id="skInvoicePrint">طباعة / حفظ PDF</button>
          <button type="button" id="skInvoiceClose">إغلاق</button>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", event => {
      if (event.target === overlay || event.target.id === "skInvoiceClose") {
        overlay.classList.remove("show");
        document.body.classList.remove("no-scroll");
      }
    });
    overlay.querySelector("#skInvoicePrint").addEventListener("click", () => window.print());
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const deliveryArea = document.getElementById("deliveryArea").value.trim();
  const fulfillmentText = selectedFulfillment === "delivery" ? "Delivery" : "In Place";
  const dateText = new Date().toLocaleString("ar-EG", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  overlay.querySelector("#skInvoiceNumber").textContent = orderReference;
  overlay.querySelector("#skInvoiceDate").textContent = dateText;
  overlay.querySelector("#skInvoiceCustomer").innerHTML =
    `<div><strong>الاسم:</strong> ${escapeInvoiceText(customerName)}</div>
     <div><strong>رقم الهاتف:</strong> ${escapeInvoiceText(customerPhone)}</div>
     <div><strong>نوع الطلب:</strong> ${fulfillmentText}</div>
     ${selectedFulfillment === "delivery" ? `<div><strong>العنوان:</strong> ${escapeInvoiceText(deliveryArea)}</div>` : ""}`;

  overlay.querySelector("#skInvoiceItems").innerHTML = orderItems.map(item => `
    <tr>
      <td>${escapeInvoiceText(item.name)}</td>
      <td>${item.quantity}</td>
      <td>${(item.price * item.quantity).toLocaleString("ar-EG")} ج.م</td>
    </tr>
  `).join("");

  overlay.querySelector("#skInvoiceTotal").textContent =
    `${Number(orderTotal).toLocaleString("ar-EG")} ج.م`;

  overlay.classList.add("show");
  document.body.classList.add("no-scroll");
}

// ===================================
// FINAL ORDER CONFIRMATION
// ===================================

let isSubmittingOrder = false;

confirmOrderFinal.addEventListener("click", async () => {
  if (isSubmittingOrder) return;

  // لا نصدر فاتورة بقيمة غير مكتملة.
  if (cart.some(item => !Number.isFinite(item.price) || item.price < 0)) {
    showToast("فيه صنف سعره غير محدد. حدّد السعر قبل تأكيد الطلب.");
    return;
  }

  const message = generateOrderMessage();
  if (!message) return;

  // نحتفظ بنسخة من السلة قبل تفريغها بعد نجاح الحفظ.
  const invoiceItems = cart.map(item => ({ ...item }));
  const invoiceTotal = getCartTotal();

  isSubmittingOrder = true;
  confirmOrderFinal.disabled = true;
  const originalText = confirmOrderFinal.textContent;
  confirmOrderFinal.textContent = "جاري تسجيل الأوردر...";

  try {
    await saveOrderToSupabase();

    const orderReference = `SK-${Date.now().toString().slice(-8)}`;

    closeCheckoutModal();
    showCustomerInvoice(invoiceItems, invoiceTotal, orderReference);

    cart = [];
    renderCart();
    showToast("تم تسجيل الأوردر بنجاح!");
  } catch (error) {
    console.error("Order submission failed:", error);
    showToast("حصلت مشكلة في تسجيل الأوردر. حاول مرة تانية.");
  } finally {
    isSubmittingOrder = false;
    confirmOrderFinal.disabled = false;
    confirmOrderFinal.textContent = originalText;
  }
});

// رسالة صغيرة للمستخدم
let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toastMessage");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// قائمة الموبايل
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("open");
  });
});

// الوضع الليلي
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  document.getElementById("themeToggle").textContent =
    document.body.classList.contains("dark") ? "☀" : "☾";
});

// زر العودة للأعلى
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 450);
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// تشغيل الموقع
renderCategories();
renderProducts();
renderCart();
