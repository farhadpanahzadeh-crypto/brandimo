/* ==========================================================================
   Brandimo pages. Each function returns { file, title, description, active, body }.
   ========================================================================== */
import {
  area,
  areas,
  contactTopics,
  courseKind,
  courseStatus,
  courses,
  events,
  eventStatus,
  getAnnouncements,
  mediaItems,
  mediaKind,
  projects,
  projectsFor,
  site,
  urls,
} from "./data.mjs";
import { icon } from "./icons.mjs";
import {
  areaCard,
  areaHero,
  badge,
  brandMark,
  breadcrumbs,
  button,
  courseCard,
  cover,
  ctaBanner,
  emptyState,
  eventCard,
  featureGrid,
  heroArt,
  mediaCard,
  pageHero,
  projectCard,
  sampleNotice,
  sectionHeader,
} from "./partials.mjs";

const ri = (i) => (i ? ` style="--reveal-i:${i}"` : "");
const list = (items, fn) => items.map(fn).join("");
const grid = (items, fn, cls = "grid-3") =>
  `<ul class="${cls}">${items.map((it, i) => `<li data-reveal${ri(i % 3)}>${fn(it)}</li>`).join("")}</ul>`;

/* ======================================================================== */
/* Home                                                                      */
/* ======================================================================== */
function home() {
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 3);
  const featuredEvents = events.filter((e) => e.featured && e.status !== "past");
  const project = projects.find((p) => p.featured) || projects[0];
  const podcast = mediaItems.find((m) => m.kind === "podcast" && m.featured);
  const services = ["programming", "content"].map(area);

  const slides = featuredEvents
    .map(
      (ev, i) => `<article class="event-feature__card" data-slide${i ? " hidden" : ""} aria-roledescription="اسلاید" aria-label="${i + 1} از ${featuredEvents.length}">
  <div class="event-feature__body">
    ${brandMark(34, true)}
    <h3 class="event-feature__title">${ev.title}</h3>
    <p class="event-feature__text">${ev.summary}</p>
    <p class="event-feature__meta">${icon("calendar", { size: 16 })}${ev.date || "زمان به‌زودی اعلام می‌شود"}${ev.location ? `<span>${ev.location}</span>` : ""}</p>
    <a href="${urls.event(ev)}" class="btn btn--light btn--sm"><span>${ev.status === "open" ? "ثبت‌نام کنید" : "جزئیات رویداد"}</span></a>
  </div>
  <div class="event-feature__poster" aria-hidden="true">
    <span class="event-feature__stage"></span>
    ${ev.latinName ? `<span class="event-feature__latin ltr">${ev.latinName}</span>` : ""}
    <span class="event-feature__crowd">${icon(ev.visual.icon, { size: 46, weight: "duotone" })}</span>
  </div>
</article>`,
    )
    .join("");

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="hero__eyebrow">برندیمو؛ همراه مسیر رشد شما</p>
      <h1 id="hero-title" class="hero__title">یادگیری، نوآوری<br>و خلق راهکار</h1>
      <p class="hero__desc">برندیمو مجموعه‌ای برای آموزش، رویداد، برنامه‌نویسی، تولید محتوا و رسانه است؛ با هدف توانمندسازی افراد و سازمان‌ها در مسیر آینده دیجیتال.</p>
      <div class="hero__actions">
        ${button("مشاهده برنامه‌ها", "#programs", { iconName: "arrow-left" })}
        ${button("همکاری با ما", "contact.html?topic=collaboration", { variant: "secondary" })}
      </div>
    </div>
    ${heroArt()}
  </div>
</section>

<section class="latest" aria-labelledby="latest-title">
  <div class="container">
    <div class="latest__panel glass">
      <ul class="latest__list">
        ${getAnnouncements()
          .map(
            (a, i) => `<li data-reveal${ri(i)}><a href="${a.href}" class="latest-card">
  ${a.isNew ? `<span class="badge badge--new latest-card__badge">جدید</span>` : ""}
  ${icon(a.icon, { size: 30, weight: "duotone", cls: "latest-card__icon" })}
  <span class="latest-card__label">${a.label}</span><span class="sr-only">: ${a.title}</span>
</a></li>`,
          )
          .join("")}
      </ul>
      <div class="latest__intro">
        <div>
          <h2 id="latest-title">جدیدترین‌های برندیمو</h2>
          <p>دوره‌ها، رویدادها، پادکست‌ها و بیشتر...</p>
        </div>
        <a href="#programs" class="round-btn round-btn--fill" aria-label="مشاهده برنامه‌های جدید">${icon("arrow-left", { size: 18, weight: "bold" })}</a>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="areas-title">
  <div class="container">
    ${sectionHeader({ id: "areas-title", title: "حوزه‌های فعالیت ما", subtitle: "از یادگیری تا راهکارهای دیجیتال، در کنار شما هستیم.", accent: true })}
    <ul class="areas-grid">${areas.map((a, i) => `<li data-reveal${ri(i)}>${areaCard(a)}</li>`).join("")}</ul>
  </div>
