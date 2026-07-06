const products = [
  { id: "p1", category: "Pulsa", name: "Telkomsel 50K", desc: "Pulsa nasional Telkomsel.", price: 50650, logo: "telkomsel.svg", sold: 12840 },
  { id: "p2", category: "Pulsa", name: "Indosat 100K", desc: "Pulsa IM3 dan Mentari.", price: 101600, logo: "indosat.svg", sold: 8310 },
  { id: "p3", category: "Data", name: "XL Xtra Combo 30GB", desc: "Paket data utama plus bonus aplikasi.", price: 82000, logo: "xl.svg", sold: 4102 },
  { id: "p4", category: "Data", name: "AXIS Bronet 15GB", desc: "Kuota harian dan bulanan AXIS.", price: 45000, logo: "axis.svg", sold: 2274 },
  { id: "p5", category: "PLN", name: "Token PLN 100K", desc: "Token listrik prabayar otomatis.", price: 100500, logo: "pln.svg", sold: 9920 },
  { id: "p6", category: "Bills", name: "BPJS Kesehatan", desc: "Pembayaran iuran keluarga.", price: 150000, logo: "bpjs.svg", sold: 5210 },
  { id: "p7", category: "E-Wallet", name: "GoPay 50K", desc: "Top up saldo GoPay instan.", price: 51000, logo: "gopay.svg", sold: 13204 },
  { id: "p8", category: "E-Wallet", name: "OVO 100K", desc: "Top up OVO semua nomor.", price: 101000, logo: "ovo.svg", sold: 6884 },
  { id: "p9", category: "Games", name: "MLBB 284 Diamonds", desc: "Top up Mobile Legends cepat.", price: 84000, logo: "mobile-legends.svg", sold: 14642 },
  { id: "p10", category: "Games", name: "Garena Shell 100", desc: "Voucher Garena dan Free Fire.", price: 20500, logo: "garena.svg", sold: 7412 },
  { id: "p11", category: "Entertainment", name: "Netflix Premium", desc: "Voucher streaming digital.", price: 54000, logo: "netflix.svg", sold: 3108 },
  { id: "p12", category: "Entertainment", name: "Spotify Premium", desc: "Voucher musik bulanan.", price: 58000, logo: "spotify.svg", sold: 2910 },
  { id: "p13", category: "E-Wallet", name: "ShopeePay 100K", desc: "Top up saldo ShopeePay.", price: 100900, logo: "shopeepay.svg", sold: 6218 },
  { id: "p14", category: "Bills", name: "QRIS Merchant", desc: "Simulasi pembayaran QRIS merchant.", price: 75000, logo: "qris.svg", sold: 1830 },
  { id: "p15", category: "Bills", name: "BCA Virtual Account", desc: "Pembayaran invoice via BCA VA.", price: 2500, logo: "bca.svg", sold: 4821 },
  { id: "p16", category: "Bills", name: "Alfamart Retail", desc: "Pembayaran retail Alfamart.", price: 2500, logo: "alfamart.svg", sold: 3817 },
];

const categories = ["Semua", "Pulsa", "Data", "PLN", "Bills", "E-Wallet", "Games", "Entertainment"];
const categoryInfo = {
  Semua: { label: "Semua", icon: "ALL", count: "16 produk" },
  Pulsa: { label: "Pulsa", icon: "SIM", count: "Operator lengkap" },
  Data: { label: "Paket Data", icon: "GB", count: "Kuota favorit" },
  PLN: { label: "Token PLN", icon: "PLN", count: "Prabayar" },
  Bills: { label: "Tagihan", icon: "BILL", count: "BPJS, VA, retail" },
  "E-Wallet": { label: "E-Wallet", icon: "PAY", count: "Saldo digital" },
  Games: { label: "Game", icon: "GG", count: "Voucher game" },
  Entertainment: { label: "Entertainment", icon: "TV", count: "Streaming" },
};
const buyers = ["Naya - Medan", "Raka - Jakarta", "Dewi - Bandung", "Adit - Bekasi", "Putri - Surabaya", "Fajar - Makassar", "Lia - Tangerang"];

