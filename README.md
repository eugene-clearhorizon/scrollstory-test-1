# Scrollstory Test 1

Interactive learning prototype for converting the "Final Impact Review: South Australia's Plan for Ageing Well 2020-2025" PowerPoint content into a web scrollstory.

This project is intentionally built as plain HTML/CSS/JS (no framework, no build step) so sections can be added quickly while experimenting with narrative sequence, visual design, and scroll-triggered reveals.

## Project Goal

Create a short, modular, web-based scrollstory where:

- content appears in narrative order while scrolling
- prior elements can remain visible to build cumulative context
- visuals and stats feel engaging but still easy to edit
- each section can be prototyped, reviewed, and adjusted independently

## Current Implementation (What Exists Now)

The story is currently a sequence of scene sections in `index.html`, each using sticky card behavior:

1. Title scene
- FINAL IMPACT REVIEW + report metadata.

2. Office for Ageing Well scene
- Introductory organisation context paragraph.

3. "What is the Plan for Ageing Well?" scene
- Ordered reveal sequence:
  - intro block
  - Home and Community card
  - Meaningful Connections card
  - Navigating Change card
- All revealed items stay visible together by the end.

4. Key Enablers scene
- Beige panel styled to match source visual direction.
- Three bullet points reveal one-by-one and remain visible.

5. Review Approach intro scene
- Simple text-only transition card introducing methods section.

6. Methods Lab scene (creative visual section)
- Four staged method cards with icon-driven presentation:
  - Community survey (2,819 animated count)
  - Interviews + focus groups (14 and 4 animated counts + tags)
  - Organisation survey
  - Policy + media analysis
- Progress chips show active/completed method state.
- Final stage reveals a compact all-methods summary block.

## Key Interaction Patterns

- `Scene activation`
  - Scenes fade/translate in when active using `IntersectionObserver`.
- `Cumulative reveal sections`
  - Plan and Enablers sections use stage/index logic so new elements appear in order while previous elements remain.
- `Scroll-progress staging`
  - Larger scenes (Plan and Methods) use scene progress thresholds to avoid all-at-once reveals.
- `Count-up animation`
  - Numeric stats animate once when their card first becomes active.

## File Map (Primary)

- `index.html`
  - Main narrative content and scene order.
- `src/styles/palette.css`
  - Shared priority palette variables for Home and Community, Meaningful Connections, and Navigating Change.
- `src/styles/main.css`
  - Visual language, layout, scene styling, transitions, responsive behavior.
- `src/scripts/main.js`
  - Scene activation, stage calculations, reveal/reset logic, count animations.
- `assets/diagrams/`
  - SVG/PNG icons used by cards and visual motifs.
- `assets/images/`
  - Exported chapter/slide images for future sections and variants.

## Asset References Used

- `ch01-1-purple-circle.svg`
- `ch01-2-blue-circle.svg`
- `ch01-3-green-circle.svg`
- `ch01-community-survey-icon.svg`
- `ch01-interviews-icon.svg`
- `ch01-org-partner-survey-icon.svg`
- `ch01-policy-media-analysis-icon.svg`

## Run Locally

Serve via local HTTP server:

```powershell
cd Scrollstory_test_1
python -m http.server 8000
```

Open:

`http://localhost:8000`

Use `Ctrl+F5` after JS/CSS edits to avoid stale cache behavior.

## Reusable Priority Chapter Pattern

The Home and Community section now acts as the template for the next two priority chapters.

### Chapter structure

For each priority chapter, add scenes in this order:

1. `Intro hero scene`
- Large image-led card.
- No white inner panel background.
- Photo sits above a colored accent panel.
- Main priority title appears in bold white text inside the accent panel.
- Supporting subtitle sits below in smaller white text.

2. `Priority summary scene`
- One paragraph explaining the priority in plain language.
- Uses the standard sticky scene card.

3. `What's working well? scene`
- Heading with section icon.
- Three result cards.
- Prefer icon or pictogram-based visuals over generic bars when possible.

