/* ==========================================================================
   Brandimo shared components (HTML partials)
   Every page is assembled from these functions, so a change to a button,
   card or banner here updates the whole site on the next `npm run build`.
   ========================================================================== */
import { icon } from "./icons.mjs";
import { courseKind, courseStatus, eventStatus, mediaKind, nav, site, urls } from "./data.mjs";

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const revealIdx = (i) => (i ? ` style="--reveal-i:${i}"` : "");

/* ---- Brand ---------------------------------------------------------------- */
export function brandMark(size = 40, onDark = false) {
  const h = Math.round(size * 0.92);
  return `<svg class="brand-mark" width="${size}" height="${h}" viewBox="0 0 48 44" aria-hidden="true" focusable="false">
<path d="M23 16 C17.5 12 10.5 11 4 12.5 L4 38 C10.5 36.8 17.5 37.8 23 41.5 Z" fill="${onDark ? "#9dbcfb" : "#1f4fd1"}"/>
<path d="M25 16 C30.5 12 37.5 11 44 12.5 L44 38 C37.5 36.8 30.5 37.8 25 41.5 Z" fill="#4a84f7"/>
<path d="M36 1 C37 6.5 38.5 8 44 9 C38.5 10 37 11.5 36 17 C35 11.5 33.5 10 28 9 C33.5 8 35 6.5 36 1 Z" fill="#ff7a1a"/>
</svg>`;
}

/* Stand-in for the official logo files: replace brandMark() with the SVG
   from the brand book when it is supplied. */
export function logo(onDark = false) {
  return `<a href="index.html" class="logo${onDark ? " logo--dark" : ""}" aria-label="برندیمو، صفحه اصلی">
  ${brandMark(40, onDark)}
  <span class="logo__words"><span class="logo__fa">برندیمو</span><span class="logo__en ltr">Brandimo</span></span>
</a>`;
}

export function sparkle(size = 56, cls = "") {
  return `<svg class="sparkle ${cls}" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
<path d="M32 2 C34.5 22 42 29.5 62 32 C42 34.5 34.5 42 32 62 C29.5 42 22 34.5 2 32 C22 29.5 29.5 22 32 2 Z" fill="url(#bm-spark)"/></svg>`;
}

/* Shared SVG gradient definitions, printed once per page. */
const svgDefs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<radialGradient id="bm-spark" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#ffd3ab"/><stop offset="0.5" stop-color="#ff8a2e"/><stop offset="1" stop-color="#ef5f08"/></radialGradient>
</defs></svg>`;

/* ---- Buttons ---------------------------------------------------------------- */
/** variant: primary | secondary | accent | ghost-dark | light */
export function button(label, href, { variant = "primary", size = "md", iconName, cls = "", external = false } = {}) {
  const ext = external ? ` target="_blank" rel="noopener noreferrer"` : "";
  const ic = iconName ? icon(iconName, { size: size === "sm" ? 16 : 18, weight: "bold", cls: "btn__icon" }) : "";
  return `<a href="${href}" class="btn btn--${variant} btn--${size}${cls ? ` ${cls}` : ""}"${ext}>${ic}<span>${label}</span></a>`;
}

export function badge(label, tone = "open") {
  return `<span class="badge badge--${tone}">${label}</span>`;
}

/* ---- Section header ----------------------------------------------------------- */
export function sectionHeader({ title, subtitle, more, id, accent = false, tag = "h2" }) {
  return `<header class="section-head${accent ? " section-head--accent" : ""}">
  <div class="section-head__text">
    <${tag}${id ? ` id="${id}"` : ""} class="section-head__title">${title}</${tag}>
    ${subtitle ? `<p class="section-head__sub">${subtitle}</p>` : ""}
  </div>
  ${more ? `<a href="${more.href}" class="section-head__more">${more.label || "مشاهده همه"}${icon("caret-left", { size: 14, weight: "bold" })}</a>` : ""}
</header>`;
}

/* ---- Cover (image slot) -----------------------------------------------------------
   With `visual.src` it renders the real photo or mockup. Without it, a
   branded cover holds the slot until real media is uploaded. */
export function cover(visual, cls = "") {
  const tone = visual.tone || "navy";
  const inner = visual.src
    ? `<img src="${visual.src}" alt="${esc(visual.alt)}" loading="lazy" decoding="async">`
    : `<div class="cover__art" role="img" aria-label="${esc(visual.alt)}">
        <span class="cover__orb"></span><span class="cover__orb cover__orb--2"></span>
        <span class="cover__tile">${icon(visual.icon, { size: 34, weight: "duotone" })}</span>
      </div>`;
  return `<div class="cover cover--${tone}${cls ? ` ${cls}` : ""}">${inner}</div>`;
}

/* ---- Cards ------------------------------------------------------------------------- */
export function areaCard(a) {
  return `<a href="${a.href}" class="area-card">
  <span class="icon-tile">${icon(a.icon, { size: 34, weight: "duotone" })}</span>
  <h3 class="area-card__title">${a.title}</h3>
  <p class="area-card__text">${a.short}</p>
