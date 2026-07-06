const buttons = document.querySelectorAll(".dash-nav[data-panel]");
const panels = document.querySelectorAll(".panel");
const toastStack = document.querySelector("#toastStack");

function toast(title, text) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  toastStack.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.panel).classList.add("active");
  });
});

document.querySelector("#exportBtn")?.addEventListener("click", () => toast("Export laporan", "File laporan dummy berhasil dibuat."));
document.querySelector("#addProduct")?.addEventListener("click", () => toast("Produk ditambahkan", "Produk demo baru masuk ke katalog admin."));
