/* ==========================================================================
   Brandimo content
   Every course, event, project and media item is written ONCE here and
   rendered wherever it belongs (home, activity pages, archive, search).
   Entries marked `sample: true` are placeholders from the approved concept
   and must be replaced with verified information before launch.
   This file is the contract a future CMS/API must return.
   ========================================================================== */

/* ---- Site settings ------------------------------------------------------
   Every `null` waits on a verified value; the UI shows a clear placeholder
   until it is filled. */
export const site = {
  name: "برندیمو",
  latinName: "Brandimo",
  tagline: "یادگیری، نوآوری، خلق راهکار",
  description:
    "برندیمو مجموعه‌ای در حوزه آموزش، رویداد، برنامه‌نویسی، تولید محتوا و رسانه است؛ همراه افراد و سازمان‌ها در مسیر آینده دیجیتال.",
  url: "https://brandimo.ir",
  contact: { phone: null, email: null, address: null },
  eitaa: null,
  socials: [
    { key: "linkedin", label: "لینکدین", icon: "linkedin", href: null },
    { key: "instagram", label: "اینستاگرام", icon: "instagram", href: null },
    { key: "x", label: "ایکس", icon: "x", href: null },
    { key: "telegram", label: "تلگرام", icon: "telegram", href: null },
  ],
};

export const nav = [
  { href: "index.html", label: "صفحه اصلی", key: "home" },
  { href: "education.html", label: "آموزش", key: "education" },
  { href: "events.html", label: "رویدادها", key: "events" },
  { href: "programming.html", label: "برنامه‌نویسی", key: "programming" },
  { href: "content-production.html", label: "تولید محتوا", key: "content" },
  { href: "media.html", label: "رسانه", key: "media" },
  { href: "about.html", label: "درباره ما", key: "about" },
  { href: "contact.html", label: "تماس با ما", key: "contact" },
];

export const contactTopics = [
  { value: "collaboration", label: "همکاری سازمانی" },
  { value: "course", label: "ثبت‌نام یا پرسش درباره دوره" },
  { value: "event", label: "ثبت‌نام یا اجرای رویداد" },
  { value: "project", label: "درخواست پروژه برنامه‌نویسی" },
  { value: "content", label: "سفارش تولید محتوا" },
  { value: "media", label: "رسانه و پادکست" },
  { value: "other", label: "سایر موارد" },
];