</a>`;
}

export function courseCard(c) {
  const tone = c.status === "open" ? "open" : c.status === "soon" ? "soon" : "muted";
  return `<article class="course-card">
  ${cover(c.visual, "course-card__cover")}
  <div class="course-card__body">
    ${badge(courseStatus[c.status], tone)}
    <h3 class="course-card__title"><a href="${urls.course(c)}">${c.title}</a></h3>
    <p class="course-card__meta">${icon("clock", { size: 15 })}${c.duration || courseKind[c.kind]}</p>
    <span class="card-link" aria-hidden="true">جزئیات بیشتر${icon("arrow-left", { size: 15, weight: "bold" })}</span>
  </div>
</article>`;
}

export function eventCard(e) {
  return `<article class="event-card">
  ${cover(e.visual, "event-card__cover")}
  <div class="event-card__body">
    ${badge(eventStatus[e.status], e.status === "past" ? "muted" : "open")}
    <h3 class="event-card__title"><a href="${urls.event(e)}">${e.title}</a></h3>
    <p class="event-card__text">${e.summary}</p>
    <p class="event-card__meta">${icon("calendar", { size: 15 })}${e.date || "زمان به‌زودی اعلام می‌شود"}</p>
  </div>
</article>`;
}

export function projectCard(p) {
  return `<article class="project-card" data-category="${p.category} ${(p.alsoOn || []).join(" ")}">
  ${cover(p.visual, "project-card__cover")}
  <div class="project-card__body">
    <h3 class="project-card__title"><a href="${urls.project(p)}">${p.title}</a></h3>
    <p class="project-card__cat">${p.services[0]}</p>
    <p class="project-card__text">${p.summary}</p>
    <span class="project-card__cta" aria-hidden="true">مشاهده جزئیات</span>
  </div>
</article>`;
}

export function mediaCard(m) {
  const k = mediaKind[m.kind];
  return `<article class="project-card media-card" data-category="${m.kind}">
  ${cover(m.visual, "project-card__cover")}
  <div class="project-card__body">
    <p class="project-card__cat">${k.label}${m.duration ? ` | <span class="ltr">${m.duration}</span>` : ""}</p>
    <h3 class="project-card__title"><a href="${urls.media(m)}">${m.series ? `${m.title}، ${m.series}` : m.title}</a></h3>
    <p class="project-card__text">${m.summary}</p>
    <span class="project-card__cta" aria-hidden="true">${k.action}</span>
  </div>
</article>`;
}

export function featureGrid(features) {
  return `<ul class="feature-grid">${features
    .map(
      (f, i) => `<li class="feature" data-reveal${revealIdx(i)}>
  <span class="icon-tile icon-tile--sm">${icon(f.icon, { size: 26, weight: "duotone" })}</span>
  <h3 class="feature__title">${f.title}</h3>
  <p class="feature__text">${f.text}</p>
</li>`,
    )
    .join("")}</ul>`;
}

export function emptyState(title, text, iconName = "sparkle") {
  return `<div class="empty-state">${icon(iconName, { size: 30, weight: "duotone" })}<strong>${title}</strong><p>${text}</p></div>`;
}

export function sampleNotice() {
  return `<p class="sample-notice" role="note">${icon("warning", { size: 18 })}این صفحه محتوای نمونه است و پس از تأیید با اطلاعات واقعی برندیمو جایگزین می‌شود.</p>`;
}

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="مسیر صفحه"><ol>${items
    .map((it, i) => (i === items.length - 1 ? `<li aria-current="page">${it.label}</li>` : `<li><a href="${it.href}">${it.label}</a></li>`))
    .join("")}</ol></nav>`;
}

