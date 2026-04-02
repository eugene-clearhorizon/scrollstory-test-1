const scenes = [...document.querySelectorAll("[data-scene]")];
const planScene = document.querySelector(".scene-plan");
const priorityCards = [...document.querySelectorAll(".priority-card")];
const planSequenceItems = [...document.querySelectorAll(".plan-sequence-item")]
  .sort((a, b) => Number(a.dataset.seqIndex) - Number(b.dataset.seqIndex));
const enablerScene = document.querySelector(".scene-enablers");
const enablerItems = [...document.querySelectorAll(".enabler-item")]
  .sort((a, b) => Number(a.dataset.enablerIndex) - Number(b.dataset.enablerIndex));
const methodsScene = document.querySelector(".scene-methods");
const methodChips = [...document.querySelectorAll(".method-chip")]
  .sort((a, b) => Number(a.dataset.chipIndex) - Number(b.dataset.chipIndex));
const nextStepsThemesScene = document.querySelector(".scene-next-steps-themes");
let currentNextStepsThemesStage = 0;
let maxRevealedIndex = -1;
let maxEnablerRevealedIndex = -1;
let currentMethodsStage = 0;

function setActiveScene(activeScene) {
  scenes.forEach((scene) => {
    scene.classList.toggle("is-active", scene === activeScene);
  });
}

function applyPlanStageClass() {
  if (!planScene) return;

  planScene.classList.remove(
    "scene-plan-stage-0",
    "scene-plan-stage-1",
    "scene-plan-stage-2",
    "scene-plan-stage-3",
    "scene-plan-stage-4"
  );

  const stage = Math.max(0, Math.min(4, maxRevealedIndex + 1));
  planScene.classList.add(`scene-plan-stage-${stage}`);
}

function revealUpTo(index) {
  if (index <= maxRevealedIndex) return;
  maxRevealedIndex = index;

  planSequenceItems.forEach((item) => {
    const seqIndex = Number(item.dataset.seqIndex);
    if (seqIndex <= maxRevealedIndex) {
      item.classList.add("is-revealed");
    }
  });

  applyPlanStageClass();
}

function resetPlanSequence() {
  maxRevealedIndex = -1;
  planSequenceItems.forEach((item) => item.classList.remove("is-revealed"));
  applyPlanStageClass();
}

function computePlanStageFromScroll() {
  if (!planScene) return 0;

  const rect = planScene.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const startY = viewportHeight * 0.8;
  const endY = viewportHeight * 0.2;
  const travel = rect.height - (startY - endY);

  if (travel <= 0) {
    return rect.top <= startY ? 4 : 0;
  }

  const rawProgress = (startY - rect.top) / travel;
  const progress = Math.max(0, Math.min(1, rawProgress));

  if (progress >= 0.8) return 4;
  if (progress >= 0.58) return 3;
  if (progress >= 0.35) return 2;
  if (progress >= 0.14) return 1;
  return 0;
}

function revealEnablersUpTo(index) {
  if (index <= maxEnablerRevealedIndex) return;
  maxEnablerRevealedIndex = index;

  enablerItems.forEach((item, itemIndex) => {
    if (itemIndex <= maxEnablerRevealedIndex) {
      item.classList.add("is-revealed");
    }
  });
}

function resetEnablerSequence() {
  maxEnablerRevealedIndex = -1;
  enablerItems.forEach((item) => item.classList.remove("is-revealed"));
}

function computeEnablerStageFromScroll() {
  if (!enablerScene) return 0;

  const rect = enablerScene.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const startY = viewportHeight * 0.82;
  const endY = viewportHeight * 0.2;
  const travel = rect.height - (startY - endY);

  if (travel <= 0) {
    return rect.top <= startY ? enablerItems.length : 0;
  }

  const rawProgress = (startY - rect.top) / travel;
  const progress = Math.max(0, Math.min(1, rawProgress));

  if (progress >= 0.7) return 3;
  if (progress >= 0.47) return 2;
  if (progress >= 0.24) return 1;
  return 0;
}

function computeMethodsStageFromScroll() {
  if (!methodsScene) return 0;

  const rect = methodsScene.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const startY = viewportHeight * 0.82;
  const endY = viewportHeight * 0.2;
  const travel = rect.height - (startY - endY);

  if (travel <= 0) {
    return rect.top <= startY ? 4 : 0;
  }

  const rawProgress = (startY - rect.top) / travel;
  const progress = Math.max(0, Math.min(1, rawProgress));

  if (progress >= 0.79) return 4;
  if (progress >= 0.57) return 3;
  if (progress >= 0.35) return 2;
  if (progress >= 0.15) return 1;
  return 0;
}

function computeNextStepsThemesStageFromScroll() {
  if (!nextStepsThemesScene) return 0;

  const rect = nextStepsThemesScene.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const startY = viewportHeight * 0.82;
  const endY = viewportHeight * 0.2;
  const travel = rect.height - (startY - endY);

  if (travel <= 0) {
    return rect.top <= startY ? 4 : 0;
  }

  const rawProgress = (startY - rect.top) / travel;
  const progress = Math.max(0, Math.min(1, rawProgress));

  if (progress >= 0.78) return 4;
  if (progress >= 0.58) return 3;
  if (progress >= 0.36) return 2;
  if (progress >= 0.14) return 1;
  return 0;
}