/* ---- Activity areas ------------------------------------------------------ */
export const areas = [
  {
    key: "education",
    href: "education.html",
    title: "آموزش",
    short: "دوره‌ها، بوت‌کمپ‌ها و کارگاه‌های آموزشی",
    icon: "graduation",
    slogan: "از یادگیری تا مهارت واقعی",
    heroTitle: "آموزش مهارت‌محور برای مسیر حرفه‌ای",
    heroText: "دوره‌ها و بوت‌کمپ‌هایی که یادگیری را به تجربه و پروژه واقعی می‌رسانند.",
    cta: { label: "مشاهده دوره‌ها", href: "#programs" },
    features: [
      { icon: "book", title: "یادگیری", text: "سرفصل‌های به‌روز و ساختارمند" },
      { icon: "target", title: "مهارت", text: "تمرین هدفمند روی نیاز بازار کار" },
      { icon: "users", title: "تجربه", text: "یادگیری کنار منتور و هم‌گروهی‌ها" },
      { icon: "rocket", title: "پروژه", text: "خروجی واقعی برای نمونه‌کار شما" },
    ],
  },
  {
    key: "events",
    href: "events.html",
    title: "رویدادها",
    short: "نشست‌ها، همایش‌ها و برنامه‌های تخصصی",
    icon: "calendar",
    slogan: "جایی برای دیدن، شنیدن و ساختن",
    heroTitle: "رویدادهایی که آدم‌ها و ایده‌ها را به هم می‌رسانند",
    heroText: "طراحی، برنامه‌ریزی و اجرای نشست‌ها و همایش‌های تخصصی برای افراد و سازمان‌ها.",
    cta: { label: "رویدادهای پیش‌رو", href: "#upcoming" },
    features: [
      { icon: "compass", title: "برنامه‌ریزی", text: "از ایده و هدف تا جدول اجرایی" },
      { icon: "presentation", title: "اجرا", text: "مدیریت صحنه، سخنران و مخاطب" },
      { icon: "video", title: "پوشش", text: "عکس، ویدئو و پوشش رسانه‌ای" },
      { icon: "chart", title: "گزارش", text: "جمع‌بندی و گزارش پس از رویداد" },
    ],
  },
  {
    key: "programming",
    href: "programming.html",
    title: "برنامه‌نویسی",
    short: "توسعه وب، نرم‌افزار و راهکارهای دیجیتال",
    icon: "code",
    slogan: "از مسئله تا محصول",
    heroTitle: "راهکار نرم‌افزاری برای مسئله واقعی شما",
    heroText: "طراحی و توسعه وب‌سایت، نرم‌افزار و ابزارهای دیجیتال متناسب با نیاز کسب‌وکار.",
    cta: { label: "درخواست پروژه", href: "contact.html?topic=project" },
    features: [
      { icon: "lightbulb", title: "تحلیل", text: "شناخت نیاز و تعریف دقیق مسئله" },
      { icon: "pen", title: "طراحی", text: "تجربه کاربری و رابط کاربری" },
      { icon: "code", title: "توسعه", text: "پیاده‌سازی پایدار و قابل توسعه" },
      { icon: "shield", title: "پشتیبانی", text: "نگهداری و بهبود پس از تحویل" },
    ],
    services: [
      { icon: "cube", title: "وب‌سایت سازمانی", text: "معرفی حرفه‌ای برند با مدیریت محتوای ساده" },
      { icon: "stack", title: "سامانه تحت وب", text: "پنل‌ها و ابزارهای داخلی متناسب با فرایندها" },
      { icon: "mobile", title: "اپلیکیشن", text: "تجربه موبایلی برای کاربران و مشتریان" },
      { icon: "wrench", title: "مشاوره فنی", text: "انتخاب زیرساخت و نقشه راه توسعه" },
    ],
  },
  {
    key: "content",
    href: "content-production.html",
    title: "تولید محتوا",
    short: "متن، تصویر، ویدئو و موشن‌گرافیک",
    icon: "film",
    slogan: "روایت برند، دقیق و دیدنی",
    heroTitle: "محتوایی که پیام برند شما را درست می‌رساند",
    heroText: "تولید متن، تصویر، ویدئو و موشن‌گرافیک از ایده تا انتشار.",
    cta: { label: "سفارش محتوا", href: "contact.html?topic=content" },
    features: [
      { icon: "lightbulb", title: "ایده", text: "کشف زاویه روایت مناسب برند" },
      { icon: "pen", title: "نگارش", text: "سناریو، متن و پیام‌های کلیدی" },
      { icon: "video", title: "تصویر", text: "عکاسی، فیلم‌برداری و طراحی" },
      { icon: "megaphone", title: "انتشار", text: "آماده‌سازی برای هر کانال" },
    ],
    services: [
      { icon: "brush", title: "طراحی گرافیک", text: "هویت بصری، پوستر و محتوای شبکه‌های اجتماعی" },
      { icon: "video", title: "ویدئو", text: "ویدئوی معرفی، آموزشی و گزارشی" },
      { icon: "film", title: "موشن‌گرافیک", text: "توضیح ساده مفاهیم پیچیده با حرکت" },
      { icon: "pen", title: "تولید متن", text: "متن وب‌سایت، مقاله و سناریو" },
    ],
  },
  {
    key: "media",
    href: "media.html",
    title: "رسانه",
    short: "پادکست، ویدئو و محتوای تخصصی",
    icon: "mic",
    slogan: "گفت‌وگو درباره یادگیری و آینده",
    heroTitle: "رسانه برندیمو؛ شنیدنی، دیدنی، خواندنی",
    heroText: "پادکست‌ها، گفت‌وگوها و محتوای تخصصی درباره فناوری، یادگیری و کار.",
    cta: { label: "تازه‌ترین اپیزودها", href: "#latest" },
    features: [
      { icon: "headphones", title: "پادکست", text: "اپیزودهای گفت‌وگومحور و آموزشی" },
      { icon: "monitor-play", title: "ویدئو", text: "گفت‌وگو و محتوای تصویری" },
      { icon: "article", title: "مقاله", text: "یادداشت‌ها و محتوای تخصصی" },
      { icon: "broadcast", title: "کانال", text: "اطلاع‌رسانی رسمی در ایتا" },
    ],
  },
];

