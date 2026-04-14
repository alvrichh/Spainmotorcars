const media = window.matchMedia("(max-width: 860px)");

export const initHeader = () => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  const hero = document.querySelector(".hero");
  const links = panel ? panel.querySelectorAll("a") : [];

  if (!header || !toggle || !panel) {
    return;
  }

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  const syncHeaderState = () => {
    const heroLimit = hero ? hero.offsetHeight - header.offsetHeight - 36 : 0;
    const lightTheme = hero ? window.scrollY <= Math.max(heroLimit, 0) : false;

    header.classList.toggle("is-light", lightTheme);
    header.classList.toggle("is-dark", !lightTheme);
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

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
  window.addEventListener("resize", syncHeaderState);
};
