(function () {
  "use strict";

  /* ---------- Language toggle ---------- */

  const STORAGE_KEY = "portfolio-lang";
  const langBtn = document.getElementById("lang-toggle");
  const i18n = document.querySelectorAll("[data-id][data-en]");

  function setLang(lang) {
    document.documentElement.lang = lang;
    i18n.forEach((el) => {
      el.innerHTML = el.getAttribute(lang === "id" ? "data-id" : "data-en");
    });
    langBtn.textContent = lang === "id" ? "EN" : "ID";
    localStorage.setItem(STORAGE_KEY, lang);
  }

  let current = localStorage.getItem(STORAGE_KEY);
  if (current !== "id" && current !== "en") {
    current = navigator.language.startsWith("id") ? "id" : "en";
  }
  setLang(current);

  langBtn.addEventListener("click", () => {
    setLang(document.documentElement.lang === "id" ? "en" : "id");
  });

  /* ---------- Mobile menu ---------- */

  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");

  menuToggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  sidebar.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      sidebar.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Active nav link ---------- */

  const navLinks = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Scroll reveal ---------- */

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
})();