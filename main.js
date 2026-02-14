function uniq(arr) {
  return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Config "Ping Video"
 * - metti title/url/date
 * - mostra per X giorni
 */
const LATEST_VIDEO = {
  title: "MatrixAnimation",
  url: "https://www.youtube.com/watch?v=jkG8Zr1GLo0",
  date: "2026-02-14", // YYYY-MM-DD
  showForDays: 3
};

function setupVideoPing() {
  const box = document.getElementById("videoPing");
  if (!box) return;

  if (!LATEST_VIDEO?.url || !LATEST_VIDEO?.date) return;

  const today = new Date();
  const videoDate = new Date(LATEST_VIDEO.date + "T00:00:00");

  // se la data è invalida, non mostrare
  if (Number.isNaN(videoDate.getTime())) return;

  const diffDays = (today - videoDate) / (1000 * 60 * 60 * 24);
  const showFor = Number(LATEST_VIDEO.showForDays ?? 3);

  if (diffDays < 0 || diffDays > showFor) return;

  box.innerHTML = `
    <div class="label">
      <div class="pulse">NEW VIDEO</div>
      <div class="tiny">${Math.floor(diffDays)}g fa</div>
    </div>
    <p class="video-title">${escapeHtml(LATEST_VIDEO.title)}</p>
    <div class="video-actions">
      <a class="btn primary" href="${LATEST_VIDEO.url}" target="_blank" rel="noreferrer">Guarda ora</a>
      <a class="btn" href="https://www.youtube.com/channel/UCjXdbreXXKrvXyU1SvKOJqw" target="_blank" rel="noreferrer">Canale</a>
    </div>
  `;
  box.hidden = false;
}

function render(apps) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  if (!apps.length) {
    grid.innerHTML = `<p class="empty">Nessuna app trovata.</p>`;
    return;
  }

  for (const a of apps) {
    const el = document.createElement("div");
    el.className = "card";
    el.dataset.zip = a.zip || "";

    const badge = a.badge ? `<div class="badge">${escapeHtml(a.badge)}</div>` : "";
    const tags = (a.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const req = a.requires ? `Componenti: ${escapeHtml(a.requires)}` : "";

    const thumb = a.preview
      ? `<img src="${escapeHtml(a.preview)}" alt="Preview ${escapeHtml(a.title)}" loading="lazy">`
      : `<span>${escapeHtml(a.thumbText || "Preview")}</span>`;

    // Mini "NEW" vicino al titolo se a.new === true
    const newMini = a.new ? `<span class="new-mini">NEW</span>` : "";

    el.innerHTML = `
      ${badge}
      <div class="thumb">${thumb}</div>

      <div class="content">
        <h3 title="${escapeHtml(a.title)}">${escapeHtml(a.title)}${newMini}</h3>
        <p class="meta">${escapeHtml(a.desc || "")}</p>

        <div class="tags">${tags}</div>

        ${req ? `<p class="meta">${req}</p>` : ""}

        <div class="btns">
          ${a.zip ? `<a class="btn primary" href="${escapeHtml(a.zip)}" target="_blank" rel="noreferrer">Download ZIP</a>` : ""}
          ${a.demo ? `<a class="btn" href="${escapeHtml(a.demo)}" target="_blank" rel="noreferrer">Demo</a>` : ""}
        </div>
      </div>
    `;

    grid.appendChild(el);
  }
}

function setupFilters(allApps) {
  const q = document.getElementById("q");
  const tag = document.getElementById("tag");

  tag.innerHTML = `<option value="">Tutti i tag</option>`;

  const allTags = uniq(allApps.flatMap(a => a.tags || []));

  for (const t of allTags) {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    tag.appendChild(opt);
  }

  function apply() {
    const query = q.value.trim().toLowerCase();
    const t = tag.value;

    const filtered = allApps.filter(a => {
      const hay = `${a.title} ${a.desc || ""} ${(a.tags || []).join(" ")} ${a.requires || ""}`.toLowerCase();
      const okQ = !query || hay.includes(query);
      const okT = !t || (a.tags || []).includes(t);
      return okQ && okT;
    });

    render(filtered);
  }

  q.addEventListener("input", apply);
  tag.addEventListener("change", apply);

  apply();
}

function init() {
  setupVideoPing();

  if (typeof APPS === "undefined") {
    console.error("APPS non è definito: controlla apps/apps.js e il path nello script.");
    return;
  }
  setupFilters(APPS);
}

init();

// Card click -> download ZIP (senza rompere i bottoni)
document.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;

  const card = e.target.closest(".card");
  if (!card) return;

  const zip = card.dataset.zip;
  if (!zip) return;

  window.open(zip, "_blank", "noopener");
});
