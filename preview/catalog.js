(() => {
  const catalog = [
    {
      handle: "rebuild-yourself-crop-hoodie",
      title: "Rebuild Yourself Crop Hoodie",
      price: 84,
      gender: "women",
      category: "hoodies",
      chapter: "Reconstruction",
      badge: "Drop 001",
      description: "A cropped heavyweight layer about rebuilding without pretending the fracture never happened.",
      story: "The halo, split face, flowers, and serpent hold softness and damage in the same frame. The piece is designed as reconstruction, not perfection.",
      fit: "Relaxed cropped fit. Heavyweight cotton concept. Confirm final measurements after the first physical sample.",
      colors: ["Black", "Deep Heather", "Mauve"],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: ["product-rebuild-hoodie-v2.jpg", "art-emotional-architecture-v1.jpg", "editorial-emotional-system-v1.jpg"]
    },
    {
      handle: "face-what-you-hide-hoodie",
      title: "Face What You Hide Hoodie",
      price: 89,
      gender: "men",
      category: "hoodies",
      chapter: "Confrontation",
      badge: "Drop 001",
      description: "The mask protects you until it becomes the prison. An oversized layer built around truth and the decision to break repetition.",
      story: "A fractured statue, serpent, halo, and exposed skull turn the hidden fight into a visible emotional system.",
      fit: "Oversized unisex fit. Heavyweight cotton concept. Confirm final fabric weight and measurements after sampling.",
      colors: ["Black", "Charcoal", "Bone"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      soldOut: ["Black|XL"],
      images: ["product-face-hide-hoodie-v2.jpg", "art-emotional-duality-v1.jpg", "editorial-emotional-lineup-v1.jpg"]
    },
    {
      handle: "embrace-the-chaos-crop-tee",
      title: "Embrace The Chaos Crop Tee",
      price: 42,
      gender: "women",
      category: "tees",
      chapter: "Reconstruction",
      badge: "Concept",
      description: "A compact first layer carrying the collection's quietest instruction: stop waiting for life to become clean before you begin.",
      story: "The front keeps the message small and direct. It is the entry point to the larger architecture artwork used across the women's chapter.",
      fit: "Close cropped fit. Midweight cotton concept. Sample for opacity, neckline recovery, and print scale before release.",
      colors: ["Black", "Bone", "Dusty Rose"],
      sizes: ["XS", "S", "M", "L", "XL"],
      images: ["product-embrace-tee-v1.jpg", "art-emotional-architecture-v1.jpg", "editorial-emotional-system-v1.jpg"]
    },
    {
      handle: "break-the-loop-heavy-tee",
      title: "Break The Loop Heavy Tee",
      price: 46,
      gender: "men",
      category: "tees",
      chapter: "Confrontation",
      badge: "New concept",
      description: "A washed oversized first layer with a restrained front mark and the full split-identity artwork across the back.",
      story: "The ouroboros is reduced to a small warning on the chest. The back makes the loop visible: face, skull, halo, and serpent locked into one form.",
      fit: "Boxy oversized fit. Heavy cotton concept with dropped shoulders. Validate print hand-feel and back placement on a physical sample.",
      colors: ["Washed Black", "Charcoal"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      images: ["product-break-loop-tee-v1.jpg", "art-emotional-duality-v1.jpg", "editorial-emotional-lineup-v1.jpg"]
    },
    {
      handle: "unavailable-edition-cap",
      title: "Unavailable Edition Cap",
      price: 34,
      gender: "objects",
      category: "headwear",
      chapter: "Guarded vulnerability",
      badge: "Concept / legal review",
      description: "A washed low-profile cap about boundaries, distance, and the tension between control and connection.",
      story: "Minimal script from the front, a mirrored figure and tethered-chain system at the back. The recovered wording must be cleared before sale.",
      fit: "Washed cotton cap concept with adjustable metal closure. One size; sample embroidery scale and legibility.",
      colors: ["Washed Black"],
      sizes: ["One Size"],
      images: ["product-emotional-caps-v1.jpg", "../docs/recovered-collection/emotional-cap-concepts.jpg", "sticker-concepts-v1.jpg"]
    },
    {
      handle: "prison-edition-cap",
      title: "Prison Edition Cap",
      price: 34,
      gender: "objects",
      category: "headwear",
      chapter: "Captivity + release",
      badge: "Drop 001",
      description: "A washed low-profile cap about the structures that protect you until they begin to contain you.",
      story: "The front is reduced to one word. Cage, key, chain, and release appear quietly around the back so the piece reveals itself slowly.",
      fit: "Washed cotton cap concept with adjustable metal closure. One size; sample the back embroidery before release.",
      colors: ["Washed Black"],
      sizes: ["One Size"],
      images: ["product-emotional-caps-v1.jpg", "../docs/recovered-collection/emotional-cap-concepts.jpg", "editorial-emotional-system-v1.jpg"]
    },
    {
      handle: "architecture-socks",
      title: "Architecture Socks",
      price: 19,
      gender: "objects",
      category: "objects",
      chapter: "Everyday symbols",
      badge: "New concept",
      description: "Two emotional symbols reduced to an everyday object: the closed loop and the heart held under pressure.",
      story: "The pair is intentionally mismatched. One side carries repetition; the other carries pressure and the choice to keep moving.",
      fit: "Mid-calf knit sock concept. Confirm stretch, knit detail, and wash recovery before opening orders.",
      colors: ["Black", "Bone"],
      sizes: ["S/M", "L/XL"],
      images: ["product-emotional-socks-v1.jpg", "art-emotional-duality-v1.jpg", "editorial-emotional-system-v1.jpg"]
    },
    {
      handle: "emotional-sticker-set",
      title: "Emotional Sticker Set",
      price: 9,
      gender: "objects",
      category: "objects",
      chapter: "Symbols",
      badge: "Add-on",
      description: "Four monochrome symbols from Drop 001 for notebooks, cases, packaging, and the objects carried every day.",
      story: "Ouroboros, fractured face, permanent change, and the broken loop become the smallest entry point into the collection.",
      fit: "Four die-cut vinyl sticker concepts. Final dimensions and finish will be confirmed with the first proof.",
      colors: ["Black / Bone"],
      sizes: ["One Size"],
      images: ["sticker-concepts-v1.jpg", "art-emotional-architecture-v1.jpg", "accessory-cases-v1.jpg"]
    }
  ];

  const byHandle = Object.fromEntries(catalog.map((product) => [product.handle, product]));
  const assetUrl = (name) => name.startsWith("../") ? name : `../assets/${name}`;
  const productUrl = (product) => `product.html?product=${encodeURIComponent(product.handle)}`;
  const money = (price) => `EUR ${Number(price).toFixed(2)}`;
  const handleize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const productCard = (product) => `
    <article class="product-card" data-catalog-card data-gender="${product.gender}" data-category="${product.category}" data-title="${product.title.toLowerCase()}" data-price="${product.price}">
      <a class="product-card-media" href="${productUrl(product)}" aria-label="${product.title}">
        <img class="product-card-primary-image" src="${assetUrl(product.images[0])}" alt="${product.title}" loading="lazy">
        <img class="product-card-secondary-image" src="${assetUrl(product.images[1])}" alt="" loading="lazy">
        <span class="product-card-badge">${product.badge}</span>
        <span class="product-card-action" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="1.7"/></svg></span>
      </a>
      <div class="product-card-info"><div><span class="product-card-kicker">${product.gender === "objects" ? "Objects" : product.gender[0].toUpperCase() + product.gender.slice(1)} / ${product.chapter}</span><h3><a href="${productUrl(product)}">${product.title}</a></h3><p>${money(product.price)}</p><div class="product-card-swatches">${product.colors.map((color) => `<span class="swatch swatch-${handleize(color)}" title="${color}"></span>`).join("")}</div></div></div>
    </article>`;

  const variantsFor = (product) => {
    let id = catalog.indexOf(product) * 1000 + 1;
    return product.colors.flatMap((color, colorIndex) => product.sizes.map((size) => ({
      id: id++,
      available: !(product.soldOut || []).includes(`${color}|${size}`),
      price: product.price * 100,
      compare_at_price: null,
      options: [color, size],
      featured_media: { id: colorIndex + 1 }
    })));
  };

  const hydrateStaticCards = () => {
    const navigationRoutes = {
      Shop: "collection.html",
      "Drop 001": "collection.html",
      Women: "collection.html?view=women",
      Men: "collection.html?view=men",
      Objects: "collection.html?view=objects",
      Theory: "index.html#theory",
      "Hades Theory": "index.html#theory",
      About: "about.html"
    };
    document.querySelectorAll(".main-nav a, [data-mobile-nav] a").forEach((link) => {
      const route = navigationRoutes[link.textContent.trim()];
      if (route) link.href = route;
    });

    document.querySelectorAll(".product-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent.trim();
      const product = catalog.find((item) => item.title === title);
      if (!product) return;
      card.querySelectorAll("a").forEach((link) => link.href = productUrl(product));
      const price = card.querySelector(".product-card-info p");
      if (price) price.textContent = money(product.price);
    });

    const categoryViews = { Hoodies: "hoodies", Tees: "tees", Headwear: "headwear", Objects: "objects" };
    document.querySelectorAll(".category-tile").forEach((tile) => {
      const label = tile.querySelector("b")?.textContent.trim();
      if (categoryViews[label]) tile.href = `collection.html?view=${categoryViews[label]}`;
    });
  };

  const hydrateProductPage = () => {
    const root = document.querySelector("[data-product-root]");
    if (!root) return;
    const params = new URLSearchParams(window.location.search);
    const product = byHandle[params.get("product")] || byHandle["face-what-you-hide-hoodie"];
    document.title = `${product.title} | R/CREATION`;

    const heading = root.querySelector(".product-info h1");
    const kicker = root.querySelector(".product-card-kicker");
    const description = root.querySelector(".product-description");
    const price = root.querySelector("[data-product-price]");
    const breadcrumb = root.querySelector(".product-breadcrumb");
    if (heading) heading.textContent = product.title;
    if (kicker) kicker.textContent = `${product.gender === "objects" ? "Objects" : product.gender[0].toUpperCase() + product.gender.slice(1)} / ${product.chapter}`;
    if (description) description.innerHTML = `<p>${product.description}</p>`;
    if (price) price.innerHTML = `<span>${money(product.price)}</span>`;
    if (breadcrumb) breadcrumb.innerHTML = `<a href="collection.html">Drop 001</a><span aria-hidden="true">/</span><a href="collection.html?view=${product.category}">${product.category}</a>`;

    const gallery = root.querySelector("[data-product-gallery]");
    if (gallery) {
      gallery.innerHTML = `
        <div class="product-gallery" data-product-gallery-track>${product.images.map((image, index) => `<div class="product-media ${index === 0 ? "is-featured is-active" : ""}" data-product-slide data-media-id="${index + 1}"><img src="${assetUrl(image)}" alt="${product.title} ${index === 0 ? "product view" : `detail ${index + 1}`}"></div>`).join("")}</div>
        <div class="product-gallery-nav" aria-label="Product image controls"><span data-gallery-counter>01 / 0${product.images.length}</span><div><button type="button" data-gallery-prev aria-label="Previous product image"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg></button><button type="button" data-gallery-next aria-label="Next product image"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg></button></div></div>
        <div class="product-gallery-thumbnails" aria-label="Choose product image">${product.images.map((image, index) => `<button type="button" data-gallery-target="${index}" class="${index === 0 ? "is-active" : ""}" ${index === 0 ? "aria-current=\"true\"" : ""} aria-label="View product image ${index + 1}"><img src="${assetUrl(image)}" alt=""></button>`).join("")}</div>`;
    }

    const buildOptions = (values, name, includeSwatch = false) => values.map((value, index) => `<label class="variant-option"><input type="radio" name="options[${name}]" value="${value}" ${index === 0 ? "checked" : ""}><span>${includeSwatch ? `<i class="swatch swatch-${handleize(value)}" aria-hidden="true"></i>` : ""}<b>${value}</b></span></label>`).join("");
    const optionFields = root.querySelectorAll("[data-option-position]");
    if (optionFields[0]) {
      optionFields[0].querySelector("[data-option-label]").textContent = product.colors[0];
      optionFields[0].querySelector(".variant-options").innerHTML = buildOptions(product.colors, "Color", true);
    }
    if (optionFields[1]) {
      optionFields[1].querySelector("[data-option-label]").textContent = product.sizes[0];
      optionFields[1].querySelector(".variant-options").innerHTML = buildOptions(product.sizes, "Size");
    }

    const variants = variantsFor(product);
    const variantData = root.querySelector("[data-product-variants]");
    const variantId = root.querySelector("[data-variant-id]");
    if (variantData) variantData.textContent = JSON.stringify(variants);
    if (variantId) variantId.value = variants[0].id;

    const accordionBodies = root.querySelectorAll(".product-accordions details > div");
    if (accordionBodies[0]) accordionBodies[0].innerHTML = `<p>${product.story}</p>`;
    if (accordionBodies[1]) accordionBodies[1].innerHTML = `<p>${product.fit}</p>`;

    const related = catalog.filter((item) => item.handle !== product.handle && (item.category === product.category || item.gender === product.gender)).slice(0, 2);
    const relatedGrid = document.querySelector("[data-related-products]");
    if (relatedGrid) relatedGrid.innerHTML = related.map(productCard).join("");

    document.querySelectorAll("[data-preview-current-product]").forEach((link) => link.href = productUrl(product));
    const drawerItem = document.querySelector("[data-cart-item]");
    if (drawerItem) {
      const image = drawerItem.querySelector("img");
      const title = drawerItem.querySelector("h3");
      const variant = drawerItem.querySelector(".drawer-item-details > div > p:nth-of-type(1)");
      const itemPrice = drawerItem.querySelector(".drawer-item-details > div > p:last-child");
      drawerItem.querySelectorAll("a").forEach((link) => link.href = productUrl(product));
      if (image) { image.src = assetUrl(product.images[0]); image.alt = product.title; }
      if (title) title.textContent = product.title;
      if (variant) variant.textContent = `${product.colors[0]} / ${product.sizes[0]}`;
      if (itemPrice) itemPrice.textContent = money(product.price);
    }

    const subtotal = document.querySelector(".drawer-subtotal strong");
    if (subtotal) subtotal.textContent = money(product.price);
    const shippingThreshold = 150;
    const shippingProgress = document.querySelector(".shipping-progress");
    if (shippingProgress) {
      const remaining = Math.max(shippingThreshold - product.price, 0);
      const label = shippingProgress.querySelector("p");
      const meter = shippingProgress.querySelector("i");
      if (label) label.textContent = remaining ? `${money(remaining)} away from complimentary shipping` : "Complimentary shipping unlocked";
      if (meter) meter.style.setProperty("--cart-progress", `${Math.min((product.price / shippingThreshold) * 100, 100)}%`);
    }
  };

  const setupCollectionPage = () => {
    const grid = document.querySelector("[data-preview-collection-grid]");
    if (!grid) return;
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view") || "all";
    const query = (params.get("q") || "").trim().toLowerCase();
    const viewCopy = {
      all: ["Drop 001", "Eight emotional artifacts. Two chapters. One independent collection built around reconstruction, confrontation, and the loops we choose to break."],
      women: ["Women / Reconstruction", "Softness and fracture held in the same frame. Cropped layers built around rebuilding yourself."],
      men: ["Men / Confrontation", "Heavy layers for facing the mask, the loop, and the truth underneath both."],
      hoodies: ["Hoodies", "The two central chapters of Drop 001: reconstruction and confrontation."],
      tees: ["First layers", "The collection reduced to its most direct statements."],
      headwear: ["Headwear", "Quiet statements in washed black, revealed slowly from front to back."],
      objects: ["Objects", "Everyday carriers for the symbols beneath the clothing."]
    };
    let selectedFilters = new Set();
    let selectedSizes = new Set();
    let selectedColors = new Set();
    let sort = "featured";

    const matchesView = (product) => view === "all" || product.gender === view || product.category === view;
    const matchesFilters = (product) => selectedFilters.size === 0 || [...selectedFilters].some((filter) => product.gender === filter || product.category === filter || product.chapter.toLowerCase().includes(filter));
    const matchesSizes = (product) => selectedSizes.size === 0 || [...selectedSizes].some((size) => product.sizes.includes(size));
    const matchesColors = (product) => selectedColors.size === 0 || [...selectedColors].some((color) => product.colors.some((productColor) => productColor.toLowerCase().includes(color)));
    const render = () => {
      const minPrice = Number(document.querySelector("[data-preview-price-min]")?.value || 0);
      const maxPrice = Number(document.querySelector("[data-preview-price-max]")?.value || Infinity);
      let products = catalog.filter((product) => matchesView(product) && matchesFilters(product) && matchesSizes(product) && matchesColors(product) && product.price >= minPrice && product.price <= maxPrice && (!query || `${product.title} ${product.chapter} ${product.category}`.toLowerCase().includes(query)));
      if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
      if (sort === "newest") products = [...products].reverse();
      grid.innerHTML = products.length ? products.map(productCard).join("") : `<div class="collection-empty"><span>0 / No match</span><h2>Nothing fits those filters.</h2><p>Clear the filters or return to every piece in Drop 001.</p><button class="button button-gold" type="button" data-preview-empty-reset>Clear filters</button></div>`;
      const count = document.querySelector("[data-preview-collection-count]");
      if (count) count.textContent = `${products.length} ${products.length === 1 ? "piece" : "pieces"}`;
      grid.querySelector("[data-preview-empty-reset]")?.addEventListener("click", resetFilters);
    };

    const resetFilters = () => {
      document.querySelectorAll("[data-preview-filter], [data-preview-size], [data-preview-color]").forEach((input) => input.checked = false);
      document.querySelectorAll("[data-preview-price-min], [data-preview-price-max]").forEach((input) => input.value = "");
      selectedFilters.clear();
      selectedSizes.clear();
      selectedColors.clear();
      render();
    };

    const hero = document.querySelector(".collection-hero");
    if (hero) {
      const copy = viewCopy[view] || viewCopy.all;
      hero.querySelector("h1").textContent = query ? `Search / ${params.get("q")}` : copy[0];
      hero.querySelector("p").textContent = query ? `Pieces matching "${params.get("q")}".` : copy[1];
    }

    const tabViews = ["all", "women", "men", "hoodies", "tees", "headwear", "objects"];
    document.querySelectorAll("[data-preview-view]").forEach((link, index) => {
      const tabView = link.dataset.previewView || tabViews[index];
      link.href = tabView === "all" ? "collection.html" : `collection.html?view=${tabView}`;
      link.classList.toggle("is-active", tabView === view);
      if (tabView === view) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });

    document.querySelector("[data-preview-sort]")?.addEventListener("change", (event) => {
      sort = event.target.value;
      render();
    });

    document.querySelectorAll("[data-preview-filter]").forEach((input) => input.addEventListener("change", () => {
      selectedFilters = new Set([...document.querySelectorAll("[data-preview-filter]:checked")].map((item) => item.value));
      render();
    }));

    document.querySelectorAll("[data-preview-size]").forEach((input) => input.addEventListener("change", () => {
      selectedSizes = new Set([...document.querySelectorAll("[data-preview-size]:checked")].map((item) => item.value));
      render();
    }));

    document.querySelectorAll("[data-preview-color]").forEach((input) => input.addEventListener("change", () => {
      selectedColors = new Set([...document.querySelectorAll("[data-preview-color]:checked")].map((item) => item.value));
      render();
    }));

    document.querySelectorAll("[data-preview-price-min], [data-preview-price-max]").forEach((input) => input.addEventListener("input", render));

    document.querySelector("[data-preview-filter-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector(".facets-drawer [data-filter-close]")?.click();
    });

    document.querySelector("[data-preview-filter-reset]")?.addEventListener("click", (event) => {
      event.preventDefault();
      resetFilters();
    });

    render();
  };

  const setupAccountPage = () => {
    const form = document.querySelector("[data-preview-account-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-account-status]");
      if (status) status.textContent = "Account login activates when Shopify customer accounts are enabled.";
    });
  };

  window.RCREATION_PREVIEW_CATALOG = catalog;
  hydrateStaticCards();
  hydrateProductPage();
  setupCollectionPage();
  setupAccountPage();
})();
