const WA_NUMBER = "94704747472";
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const money = (n) => `Rs. ${n.toLocaleString("en-LK")}`;
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || "";

/* ---------------- Nav ---------------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
document.getElementById("navToggle").addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

/* ---------------- Reveal + count-up ---------------- */
const countUp = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 8) * 70}ms`;
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(el);
    });
  },
  { threshold: 0.12 }
);
const observeReveals = (root = document) => root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
observeReveals();

// Spotlight that follows the cursor on category cards
document.querySelectorAll(".cat").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ---------------- Product cards ---------------- */
const stars = (r) => "★★★★★".slice(0, Math.round(r)) + "☆☆☆☆☆".slice(0, 5 - Math.round(r));

function productCard(p, variant = "") {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `
    <article class="pcard ${variant ? "pcard--" + variant : ""} reveal" data-id="${p.id}">
      <button class="pcard__img" data-quick="${p.id}" aria-label="Quick view ${p.name}">
        <img src="${p.img}" alt="${p.brand} ${p.name}" loading="lazy" />
        ${p.badge ? `<span class="badge ${p.badge === "Sale" ? "badge--red" : ""}">${p.badge}</span>` : ""}
        ${off ? `<span class="badge badge--off">-${off}%</span>` : ""}
        <span class="pcard__quick">Quick view</span>
      </button>
      <div class="pcard__body">
        <span class="pcard__brand">${p.brand} · ${catLabel(p.cat)}</span>
        <h3>${p.name}</h3>
        <div class="stars" aria-label="Rated ${p.rating} out of 5">${stars(p.rating)} <small>${p.rating.toFixed(1)}</small></div>
        <div class="pcard__foot">
          <div class="price"><b>${money(p.price)}</b>${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
          <button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to list">
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

function renderInto(id, list, variant) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = list.map((p) => productCard(p, variant)).join("");
  observeReveals(el);
}

/* ---------------- Enquiry list (cart) ---------------- */
const CART_KEY = "bemobile-cart";
let cart = {};
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { cart = {}; }
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} };

document.body.insertAdjacentHTML("beforeend", `
  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer__backdrop" data-cart-close></div>
    <aside class="drawer__panel" role="dialog" aria-label="Your enquiry list">
      <header class="drawer__head">
        <h3>Your list</h3>
        <button class="icon-x" data-cart-close aria-label="Close">✕</button>
      </header>
      <div class="drawer__items" id="cartItems"></div>
      <footer class="drawer__foot">
        <div class="drawer__total"><span>Estimated total</span><b id="cartTotal">Rs. 0</b></div>
        <a class="btn btn--wa btn--block" id="cartSend" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>
          Send order on WhatsApp
        </a>
        <button class="link-btn" id="cartClear">Clear list</button>
      </footer>
    </aside>
  </div>
  <div class="modal" id="modal" aria-hidden="true">
    <div class="modal__backdrop" data-modal-close></div>
    <div class="modal__panel" role="dialog" aria-modal="true" id="modalBody"></div>
  </div>
  <div class="toast" id="toast"></div>`);

const drawer = document.getElementById("drawer");
const cartItems = document.getElementById("cartItems");

function renderCart() {
  const entries = Object.entries(cart).filter(([id]) => byId(id));
  const count = entries.reduce((s, [, q]) => s + q, 0);
  const total = entries.reduce((s, [id, q]) => s + byId(id).price * q, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.classList.toggle("has", count > 0);
  });
  document.getElementById("cartTotal").textContent = money(total);
  drawer.classList.toggle("is-empty", !entries.length);

  cartItems.innerHTML = entries.length
    ? entries.map(([id, q]) => {
        const p = byId(id);
        return `
          <div class="citem">
            <img src="${p.img}" alt="" />
            <div class="citem__info">
              <b>${p.name}</b><span>${p.brand} · ${money(p.price)}</span>
              <div class="qty">
                <button data-dec="${id}" aria-label="Decrease">−</button><span>${q}</span><button data-inc="${id}" aria-label="Increase">+</button>
              </div>
            </div>
            <button class="icon-x" data-remove="${id}" aria-label="Remove">✕</button>
          </div>`;
      }).join("")
    : `<div class="drawer__empty"><div>🛍️</div><p>Your list is empty.</p><a href="catalog.html" class="btn btn--ghost btn--sm">Browse the catalog</a></div>`;

  const lines = entries.map(([id, q], i) => `${i + 1}. ${byId(id).brand} ${byId(id).name} x${q} (${money(byId(id).price * q)})`);
  document.getElementById("cartSend").href = waLink(
    `Hi Be Mobile! I'd like to order:\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\nPlease confirm stock and price.`
  );
}

function addToCart(id, qty = 1) {
  cart[id] = (cart[id] || 0) + qty;
  saveCart();
  renderCart();
  toast(`Added: ${byId(id).name}`);
  document.querySelectorAll(".cart-btn").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
}

const openDrawer = () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); };
const closeDrawer = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); };

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------- Quick view modal ---------------- */
const modal = document.getElementById("modal");
function openModal(id) {
  const p = byId(id);
  document.getElementById("modalBody").innerHTML = `
    <button class="icon-x modal__close" data-modal-close aria-label="Close">✕</button>
    <div class="modal__img"><img src="${p.img.replace("w=700", "w=1000")}" alt="${p.brand} ${p.name}" />${p.badge ? `<span class="badge">${p.badge}</span>` : ""}</div>
    <div class="modal__info">
      <span class="pcard__brand">${p.brand} · ${catLabel(p.cat)}</span>
      <h2>${p.name}</h2>
      <div class="stars">${stars(p.rating)} <small>${p.rating.toFixed(1)} rating</small></div>
      <div class="price price--lg"><b>${money(p.price)}</b>${p.oldPrice ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
      <ul class="spec-list">${p.specs.map((s) => `<li>${s}</li>`).join("")}</ul>
      <p class="stock"><span class="dot"></span> In stock at Be Mobile, Pannala</p>
      <div class="modal__actions">
        <button class="btn btn--gold" data-add="${p.id}" data-close-after>Add to list</button>
        <a class="btn btn--wa" target="_blank" rel="noopener" href="${waLink(`Hi Be Mobile! Is the ${p.brand} ${p.name} (${money(p.price)}) available?`)}">Ask on WhatsApp</a>
      </div>
    </div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("lock");
}
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); if (!drawer.classList.contains("open")) document.body.classList.remove("lock"); };

/* ---------------- Global click handling ---------------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-add],[data-quick],[data-cart-open],[data-cart-close],[data-modal-close],[data-inc],[data-dec],[data-remove]");
  if (!t) return;
  const d = t.dataset;
  if (d.add) { addToCart(d.add); if ("closeAfter" in d) closeModal(); }
  else if (d.quick) openModal(d.quick);
  else if ("cartOpen" in d) openDrawer();
  else if ("cartClose" in d) closeDrawer();
  else if ("modalClose" in d) closeModal();
  else if (d.inc) { cart[d.inc]++; saveCart(); renderCart(); }
  else if (d.dec) { if (--cart[d.dec] <= 0) delete cart[d.dec]; saveCart(); renderCart(); }
  else if (d.remove) { delete cart[d.remove]; saveCart(); renderCart(); }
});
document.getElementById("cartClear").addEventListener("click", () => { cart = {}; saveCart(); renderCart(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeDrawer(); } });

renderCart();
