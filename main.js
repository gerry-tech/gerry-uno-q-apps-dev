function uniq(arr) {
  return [...new Set(arr)].sort((a, b) => a.localeCompare(b));
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
    el.dataset.zip = a.zip;

    const badge = a.badge ? `<div class="badge">${a.badge}</div>` : "";
    const tags = (a.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
    const req = a.requires ? `Componenti: ${a.requires}` : "";

    const thumb = a.preview
      ? `<img src="${a.preview}" alt="Preview ${a.title}" loading="lazy">`
      : `<span>${a.thumbText || "Preview"}</span>`;

    el.innerHTML = `
      ${badge}
      <div class="thumb">${thumb}</div>

      <div class="content">
        <h3 title="${a.title}">${a.title}</h3>
        <p class="meta">${a.desc || ""}</p>

        <div class="tags">${tags}</div>

        <p class="meta">${req}</p>

        <div class="btns">
          <a class="btn primary" href="${a.zip}" target="_blank" rel="noreferrer">Download ZIP</a>
          ${a.demo ? `<a class="btn" href="${a.demo}" target="_blank" rel="noreferrer">Demo</a>` : ""}
        </div>
      </div>
    `;

    grid.appendChild(el);
  }
}

function setupFilters(allApps) {
  const q = document.getElementById("q");
  const tag = document.getElementById("tag");

  // reset dropdown (se ricarichi)
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

if (typeof APPS === "undefined") {
  console.error("APPS non è definito: controlla apps/apps.js e il path nello script.");
} else {
  setupFilters(APPS);
}

// Card click -> download ZIP (senza rompere i bottoni)
document.addEventListener("click", (e) => {
  // se clicchi su un link/bottone, lascia fare al link
  if (e.target.closest("a")) return;

  const card = e.target.closest(".card");
  if (!card) return;

  const zip = card.dataset.zip;
  if (!zip) return;

  window.open(zip, "_blank", "noopener");
});