4. `What are the challenges? scene`
- Heading with section icon.
- Three challenge cards.
- Use the same card system as the results section, but avoid fake precision if there is no numeric data.

5. `Key takeaway scene`
- Dark priority-colored panel with white text.
- Short closing insight for the chapter.

### Scene naming pattern

Use chapter-specific class names that mirror the Home and Community implementation:

- `scene-home-community`
- `scene-home-community-summary`
- `scene-home-community-results`
- `scene-home-community-challenges`
- `scene-home-community-takeaway`

For the next chapters, follow the same pattern:

- `scene-meaningful-connections`
- `scene-meaningful-connections-summary`
- `scene-meaningful-connections-results`
- `scene-meaningful-connections-challenges`
- `scene-meaningful-connections-takeaway`

- `scene-navigating-change`
- `scene-navigating-change-summary`
- `scene-navigating-change-results`
- `scene-navigating-change-challenges`
- `scene-navigating-change-takeaway`

### Color system

All priority colors should come from `src/styles/palette.css`.

Use these base variables:

- Home and Community
  - `--priority-home`
  - `--priority-home-light`
- Meaningful Connections
  - `--priority-connections`
  - `--priority-connections-light`
- Navigating Change
  - `--priority-change`
  - `--priority-change-light`

When building the blue and green chapters, create any extra accent variables in `palette.css` first rather than hard-coding colors in `main.css`.

### Hero card rules

Match the current Home and Community intro card:

- Use a centered standalone image panel.
- Keep the scene background in the chapter light color.
- Make the intro scene's `.scene-inner` transparent so only the image and accent panel are visible.
- Place the image on top with rounded top corners.
- Place the accent panel directly underneath with rounded bottom corners.
- Put the main title in bold white serif text.
- Put the subtitle in smaller white text below.

### Results and challenges card rules

Use a shared card format across all three chapters:

- Section heading uses a small icon plus heading text.
- Three cards per row on desktop, stacked on mobile.
- Numeric measures should use visual forms that match the meaning:
  - `9 out of 10` or similar: use human pictograms.
  - `2 in 3` or similar: use the same pictogram style scaled to the denominator.
  - qualitative findings: use a representative icon instead of a fake chart.
- If a pictogram is used, animate icons in one-by-one when the scene becomes active.

### Asset guidance

For each new chapter, prepare:

- one hero image in `assets/images/`
- one "working well" icon in `assets/diagrams/`
- one challenges icon in `assets/diagrams/`
- one takeaway icon in `assets/diagrams/`
- any extra qualitative icons needed for result/challenge cards

Keep icons in the chapter's dark priority color unless there is a deliberate reason not to.

### Recommended build workflow for the next two chapters

1. Add or confirm palette variables in `src/styles/palette.css`.
2. Duplicate the Home and Community scene sequence in `index.html` and rename the classes for the new priority.
3. Reuse the same structural CSS patterns in `src/styles/main.css`, swapping to the new chapter palette variables.
4. Replace copy, icons, and hero image.
5. Check whether each card should use pictograms, a representative icon, or text only.
6. Refresh with `Ctrl+F5` and scroll through the full chapter to confirm spacing, transitions, and mobile stacking.

## How To Continue In Future Chats

When asking for changes, specify:

1. `Target scene location`
- example: "insert after Key Enablers section"

2. `Content`
- exact heading, paragraph text, bullets, labels, stats

3. `Reveal behavior`
- one-by-one, cumulative, replace-on-scroll, or all-at-once

4. `Visual direction`
- simple text card, tinted list, stat card, icon panel, timeline, etc.

5. `Assets to use`
- exact filenames from `assets/diagrams` or `assets/images`

## Notes

- Legacy scaffold files (`src/components/*`, `src/content/chapters.json`, `src/scripts/scroll-engine.js`, `data/metrics.json`) are from the earlier prototype path and are not required by the current scene-driven implementation.
- Current source of truth for story behavior is `index.html` + `src/styles/main.css` + `src/scripts/main.js`.
