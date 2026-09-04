# Student Performance Dashboard — Design Direction

## Ground-truth reference

The provided Pinterest pin points to a **Student Performance Analysis Dashboard** case study. The implementation should preserve its central qualities: a clean white canvas, strong information hierarchy, compact analytics cards, a dark navy navigation rail, cool blue highlights, soft shadows, rounded corners, and clear data visualization. This project is a simpler, functional reinterpretation rather than a pixel-identical copy.

## Chosen direction: Quiet Signal

### Design Movement
Editorial data visualization meets contemporary education software: restrained Swiss-influenced structure, warm paper-like surfaces, and bright signal colors used only to guide attention.

### Core Principles
1. Make every section answer one question: who is the learner, what is the predicted outcome, and what support path should happen next.
2. Prefer evidence-bearing UI—scores, progress bars, graph steps, and concise labels—over decorative chrome.
3. Use asymmetry intentionally: a dark, anchored navigation rail and a generous working canvas create a calm dashboard rhythm.
4. Keep the technical model understandable. The predictor is one weighted score, while BFS and DFS are visible learning tools rather than hidden complexity.

### Color Philosophy
Warm ivory is the default surface so the interface feels like a clear working paper, not a cold admin system. Ink navy grounds the navigation and creates trust. Electric blue is the signature signal for actions and positive momentum; coral is reserved for attention and at-risk states; mint is used for healthy outcomes. The palette is deliberately high-contrast and low-noise.

### Layout Paradigm
Persistent left rail + offset content canvas. The top-level page is split into a narrow navigation spine and a wide analysis area. The hero uses a two-column arrangement: explanatory copy and a live prediction card. Below, compact stat cards lead into a wider graph-learning section. Avoid full-page centered stacking.

### Signature Elements
- A cobalt vertical navigation spine with small numbered / icon cues.
- Rounded white cards on a warm ivory canvas, with thin blue top markers and soft, quiet shadows.
- A cobalt “signal” line motif repeated in the predictor result and the graph traversal timeline.

### Interaction Philosophy
Interactions should feel like turning a page in a well-edited workbook. Inputs are direct and labeled. Run Prediction gives immediate feedback and updates the result card. BFS and DFS are selectable tabs that reveal a step-by-step sequence and keep the active node visually distinct. Buttons have a short press response and clear focus states.

### Animation
Use subtle entrances only for the result card and traversal steps. Keep transitions under 240ms, animate opacity and transform only, and respect prefers-reduced-motion. Avoid animated charts that imply false precision.

### Typography System
Use **DM Sans** for interface text and **Space Grotesk** for display headings and metric numerals. Headings use compact, slightly tight tracking; body copy stays readable at 15–16px. Labels are uppercase with moderate letter spacing. Never use Inter.

### Brand Essence
**Northstar Study** is a compact learning signal dashboard for educators who want an interpretable prediction and a next-step path, without a black-box workflow.

Personality: lucid, encouraging, precise.

### Brand Voice
Headlines are concise and directional. CTAs describe the action, not the feature. Microcopy is calm, specific, and never alarmist.

Example lines:
- “See the signal. Plan the support.”
- “Run a prediction from the learner’s current pattern.”

### Wordmark & Logo
Use a simple four-point northstar mark built from two offset diamond shapes, paired with the custom wordmark “northstar study” in Space Grotesk. The mark should read as orientation and progress, not a generic graduation cap.

### Signature Brand Color
**Northstar cobalt — #2F6BFF**. It is vivid enough to guide the eye, but not so saturated that it overwhelms the calm paper-and-ink system.

## Implementation guardrails

Keep the app frontend-only and small. Use one predictor only: an interpretable weighted score of attendance, assignment completion, study hours, and current average, mapped to a projected percentage and band. Implement BFS and DFS on one small, fixed learning-support graph. No backend, no external APIs, no fake testimonials, and no unnecessary multi-page routing.