/* ---- Banners ---------------------------------------------------------------------- */
/* Shared banner for every activity page: fixed structure, per-area content. */
export function pageHero({ title, slogan, text, cta, mainIcon, satellites = [] }) {
  return `<section class="page-hero">
  <div class="container">
    <div class="page-hero__panel">
      <div class="page-hero__text">
        ${slogan ? `<p class="page-hero__slogan">${slogan}</p>` : ""}
        <h1 class="page-hero__title">${title}</h1>
        ${text ? `<p class="page-hero__desc">${text}</p>` : ""}
        ${cta ? `<div class="page-hero__actions">${button(cta.label, cta.href, { iconName: "arrow-left" })}</div>` : ""}
      </div>
      <div class="page-hero__art" aria-hidden="true">
        <span class="page-hero__glass page-hero__glass--a"></span>
        <span class="page-hero__glass page-hero__glass--b"></span>
        <span class="page-hero__main">${icon(mainIcon, { size: 64, weight: "duotone" })}</span>
        ${satellites.map((s, i) => `<span class="page-hero__sat page-hero__sat--${i + 1}">${icon(s, { size: 24, weight: "duotone" })}</span>`).join("")}
        ${sparkle(40, "page-hero__spark")}
      </div>
    </div>
  </div>
</section>`;
}

export function areaHero(a) {
  return pageHero({
    title: a.heroTitle,
    slogan: a.slogan,
    text: a.heroText,
    cta: a.cta,
    mainIcon: a.icon,
    satellites: a.features.slice(0, 3).map((f) => f.icon),
  });
}

/* Closing call-to-action, shared by every page; copy and link vary. */
export function ctaBanner({
  title = "بیایید با هم بسازیم",
  text = "برای همکاری، دریافت مشاوره یا ثبت درخواست، با ما در ارتباط باشید.",
  cta = { label: "تماس با ما", href: "contact.html" },
} = {}) {
  return `<section class="section" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-banner" data-reveal>
      <span class="cta-banner__ring" aria-hidden="true"></span>
      <span class="cta-banner__ring cta-banner__ring--2" aria-hidden="true"></span>
      ${sparkle(52, "cta-banner__spark")}
      <div class="cta-banner__text">
        <h2 id="cta-title">${title}</h2>
        <p>${text}</p>
      </div>
      ${button(cta.label, cta.href, { variant: "ghost-dark", iconName: "arrow-left" })}
    </div>
  </div>
</section>`;
}

/* ---- Home hero artwork -------------------------------------------------------------
   Open book whose pages fan up from the spine, inside layered glass panels,
   with the Brandimo sparkle above. Pure vector + CSS, no raster image. */
const SPINE = 320;
const LEFT_PAGE = [
  [320, 196],
  [292, 150],
  [176, 136],
  [64, 160],
  [56, 306],
  [170, 286],
  [282, 312],
  [320, 374],
];
const lift = ([x, y], t) => {
  const dx = x - SPINE;
  return [SPINE + dx * Math.cos(t), y - Math.abs(dx) * Math.sin(t) * 0.62];
};
const pagePath = (pts, t) => {
  const p = pts.map((pt) => lift(pt, t).map((n) => n.toFixed(1)).join(" "));
  return `M${p[0]} C${p[1]} ${p[2]} ${p[3]} L${p[4]} C${p[5]} ${p[6]} ${p[7]} Z`;
};