</section>

<section class="section" id="programs" aria-label="برنامه‌های پیش‌رو">
  <div class="container programs">
    <div class="programs__events" data-reveal>
      ${sectionHeader({ title: "رویدادهای پیش‌رو", more: { href: "events.html" } })}
      <div class="event-feature" data-carousel aria-roledescription="carousel" aria-label="رویدادهای منتخب">
        <div class="event-feature__track" aria-live="polite">${slides}</div>
        ${
          featuredEvents.length > 1
            ? `<div class="event-feature__nav">
          <button type="button" class="round-btn" data-prev aria-label="رویداد قبلی">${icon("caret-right", { size: 16, weight: "bold" })}</button>
          <button type="button" class="round-btn" data-next aria-label="رویداد بعدی">${icon("caret-left", { size: 16, weight: "bold" })}</button>
        </div>
        <div class="dots">${featuredEvents.map((e, i) => `<button type="button" class="dot" data-dot="${i}" aria-label="${e.title}"${i ? "" : ` aria-current="true"`}></button>`).join("")}</div>`
            : ""
        }
      </div>
    </div>
    <div class="programs__courses" data-reveal${ri(1)}>
      ${sectionHeader({ title: "دوره‌ها و بوت‌کمپ‌های آموزشی", more: { href: "education.html" } })}
      <ul class="courses-row">${featuredCourses.map((c) => `<li>${courseCard(c)}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="section" aria-label="رسانه، پروژه‌ها و خدمات">
  <div class="container trio">
    <div class="trio__media" data-reveal>
      ${sectionHeader({ title: "رسانه برندیمو", more: { href: "media.html" } })}
      ${
        podcast
          ? `<article class="player glass">
        <div class="player__head">
          <span class="player__cover">${icon("mic", { size: 26, weight: "duotone" })}</span>
          <div>
            <h3 class="player__title">${podcast.title}</h3>
            <p class="player__sub">${podcast.series}، ${podcast.summary}</p>
          </div>
        </div>
        <div class="player__controls">
          <a href="${urls.media(podcast)}" class="play-btn" aria-label="پخش ${podcast.title} ${podcast.series || ""}">${icon("play", { size: 18, weight: "fill" })}</a>
          <span class="player__wave" aria-hidden="true"></span>
          ${podcast.duration ? `<span class="player__time ltr">${podcast.duration}</span>` : ""}
        </div>
      </article>`
          : ""
      }
      <div class="media-mini">
        <a href="media.html?type=article#archive" class="media-mini__card">
          <span class="media-mini__icon">${icon("article", { size: 22, weight: "duotone" })}</span>
          <span class="media-mini__title">مقالات</span><span class="media-mini__action">مطالعه کنید</span>
        </a>
        <a href="media.html?type=video#archive" class="media-mini__card">
          <span class="media-mini__icon">${icon("play", { size: 20, weight: "fill" })}</span>
          <span class="media-mini__title">ویدئوها</span><span class="media-mini__action">تماشا کنید</span>
        </a>
      </div>
    </div>

    <div class="trio__project" data-reveal${ri(1)}>
      ${sectionHeader({ title: "پروژه‌های منتخب ما", more: { href: "projects.html" } })}
      <article class="showcase">
        ${cover(project.visual, "showcase__cover")}
        <div class="showcase__body">
          <h3 class="showcase__title">${project.title}</h3>
          <p class="showcase__cat">${project.services[0]}</p>
          <p class="showcase__text">${project.summary}</p>
          ${button("مشاهده جزئیات", urls.project(project), { size: "sm" })}
        </div>
      </article>
    </div>

    <div class="trio__services" data-reveal${ri(2)}>
      ${sectionHeader({ title: "خدمات برنامه‌نویسی و تولید محتوا", subtitle: "از ایده تا اجرا، با تیم متخصص و تجربه واقعی." })}
      <ul class="service-pair">
        ${services
          .map(
            (s) => `<li class="service-card">
          ${cover({ icon: s.key === "programming" ? "code" : "video", tone: s.key === "programming" ? "night" : "navy", alt: s.title }, "service-card__cover")}
          <h3 class="service-card__title">${s.title}</h3>
          ${button("مشاهده خدمات", s.href, { size: "sm" })}
        </li>`,
          )
          .join("")}
      </ul>
    </div>
  </div>
</section>

${ctaBanner()}`;
  return { file: "index.html", active: "home", body };
}

/* ======================================================================== */
/* Shared activity-page sections                                             */
/* ======================================================================== */
function featuresSection(a, title = "ویژگی‌ها") {
  return `<section class="section" aria-labelledby="features-title">
  <div class="container">
    ${sectionHeader({ id: "features-title", title, accent: true, subtitle: a.slogan })}
    ${featureGrid(a.features)}
  </div>
</section>`;
}

function projectsSection(key, title = "سوابق و پروژه‌های گذشته") {
  const items = projectsFor(key);
  return `<section class="section" id="portfolio" aria-labelledby="portfolio-title">
  <div class="container">
    ${sectionHeader({ id: "portfolio-title", title, more: { href: `projects.html?type=${key}` } })}
    ${items.length ? grid(items, projectCard) : emptyState("هنوز پروژه‌ای ثبت نشده است", "نمونه‌کارهای این حوزه پس از تأیید منتشر می‌شوند.")}
  </div>
</section>`;
}

function servicesSection(a) {
  return `<section class="section" aria-labelledby="services-title">
  <div class="container">
    ${sectionHeader({ id: "services-title", title: "خدمات قابل ارائه" })}
    <ul class="service-list">${list(
      a.services,
      (s, i) => `<li class="service-item" data-reveal${ri(i % 2)}>
  <span class="icon-tile icon-tile--sm">${icon(s.icon, { size: 26, weight: "duotone" })}</span>
  <div><h3>${s.title}</h3><p>${s.text}</p></div>
</li>`,
    )}</ul>
  </div>
</section>`;
}

/* ======================================================================== */
/* Education                                                                 */
/* ======================================================================== */
function education() {
  const a = area("education");
  const active = courses.filter((c) => c.status === "open");
  const soon = courses.filter((c) => c.status === "soon");
  const archived = courses.filter((c) => c.status === "archived");
  const body = `${areaHero(a)}
${featuresSection(a, "رویکرد آموزشی ما")}
<section class="section" id="programs" aria-labelledby="active-title">
  <div class="container">
    ${sectionHeader({ id: "active-title", title: "دوره‌ها و بوت‌کمپ‌های فعال" })}
    ${active.length ? grid(active, courseCard) : emptyState("در حال حاضر دوره فعالی نداریم", "برای اطلاع از دوره‌های بعدی، عضو خبرنامه شوید.")}
  </div>
</section>
<section class="section" aria-labelledby="soon-title">
  <div class="container">
    ${sectionHeader({ id: "soon-title", title: "برنامه‌های آینده", subtitle: "علاقه‌مندی خود را اعلام کنید تا هنگام شروع ثبت‌نام خبرتان کنیم." })}
    <ul class="timeline-list">${list(
      soon,
      (c) => `<li class="upcoming-row" data-reveal>
  <span class="icon-tile icon-tile--sm">${icon(c.visual.icon, { size: 24, weight: "duotone" })}</span>
  <div><h3><a href="${urls.course(c)}">${c.title}</a></h3><p>${c.summary}</p></div>
  ${button("اعلام علاقه‌مندی", `contact.html?topic=course&item=${c.slug}`, { variant: "secondary", size: "sm" })}
</li>`,
    )}</ul>
  </div>
</section>
<section class="section" aria-labelledby="archive-title">
  <div class="container">
    ${sectionHeader({ id: "archive-title", title: "دوره‌های برگزارشده" })}
    ${archived.length ? grid(archived, courseCard) : emptyState("آرشیو به‌زودی تکمیل می‌شود", "گزارش دوره‌های برگزارشده پس از تأیید منتشر می‌شود.")}
  </div>
</section>
${projectsSection("education", "خروجی‌ها و دستاوردها")}
${ctaBanner({ title: "آماده شروع یادگیری هستید؟", text: "برای مشاوره انتخاب دوره یا ثبت‌نام، درخواست خود را ثبت کنید.", cta: { label: "ثبت درخواست", href: "contact.html?topic=course" } })}`;
  return { file: "education.html", title: "آموزش", description: a.heroText, active: "education", body };
}

/* ======================================================================== */
/* Events                                                                    */
/* ======================================================================== */
function eventsPage() {
  const a = area("events");
  const upcoming = events.filter((e) => e.status !== "past");
  const past = events.filter((e) => e.status === "past");
  const body = `${areaHero(a)}
${featuresSection(a, "از ایده تا گزارش")}
<section class="section" id="upcoming" aria-labelledby="up-title">
  <div class="container">
    ${sectionHeader({ id: "up-title", title: "رویدادهای پیش‌رو و در حال ثبت‌نام" })}
    ${upcoming.length ? grid(upcoming, eventCard) : emptyState("رویداد پیش‌رویی اعلام نشده است", "برنامه‌های بعدی از کانال ایتا و خبرنامه اطلاع‌رسانی می‌شوند.")}
  </div>
</section>
<section class="section" aria-labelledby="past-title">
  <div class="container">
    ${sectionHeader({ id: "past-title", title: "آرشیو رویدادهای برگزارشده" })}
    ${past.length ? grid(past, eventCard) : emptyState("آرشیو به‌زودی تکمیل می‌شود", "گزارش رویدادها پس از تأیید منتشر می‌شود.")}
  </div>
</section>
${projectsSection("events", "گزارش‌ها و پروژه‌های اجراشده")}
${ctaBanner({ title: "رویداد بعدی را با هم بسازیم", text: "برای برگزاری رویداد سازمانی یا همکاری در اجرا، با ما در ارتباط باشید.", cta: { label: "درخواست همکاری", href: "contact.html?topic=event" } })}`;
  return { file: "events.html", title: "رویدادها", description: a.heroText, active: "events", body };
}

/* ======================================================================== */
/* Programming / Content production                                          */
/* ======================================================================== */
/* "New activities" per service page: related programs and fresh content,
   pulled from the shared collections. */
const freshFor = {
  programming: () => courses.filter((c) => ["web-programming-bootcamp", "artificial-intelligence-course"].includes(c.slug)).map(courseCard),
  content: () => [...courses.filter((c) => c.slug === "product-design-bootcamp").map(courseCard), ...mediaItems.filter((m) => m.kind === "video").map(mediaCard)],
};

function servicePage(key, file, ctaCopy) {
  const a = area(key);
  const fresh = freshFor[key]();
  const body = `${areaHero(a)}
${featuresSection(a, "مسیر همکاری")}
${servicesSection(a)}
${projectsSection(key)}
<section class="section" aria-labelledby="new-title">
  <div class="container">
    ${sectionHeader({ id: "new-title", title: "فعالیت‌ها و برنامه‌های جدید" })}
    ${fresh.length ? grid(fresh, (html) => html, fresh.length === 2 ? "grid-2" : "grid-3") : emptyState("به‌زودی", "برنامه‌های جدید این حوزه اینجا نمایش داده می‌شوند.")}
  </div>
</section>
${ctaBanner(ctaCopy)}`;
  return { file, title: a.title, description: a.heroText, active: key, body };
}

/* ======================================================================== */
/* Media                                                                     */
/* ======================================================================== */
function mediaPage() {
  const a = area("media");
  const latest = mediaItems.filter((m) => m.featured);
  const body = `${areaHero(a)}
${featuresSection(a, "رسانه در یک نگاه")}
<section class="section" id="latest" aria-labelledby="latest-media-title">
  <div class="container">
    ${sectionHeader({ id: "latest-media-title", title: "تازه‌ترین‌ها" })}
    ${grid(latest, mediaCard)}
  </div>
</section>
<section class="section" id="archive" aria-labelledby="media-archive-title">
  <div class="container">
    ${sectionHeader({ id: "media-archive-title", title: "آرشیو محتوا" })}
    <div class="filters" role="group" aria-label="فیلتر نوع محتوا" data-filter-group="media">
      <button type="button" class="chip" data-filter="all" aria-pressed="true">همه</button>
      ${Object.entries(mediaKind).map(([k, v]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="false">${v.label}</button>`).join("")}
    </div>
    <ul class="grid-3" data-filter-list="media">${mediaItems.map((m) => `<li data-category="${m.kind}">${mediaCard(m)}</li>`).join("")}</ul>
    <p class="filter-empty" hidden>محتوایی در این دسته منتشر نشده است.</p>
  </div>