let activeCategory = "Semua";
let selectedProduct = products[0];
let sortMode = "popular";

const $ = (selector) => document.querySelector(selector);
const rupiah = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

function toast(title, text) {
  const stack = $("#toastStack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function filteredProducts() {
  const q = ($("#searchInput")?.value || "").toLowerCase().trim();
  const list = products.filter((item) => {
    const categoryMatch = activeCategory === "Semua" || item.category === activeCategory;
    const searchMatch = !q || `${item.name} ${item.desc} ${item.category}`.toLowerCase().includes(q);
    return categoryMatch && searchMatch;
  });
  return list.sort((a, b) => {
    if (sortMode === "low") return a.price - b.price;
    if (sortMode === "high") return b.price - a.price;
    return b.sold - a.sold;
  });
}

function setCategory(category) {
  activeCategory = category;
  const first = filteredProducts()[0] || products[0];
  selectedProduct = first;
  renderTabs();
  renderCategoryShowcase();
  renderSideFilter();
  renderSelect();
  renderProducts();
  syncInvoice();
}

function renderTabs() {
  const wrap = $("#categoryTabs");
  if (!wrap) return;
  wrap.innerHTML = categories.slice(1, 7).map((cat) => `
    <button class="tab-btn ${cat === activeCategory ? "active" : ""}" data-cat="${cat}">${cat}</button>
  `).join("");
  wrap.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => setCategory(btn.dataset.cat)));
}

function renderCategoryShowcase() {
  const wrap = $("#categoryShowcase");
  if (!wrap) return;
  wrap.innerHTML = categories.map((cat) => {
    const info = categoryInfo[cat];
    return `
      <button class="category-tile" data-cat="${cat}" type="button">
        <span class="tile-icon">${info.icon}</span>
        <strong>${info.label}</strong>
        <small>${info.count}</small>
      </button>
    `;
  }).join("");
  wrap.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => {
    setCategory(btn.dataset.cat);
    $("#catalog")?.scrollIntoView({ behavior: "smooth" });
  }));
}

function renderSideFilter() {
  const wrap = $("#sideFilter");
  if (!wrap) return;
  wrap.innerHTML = categories.map((cat) => {
    const total = cat === "Semua" ? products.length : products.filter((item) => item.category === cat).length;
    return `<button class="${cat === activeCategory ? "active" : ""}" data-cat="${cat}" type="button"><span>${categoryInfo[cat].label}</span><b>${total}</b></button>`;
  }).join("");
  wrap.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => setCategory(btn.dataset.cat)));
}

function renderSelect() {
  const select = $("#productSelect");
  if (!select) return;
  const items = filteredProducts().length ? filteredProducts() : products;
  if (!items.some((item) => item.id === selectedProduct.id)) selectedProduct = items[0];
  select.innerHTML = items.map((item) => `<option value="${item.id}">${item.name} - ${rupiah(item.price)}</option>`).join("");
  select.value = selectedProduct.id;
  select.onchange = () => {
    selectedProduct = products.find((item) => item.id === select.value) || products[0];
    syncInvoice();
  };
}

function renderProducts() {
  const grid = $("#productGrid");
  if (!grid) return;
  const list = filteredProducts();
  $("#resultCount").textContent = `${list.length} produk tersedia`;
  grid.innerHTML = list.map((item) => `
    <article class="product-card">
      <div class="product-top">
        <div class="logo-box"><img src="assets/brands/${item.logo}" alt="${item.name}" loading="lazy"></div>
        <div>
          <h3>${item.name}</h3>
          <p>${item.sold.toLocaleString("id-ID")} terjual</p>
        </div>
      </div>
      <p>${item.desc}</p>
      <div class="price-row">
        <strong>${rupiah(item.price)}</strong>
        <button class="choose-btn" data-product="${item.id}" type="button">Pilih</button>
      </div>
    </article>
  `).join("");
  grid.querySelectorAll(".choose-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProduct = products.find((item) => item.id === btn.dataset.product) || products[0];
      activeCategory = selectedProduct.category;
      renderTabs();
      renderSideFilter();
      renderSelect();
      syncInvoice();
      $("#quickOrder")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Produk masuk checkout", `${selectedProduct.name} siap dibuat invoice.`);
    });
  });
}

