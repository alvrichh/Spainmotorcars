/**
 * Background video for the hero.
 * - Skipped entirely when the visitor prefers reduced motion (the poster stays).
 * - Paused while the hero is off screen to save battery and bandwidth.
 */
export const initHeroMedia = () => {
  const hero = document.querySelector(".hero");
  const iframe = hero ? hero.querySelector(".hero__media iframe") : null;

  if (!iframe) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    iframe.remove();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const send = (method) => {
    iframe.contentWindow?.postMessage(JSON.stringify({ method }), "https://player.vimeo.com");
  };

  const observer = new IntersectionObserver(
    ([entry]) => send(entry.isIntersecting ? "play" : "pause"),
    { threshold: 0.05 }
  );

  observer.observe(hero);
};
