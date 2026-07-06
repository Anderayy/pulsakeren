const products = [
  { id: "p1", category: "Pulsa", name: "Telkomsel 50K", desc: "Pulsa Telkomsel nasional.", price: 50650, logo: "telkomsel.svg", sold: "12.840 terjual" },
  { id: "p2", category: "Pulsa", name: "Indosat 100K", desc: "Pulsa IM3 dan Mentari.", price: 101600, logo: "indosat.svg", sold: "8.310 terjual" },
  { id: "p3", category: "Data", name: "XL Xtra Combo 30GB", desc: "Paket data utama dan bonus aplikasi.", price: 82000, logo: "xl.svg", sold: "4.102 terjual" },
  { id: "p4", category: "Data", name: "AXIS Bronet 15GB", desc: "Paket internet harian dan bulanan.", price: 45000, logo: "axis.svg", sold: "2.274 terjual" },
  { id: "p5", category: "PLN", name: "Token PLN 100K", desc: "Token listrik prabayar otomatis.", price: 100500, logo: "pln.svg", sold: "9.920 terjual" },
  { id: "p6", category: "Bills", name: "BPJS Kesehatan", desc: "Pembayaran iuran keluarga.", price: 150000, logo: "bpjs.svg", sold: "5.210 terjual" },
  { id: "p7", category: "E-Wallet", name: "GoPay 50K", desc: "Top up saldo GoPay instan.", price: 51000, logo: "gopay.svg", sold: "13.204 terjual" },
  { id: "p8", category: "E-Wallet", name: "OVO 100K", desc: "Top up OVO semua nomor.", price: 101000, logo: "ovo.svg", sold: "6.884 terjual" },
  { id: "p9", category: "Games", name: "MLBB 284 Diamonds", desc: "Top up Mobile Legends.", price: 84000, logo: "mobile-legends.svg", sold: "14.642 terjual" },
  { id: "p10", category: "Games", name: "Garena Shell 100", desc: "Voucher Garena dan Free Fire.", price: 20500, logo: "garena.svg", sold: "7.412 terjual" },
  { id: "p11", category: "Entertainment", name: "Netflix Premium", desc: "Voucher streaming digital.", price: 54000, logo: "netflix.svg", sold: "3.108 terjual" },
  { id: "p12", category: "Entertainment", name: "Spotify Premium", desc: "Voucher musik bulanan.", price: 58000, logo: "spotify.svg", sold: "2.910 terjual" },
];

const categories = ["Semua", "Pulsa", "Data", "PLN", "Bills", "E-Wallet", "Games", "Entertainment"];
const buyers = ["Naya dari Medan", "Raka dari Jakarta", "Dewi dari Bandung", "Adit dari Bekasi", "Putri dari Surabaya", "Fajar dari Makassar"];
let activeCategory = "Semua";
let selectedProduct = products[0];

const rupiah = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const $ = (selector) => document.querySelector(selector);

function toast(title, text) {
  const stack = $("#toastStack");
  if (!stack) return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function renderTabs() {
  const wrap = $("#categoryTabs");
  wrap.innerHTML = categories.map((cat) => `<button class="tab-btn ${cat === activeCategory ? "active" : ""}" data-cat="${cat}"><span>${cat}</span><span>›</span></button>`).join("");
  wrap.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      selectedProduct = products.find((item) => item.category === activeCategory) || products[0];
      renderTabs();
      renderProducts();
      renderSelect();
      syncInvoice();
    });
  });
}

function renderSelect() {
  const select = $("#productSelect");
  const items = activeCategory === "Semua" ? products : products.filter((item) => item.category === activeCategory);
  select.innerHTML = items.map((item) => `<option value="${item.id}">${item.name} - ${rupiah(item.price)}</option>`).join("");
  select.value = selectedProduct.id;
  select.onchange = () => {
    selectedProduct = products.find((item) => item.id === select.value) || products[0];
    syncInvoice();
  };
}

function renderProducts() {
  const q = ($("#searchInput")?.value || "").toLowerCase().trim();
  const list = products.filter((item) => {
    const matchCategory = activeCategory === "Semua" ? true : item.category === activeCategory;
    const matchSearch = !q || `${item.name} ${item.desc} ${item.category}`.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });
  $("#productGrid").innerHTML = list.map((item) => `
    <article class="product-card">
      <div class="product-top">
        <div class="logo-box"><img src="assets/brands/${item.logo}" alt="${item.name}" loading="lazy"></div>
        <div><h3>${item.name}</h3><p>${item.sold}</p></div>
      </div>
      <p>${item.desc}</p>
      <div class="price-row">
        <strong>${rupiah(item.price)}</strong>
        <button class="choose-btn" data-product="${item.id}">Pilih</button>
      </div>
    </article>
  `).join("");
  document.querySelectorAll(".choose-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProduct = products.find((item) => item.id === btn.dataset.product) || products[0];
      activeCategory = selectedProduct.category;
      renderTabs();
      renderSelect();
      syncInvoice();
      document.querySelector("#quickOrder").scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Produk dipilih", `${selectedProduct.name} siap dibuat pesanan.`);
    });
  });
}

function syncInvoice() {
  $("#invoiceProduct").textContent = selectedProduct.name;
  $("#invoicePrice").textContent = rupiah(selectedProduct.price);
  $("#invoiceTotal").textContent = rupiah(selectedProduct.price + 500 - 1000);
}

function renderActivity() {
  const list = $("#activityList");
  const rows = Array.from({ length: 4 }, (_, index) => {
    const buyer = buyers[(Date.now() / 3000 + index | 0) % buyers.length];
    const product = products[(Date.now() / 5000 + index | 0) % products.length];
    return `<div class="activity-item"><strong>${buyer}</strong><span>${product.name} · ${rupiah(product.price)}</span></div>`;
  });
  list.innerHTML = rows.join("");
}

function initHome() {
  if (!$("#categoryTabs")) return;
  renderTabs();
  renderSelect();
  renderProducts();
  syncInvoice();
  renderActivity();
  setInterval(renderActivity, 3200);
  $("#searchInput").addEventListener("input", renderProducts);
  $("#quickForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const customer = $("#customerInput").value.trim() || "0812xxxx";
    toast("Pesanan dibuat", `${selectedProduct.name} untuk ${customer} menunggu pembayaran.`);
  });
  document.querySelectorAll("[data-cat-link]").forEach((link) => {
    link.addEventListener("click", () => {
      activeCategory = link.dataset.catLink;
      selectedProduct = products.find((item) => item.category === activeCategory) || products[0];
      renderTabs();
      renderProducts();
      renderSelect();
      syncInvoice();
    });
  });
  setTimeout(() => toast("Live order", "Naya dari Medan membeli XL Xtra Combo 30GB."), 900);
}

initHome();
