(function () {
  const STORAGE_KEY = "portfolio-lang";
  const btn = document.getElementById("lang-toggle");
  const i18n = document.querySelectorAll("[data-id][data-en]");

  function setLang(lang) {
    document.documentElement.lang = lang;
    i18n.forEach((el) => {
      el.innerHTML = el.getAttribute(lang === "id" ? "data-id" : "data-en");
    });
    btn.textContent = lang === "id" ? "EN" : "ID";
    document.title =
      lang === "id"
        ? "I Gede Rizal Maulana — Backend & Security"
        : "I Gede Rizal Maulana — Backend & Security Portfolio";
    localStorage.setItem(STORAGE_KEY, lang);
  }

  let current = localStorage.getItem(STORAGE_KEY);
  if (current !== "id" && current !== "en") {
    current = navigator.language.startsWith("id") ? "id" : "en";
  }
  setLang(current);

  btn.addEventListener("click", () => {
    setLang(document.documentElement.lang === "id" ? "en" : "id");
  });
})();
