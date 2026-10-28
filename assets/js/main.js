/* Brandimo template: interactions (vanilla JS, no dependencies). */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header: more opaque once content scrolls under it ---------------- */
  var header = document.querySelector(".site-header");
  var sentinel = document.querySelector(".header-sentinel");
  if (header && sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---- Mobile menu --------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(menu.hidden);
    });
    document.querySelectorAll("[data-menu-close]").forEach(function (b) {
      b.addEventListener("click", function () {
        setMenu(false);
        toggle.focus();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1141px)").addEventListener("change", function (m) {
      if (m.matches) setMenu(false);
    });
  }

  /* ---- Search dialog -------------------------------------------------------- */
  var dialog = document.querySelector("[data-search-dialog]");
  if (dialog && typeof dialog.showModal === "function") {
    var input = dialog.querySelector("input");
    var out = dialog.querySelector("[data-search-results]");
    var index = window.BRANDIMO_SEARCH || [];
    var hint = out.innerHTML;
    var norm = function (s) {
      return String(s).replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/‌/g, " ").toLowerCase();
    };
    var escapeHtml = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    };
    var render = function () {
      var q = norm(input.value.trim());
      if (!q) {
        out.innerHTML = hint;
        return;
      }
      var hits = index
        .filter(function (e) {
          return norm(e.title + " " + e.text + " " + e.type).indexOf(q) !== -1;
        })
        .slice(0, 8);
      out.innerHTML = hits.length
        ? '<ul class="search-dialog__results">' +
          hits
            .map(function (r) {
              return (
                '<li><a class="search-result" href="' + r.href + '"><span class="search-result__type">' + escapeHtml(r.type) +
                '</span><span class="search-result__title">' + escapeHtml(r.title) + '</span><span class="search-result__text">' +
                escapeHtml(r.text) + "</span></a></li>"
              );
            })
            .join("") +
          "</ul>"
        : '<p class="search-dialog__empty">نتیجه‌ای برای «' + escapeHtml(input.value.trim()) + "» پیدا نشد.</p>";
    };
    input.addEventListener("input", render);
    document.querySelectorAll("[data-search-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        dialog.showModal();
        input.focus();
      });
    });
    dialog.querySelector("[data-search-close]").addEventListener("click", function () {
      dialog.close();
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    /* A search field eats the first Escape to clear itself; close in one press. */
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        dialog.close();
      }
    });
  }

  /* ---- Featured events carousel (manual only, no autoplay) -------------- */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var slides = root.querySelectorAll("[data-slide]");
    var dots = root.querySelectorAll("[data-dot]");
    if (slides.length < 2) return;
    var i = 0;
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.hidden = k !== i;
      });
      dots.forEach(function (d, k) {
        if (k === i) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
    };
    root.querySelector("[data-prev]").addEventListener("click", function () {
      show(i - 1);
    });
    root.querySelector("[data-next]").addEventListener("click", function () {
      show(i + 1);
    });
    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        show(Number(d.getAttribute("data-dot")));
      });
    });
  });

  /* ---- Filters (projects archive, media archive) ---------------------------- */
  var params = new URLSearchParams(window.location.search);
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var name = group.getAttribute("data-filter-group");
    var listEl = document.querySelector('[data-filter-list="' + name + '"]');
    if (!listEl) return;
    var items = listEl.querySelectorAll(":scope > li");
    var empty = listEl.parentElement.querySelector(".filter-empty");
    var buttons = group.querySelectorAll("[data-filter]");
    var apply = function (value) {
      var shown = 0;
      items.forEach(function (li) {
        var cats = (li.getAttribute("data-category") || "").split(" ");
        var ok = value === "all" || cats.indexOf(value) !== -1;
        li.hidden = !ok;
        if (ok) shown++;
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === value));
      });
      if (empty) empty.hidden = shown !== 0;
    };
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-filter"));
      });
    });
    var initial = params.get("type");
    if (initial && group.querySelector('[data-filter="' + initial + '"]')) apply(initial);
  });

  /* ---- Contact form: prefill topic from ?topic=&item= -------------------- */
  var topic = document.getElementById("cf-topic");
  if (topic && params.get("topic")) {
    var opt = topic.querySelector('option[value="' + params.get("topic") + '"]');
    if (opt) topic.value = params.get("topic");
  }
  var item = document.getElementById("cf-item");
  if (item && params.get("item")) item.value = params.get("item");

  /* ---- Forms: validation + submit ----------------------------------------- */
  var messages = {
    success: "درخواست شما ثبت شد. همکاران ما به‌زودی با شما تماس می‌گیرند.",
    error: "ارسال انجام نشد. لطفاً اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.",
    unconfigured: "ارسال فرم هنوز به مقصد نهایی متصل نشده است. پس از راه‌اندازی، درخواست‌ها مستقیم به تیم برندیمو می‌رسد.",
    invalid: "لطفاً موارد مشخص‌شده را تکمیل کنید.",
  };
  var config = window.BRANDIMO_CONFIG || {};

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var msg = form.querySelector(".form-msg");
    var submit = form.querySelector('[type="submit"]');
    var say = function (state) {
      if (!msg) return;
      msg.hidden = false;
      msg.className = "form-msg form-msg--" + state + (msg.classList.contains("field--full") ? " field--full" : "");
      msg.textContent = messages[state];
    };
    var checkField = function (el) {
      var err = el.parentElement.querySelector(".field__error");
      var ok = el.checkValidity();
      el.setAttribute("aria-invalid", String(!ok));
      if (err) {
        err.hidden = ok;
        if (!err.id) err.id = el.id + "-error";
        if (ok) el.removeAttribute("aria-describedby");
        else el.setAttribute("aria-describedby", err.id);
      }
      return ok;
    };
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("blur", function () {
        if (el.value) checkField(el);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll("input:not([type=hidden]), select, textarea");
      var firstBad = null;
      fields.forEach(function (el) {
        if (!checkField(el) && !firstBad) firstBad = el;
      });
      if (firstBad) {
        say("invalid");
        firstBad.focus();
        return;
      }
      if (!config.formEndpoint) {
        say("unconfigured");
        return;
      }
      submit.disabled = true;
      submit.classList.add("is-loading");
      var data = { form: form.getAttribute("data-form") };
      new FormData(form).forEach(function (v, k) {
        data[k] = v;
      });
      fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          say("success");
        })
        .catch(function () {
          say("error");
        })
        .finally(function () {
          submit.disabled = false;
          submit.classList.remove("is-loading");
        });
    });
  });

  /* ---- Footer year (Persian calendar) ----------------------------------------- */
  try {
    var y = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(new Date());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = y.replace(/[^۰-۹]/g, "");
    });
  } catch (err) {}

  /* ---- Scroll reveal: content is visible without JS; hiding starts here --- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    doc.classList.add("js");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      io.observe(el);
    });
  }
})();
