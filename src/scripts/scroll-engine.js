export function initScrollEngine({ stepSelector = "[data-step]", onStepChange }) {
  const steps = [...document.querySelectorAll(stepSelector)];
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const step = entry.target;
        const chapterId = step.dataset.chapterId;
        const index = Number(step.dataset.index || 0);

        steps.forEach((el) => el.classList.remove("active"));
        step.classList.add("active");

        if (typeof onStepChange === "function") {
          onStepChange({ chapterId, index, step });
        }
      });
    },
    {
      root: null,
      threshold: 0.65,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  steps.forEach((step) => observer.observe(step));
}