</section>
<section class="section" id="eitaa" aria-labelledby="eitaa-title">
  <div class="container">
    <div class="channel-card" data-reveal>
      <span class="channel-card__icon">${icon("send", { size: 34, weight: "duotone" })}</span>
      <div>
        <h2 id="eitaa-title">کانال رسمی برندیمو در ایتا</h2>
        <p>اطلاع‌رسانی دوره‌ها، رویدادها و اپیزودهای تازه، زودتر از همه.</p>
      </div>
      ${
        site.eitaa
          ? button("عضویت در کانال", site.eitaa, { external: true, iconName: "arrow-up-left" })
          : `<span class="btn btn--secondary is-disabled" aria-disabled="true"><span>لینک کانال به‌زودی</span></span>`
      }
    </div>
  </div>
</section>
${ctaBanner({ title: "مهمان رسانه برندیمو باشید", text: "برای پیشنهاد گفت‌وگو، همکاری رسانه‌ای یا حمایت از برنامه‌ها با ما در ارتباط باشید.", cta: { label: "ارسال پیشنهاد", href: "contact.html?topic=media" } })}`;
  return { file: "media.html", title: "رسانه", description: a.heroText, active: "media", body };
}

/* ======================================================================== */
/* Projects archive                                                          */
/* ======================================================================== */
function projectsPage() {
  const body = `${pageHero({
    title: "پروژه‌ها و سوابق برندیمو",
    slogan: "تجربه‌هایی که ساخته‌ایم",
    text: "آرشیو کارهای انجام‌شده در آموزش، رویداد، برنامه‌نویسی، تولید محتوا و رسانه.",
    cta: { label: "شروع همکاری", href: "contact.html?topic=collaboration" },
    mainIcon: "stack",
    satellites: ["code", "film", "calendar"],
  })}
