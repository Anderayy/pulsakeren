const dashButtons = document.querySelectorAll(".dash-nav[data-panel]");
const panels = document.querySelectorAll(".panel");
const toastStack = document.querySelector("#toastStack");

function showToast(title, text) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
  toastStack.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

dashButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dashButtons.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.panel).classList.add("active");
  });
});

document.querySelector("#newOrder")?.addEventListener("click", () => {
  location.href = "index.html#quickOrder";
});

document.querySelectorAll(".nominal-row button, .secondary-btn").forEach((button) => {
  button.addEventListener("click", () => showToast("Aksi demo", `${button.textContent.trim()} berhasil disimulasikan.`));
});
