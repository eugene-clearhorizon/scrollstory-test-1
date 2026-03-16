import { createStatCard } from "./stat-card.js";

export function renderChapter(chapter, stepTemplate) {
  const section = document.createElement("section");
  section.className = "chapter";
  section.id = chapter.id;

  const visualPanel = document.createElement("aside");
  visualPanel.className = "visual-panel";

  const kicker = document.createElement("p");
  kicker.className = "visual-kicker";
  kicker.textContent = chapter.kicker;

  const title = document.createElement("h2");
  title.className = "visual-title";
  title.textContent = chapter.title;

  const visualFrame = document.createElement("figure");
  visualFrame.className = "visual-frame";

  const visualImage = document.createElement("img");
  visualImage.className = "visual-image";
  visualImage.loading = "lazy";
  visualImage.src = chapter.visual.default.src;
  visualImage.alt = chapter.visual.default.alt;
  visualImage.dataset.chapterId = chapter.id;

  const visualBadge = document.createElement("img");
  visualBadge.className = "visual-badge";
  visualBadge.loading = "lazy";
  visualBadge.alt = chapter.stepVisuals?.[0]?.iconAlt || "Step icon";
  visualBadge.src = chapter.stepVisuals?.[0]?.icon || "";
  visualBadge.dataset.chapterId = chapter.id;
  if (!visualBadge.src) {
    visualBadge.classList.add("hidden");
  }

  visualFrame.append(visualImage, visualBadge);

  const statGrid = document.createElement("div");
  statGrid.className = "stat-grid";
  chapter.stats.forEach((stat) => {
    statGrid.append(createStatCard(stat, chapter.id));
  });

  visualPanel.append(kicker, title, visualFrame, statGrid);

  const steps = document.createElement("div");
  steps.className = "steps";

  chapter.steps.forEach((step, idx) => {
    const stepVisual = chapter.stepVisuals?.[idx] || chapter.visual.default;
    const node = stepTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.stepId = step.id;
    node.dataset.chapterId = chapter.id;
    node.dataset.index = String(idx);
    node.dataset.visualSrc = stepVisual.src;
    node.dataset.visualAlt = stepVisual.alt;
    node.dataset.iconSrc = stepVisual.icon || "";
    node.dataset.iconAlt = stepVisual.iconAlt || "";

    node.querySelector(".step-title").textContent = step.title;
    node.querySelector(".step-body").textContent = step.body;

    steps.append(node);
  });

  section.append(visualPanel, steps);
  return section;
}