export const area = (key) => areas.find((a) => a.key === key);

/* ---- Courses (SAMPLE) ------------------------------------------------------ */
const sharedFaq = [
  {
    q: "ثبت‌نام چطور انجام می‌شود؟",
    a: "درخواست خود را از طریق فرم ثبت‌نام ارسال کنید. تیم برندیمو برای هماهنگی و تکمیل ثبت‌نام با شما تماس می‌گیرد.",
  },
  {
    q: "آیا گواهی پایان دوره ارائه می‌شود؟",
    a: "جزئیات گواهی و شرایط دریافت آن همراه با اعلام رسمی برنامه منتشر می‌شود.",
  },
];

export const courseStatus = { open: "در حال ثبت‌نام", soon: "به‌زودی", archived: "برگزار شده" };
export const courseKind = { bootcamp: "بوت‌کمپ", course: "دوره", workshop: "کارگاه" };

export const courses = [
  {
    slug: "web-programming-bootcamp",
    title: "بوت‌کمپ برنامه‌نویسی وب",
    kind: "bootcamp",
    summary: "مسیر فشرده یادگیری توسعه وب، از مبانی تا ساخت و انتشار یک پروژه کامل.",
    status: "open",
    duration: "۳ ماه",
    format: "حضوری و آنلاین",
    audience: ["علاقه‌مندان شروع مسیر برنامه‌نویسی", "دانشجویان رشته‌های فنی", "طراحانی که می‌خواهند وارد توسعه شوند"],
    prerequisites: ["آشنایی مقدماتی با کار با رایانه", "زمان کافی برای تمرین هفتگی"],
    syllabus: ["مبانی وب و ابزارهای توسعه", "HTML و CSS واکنش‌گرا", "جاوااسکریپت کاربردی", "کار با فریم‌ورک فرانت‌اند", "ارتباط با API و داده", "پروژه نهایی و انتشار"],
    faq: sharedFaq,
    visual: { icon: "code", tone: "navy", alt: "تصویر شاخص بوت‌کمپ برنامه‌نویسی وب" },
    featured: true,
    sample: true,
  },
  {
    slug: "artificial-intelligence-course",
    title: "دوره هوش مصنوعی",
    kind: "course",
    summary: "آشنایی کاربردی با مفاهیم و ابزارهای هوش مصنوعی و به‌کارگیری آن در پروژه‌های واقعی.",
    status: "open",
    duration: "۲ ماه",
    format: "آنلاین",
    audience: ["برنامه‌نویسان", "تحلیلگران داده", "مدیران محصول علاقه‌مند به هوش مصنوعی"],
    prerequisites: ["آشنایی مقدماتی با یک زبان برنامه‌نویسی"],
    syllabus: ["مفاهیم پایه یادگیری ماشین", "کار با داده", "مدل‌های زبانی و کاربردهای آن", "ساخت یک پروژه کاربردی"],
    faq: sharedFaq,
    visual: { icon: "cube", tone: "blue", alt: "تصویر شاخص دوره هوش مصنوعی" },
    featured: true,
    sample: true,
  },
  {
    slug: "product-design-bootcamp",
    title: "بوت‌کمپ طراحی محصول",
    kind: "bootcamp",
    summary: "یادگیری فرایند طراحی محصول دیجیتال، از پژوهش کاربر تا نمونه اولیه قابل آزمون.",
    status: "soon",
    duration: "۳ ماه",
    format: "حضوری",
    audience: ["طراحان گرافیک", "علاقه‌مندان طراحی تجربه کاربری", "مدیران محصول"],
    prerequisites: ["بدون پیش‌نیاز تخصصی"],
    syllabus: ["تفکر طراحی", "پژوهش کاربر", "معماری اطلاعات", "طراحی رابط کاربری", "نمونه‌سازی و آزمون"],
    faq: sharedFaq,
    visual: { icon: "pen", tone: "sky", alt: "تصویر شاخص بوت‌کمپ طراحی محصول" },
    featured: true,
    sample: true,
  },
  {
    slug: "content-creation-workshop",
    title: "کارگاه تولید محتوای دیجیتال",
    kind: "workshop",
    summary: "کارگاهی عملی برای برنامه‌ریزی و تولید محتوای شبکه‌های اجتماعی.",
    status: "archived",
    format: "حضوری",
    audience: ["کارشناسان بازاریابی", "تولیدکنندگان محتوا"],
    prerequisites: ["بدون پیش‌نیاز"],
    syllabus: ["برنامه‌ریزی محتوا", "نگارش برای شبکه‌های اجتماعی", "تصویر و ویدئوی کوتاه"],
    faq: sharedFaq,
    visual: { icon: "film", tone: "night", alt: "تصویر شاخص کارگاه تولید محتوا" },
    sample: true,
  },
];