function renderFlashRow() {
  const wrap = $("#flashRow");
  if (!wrap) return;
  wrap.innerHTML = products.slice(0, 4).map((item) => `
    <button class="flash-item" type="button" data-product="${item.id}">
      <img src="assets/brands/${item.logo}" alt="${item.name}" loading="lazy">
      <strong>${item.name}</strong>
      <span>${rupiah(item.price)}</span>
    </button>
  `).join("");
  wrap.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProduct = products.find((item) => item.id === btn.dataset.product) || products[0];
      activeCategory = selectedProduct.category;
      renderTabs();
      renderSideFilter();
      renderSelect();
      syncInvoice();
      $("#quickOrder")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Flash sale dipilih", `${selectedProduct.name} masuk checkout.`);
    });
  });
}

function syncInvoice() {
  const subtotal = selectedProduct.price;
  const admin = 500;
  const discount = 1000;
  $("#invoiceProduct").textContent = selectedProduct.name;
  $("#invoicePrice").textContent = rupiah(subtotal);
  $("#invoiceTotal").textContent = rupiah(subtotal + admin - discount);
}

function openOrderSummary() {
  const customer = $("#customerInput").value.trim();
  const payment = $("#paymentSelect")?.value || "QRIS All Pay";
  const total = selectedProduct.price + 500 - 1000;
  const params = new URLSearchParams({
    product: selectedProduct.name,
    target: customer,
    price: String(selectedProduct.price),
    payment,
  });

  $("#modalProduct").textContent = selectedProduct.name;
  $("#modalTarget").textContent = customer;
  $("#modalPayment").textContent = payment;
  $("#modalPrice").textContent = rupiah(selectedProduct.price);
  $("#modalTotal").textContent = rupiah(total);
  $("#modalLoginButton").onclick = () => {
    location.href = `login.html?next=checkout&${params.toString()}`;
  };
  $("#orderModal").hidden = false;
}

function closeOrderSummary() {
  const modal = $("#orderModal");
  if (modal) modal.hidden = true;
}

function renderTicker() {
  const ticker = $("#ticker");
  if (!ticker) return;
  const now = Math.floor(Date.now() / 2500);
  const rows = Array.from({ length: 10 }, (_, index) => {
    const buyer = buyers[(now + index) % buyers.length];
    const product = products[(now + index * 2) % products.length];
    return `<span>${buyer} membeli ${product.name} - ${rupiah(product.price)}</span>`;
  });
  ticker.innerHTML = rows.join("");
}

function bindNavLinks() {
  document.querySelectorAll("[data-cat-link]").forEach((link) => {
    link.addEventListener("click", () => setCategory(link.dataset.catLink));
  });
}

function init() {
  if (!$("#productGrid")) return;
  renderTabs();
  renderCategoryShowcase();
  renderSideFilter();
  renderFlashRow();
  renderSelect();
  renderProducts();
  renderTicker();
  syncInvoice();
  bindNavLinks();

  $("#searchInput")?.addEventListener("input", () => {
    renderSelect();
    renderProducts();
  });
  $("#sortSelect")?.addEventListener("change", (event) => {
    sortMode = event.target.value;
    renderSelect();
    renderProducts();
  });
  $("#quickForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    openOrderSummary();
  });
  document.querySelectorAll("[data-close-order]").forEach((button) => button.addEventListener("click", closeOrderSummary));

  setInterval(renderTicker, 3600);
  setTimeout(() => toast("Order baru", "Dewi - Bandung membeli Token PLN 100K."), 900);
  setInterval(() => {
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    toast("Order baru", `${buyer} membeli ${product.name}.`);
  }, 14000);
}

init();
