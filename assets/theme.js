(() => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const previewMode = body.dataset.previewMode === "true";
  const rootRoute = window.Shopify?.routes?.root || "/";
  let lastDrawerTrigger = null;
  let lastMenuTrigger = null;

  if (previewMode) {
    const previewNav = document.querySelector("[data-mobile-nav]");
    if (previewNav && !previewNav.querySelector(".catalog-drawer")) {
      previewNav.setAttribute("aria-hidden", "true");
      previewNav.innerHTML = `
        <button class="catalog-drawer-overlay" type="button" data-menu-close aria-label="Close navigation"></button>
        <aside id="CatalogDrawer" class="catalog-drawer" role="dialog" aria-modal="true" aria-label="Shop navigation">
          <div class="catalog-drawer-heading"><span>R/CREATION / Catalog</span><button class="catalog-close" type="button" data-menu-close aria-label="Close navigation"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>
          <form class="catalog-search" action="collection.html" role="search"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m20 20-4.4-4.4m2.4-5.1a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" stroke-width="1.7"/></svg><label class="visually-hidden" for="PreviewCatalogSearch">Search the collection</label><input id="PreviewCatalogSearch" type="search" name="q" placeholder="Search pieces" data-catalog-search><button type="submit" aria-label="Submit search"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form>
          <a class="catalog-profile" href="account.html"><span class="catalog-profile-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4.8 20c.7-4 3.1-6 7.2-6s6.5 2 7.2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span><span><strong>Sign in</strong><small>Account access and order history</small></span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <nav class="catalog-primary-nav" aria-label="Shop departments">
            <a href="collection.html?view=women"><span>Women</span><small>Reconstruction</small><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg></a>
            <a href="collection.html?view=men"><span>Men</span><small>Confrontation</small><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg></a>
            <a href="collection.html"><span>Drop 001</span><small>View every piece</small><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg></a>
          </nav>
          <nav class="catalog-category-nav" aria-label="Shop categories"><a href="collection.html?view=hoodies">Hoodies</a><a href="collection.html?view=tees">Tees</a><a href="collection.html?view=headwear">Headwear</a><a href="collection.html?view=objects">Objects</a></nav>
          <div class="catalog-drawer-footer"><a href="lookbook.html">Editorial</a><a href="about.html">Founder story</a><a href="https://www.instagram.com/r_creationapparel/" target="_blank" rel="noopener">Instagram</a><p>Independent studio / Slovakia</p></div>
        </aside>`;
    }

    document.querySelectorAll(".icon-link[aria-label='Search']").forEach((link) => {
      link.dataset.catalogOpen = "search";
      link.setAttribute("aria-controls", "CatalogDrawer");
      link.setAttribute("aria-expanded", "false");
    });
  }

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

  const setMenuState = (isOpen, trigger = null, focusSearch = false) => {
    const nav = document.querySelector("[data-mobile-nav]");
    if (!nav) return;

    if (isOpen) {
      setDrawerState("cart", false);
      setDrawerState("filters", false);
      lastMenuTrigger = trigger || document.activeElement;
      body.classList.add("menu-open");
      nav.setAttribute("aria-hidden", "false");
      document.querySelectorAll("[data-menu-toggle], [data-catalog-open]").forEach((button) => button.setAttribute("aria-expanded", "true"));
      window.setTimeout(() => (focusSearch ? nav.querySelector("[data-catalog-search]") : nav.querySelector("[data-menu-close]"))?.focus(), 180);
      return;
    }

    body.classList.remove("menu-open");
    nav.setAttribute("aria-hidden", "true");
    document.querySelectorAll("[data-menu-toggle], [data-catalog-open]").forEach((button) => button.setAttribute("aria-expanded", "false"));
    if (lastMenuTrigger && document.contains(lastMenuTrigger)) lastMenuTrigger.focus();
  };

  const conceptViewer = document.querySelector("[data-concept-viewer]");
  const conceptDataNode = document.querySelector("[data-concept-products]");
  const conceptTrack = conceptViewer?.querySelector("[data-concept-track]");
  const conceptThumbnails = conceptViewer?.querySelector("[data-concept-thumbnails]");
  const conceptCounter = conceptViewer?.querySelector("[data-concept-counter]");
  let conceptCatalog = [];
  let conceptActiveIndex = 0;
  let conceptLastTrigger = null;
  let conceptScrollFrame = 0;

  if (conceptDataNode) {
    try {
      conceptCatalog = JSON.parse(conceptDataNode.textContent);
    } catch (error) {
      conceptCatalog = [];
    }
  }

  const getConceptProduct = (handle) => conceptCatalog.find((product) => product.handle === handle);

  const setConceptSlide = (index, shouldScroll = false) => {
    if (!conceptTrack) return;
    const slides = [...conceptTrack.querySelectorAll("[data-concept-slide]")];
    const thumbnails = [...(conceptThumbnails?.querySelectorAll("[data-concept-thumb]") || [])];
    if (!slides.length) return;

    conceptActiveIndex = Math.max(0, Math.min(index, slides.length - 1));
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const isActive = thumbnailIndex === conceptActiveIndex;
      thumbnail.classList.toggle("is-active", isActive);
      thumbnail.setAttribute("aria-current", isActive ? "true" : "false");
    });
    if (conceptCounter) {
      conceptCounter.textContent = `${String(conceptActiveIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
    if (shouldScroll) {
      conceptTrack.scrollTo({ left: slides[conceptActiveIndex].offsetLeft, behavior: "smooth" });
    }
  };

  const renderConceptOptions = (selector, labelSelector, values) => {
    const container = conceptViewer?.querySelector(selector);
    const label = conceptViewer?.querySelector(labelSelector);
    if (!container || !values?.length) return;
    container.innerHTML = values.map((value, index) => `<button class="concept-option${index === 0 ? " is-active" : ""}" type="button" data-concept-option data-concept-value="${value}" aria-pressed="${index === 0 ? "true" : "false"}">${value}</button>`).join("");
    if (label) label.textContent = values[0];
  };

  const openConceptViewer = (handle, trigger = null, updateUrl = true) => {
    const product = getConceptProduct(handle);
    if (!conceptViewer || !conceptTrack || !conceptThumbnails || !product) return false;

    setDrawerState("cart", false);
    setDrawerState("filters", false);
    setMenuState(false);
    conceptLastTrigger = trigger || document.activeElement;
    conceptActiveIndex = 0;

    conceptViewer.querySelector("[data-concept-title]").textContent = product.title;
    conceptViewer.querySelector("[data-concept-price]").textContent = product.price;
    conceptViewer.querySelector("[data-concept-eyebrow]").textContent = product.eyebrow;
    conceptViewer.querySelector("[data-concept-position]").textContent = product.eyebrow;
    conceptViewer.querySelector("[data-concept-description]").textContent = product.description;
    conceptViewer.querySelector("[data-concept-story]").textContent = product.story;
    conceptViewer.querySelector("[data-concept-fit]").textContent = product.fit;

    conceptTrack.innerHTML = product.images.map((image, index) => `<figure class="concept-viewer-slide" data-concept-slide><img src="${image}" alt="${product.title} ${index === 0 ? "product view" : `design detail ${index + 1}`}" ${index === 0 ? "fetchpriority=\"high\"" : "loading=\"lazy\""}></figure>`).join("");
    conceptThumbnails.innerHTML = product.images.map((image, index) => `<button type="button" data-concept-thumb="${index}" class="${index === 0 ? "is-active" : ""}" aria-current="${index === 0 ? "true" : "false"}" aria-label="View product image ${index + 1}"><img src="${image}" alt=""></button>`).join("");
    renderConceptOptions("[data-concept-colors]", "[data-concept-color-label]", product.colors);
    renderConceptOptions("[data-concept-sizes]", "[data-concept-size-label]", product.sizes);
    conceptTrack.scrollLeft = 0;
    setConceptSlide(0);

    body.classList.add("concept-viewer-open");
    conceptViewer.setAttribute("aria-hidden", "false");
    window.setTimeout(() => conceptViewer.querySelector(".concept-viewer-panel")?.focus(), 160);

    if (updateUrl) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("concept", product.handle);
      window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    }
    return true;
  };

  const closeConceptViewer = (updateUrl = true) => {
    if (!conceptViewer || conceptViewer.getAttribute("aria-hidden") === "true") return;
    conceptViewer.setAttribute("aria-hidden", "true");
    body.classList.remove("concept-viewer-open");
    if (updateUrl) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete("concept");
      window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    }
    if (conceptLastTrigger && document.contains(conceptLastTrigger)) conceptLastTrigger.focus();
  };

  conceptTrack?.addEventListener("scroll", () => {
    window.cancelAnimationFrame(conceptScrollFrame);
    conceptScrollFrame = window.requestAnimationFrame(() => {
      const slides = [...conceptTrack.querySelectorAll("[data-concept-slide]")];
      const nearest = slides.reduce((best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - conceptTrack.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Infinity });
      setConceptSlide(nearest.index);
    });
  }, { passive: true });

  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => setMenuState(!body.classList.contains("menu-open"), menuToggle));

    header.querySelectorAll("[data-mobile-nav] a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });
  }

  if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  document.addEventListener("click", (event) => {
    const conceptTrigger = event.target.closest("[data-concept-trigger]");
    if (conceptTrigger && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      openConceptViewer(conceptTrigger.dataset.conceptTrigger, conceptTrigger);
      return;
    }

    if (event.target.closest("[data-concept-close]")) {
      closeConceptViewer();
      return;
    }

    const conceptThumbnail = event.target.closest("[data-concept-thumb]");
    if (conceptThumbnail) {
      setConceptSlide(Number(conceptThumbnail.dataset.conceptThumb), true);
      return;
    }

    if (event.target.closest("[data-concept-prev]")) {
      setConceptSlide(conceptActiveIndex - 1, true);
      return;
    }

    if (event.target.closest("[data-concept-next]")) {
      setConceptSlide(conceptActiveIndex + 1, true);
      return;
    }

    const conceptOption = event.target.closest("[data-concept-option]");
    if (conceptOption) {
      const fieldset = conceptOption.closest("fieldset");
      fieldset.querySelectorAll("[data-concept-option]").forEach((option) => {
        const isActive = option === conceptOption;
        option.classList.toggle("is-active", isActive);
        option.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      const label = fieldset.querySelector("legend span");
      if (label) label.textContent = conceptOption.dataset.conceptValue;
      return;
    }

    const catalogTrigger = event.target.closest("[data-catalog-open]");
    if (catalogTrigger && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      setMenuState(true, catalogTrigger, catalogTrigger.dataset.catalogOpen === "search");
      return;
    }

    if (event.target.closest("[data-menu-close]")) {
      setMenuState(false);
      return;
    }

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
    if (body.classList.contains("concept-viewer-open")) closeConceptViewer();
    if (body.classList.contains("cart-drawer-open")) setDrawerState("cart", false);
    if (body.classList.contains("filters-open")) setDrawerState("filters", false);
    if (body.classList.contains("menu-open")) setMenuState(false);
  });

  window.addEventListener("popstate", () => {
    const handle = new URLSearchParams(window.location.search).get("concept");
    if (handle) openConceptViewer(handle, null, false);
    else closeConceptViewer(false);
  });

  const initialConcept = new URLSearchParams(window.location.search).get("concept");
  if (initialConcept) openConceptViewer(initialConcept, null, false);

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
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("variant", variant.id);
    window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
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
          const selectedOptions = [...form.querySelectorAll("[data-option-position] input:checked")].map((input) => input.value);
          const drawerVariant = document.querySelector("[data-cart-item] .drawer-item-details > div > p:nth-of-type(1)");
          const drawerQuantity = document.querySelector("[data-cart-item] [data-cart-quantity]");
          const productQuantity = form.querySelector("[name='quantity']");
          if (drawerVariant && selectedOptions.length) drawerVariant.textContent = selectedOptions.join(" / ");
          if (drawerQuantity && productQuantity) drawerQuantity.value = productQuantity.value;
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

  document.querySelectorAll("[data-product-gallery]").forEach((gallery) => {
    const track = gallery.querySelector("[data-product-gallery-track]");
    const slides = [...gallery.querySelectorAll("[data-product-slide]")];
    const counter = gallery.querySelector("[data-gallery-counter]");
    const thumbs = [...gallery.querySelectorAll("[data-gallery-target]")];
    if (!track || slides.length === 0) return;

    const setActiveSlide = (index, shouldScroll = false) => {
      const activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeIndex));
      thumbs.forEach((thumb, thumbIndex) => {
        thumb.classList.toggle("is-active", thumbIndex === activeIndex);
        thumb.setAttribute("aria-current", thumbIndex === activeIndex ? "true" : "false");
      });
      if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      if (shouldScroll) track.scrollTo({ left: slides[activeIndex].offsetLeft, behavior: "smooth" });
      gallery.dataset.activeSlide = String(activeIndex);
    };

    thumbs.forEach((thumb, index) => thumb.addEventListener("click", () => setActiveSlide(index, true)));
    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => setActiveSlide(Number(gallery.dataset.activeSlide || 0) - 1, true));
    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => setActiveSlide(Number(gallery.dataset.activeSlide || 0) + 1, true));
    let scrollFrame = 0;
    track.addEventListener("scroll", () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const nearest = slides.reduce((best, slide, index) => Math.abs(slide.offsetLeft - track.scrollLeft) < best.distance ? { index, distance: Math.abs(slide.offsetLeft - track.scrollLeft) } : best, { index: 0, distance: Infinity });
        setActiveSlide(nearest.index);
      });
    }, { passive: true });
    setActiveSlide(0);
  });

  if ("IntersectionObserver" in window) {
    const revealNodes = document.querySelectorAll(
      ".category-tile, .product-card, .lookbook-media, .lookbook-copy, .collection-index-item, .product-media, [data-about-reveal], [data-emotion-reveal]"
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

  if (previewMode) {
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = form.querySelector(".newsletter-status");
        const input = form.querySelector("input[type='email']");
        if (status) status.textContent = input?.value ? "You are on the list." : "Enter an email address.";
      });
    });
  }
})();