/* ---- Events (SAMPLE) --------------------------------------------------------
   Dates, venues and speakers stay null until confirmed. */
export const eventStatus = { open: "در حال ثبت‌نام", upcoming: "به‌زودی", past: "برگزار شده" };

export const events = [
  {
    slug: "talent-day",
    title: "رویداد تلنت‌دی",
    latinName: "TALENT DAY",
    summary: "آشنایی با فرصت‌های شغلی و شبکه‌سازی میان استعدادها و سازمان‌ها.",
    status: "open",
    date: null,
    location: null,
    speakers: [],
    agenda: ["معرفی سازمان‌های حاضر", "پنل گفت‌وگو درباره مسیر شغلی", "جلسات شبکه‌سازی", "دیدار با کارفرمایان"],
    visual: { icon: "users", tone: "night", alt: "پوستر رویداد تلنت‌دی" },
    featured: true,
    sample: true,
  },
  {
    slug: "digital-future-meetup",
    title: "نشست آینده دیجیتال",
    latinName: "DIGITAL FUTURE",
    summary: "گفت‌وگو با فعالان فناوری درباره مهارت‌های موردنیاز سال‌های پیش‌رو.",
    status: "upcoming",
    date: null,
    location: null,
    speakers: [],
    agenda: ["سخنرانی‌های کوتاه", "میزگرد تخصصی", "پرسش و پاسخ"],
    visual: { icon: "presentation", tone: "blue", alt: "پوستر نشست آینده دیجیتال" },
    featured: true,
    sample: true,
  },
  {
    slug: "creators-meetup",
    title: "دورهمی تولیدکنندگان محتوا",
    latinName: "CREATORS MEETUP",
    summary: "نشستی برای تبادل تجربه میان تولیدکنندگان محتوای دیجیتال.",
    status: "past",
    date: null,
    location: null,
    speakers: [],
    agenda: ["ارائه تجربه‌ها", "کارگاه کوتاه", "شبکه‌سازی"],
    visual: { icon: "megaphone", tone: "navy", alt: "تصویر دورهمی تولیدکنندگان محتوا" },
    sample: true,
  },
];

/* ---- Projects / portfolio (SAMPLE) -----------------------------------------
   `category` + `alsoOn` decide every page a project appears on; `featured`
   puts it on the homepage. Client names only when disclosure is permitted. */