<section class="section" id="archive" aria-labelledby="pa-title">
  <div class="container">
    ${sectionHeader({ id: "pa-title", title: "آرشیو پروژه‌ها" })}
    <div class="filters" role="group" aria-label="فیلتر حوزه" data-filter-group="projects">
      <button type="button" class="chip" data-filter="all" aria-pressed="true">همه</button>
      ${areas.map((a) => `<button type="button" class="chip" data-filter="${a.key}" aria-pressed="false">${a.title}</button>`).join("")}
    </div>
    <ul class="grid-3" data-filter-list="projects">${projects
      .map((p) => `<li data-category="${[p.category, ...(p.alsoOn || [])].join(" ")}">${projectCard(p)}</li>`)
      .join("")}</ul>
    <p class="filter-empty" hidden>هنوز پروژه‌ای در این حوزه ثبت نشده است.</p>
  </div>
</section>
${ctaBanner()}`;
  return { file: "projects.html", title: "پروژه‌ها و سوابق", description: "آرشیو پروژه‌ها و نمونه‌کارهای برندیمو", active: null, body };
}

/* ======================================================================== */
/* About                                                                     */
/* ======================================================================== */
function about() {
  const featured = projects.filter((p) => p.featured);
  const body = `${pageHero({
    title: "برندیمو؛ جایی که یادگیری به راهکار می‌رسد",
    slogan: "درباره ما",
    text: site.description,
    cta: { label: "همکاری با ما", href: "contact.html?topic=collaboration" },
    mainIcon: "sparkle",
    satellites: ["graduation", "code", "mic"],
  })}
