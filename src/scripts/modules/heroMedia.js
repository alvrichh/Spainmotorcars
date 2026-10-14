/**
 * Background video for the hero.
 * - Not played when the visitor prefers reduced motion or has data saving on;
 *   the poster image stays instead.
 * - Paused while the hero is off screen to save battery and bandwidth.
 */
export const initHeroMedia = () => {
  const video = document.querySelector("[data-hero-video]");

  if (!video) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData === true;

  if (reduceMotion || saveData) {
    video.pause();
    video.removeAttribute("autoplay");
    video.querySelectorAll("source").forEach((source) => source.remove());
    video.load();
    return;
  }

  const play = () => video.play().catch(() => {});

  if (!("IntersectionObserver" in window)) {
    play();
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? play() : video.pause()),
    { threshold: 0.05 }
  );

  observer.observe(video.closest(".hero") || video);
};