export const projects = [
  {
    slug: "arian-lab-website",
    title: "سایت آرین لب",
    category: "programming",
    alsoOn: ["content"],
    summary: "طراحی و توسعه وب‌سایت شرکتی آرین لب با تمرکز بر تجربه کاربری و سئو.",
    problem: "نیاز به وب‌سایتی که خدمات مجموعه را شفاف معرفی کند و مدیریت محتوای آن ساده باشد.",
    role: "تحلیل نیاز، طراحی رابط کاربری، توسعه و راه‌اندازی.",
    services: ["طراحی سایت", "تحلیل نیاز", "طراحی تجربه و رابط کاربری", "توسعه فرانت‌اند و بک‌اند", "سئوی پایه"],
    deliverables: ["وب‌سایت واکنش‌گرا", "پنل مدیریت محتوا", "راهنمای استفاده"],
    visual: { icon: "monitor-play", tone: "blue", alt: "نمای وب‌سایت آرین لب" },
    featured: true,
    sample: true,
  },
  {
    slug: "learning-platform-mvp",
    title: "نسخه اولیه سامانه یادگیری",
    category: "programming",
    alsoOn: ["education"],
    summary: "طراحی و توسعه نسخه اولیه سامانه مدیریت دوره و ثبت‌نام آنلاین.",
    problem: "مدیریت دستی ثبت‌نام‌ها و اطلاع‌رسانی دوره‌ها زمان‌بر و پرخطا بود.",
    role: "طراحی فرایند، توسعه سامانه و آموزش تیم.",
    services: ["توسعه سامانه", "طراحی فرایند", "آموزش کاربران"],
    deliverables: ["سامانه ثبت‌نام", "داشبورد مدیریت دوره‌ها"],
    visual: { icon: "stack", tone: "navy", alt: "نمای سامانه یادگیری" },
    sample: true,
  },
  {
    slug: "bootcamp-final-showcase",
    title: "نمایشگاه پروژه‌های پایانی بوت‌کمپ",
    category: "education",
    alsoOn: ["events"],
    summary: "ارائه پروژه‌های پایانی شرکت‌کنندگان بوت‌کمپ در حضور داوران و مخاطبان.",
    problem: "شرکت‌کنندگان به فرصتی برای ارائه خروجی‌های خود به جامعه حرفه‌ای نیاز داشتند.",
    role: "برنامه‌ریزی آموزشی، منتورینگ پروژه‌ها و برگزاری روز ارائه.",
    services: ["منتورینگ", "برگزاری رویداد", "مستندسازی"],
    deliverables: ["ارائه پروژه‌های پایانی", "گزارش تصویری"],
    visual: { icon: "graduation", tone: "sky", alt: "ارائه پروژه‌های بوت‌کمپ" },
    sample: true,
  },
  {
    slug: "brand-motion-series",
    title: "مجموعه موشن‌گرافیک معرفی خدمات",
    category: "content",
    summary: "تولید مجموعه موشن‌گرافیک کوتاه برای معرفی خدمات یک مجموعه فناوری.",
    problem: "توضیح خدمات فنی برای مخاطب عمومی دشوار بود.",
    role: "سناریونویسی، طراحی و انیمیشن.",
    services: ["موشن‌گرافیک", "سناریونویسی", "طراحی کاراکتر و صحنه", "انیمیشن و صداگذاری"],
    deliverables: ["ویدئوهای کوتاه برای شبکه‌های اجتماعی"],
    visual: { icon: "film", tone: "night", alt: "فریمی از موشن‌گرافیک معرفی خدمات" },
    featured: true,
    sample: true,
  },
  {
    slug: "tech-summit-coverage",
    title: "پوشش رسانه‌ای همایش فناوری",
    category: "events",
    alsoOn: ["media", "content"],
    summary: "مستندسازی تصویری و تولید ویدئوی گزارشی یک همایش تخصصی.",
    problem: "نیاز به روایت تصویری رویداد برای انتشار پس از برگزاری.",
    role: "عکاسی، فیلم‌برداری، تدوین و تولید گزارش.",
    services: ["پوشش رسانه‌ای", "عکاسی", "فیلم‌برداری", "تدوین"],
    deliverables: ["گزارش ویدئویی", "آلبوم تصاویر"],
    visual: { icon: "video", tone: "navy", alt: "پوشش تصویری همایش فناوری" },
    sample: true,
  },
];

export const projectsFor = (key) => projects.filter((p) => p.category === key || (p.alsoOn || []).includes(key));

/* ---- Media (SAMPLE) ----------------------------------------------------------
   Add `url` (external player/page) or `audioSrc` when an episode is published. */
