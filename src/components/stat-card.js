export function createStatCard(stat, chapterId) {
  const card = document.createElement("article");
  card.className = "stat-card";
  card.dataset.statId = stat.id;
  card.dataset.chapterId = chapterId;

  const value = document.createElement("p");
  value.className = "stat-value";
  value.textContent = stat.value;

  const label = document.createElement("p");
  label.className = "stat-label";
  label.textContent = stat.label;

  card.append(value, label);
  return card;
}