<section class="section" aria-label="هویت و مأموریت">
  <div class="container about-intro">
    <article class="statement statement--dark" data-reveal>
      <h2>مأموریت ما</h2>
      <p>توانمندسازی افراد و سازمان‌ها با ترکیب آموزش، تجربه و فناوری؛ از یادگیری مهارت تا ساخت راهکار واقعی.</p>
    </article>
    <article class="statement" data-reveal${ri(1)}>
      <h2>رویکرد ما</h2>
      <p>هر برنامه را با یک پرسش شروع می‌کنیم: خروجی واقعی این کار برای مخاطب چیست؟ آموزش را به پروژه، رویداد را به ارتباط و محتوا را به اثر تبدیل می‌کنیم.</p>
    </article>
  </div>
</section>
<section class="section" aria-labelledby="ab-areas">
  <div class="container">
    ${sectionHeader({ id: "ab-areas", title: "حوزه‌های کاری", accent: true, subtitle: "پنج حوزه، یک زبان مشترک." })}
    <ul class="areas-grid">${areas.map((a, i) => `<li data-reveal${ri(i)}>${areaCard(a)}</li>`).join("")}</ul>
  </div>
</section>
<section class="section" aria-labelledby="ab-history">
  <div class="container">
    ${sectionHeader({ id: "ab-history", title: "تاریخچه و نقاط عطف" })}
    ${emptyState("در انتظار تأیید اطلاعات", "تاریخچه و نقاط عطف برندیمو پس از تأیید مستندات در این بخش منتشر می‌شود.", "clock")}
  </div>
</section>
<section class="section" aria-labelledby="ab-projects">
  <div class="container">
    ${sectionHeader({ id: "ab-projects", title: "پروژه‌ها و تجربه‌های شاخص", more: { href: "projects.html" } })}
    ${grid(featured, projectCard, "grid-2")}
  </div>
</section>
<section class="section" aria-labelledby="ab-partners">
  <div class="container">
    ${sectionHeader({ id: "ab-partners", title: "همکاران و شرکا" })}
    ${emptyState("به‌زودی", "معرفی همکاران و شرکا پس از دریافت مجوز انتشار اضافه می‌شود.", "handshake")}
  </div>
</section>
${ctaBanner()}`;
  return { file: "about.html", title: "درباره ما", description: site.description, active: "about", body };
}

/* ======================================================================== */
/* Contact                                                                   */
/* ======================================================================== */
function contact() {
  const c = site.contact;
  const info = (ic, title, value, placeholder, href) => `<li class="info-card">
  <span class="icon-tile icon-tile--sm">${icon(ic, { size: 24, weight: "duotone" })}</span>
  <div><h3>${title}</h3>${value ? (href ? `<a href="${href}" class="ltr">${value}</a>` : `<p>${value}</p>`) : `<p class="is-placeholder-light">${placeholder}</p>`}</div>
</li>`;
  const body = `${pageHero({
    title: "با ما در ارتباط باشید",
    slogan: "تماس با ما",
    text: "برای همکاری، ثبت‌نام، سفارش پروژه یا هر پرسشی، فرم زیر را تکمیل کنید.",
    mainIcon: "chats",
    satellites: ["envelope", "phone", "send"],
  })}
