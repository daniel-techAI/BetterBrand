(() => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const previewMode = body.dataset.previewMode === "true";
  const rootRoute = window.Shopify?.routes?.root || "/";
  let lastDrawerTrigger = null;

  const getCartDrawer = () => document.querySelector("[data-cart-drawer]");
  const getFilterDrawer = () => document.querySelector("[data-facets-panel]");

  const setDrawerState = (type, isOpen, trigger = null) => {
    const isCart = type === "cart";
    const drawer = isCart ? getCartDrawer() : getFilterDrawer();
    const bodyClass = isCart ? "cart-drawer-open" : "filters-open";
    const triggerSelector = isCart ? "[data-cart-open]" : "[data-filter-toggle]";

    if (!drawer) return;

    if (isOpen) {
      setDrawerState(isCart ? "filters" : "cart", false);
      lastDrawerTrigger = trigger || document.activeElement;
      body.classList.add(bodyClass);
      drawer.setAttribute("aria-hidden", "false");
      document.querySelectorAll(triggerSelector).forEach((button) => button.setAttribute("aria-expanded", "true"));
      window.setTimeout(() => drawer.querySelector("[data-cart-close], [data-filter-close], button, a")?.focus(), 120);
    } else {
      body.classList.remove(bodyClass);
      drawer.setAttribute("aria-hidden", "true");
      document.querySelectorAll(triggerSelector).forEach((button) => button.setAttribute("aria-expanded", "false"));
      if (lastDrawerTrigger && document.contains(lastDrawerTrigger)) lastDrawerTrigger.focus();
    }
  };

  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    header.querySelectorAll("[data-mobile-nav] a").forEach((link) => {
      link.addEventListener("click", () => body.classList.remove("menu-open"));
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  document.addEventListener("click", (event) => {
    const cartTrigger = event.target.closest("[data-cart-open]");
    if (cartTrigger && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      setDrawerState("cart", true, cartTrigger);
      return;
    }

    const filterTrigger = event.target.closest("[data-filter-toggle]");
    if (filterTrigger) {
      setDrawerState("filters", true, filterTrigger);
      return;
    }

    if (event.target.closest("[data-cart-close]")) {
      setDrawerState("cart", false);
      return;
    }

    if (event.target.closest("[data-filter-close]")) {
      setDrawerState("filters", false);
      return;
    }

    const quantityButton = event.target.closest("[data-quantity-minus], [data-quantity-plus]");
    if (quantityButton) {
      const stepper = quantityButton.closest("[data-quantity-stepper]");
      const input = stepper?.querySelector("input");
      if (!input) return;

      const minimum = Number(input.min || 0);
      const delta = quantityButton.hasAttribute("data-quantity-plus") ? 1 : -1;
      input.value = Math.max(minimum, Number(input.value || minimum) + delta);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const removeButton = event.target.closest("[data-cart-remove]");
    if (removeButton) {
      const item = removeButton.closest("[data-cart-item]");
      if (item) updateCartLine(item.dataset.lineKey, 0, "Removed from bag");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (body.classList.contains("cart-drawer-open")) setDrawerState("cart", false);
    if (body.classList.contains("filters-open")) setDrawerState("filters", false);
    if (body.classList.contains("menu-open")) body.classList.remove("menu-open");
  });

  document.addEventListener("change", (event) => {
    const drawerQuantity = event.target.closest("[data-cart-item] [data-cart-quantity]");
    if (drawerQuantity) {
      const item = drawerQuantity.closest("[data-cart-item]");
      updateCartLine(item.dataset.lineKey, Number(drawerQuantity.value), "Bag updated");
    }

    if (event.target.matches("[data-product-form] input[type='radio']")) {
      updateProductVariant(event.target.closest("[data-product-root]"));
    }
  });

  const formatMoney = (cents, format = "${{amount}}") => {
    const value = Number(cents || 0);
    const token = format.match(/\{\{\s*(\w+)\s*\}\}/)?.[1] || "amount";
    const options = token.includes("no_decimals")
      ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const separators = token.includes("comma_separator")
      ? { locale: "de-DE" }
      : { locale: "en-US" };
    const amount = new Intl.NumberFormat(separators.locale, options).format(value / 100);
    return format.replace(/\{\{\s*\w+\s*\}\}/, amount);
  };

  const updateProductVariant = (root) => {
    if (!root) return;
    const dataNode = root.querySelector("[data-product-variants]");
    const form = root.querySelector("[data-product-form]");
    if (!dataNode || !form) return;

    let variants = [];
    try {
      variants = JSON.parse(dataNode.textContent);
    } catch (error) {
      return;
    }

    const selectedOptions = [...form.querySelectorAll("[data-option-position]")].map((field) => {
      const checked = field.querySelector("input:checked");
      const selectedLabel = field.querySelector("[data-option-label]");
      if (selectedLabel && checked) selectedLabel.textContent = checked.value;
      return checked?.value;
    });
    const variant = variants.find((item) => item.options.every((option, index) => option === selectedOptions[index]));
    const idInput = form.querySelector("[data-variant-id]");
    const submit = form.querySelector("[data-add-to-cart]");
    const price = root.querySelector("[data-product-price]");

    if (!variant) {
      if (idInput) idInput.value = "";
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Unavailable";
      }
      return;
    }

    if (idInput) idInput.value = variant.id;
    if (submit) {
      submit.disabled = !variant.available;
      submit.textContent = variant.available ? submit.dataset.availableLabel : submit.dataset.soldOutLabel;
    }
    if (price) {
      const moneyFormat = root.dataset.moneyFormat || "EUR {{amount}}";
      price.innerHTML = `<span>${formatMoney(variant.price, moneyFormat)}</span>${variant.compare_at_price > variant.price ? `<s>${formatMoney(variant.compare_at_price, moneyFormat)}</s>` : ""}`;
    }
    if (variant.featured_media) {
      root.querySelectorAll("[data-media-id]").forEach((media) => {
        media.classList.toggle("is-selected", media.dataset.mediaId === String(variant.featured_media.id));
      });
    }
    window.history.replaceState({}, "", `${window.location.pathname}?variant=${variant.id}`);
  };

  const updateCartCount = (count) => {
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = count;
      node.hidden = count === 0;
    });
  };

  const replaceCartDrawer = (html, statusMessage = "") => {
    if (!html) return;
    const currentSection = document.querySelector("#shopify-section-cart-drawer");
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const incomingSection = template.content.querySelector("#shopify-section-cart-drawer") || template.content.firstElementChild;
    if (currentSection && incomingSection) currentSection.replaceWith(incomingSection);
    const status = document.querySelector("[data-cart-status]");
    if (status) status.textContent = statusMessage;
  };

  const setCartBusy = (isBusy) => {
    document.querySelector("[data-cart-shell]")?.classList.toggle("is-loading", isBusy);
  };

  async function updateCartLine(key, quantity, statusMessage) {
    if (!key) return;
    if (previewMode) {
      const item = document.querySelector(`[data-line-key="${CSS.escape(key)}"]`);
      if (quantity === 0) item?.remove();
      document.querySelector("[data-cart-status]").textContent = statusMessage;
      return;
    }

    setCartBusy(true);
    try {
      const response = await fetch(`${rootRoute}cart/change.js`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          id: key,
          quantity,
          sections: "cart-drawer",
          sections_url: window.location.pathname
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.description || "Unable to update the bag.");
      replaceCartDrawer(data.sections?.["cart-drawer"], statusMessage);
      updateCartCount(data.item_count);
      setDrawerState("cart", true);
    } catch (error) {
      const status = document.querySelector("[data-cart-status]");
      if (status) status.textContent = error.message;
    } finally {
      setCartBusy(false);
    }
  }

  document.querySelectorAll("[data-product-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      if (event.submitter?.closest(".shopify-payment-button")) return;
      event.preventDefault();

      const submit = form.querySelector("[data-add-to-cart]");
      const errorNode = form.querySelector("[data-product-error]");
      if (!submit || submit.disabled) return;

      submit.disabled = true;
      submit.textContent = "Adding";
      if (errorNode) errorNode.hidden = true;

      if (previewMode) {
        window.setTimeout(() => {
          submit.disabled = false;
          submit.textContent = submit.dataset.availableLabel;
          updateCartCount(1);
          const status = document.querySelector("[data-cart-status]");
          if (status) status.textContent = "Added to bag";
          setDrawerState("cart", true, submit);
        }, 700);
        return;
      }

      try {
        const formData = new FormData(form);
        formData.append("sections", "cart-drawer");
        formData.append("sections_url", window.location.pathname);
        const response = await fetch(`${rootRoute}cart/add.js`, {
          method: "POST",
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.description || "Unable to add this piece.");
        replaceCartDrawer(data.sections?.["cart-drawer"], "Added to bag");
        const cart = await fetch(`${rootRoute}cart.js`, { headers: { Accept: "application/json" } }).then((result) => result.json());
        updateCartCount(cart.item_count);
        setDrawerState("cart", true, submit);
      } catch (error) {
        if (errorNode) {
          errorNode.textContent = error.message;
          errorNode.hidden = false;
        }
      } finally {
        submit.disabled = false;
        submit.textContent = submit.dataset.availableLabel;
      }
    });
  });

  if ("IntersectionObserver" in window) {
    const revealNodes = document.querySelectorAll(
      ".category-tile, .product-card, .lookbook-media, .lookbook-copy, .collection-index-item, .product-media, [data-about-reveal]"
    );
    revealNodes.forEach((node, index) => node.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 110}ms`));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px" }
    );
    revealNodes.forEach((node) => observer.observe(node));
  }
})();
