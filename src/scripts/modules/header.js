const media = window.matchMedia("(max-width: 860px)");

export const initHeader = () => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  const links = panel ? panel.querySelectorAll("a") : [];

  if (!header || !toggle || !panel) {
    return;
  }

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
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

  media.addEventListener("change", (event) => {
    if (!event.matches) {
      setOpen(false);
    }
  });

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
};