export const mediaKind = {
  podcast: { label: "پادکست", action: "گوش کنید" },
  video: { label: "ویدئو", action: "تماشا کنید" },
  article: { label: "مقاله", action: "مطالعه کنید" },
};

export const mediaItems = [
  {
    slug: "podcast-masir-ep-12",
    kind: "podcast",
    title: "پادکست مسیر",
    series: "اپیزود ۱۲",
    summary: "آینده کار در عصر هوش مصنوعی.",
    duration: "۳۲:۱۵",
    url: null,
    audioSrc: null,
    visual: { icon: "mic", tone: "navy", alt: "کاور پادکست مسیر" },
    featured: true,
    sample: true,
  },
  {
    slug: "conversation-learning-paths",
    kind: "video",
    title: "گفت‌وگو درباره مسیرهای یادگیری",
    summary: "گفت‌وگویی کوتاه درباره انتخاب مسیر یادگیری در حوزه فناوری.",
    url: null,
    visual: { icon: "monitor-play", tone: "blue", alt: "تصویر ویدئوی گفت‌وگو" },
    featured: true,
    sample: true,
  },
  {
    slug: "article-skills-roadmap",
    kind: "article",
    title: "نقشه راه مهارت‌های دیجیتال",
    summary: "یادداشتی درباره مهارت‌های پایه برای ورود به بازار کار دیجیتال.",
    url: null,
    visual: { icon: "article", tone: "sky", alt: "تصویر مقاله نقشه راه مهارت‌ها" },
    featured: true,
    sample: true,
  },
  {
    slug: "podcast-masir-ep-11",
    kind: "podcast",
    title: "پادکست مسیر",
    series: "اپیزود ۱۱",
    summary: "از ایده تا محصول؛ تجربه ساختن در تیم‌های کوچک.",
    url: null,
    visual: { icon: "headphones", tone: "night", alt: "کاور اپیزود یازدهم پادکست مسیر" },
    sample: true,
  },
];

/* ---- URL helpers (flat, readable file names) --------------------------------- */
export const urls = {
  course: (c) => `course-${c.slug}.html`,
  event: (e) => `event-${e.slug}.html`,
  project: (p) => `project-${p.slug}.html`,
  media: (m) => `media-${m.slug}.html`,
};

/* ---- "Latest" strip: resolved from collections, never duplicated ---------- */
export function getAnnouncements() {
  const course = courses.find((c) => c.featured && c.status !== "archived");
  const event = events.find((e) => e.featured && e.status !== "past");
  const episode = mediaItems.find((m) => m.kind === "podcast");
  const list = [{ label: "کانال ایتا", title: "اطلاع‌رسانی رسمی", icon: "send", href: site.eitaa || "media.html#eitaa", isNew: true }];
  if (episode) list.push({ label: "پادکست تازه", title: `${episode.title} ${episode.series || ""}`, icon: "mic", href: urls.media(episode), isNew: true });
  if (event) list.push({ label: "رویداد پیش‌رو", title: event.title, icon: "calendar", href: urls.event(event), isNew: true });
  if (course) list.push({ label: "دوره جدید", title: course.title, icon: "graduation", href: urls.course(course), isNew: true });
  return list;
}

export function getSearchIndex() {
  return [
    ...areas.map((a) => ({ title: a.title, type: "حوزه فعالیت", href: a.href, text: a.short })),
    ...courses.map((c) => ({ title: c.title, type: "آموزش", href: urls.course(c), text: c.summary })),
    ...events.map((e) => ({ title: e.title, type: "رویداد", href: urls.event(e), text: e.summary })),
    ...projects.map((p) => ({ title: p.title, type: "پروژه", href: urls.project(p), text: p.summary })),
    ...mediaItems.map((m) => ({ title: m.series ? `${m.title} ${m.series}` : m.title, type: "رسانه", href: urls.media(m), text: m.summary })),
    { title: "درباره ما", type: "صفحه", href: "about.html", text: "هویت، مأموریت و رویکرد برندیمو" },
    { title: "تماس با ما", type: "صفحه", href: "contact.html", text: "فرم تماس، همکاری و سفارش" },
  ];
}