<section class="section" aria-labelledby="form-title">
  <div class="container contact-grid">
    <form class="contact-form" data-form="contact" novalidate>
      <h2 id="form-title" class="contact-form__title">ثبت درخواست</h2>
      <div class="field">
        <label for="cf-name">نام و نام خانوادگی <span class="req" aria-hidden="true">*</span></label>
        <input class="input" id="cf-name" name="name" required autocomplete="name">
        <p class="field__error" hidden>لطفاً نام خود را وارد کنید.</p>
      </div>
      <div class="field">
        <label for="cf-org">سازمان یا شرکت</label>
        <input class="input" id="cf-org" name="organization" autocomplete="organization">
      </div>
      <div class="field">
        <label for="cf-email">ایمیل <span class="req" aria-hidden="true">*</span></label>
        <input class="input" id="cf-email" name="email" type="email" required dir="ltr" autocomplete="email">
        <p class="field__error" hidden>یک ایمیل معتبر وارد کنید.</p>
      </div>
      <div class="field">
        <label for="cf-phone">شماره تماس</label>
        <input class="input" id="cf-phone" name="phone" type="tel" dir="ltr" autocomplete="tel" inputmode="tel">
      </div>
      <div class="field field--full">
        <label for="cf-topic">موضوع درخواست <span class="req" aria-hidden="true">*</span></label>
        <select class="input" id="cf-topic" name="topic" required>
          <option value="">انتخاب کنید</option>
          ${contactTopics.map((t) => `<option value="${t.value}">${t.label}</option>`).join("")}
        </select>
        <p class="field__error" hidden>موضوع درخواست را انتخاب کنید.</p>
      </div>
      <input type="hidden" name="item" id="cf-item">
      <div class="field field--full">
        <label for="cf-message">پیام <span class="req" aria-hidden="true">*</span></label>
        <textarea class="input" id="cf-message" name="message" required minlength="10"></textarea>
        <p class="field__hint">جزئیات درخواست، زمان‌بندی یا هر توضیحی که به ما کمک می‌کند.</p>
        <p class="field__error" hidden>پیام باید حداقل ۱۰ نویسه باشد.</p>
      </div>
      <div class="field--full contact-form__submit">
        <button type="submit" class="btn btn--primary">${icon("send", { size: 18, weight: "bold", cls: "btn__icon" })}<span>ارسال درخواست</span></button>
      </div>
      <p class="form-msg field--full" role="status" hidden></p>
    </form>
    <aside aria-label="اطلاعات تماس">
      <ul class="contact-info">
        ${info("phone", "تلفن", c.phone, "شماره تماس رسمی پس از تأیید درج می‌شود", c.phone ? `tel:${c.phone}` : null)}
        ${info("envelope", "ایمیل", c.email, "ایمیل رسمی پس از تأیید درج می‌شود", c.email ? `mailto:${c.email}` : null)}
        ${info("pin", "نشانی", c.address, "نشانی پس از تأیید درج می‌شود")}
        <li class="info-card">
          <span class="icon-tile icon-tile--sm">${icon("send", { size: 24, weight: "duotone" })}</span>
          <div><h3>کانال ایتا</h3><a href="${site.eitaa || "media.html#eitaa"}">${site.eitaa ? "عضویت در کانال" : "اطلاعات کانال"}</a></div>
        </li>
      </ul>
    </aside>
  </div>
</section>`;
  return { file: "contact.html", title: "تماس با ما", description: "فرم تماس، درخواست همکاری و سفارش خدمات برندیمو", active: "contact", body };
}

/* ======================================================================== */
/* Detail pages                                                              */
/* ======================================================================== */
const fact = (label, value) => `<div class="fact"><dt>${label}</dt><dd>${value || "به‌زودی اعلام می‌شود"}</dd></div>`;
const checks = (items) => `<ul class="check-list">${items.map((t) => `<li>${icon("check", { size: 18, weight: "fill" })}<span>${t}</span></li>`).join("")}</ul>`;

function detailShell({ crumbs, badgeHtml, title, summary, visual, facts, actions, main, side, sample }) {
  return `<article class="detail">
  <div class="container">
    ${breadcrumbs(crumbs)}
    <div class="detail__head">
      <div>
        ${badgeHtml || ""}
        <h1 class="detail__title">${title}</h1>
        <p class="detail__summary">${summary}</p>
        ${facts ? `<dl class="facts">${facts}</dl>` : ""}
        ${actions ? `<div class="detail__actions">${actions}</div>` : ""}
      </div>
      ${cover(visual)}
    </div>
    ${sample ? `<div class="detail__notice">${sampleNotice()}</div>` : ""}
  </div>
  <div class="section">
    <div class="container detail__body">
      <div>${main}</div>
      <aside>${side}</aside>
    </div>
  </div>
