(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const header = document.querySelector("[data-header]");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  const filterToggle = document.querySelector("[data-filter-toggle]");
  const facetsPanel = document.querySelector("[data-facets-panel]");

  if (filterToggle && facetsPanel) {
    filterToggle.addEventListener("click", () => {
      const isOpen = facetsPanel.classList.toggle("is-open");
      filterToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".category-tile, .product-card, .lookbook-frame, .lookbook-shot")
    .forEach((node) => observer.observe(node));
})();
