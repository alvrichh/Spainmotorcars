/**
 * Light / dark theme toggle.
 *
 * The inline script in partials/head.html applies the theme before first paint.
 * This module wires the toggle button, saves an explicit choice and, while the
 * visitor has not chosen, follows changes in the system preference.
 */
const STORAGE_KEY = "sm_theme";
const root = document.documentElement;
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

const readSaved = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const save = (theme) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable: the choice lasts for this page view only.
  }
};

export const initTheme = () => {
  const toggle = document.querySelector("[data-theme-toggle]");

  const apply = (theme) => {
    root.setAttribute("data-theme", theme);

    if (toggle) {
      const isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "aria-label",
        isDark ? toggle.dataset.labelLight : toggle.dataset.labelDark
      );
    }
  };

  apply(root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light"));

  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    save(next);
    apply(next);
  });

  systemDark.addEventListener("change", (event) => {
    if (!readSaved()) {
      apply(event.matches ? "dark" : "light");
    }
  });
};