</article>`;
}

function courseDetail(c) {
  const tone = c.status === "open" ? "open" : c.status === "soon" ? "soon" : "muted";
  const reg = `contact.html?topic=course&item=${c.slug}`;
  const ctaLabel = c.status === "open" ? "ثبت‌نام" : c.status === "soon" ? "اعلام علاقه‌مندی" : "درخواست برگزاری مجدد";
  const body = detailShell({
    crumbs: [{ href: "index.html", label: "خانه" }, { href: "education.html", label: "آموزش" }, { label: c.title }],
    badgeHtml: `${badge(courseKind[c.kind], "muted")} ${badge(courseStatus[c.status], tone)}`,
    title: c.title,
    summary: c.summary,
    visual: c.visual,
    facts: fact("مدت", c.duration) + fact("شیوه برگزاری", c.format) + fact("زمان‌بندی", c.schedule) + fact("هزینه", c.fee),
    actions: button(ctaLabel, reg, { iconName: "arrow-left" }),
    sample: c.sample,
    main: `<section class="prose-block"><h2>مخاطبان دوره</h2>${checks(c.audience)}</section>
<section class="prose-block"><h2>پیش‌نیازها</h2>${checks(c.prerequisites)}</section>
<section class="prose-block"><h2>سرفصل‌ها</h2><ol class="syllabus">${c.syllabus.map((s) => `<li>${s}</li>`).join("")}</ol></section>
<section class="prose-block"><h2>مدرس</h2><p>${c.instructor || "معرفی مدرس همراه با اعلام رسمی دوره منتشر می‌شود."}</p></section>
<section class="prose-block"><h2>پرسش‌های متداول</h2><div class="faq">${c.faq
      .map((f) => `<details><summary>${f.q}${icon("caret-down", { size: 18, weight: "bold" })}</summary><p>${f.a}</p></details>`)
      .join("")}</div></section>`,
    side: `<div class="side-card"><h2>وضعیت ثبت‌نام: ${courseStatus[c.status]}</h2><p>برای ثبت‌نام یا دریافت مشاوره، درخواست خود را ثبت کنید. همکاران ما برای هماهنگی تماس می‌گیرند.</p>${button(ctaLabel, reg)}</div>`,
  });
  return { file: urls.course(c), title: c.title, description: c.summary, active: "education", body };
}

function eventDetail(e) {
  const reg = `contact.html?topic=event&item=${e.slug}`;
  const label = e.status === "open" ? "ثبت‌نام در رویداد" : e.status === "upcoming" ? "اطلاع از شروع ثبت‌نام" : "درخواست برگزاری مشابه";
  const body = detailShell({
    crumbs: [{ href: "index.html", label: "خانه" }, { href: "events.html", label: "رویدادها" }, { label: e.title }],
    badgeHtml: badge(eventStatus[e.status], e.status === "past" ? "muted" : "open"),
    title: e.title,
    summary: e.summary,
    visual: e.visual,
    facts: fact("زمان", e.date) + fact("مکان", e.location),
    actions: button(label, reg, { iconName: "arrow-left" }),
    sample: e.sample,
    main: `<section class="prose-block"><h2>برنامه رویداد</h2><ol class="syllabus">${e.agenda.map((s) => `<li>${s}</li>`).join("")}</ol></section>
<section class="prose-block"><h2>سخنرانان</h2>${e.speakers.length ? checks(e.speakers) : emptyState("به‌زودی", "فهرست سخنرانان پس از نهایی شدن اعلام می‌شود.", "users")}</section>
<section class="prose-block"><h2>گزارش پس از رویداد</h2>${e.report ? `<p>${e.report}</p>` : emptyState("پس از برگزاری منتشر می‌شود", "گزارش، تصاویر و ویدئوهای رویداد در همین صفحه قرار می‌گیرد.", "chart")}</section>`,
    side: `<div class="side-card"><h2>${eventStatus[e.status]}</h2><p>برای ثبت‌نام، همکاری در اجرا یا حمایت از رویداد، درخواست خود را ثبت کنید.</p>${button(label, reg)}</div>`,
  });
  return { file: urls.event(e), title: e.title, description: e.summary, active: "events", body };
}

function projectDetail(p) {
  const a = area(p.category);
  const body = detailShell({
    crumbs: [{ href: "index.html", label: "خانه" }, { href: "projects.html", label: "پروژه‌ها" }, { label: p.title }],
    badgeHtml: badge(a.title, "open"),
    title: p.title,
    summary: p.summary,
    visual: p.visual,
    facts: fact("کارفرما", p.client || "قابل انتشار پس از تأیید") + fact("زمان اجرا", p.period),
    actions: p.link ? button(p.link.label, p.link.href, { external: true, iconName: "arrow-up-left" }) : "",
    sample: p.sample,
    main: `<section class="prose-block"><h2>مسئله و هدف</h2><p>${p.problem}</p></section>
