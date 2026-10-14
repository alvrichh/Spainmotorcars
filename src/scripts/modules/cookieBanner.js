/**
 * Subtle cookie notice.
 *
 * This is a visual placeholder: it remembers the visitor's choice so the notice
 * does not reappear, but it does not load or block any script. Wire it to a real
 * consent manager before adding analytics or marketing cookies.
 */
const STORAGE_KEY = "sm_cookie_consent";
const SHOW_DELAY = 1200;

const readChoice = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveChoice = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). Ignore.
  }
};

export const initCookieBanner = () => {
  const banner = document.querySelector("[data-cookie-banner]");

  if (!banner || readChoice()) {
    return;
  }

  banner.hidden = false;
  window.setTimeout(() => banner.classList.add("is-visible"), SHOW_DELAY);

  banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      saveChoice(button.dataset.cookieChoice);
      banner.classList.remove("is-visible");
      banner.addEventListener("transitionend", () => (banner.hidden = true), { once: true });
    });
  });
};