export function heroArt() {
  const right = LEFT_PAGE.map(([x, y]) => [SPINE * 2 - x, y]);
  const leftLifts = [0.1, 0.24, 0.42];
  const rightLifts = [0.12, 0.3, 0.52, 0.78, 1.05];
  return `<div class="hero-art" aria-hidden="true">
  <span class="hero-art__glow"></span>
  <span class="hero-art__panel hero-art__panel--back"></span>
  <span class="hero-art__panel hero-art__panel--left"></span>
  <span class="hero-art__panel hero-art__panel--right"></span>
  <span class="hero-art__panel hero-art__panel--front"></span>
  <svg class="hero-art__book" viewBox="0 60 640 370" focusable="false">
    <defs>
      <linearGradient id="ha-cover" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d63e6"/><stop offset="1" stop-color="#0b1f40"/></linearGradient>
      <linearGradient id="ha-paper" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f1f5fd"/><stop offset="1" stop-color="#d9e3f6"/></linearGradient>
      <linearGradient id="ha-paper-lift" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e7eefc"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <linearGradient id="ha-blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b93ff"/><stop offset="0.55" stop-color="#2d63e6"/><stop offset="1" stop-color="#1a3fae"/></linearGradient>
      <linearGradient id="ha-blue-lift" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1f4fd1"/><stop offset="0.5" stop-color="#3f7bf5"/><stop offset="1" stop-color="#8db3ff"/></linearGradient>
      <linearGradient id="ha-edge-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fd"/><stop offset="1" stop-color="#c8d4ec"/></linearGradient>
      <linearGradient id="ha-edge-r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b72ee"/><stop offset="1" stop-color="#173a9c"/></linearGradient>
      <radialGradient id="ha-spark" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd2a8"/><stop offset="0.45" stop-color="#ff8a2e"/><stop offset="1" stop-color="#f2620a"/></radialGradient>
      <radialGradient id="ha-spark-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff9a45" stop-opacity="0.55"/><stop offset="1" stop-color="#ff9a45" stop-opacity="0"/></radialGradient>
      <pattern id="ha-lines" width="6" height="4" patternUnits="userSpaceOnUse"><rect y="3" width="6" height="0.8" fill="rgba(11,31,64,0.08)"/></pattern>
    </defs>
    <path d="M30 300 L320 392 L610 300 L610 318 L320 412 L30 318 Z" fill="url(#ha-cover)"/>
    <path d="M56 306 C170 286 282 312 320 374 L320 394 C280 334 168 308 50 326 Z" fill="url(#ha-edge-l)"/>
    <path d="M56 306 C170 286 282 312 320 374 L320 394 C280 334 168 308 50 326 Z" fill="url(#ha-lines)"/>
    <path d="M584 306 C470 286 358 312 320 374 L320 394 C360 334 472 308 590 326 Z" fill="url(#ha-edge-r)"/>
    <path d="${pagePath(LEFT_PAGE, 0)}" fill="url(#ha-paper)" stroke="#d3ddf0"/>
    <path d="${pagePath(right, 0)}" fill="url(#ha-blue)" stroke="#1d47b8"/>
    ${leftLifts.map((t) => `<path d="${pagePath(LEFT_PAGE, t)}" fill="url(#ha-paper-lift)" stroke="#d6e0f3"/>`).join("")}
    ${rightLifts.map((t, i) => `<path d="${pagePath(right, t)}" fill="url(#ha-blue-lift)" stroke="rgba(255,255,255,0.35)" opacity="${(0.78 + i * 0.05).toFixed(2)}"/>`).join("")}
    <path d="M318 190 L322 190 L322 376 L318 376 Z" fill="rgba(11,31,64,0.18)"/>
    <g class="hero-art__spark">
      <circle cx="330" cy="150" r="86" fill="url(#ha-spark-glow)"/>
      <path d="M330 82 C336 128 344 140 384 150 C344 160 336 172 330 218 C324 172 316 160 276 150 C316 140 324 128 330 82 Z" fill="url(#ha-spark)"/>
      <path d="M330 104 C333 132 338 142 360 150 C338 152 333 160 330 150 Z" fill="rgba(255,255,255,0.45)"/>
    </g>
  </svg>
  <p class="hero-art__words ltr"><span>Learn</span><span>Build</span><span>Create</span></p>
</div>`;
}

/* ---- Header ---------------------------------------------------------------------- */
function header(active) {
  const links = nav.filter((n) => n.key !== "contact");
  const cur = (k) => (k === active ? ` aria-current="page"` : "");
  return `<div class="header-sentinel" aria-hidden="true"></div>
<header class="site-header">
  <div class="container">
    <div class="site-header__bar glass">
      ${logo()}
      <nav class="site-nav" aria-label="منوی اصلی">
        <ul>${links.map((n) => `<li><a href="${n.href}" class="site-nav__link"${cur(n.key)}>${n.label}</a></li>`).join("")}</ul>
      </nav>
      <div class="site-header__actions">
        <a href="contact.html" class="btn btn--accent btn--sm site-header__contact"><span>تماس با ما</span></a>
        <button type="button" class="icon-btn" data-search-open aria-label="جست‌وجو در سایت" aria-haspopup="dialog">${icon("search", { size: 19, weight: "bold" })}</button>
        <button type="button" class="icon-btn site-header__menu-btn" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="باز کردن منو">
          <span class="when-closed">${icon("menu", { size: 21, weight: "bold" })}</span>
          <span class="when-open">${icon("close", { size: 21, weight: "bold" })}</span>
        </button>
      </div>
    </div>
  </div>
  <div id="mobile-menu" class="mobile-menu" hidden>
    <nav aria-label="منوی موبایل" class="mobile-menu__panel glass">
      <ul>${nav.map((n) => `<li><a href="${n.href}" class="mobile-menu__link"${cur(n.key)}>${n.label}${icon("caret-left", { size: 16, weight: "bold" })}</a></li>`).join("")}</ul>
    </nav>
    <button type="button" class="mobile-menu__scrim" data-menu-close aria-label="بستن منو"></button>
  </div>
</header>
<dialog class="search-dialog" aria-label="جست‌وجو" data-search-dialog>
  <div class="search-dialog__panel glass glass--strong">
    <div class="search-dialog__field">
      ${icon("search", { size: 20 })}
      <label for="site-search" class="sr-only">عبارت جست‌وجو</label>
      <input id="site-search" type="search" autocomplete="off" placeholder="جست‌وجو در دوره‌ها، رویدادها، پروژه‌ها و رسانه">
      <button type="button" class="icon-btn" data-search-close aria-label="بستن جست‌وجو">${icon("close", { size: 18, weight: "bold" })}</button>
    </div>
    <div aria-live="polite" data-search-results><p class="search-dialog__empty">برای مثال: بوت‌کمپ، رویداد، پادکست</p></div>
  </div>
</dialog>`;
}