<section class="prose-block"><h2>نقش برندیمو</h2><p>${p.role}</p></section>
<section class="prose-block"><h2>خدمات انجام‌شده</h2>${checks(p.services)}</section>
<section class="prose-block"><h2>خروجی‌ها</h2>${checks(p.deliverables)}</section>
<section class="prose-block"><h2>دستاوردها</h2>${p.outcomes && p.outcomes.length ? checks(p.outcomes) : emptyState("در انتظار مستندات", "دستاوردها فقط پس از تأیید و با مستندات منتشر می‌شوند.", "chart")}</section>
<section class="prose-block"><h2>گالری</h2>${
      p.gallery && p.gallery.length ? `<div class="gallery">${p.gallery.map((g) => cover(g)).join("")}</div>` : emptyState("تصاویر پروژه به‌زودی", "تصاویر واقعی یا موکاپ پروژه پس از دریافت اضافه می‌شود.", "monitor-play")
    }</section>`,
    side: `<div class="side-card"><h2>پروژه مشابهی دارید؟</h2><p>نیاز خود را با ما در میان بگذارید تا مسیر اجرا را با هم طراحی کنیم.</p>${button("درخواست پروژه", `contact.html?topic=${p.category === "content" ? "content" : "project"}&item=${p.slug}`)}</div>`,
  });
  return { file: urls.project(p), title: p.title, description: p.summary, active: p.category, body };
}

function mediaDetail(m) {
  const k = mediaKind[m.kind];
  const player = m.audioSrc
    ? `<audio controls preload="none" src="${m.audioSrc}" class="audio"></audio>`
    : m.url
      ? button(k.action, m.url, { external: true, iconName: "play" })
      : emptyState("به‌زودی منتشر می‌شود", "لینک پخش یا مطالعه پس از انتشار در همین صفحه قرار می‌گیرد.", m.kind === "article" ? "article" : "play");
  const body = detailShell({
    crumbs: [{ href: "index.html", label: "خانه" }, { href: "media.html", label: "رسانه" }, { label: m.series ? `${m.title}، ${m.series}` : m.title }],
    badgeHtml: badge(k.label, "open"),
    title: m.series ? `${m.title}، ${m.series}` : m.title,
    summary: m.summary,
    visual: m.visual,
    facts: fact("مدت", m.duration ? `<span class="ltr">${m.duration}</span>` : m.kind === "article" ? "مقاله" : null) + fact("تاریخ انتشار", m.publishedAt),
    sample: m.sample,
    main: `<section class="prose-block"><h2>${k.action}</h2>${player}</section>
<section class="prose-block"><h2>درباره این ${k.label}</h2><p>${m.summary}</p></section>`,
    side: `<div class="side-card" id="eitaa-side"><h2>اپیزودهای تازه را از دست ندهید</h2><p>اطلاع‌رسانی رسانه برندیمو از کانال رسمی ایتا انجام می‌شود.</p>${button("کانال ایتا", site.eitaa || "media.html#eitaa", { variant: "secondary", external: !!site.eitaa })}</div>`,
  });
  return { file: urls.media(m), title: m.title, description: m.summary, active: "media", body };
}

/* ======================================================================== */
/* 404                                                                       */
/* ======================================================================== */
function notFound() {
  const body = `<section class="detail">
  <div class="container">
    <div class="not-found">
      <p class="not-found__code ltr">404</p>
      <h1>این صفحه پیدا نشد</h1>
      <p>ممکن است آدرس تغییر کرده باشد. از صفحه اصلی یا جست‌وجو استفاده کنید.</p>
      ${button("بازگشت به صفحه اصلی", "index.html", { iconName: "arrow-left" })}
    </div>
  </div>
</section>`;
  return { file: "404.html", title: "صفحه پیدا نشد", active: null, body };
}

export function allPages() {
  return [
    home(),
    education(),
    eventsPage(),
    servicePage("programming", "programming.html", {
      title: "پروژه بعدی را با هم بسازیم",
      text: "نیاز خود را بنویسید تا برای تحلیل و برآورد اولیه با شما تماس بگیریم.",
      cta: { label: "درخواست پروژه", href: "contact.html?topic=project" },
    }),
    servicePage("content", "content-production.html", {
      title: "روایت برندتان را بسازیم",
      text: "برای سفارش طراحی، ویدئو یا موشن‌گرافیک، درخواست خود را ثبت کنید.",
      cta: { label: "سفارش محتوا", href: "contact.html?topic=content" },
    }),
    mediaPage(),
    about(),
    contact(),
    projectsPage(),
    ...courses.map(courseDetail),
    ...events.map(eventDetail),
    ...projects.map(projectDetail),
    ...mediaItems.map(mediaDetail),
    notFound(),
  ];
}