function animateCount(targetEl) {
  if (!targetEl || targetEl.dataset.animated === "true") return;
  const target = Number(targetEl.dataset.target || 0);
  if (!Number.isFinite(target) || target <= 0) return;

  targetEl.dataset.animated = "true";
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    targetEl.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      targetEl.textContent = target.toLocaleString();
    }
  };

  requestAnimationFrame(tick);
}

function runMethodStageAnimations(stage) {
  const activeCard = document.querySelector(`.method-card[data-method-index="${stage - 1}"]`);
  if (!activeCard) return;

  setTimeout(() => {
    activeCard.querySelectorAll(".count[data-target]").forEach((countNode) => {
      animateCount(countNode);
    });
  }, 300);
}

function setMethodsStage(stage) {
  if (!methodsScene) return;
  const clampedStage = Math.max(0, Math.min(4, stage));
  if (clampedStage === currentMethodsStage) return;

  methodsScene.classList.remove(
    "scene-methods-stage-0",
    "scene-methods-stage-1",
    "scene-methods-stage-2",
    "scene-methods-stage-3",
    "scene-methods-stage-4"
  );
  methodsScene.classList.add(`scene-methods-stage-${clampedStage}`);
  currentMethodsStage = clampedStage;

  methodChips.forEach((chip, idx) => {
    chip.classList.remove("is-active", "is-complete");
    const activeIndex = clampedStage - 1;
    if (idx < activeIndex) chip.classList.add("is-complete");
    if (idx === activeIndex) chip.classList.add("is-active");
  });

  if (clampedStage > 0) {
    runMethodStageAnimations(clampedStage);
  }
}

function setNextStepsThemesStage(stage) {
  if (!nextStepsThemesScene) return;
  const clampedStage = Math.max(0, Math.min(4, stage));
  if (clampedStage === currentNextStepsThemesStage) return;

  nextStepsThemesScene.classList.remove(
    "scene-next-steps-themes-stage-0",
    "scene-next-steps-themes-stage-1",
    "scene-next-steps-themes-stage-2",
    "scene-next-steps-themes-stage-3",
    "scene-next-steps-themes-stage-4"
  );
  nextStepsThemesScene.classList.add(`scene-next-steps-themes-stage-${clampedStage}`);
  currentNextStepsThemesStage = clampedStage;
}

if (scenes.length) {
  const sceneVisibility = new Map();

  const sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sceneVisibility.set(
          entry.target,
          entry.isIntersecting ? entry.intersectionRatio : 0
        );
      });

      let bestScene = null;
      let bestRatio = 0;
      sceneVisibility.forEach((ratio, scene) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestScene = scene;
        }
      });

      if (bestScene) {
        setActiveScene(bestScene);
        if (bestScene === planScene) {
          revealUpTo(0);
        }
      }
    },
    {
      threshold: [0.1, 0.25, 0.5],
      rootMargin: "-5% 0px -10% 0px"
    }
  );

  scenes.forEach((scene) => {
    sceneVisibility.set(scene, 0);
    sceneObserver.observe(scene);
  });
  setActiveScene(scenes[0]);
}

if (priorityCards.length && planScene) {
  const planResetObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const scrolledAbove = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && scrolledAbove) {
          resetPlanSequence();
        }
      });
    },
    {
      threshold: 0
    }
  );

  planResetObserver.observe(planScene);
  applyPlanStageClass();

  let ticking = false;
  const updatePlanSequenceFromScroll = () => {
    ticking = false;
    const stage = computePlanStageFromScroll();
    revealUpTo(Math.max(0, stage - 1));
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updatePlanSequenceFromScroll);
    },
    { passive: true }
  );

  window.addEventListener("resize", updatePlanSequenceFromScroll);
  updatePlanSequenceFromScroll();
}

if (enablerItems.length && enablerScene) {
  const enablerResetObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const scrolledAbove = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && scrolledAbove) {
          resetEnablerSequence();
        }
      });
    },
    {
      threshold: 0
    }
  );

  enablerResetObserver.observe(enablerScene);

  let enablerTicking = false;
  const updateEnablerSequenceFromScroll = () => {
    enablerTicking = false;
    const stage = computeEnablerStageFromScroll();
    if (stage > 0) {
      revealEnablersUpTo(stage - 1);
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (enablerTicking) return;
      enablerTicking = true;
      window.requestAnimationFrame(updateEnablerSequenceFromScroll);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateEnablerSequenceFromScroll);
  updateEnablerSequenceFromScroll();
}

if (methodsScene) {
  let methodsTicking = false;
  const updateMethodsFromScroll = () => {
    methodsTicking = false;
    const stage = computeMethodsStageFromScroll();
    setMethodsStage(stage);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (methodsTicking) return;
      methodsTicking = true;
      window.requestAnimationFrame(updateMethodsFromScroll);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateMethodsFromScroll);
  setMethodsStage(0);
  updateMethodsFromScroll();
}

if (nextStepsThemesScene) {
  let nextStepsThemesTicking = false;
  const updateNextStepsThemesFromScroll = () => {
    nextStepsThemesTicking = false;
    const stage = computeNextStepsThemesStageFromScroll();
    setNextStepsThemesStage(stage);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (nextStepsThemesTicking) return;
      nextStepsThemesTicking = true;
      window.requestAnimationFrame(updateNextStepsThemesFromScroll);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateNextStepsThemesFromScroll);
  setNextStepsThemesStage(0);
  updateNextStepsThemesFromScroll();
}
