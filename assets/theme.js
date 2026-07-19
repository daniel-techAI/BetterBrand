(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const header = document.querySelector("[data-header]");

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const filterToggle = document.querySelector("[data-filter-toggle]");
  const facetsPanel = document.querySelector("[data-facets-panel]");

  if (filterToggle && facetsPanel) {
    filterToggle.addEventListener("click", () => {
      const isOpen = facetsPanel.classList.toggle("is-open");
      filterToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px" }
    );

    document
      .querySelectorAll(".category-tile, .product-card, .lookbook-media, .lookbook-copy")
      .forEach((node) => observer.observe(node));
  }
})();