/* ---- Footer ------------------------------------------------------------------------ */
function contactLine(iconName, value, placeholder, href) {
  const v = value ? (href ? `<a href="${href}" class="ltr">${value}</a>` : `<span>${value}</span>`) : `<span class="is-placeholder">${placeholder}</span>`;
  return `<li class="footer-contact">${icon(iconName, { size: 18 })}${v}</li>`;
}

function footer() {
  const c = site.contact;
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <section aria-labelledby="f-news" class="site-footer__col site-footer__news">
        <h2 id="f-news">با ما در ارتباط باشید</h2>
        <p>برای دریافت آخرین اخبار دوره‌ها و رویدادها، ایمیل خود را وارد کنید.</p>
        <form class="newsletter" data-form="newsletter" novalidate>
          <label for="newsletter-email" class="sr-only">ایمیل</label>
          <div class="newsletter__field">
            <input id="newsletter-email" name="email" type="email" required placeholder="ایمیل شما" dir="ltr" autocomplete="email">
            <button type="submit" aria-label="عضویت در خبرنامه">${icon("send", { size: 18, weight: "bold" })}</button>
          </div>
          <p class="form-msg" role="status" hidden></p>
        </form>
      </section>
      <section aria-labelledby="f-contact" class="site-footer__col">
        <h2 id="f-contact">راه‌های ارتباطی</h2>
        <ul>
          ${contactLine("phone", c.phone, "شماره تماس رسمی (به‌زودی)", c.phone ? `tel:${c.phone}` : null)}
          ${contactLine("envelope", c.email, "ایمیل رسمی (به‌زودی)", c.email ? `mailto:${c.email}` : null)}
          ${contactLine("pin", c.address, "نشانی (به‌زودی)")}
          <li class="footer-contact">${icon("send", { size: 18 })}<a href="${site.eitaa || "media.html#eitaa"}"${site.eitaa ? ` target="_blank" rel="noopener noreferrer"` : ""}>کانال ایتا</a></li>
        </ul>
      </section>
      <nav aria-labelledby="f-links" class="site-footer__col">
        <h2 id="f-links">دسترسی سریع</h2>
        <ul class="site-footer__links">
          ${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          <li><a href="projects.html">پروژه‌ها و سوابق</a></li>
        </ul>
      </nav>
      <section class="site-footer__col site-footer__brand" aria-label="برندیمو">
        ${logo(true)}
        <p>${site.description}</p>
        <ul class="socials" aria-label="شبکه‌های اجتماعی">
          ${site.socials
            .map((s) =>
              s.href
                ? `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" class="social">${icon(s.icon, { size: 18 })}</a></li>`
                : `<li><span class="social is-pending" title="${s.label}: لینک پس از تأیید فعال می‌شود">${icon(s.icon, { size: 18 })}<span class="sr-only">${s.label} (به‌زودی)</span></span></li>`,
            )
            .join("")}
        </ul>
      </section>
    </div>
    <div class="site-footer__bottom">
      <p>یادگیری | تجربه | خلق راهکار</p>
      <p>© <span data-year>۱۴۰۵</span> برندیمو. تمامی حقوق محفوظ است.</p>
    </div>
  </div>
</footer>`;
}

/* ---- Page layout ------------------------------------------------------------------- */
export function layout({ title, description = site.description, active, body, file }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#f4f6fb">
<link rel="canonical" href="${site.url}/${file === "index.html" ? "" : file}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fa_IR">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<link rel="icon" href="assets/brand/mark.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/vazirmatn-arabic-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/fonts.css">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/sections.css">
<script src="assets/js/config.js" defer></script>
<script src="assets/js/search-index.js" defer></script>
<script src="assets/js/main.js" defer></script>
</head>
<body>
${svgDefs}
<a href="#main" class="skip-link">رفتن به محتوای اصلی</a>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}
