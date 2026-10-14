const media = window.matchMedia("(max-width: 860px)");

export const initHeader = () => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  const contrastSections = document.querySelectorAll("[data-header-contrast]");
  const links = panel ? panel.querySelectorAll("a") : [];

  if (!header || !toggle || !panel) {
    return;
  }

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  // The header switches to light text whenever it sits over a dark section.
  const isOverDarkSection = () => {
    const probe = header.getBoundingClientRect().bottom / 2;

    return Array.from(contrastSections).some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= probe && rect.bottom >= probe;
    });
  };

  let ticking = false;

  const syncHeaderState = () => {
    ticking = false;
    const light = isOverDarkSection();

    header.classList.toggle("is-light", light);
    header.classList.toggle("is-dark", !light);
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  const requestSync = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(syncHeaderState);
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (media.matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  media.addEventListener("change", (event) => {
    if (!event.matches) {
      setOpen(false);
    }
  });

  syncHeaderState();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
};
