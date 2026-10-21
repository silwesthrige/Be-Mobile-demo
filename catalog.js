const state = {
  cat: new URLSearchParams(location.search).get("cat") || "all",
  q: "",
  sort: "featured",
  deals: false,
};
if (state.cat !== "all" && !CATEGORIES.some((c) => c.id === state.cat)) state.cat = "all";

const chipsEl = document.getElementById("chips");
const gridEl = document.getElementById("grid");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");

function renderChips() {
  const all = [{ id: "all", label: "All Products" }, ...CATEGORIES];
  chipsEl.innerHTML = all
    .map((c) => {
      const n = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length;
      return `<button class="chip ${state.cat === c.id ? "is-active" : ""}" data-cat="${c.id}" role="tab" aria-selected="${state.cat === c.id}">${c.label}<span>${n}</span></button>`;
    })
    .join("");
}

const sorters = {
  featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  name: (a, b) => a.name.localeCompare(b.name),
};

function render() {
  const q = state.q.trim().toLowerCase();
  const list = PRODUCTS.filter((p) => state.cat === "all" || p.cat === state.cat)
    .filter((p) => !state.deals || p.oldPrice)
    .filter((p) => !q || `${p.brand} ${p.name} ${catLabel(p.cat)} ${p.specs.join(" ")}`.toLowerCase().includes(q))
    .sort(sorters[state.sort]);

  gridEl.innerHTML = list.map((p) => productCard(p)).join("");
  observeReveals(gridEl);
  countEl.innerHTML = `Showing <b>${list.length}</b> ${list.length === 1 ? "product" : "products"}${state.cat !== "all" ? ` in <b>${catLabel(state.cat)}</b>` : ""}`;
  emptyEl.hidden = list.length > 0;
  document.getElementById("emptyAsk").href = waLink(`Hi Be Mobile! Do you have "${state.q || catLabel(state.cat)}"?`);

  const url = new URL(location.href);
  state.cat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", state.cat);
  history.replaceState(null, "", url);
}

chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest("[data-cat]");
  if (!chip) return;
  state.cat = chip.dataset.cat;
  renderChips();
  render();
});

let searchTimer;
document.getElementById("search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.q = e.target.value; render(); }, 120);
});
document.getElementById("sort").addEventListener("change", (e) => { state.sort = e.target.value; render(); });
document.getElementById("dealsOnly").addEventListener("change", (e) => { state.deals = e.target.checked; render(); });

renderChips();
render();
