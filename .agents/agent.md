# AGENTS.md

## Project overview

This repository contains a wedding website for **María and Calum**.

The wedding will take place in **March 2027**.

The website should feel elegant, romantic, modern and personal, without looking overly ornate or old-fashioned.

The main visual palette is based on:

* Burgundy / wine tones
* Off-white / warm ivory
* Soft neutral accents

Avoid generic wedding-template styling. The final result should feel custom-made for María and Calum.

---

## Tech stack

Frontend:

* Vue 3
* Composition API
* Vite
* JavaScript or TypeScript depending on the existing project setup
* CSS / SCSS depending on the existing project setup

Backend:

* Python

Do not introduce new frameworks or large dependencies unless they provide a clear benefit.

Prefer simple, maintainable solutions.

Before installing a dependency, check whether the functionality can reasonably be implemented with the existing stack.

---

## General development rules

Before modifying code:

1. Inspect the existing project structure.
2. Follow the conventions already used in the repository.
3. Reuse existing components, utilities and styles whenever possible.
4. Avoid rewriting working code unnecessarily.
5. Make the smallest reasonable change that solves the requested problem.

When a change affects several components, keep responsibilities separated instead of creating a very large component.

Prefer readable code over clever code.

---

## Vue conventions

Use Vue 3 Composition API.

Prefer:

```vue
<script setup>
</script>
```

Components should have a clear responsibility.

Extract reusable components when the same visual or behavioural pattern appears more than once.

Avoid unnecessary watchers.

Prefer:

* computed properties for derived state
* props for parent → child communication
* emits for child → parent communication
* composables for reusable behaviour

Keep templates readable and avoid putting complex logic directly inside the HTML.

---

## Naming

Use descriptive names in English for:

* variables
* functions
* components
* composables
* CSS custom properties
* files when appropriate

Examples:

```js
const guestName = ref('')
const isEnvelopeOpen = ref(false)
const selectedLanguage = ref('es')
```

Avoid vague names such as:

```js
data
value
thing
item2
test
```

unless their context makes their meaning completely obvious.

---

## CSS custom properties

Use CSS custom properties for the design system.

IMPORTANT:

**Custom property names must describe their semantic purpose and must NOT contain the literal colour name.**

Do NOT do this:

```css
--burgundy: #6f1d2c;
--white: #f8f3eb;
--dark-red: #541421;
```

Do this instead:

```css
--color-primary: #6f1d2c;
--color-primary-dark: #541421;
--color-background: #f8f3eb;
--color-surface: #fffaf4;
--color-text: #2b2525;
--color-text-muted: #706767;
--color-border: rgba(43, 37, 37, 0.18);
```

The goal is to allow the entire palette to change later without renaming variables.

Reuse the existing design tokens instead of adding almost-identical colours throughout the CSS.

Avoid hard-coded colours inside components whenever a suitable custom property exists.

---

## Responsive design

The site must work correctly on:

* Mobile phones
* Tablets
* Laptops
* Desktop screens

Mobile design is especially important because most wedding guests will probably open the invitation from their phone.

Avoid layouts that only look correct at one fixed width.

Use fluid dimensions where appropriate:

```css
clamp()
min()
max()
minmax()
```

Prefer CSS Grid and Flexbox instead of absolute positioning for structural layout.

Absolute positioning is acceptable for decorative elements and animations.

Always check that:

* Text does not overflow
* Buttons remain easy to tap
* Forms remain usable
* Images crop correctly
* Animations do not break the layout
* Sections retain comfortable spacing

---

## Accessibility

Use semantic HTML whenever possible.

Examples:

```html
<header>
<nav>
<main>
<section>
<form>
<button>
<footer>
```

Buttons must be actual `<button>` elements when they perform an action.

Links must be actual `<a>` elements when they navigate somewhere.

Images should include useful `alt` text unless they are purely decorative.

Forms must have associated labels.

Interactive elements must remain usable with keyboard navigation.

Maintain sufficient colour contrast.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Animations should be reduced or disabled when the user requests reduced motion.

---

## Languages

The website must support:

* Spanish (`es`)
* English (`en`)

Spanish is the primary language.

All visible user-facing text must be translatable.

Do NOT hard-code significant interface text directly inside components if the project already has or can reasonably use a translation structure.

Prefer a structure similar to:

```js
const translations = {
  es: {
    navigation: {},
    hero: {},
    venue: {},
    itinerary: {},
    rsvp: {},
  },

  en: {
    navigation: {},
    hero: {},
    venue: {},
    itinerary: {},
    rsvp: {},
  },
}
```

The language selector should be simple and unobtrusive.

Changing the language should update the page without reloading it.

Do not translate:

* María
* Calum
* Proper venue names
* Proper place names

unless a specific translated name is explicitly provided.

---

## Main website sections

The planned website contains the following areas.

### 1. Envelope introduction

The first experience should resemble receiving/opening a wedding invitation.

There should be an animated envelope or invitation-opening interaction.

The animation should feel elegant and smooth rather than playful or cartoonish.

Keep performance in mind.

The website must still be usable if animations are disabled.

---

## 2. Hero / cover

After opening the invitation, display the main wedding cover.

It should prominently show:

**María & Calum**

Include the wedding date and other key information once the final content is available.

The hero should have strong visual impact without becoming cluttered.

---

## 3. Wedding location

Display the ceremony / celebration location.

The section can include a card interaction such as a flip card if it works well on both desktop and mobile.

Include access to the location/map.

Do not make essential information accessible only through hover because mobile devices do not have hover.

---

## 4. Itinerary

Display the wedding-day schedule clearly.

Typical events may include:

* Ceremony
* Reception
* Meal
* Party
* Transport

The exact content will be replaced with final information later.

The itinerary should be easy to scan from a mobile phone.

---

## 5. RSVP

Create an RSVP form.

The final fields may change, so the implementation should be easy to extend.

Possible fields include:

* Guest name
* Attendance confirmation
* Number of guests
* Dietary restrictions
* Allergies
* Transport requirements
* Accommodation information
* Additional notes

Do not assume these fields are final unless explicitly instructed.

Validate required fields.

Show clear success and error states.

Never silently fail.

---

## 6. Dress code

Include a section explaining the wedding dress code.

It should support text and potentially simple visual references.

Keep it elegant and concise.

---

## 7. Frequently asked questions

Provide a FAQ section for practical guest information.

Potential questions may relate to:

* Transport
* Parking
* Accommodation
* Children
* Dress code
* Timings
* Accessibility

The final questions will be supplied later.

An accordion interface is acceptable if accessible.

---

## 8. Song requests

Guests should be able to suggest songs for the wedding.

The interface should be simple.

Possible fields:

* Guest name
* Song
* Artist

Do not require unnecessary information.

---

## 9. Gift section

Include a wedding gift section.

The exact wording and payment/bank information will be provided later.

Treat financial information as configurable content.

Do not hard-code real bank details in reusable components.

---

## 10. Countdown

Include a countdown to the wedding.

The countdown should update correctly and display values such as:

* Days
* Hours
* Minutes
* Seconds

The wedding date should exist in one central configuration location rather than being duplicated across components.

Example:

```js
export const weddingConfig = {
  date: '',
}
```

The exact date can be inserted once confirmed.

---

## 11. Guest photo gallery

The planned site may include a gallery where wedding guests can upload photos.

The intended flow is:

1. Guest selects/upload photos.
2. Photos are stored through the backend.
3. Approved or available photos can be displayed in the website gallery.

This feature may be implemented later.

Keep the architecture extensible so the gallery does not require restructuring the whole application.

Do not expose storage credentials or secrets in frontend code.

---

## Content configuration

Where reasonable, wedding-specific information should be kept separate from presentation components.

For example:

```js
export const weddingConfig = {
  couple: {
    partnerOne: 'María',
    partnerTwo: 'Calum',
  },

  wedding: {
    date: '',
    ceremony: {},
    reception: {},
  },
}
```

This makes it easy to update real information without editing multiple components.

Do not invent final wedding details if they have not been supplied.

Placeholder content is acceptable during development.

Clearly identify placeholder data.

---

## Design direction

The design should be:

* Elegant
* Romantic
* Clean
* Editorial
* Warm
* Modern

Avoid:

* Excessive gradients
* Excessive shadows
* Neon colours
* Generic Bootstrap-style cards
* Cartoon wedding icons
* Overly ornate decorations
* Excessive animations
* Too many font styles

Whitespace should be used intentionally.

Decorative details should support the design rather than dominate it.

---

## Typography

Typography should feel editorial and appropriate for a wedding invitation.

A combination such as:

* Elegant serif or display font for headings
* Highly readable serif or sans-serif for body text

is preferred.

Do not use more fonts than necessary.

Ensure body text remains comfortably readable on mobile.

---

## Animations

Animations should be subtle and purposeful.

Suitable examples:

* Envelope opening
* Gentle section reveal
* Small image transitions
* Subtle decorative movement
* Smooth accordion transitions

Avoid making every element animate.

Avoid animations that delay access to important information.

Animation durations and easing should ideally reuse shared custom properties.

Example:

```css
--motion-fast: 180ms;
--motion-normal: 320ms;
--motion-slow: 600ms;

--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-emphasized: cubic-bezier(0.2, 0.8, 0.2, 1);
```

---

## Images and assets

Optimise images for web use.

Prefer modern formats where appropriate.

Avoid committing unnecessarily huge image files.

Use responsive image behaviour.

For decorative assets, ensure they do not interfere with accessibility or interaction.

Keep image paths and asset organisation consistent.

---

## Backend rules

The backend is written in Python.

Backend responsibilities may eventually include:

* RSVP submissions
* Song suggestions
* Photo uploads
* Gallery data

Keep API endpoints clearly separated by responsibility.

Validate incoming data server-side even if frontend validation exists.

Never trust frontend input.

Secrets and credentials must come from environment variables.

Never commit:

* API keys
* Database credentials
* Storage credentials
* Passwords
* Private tokens

Use `.env.example` when environment variables need to be documented.

---

## API communication

Centralise frontend API communication rather than scattering `fetch()` calls throughout components.

Prefer a structure such as:

```text
src/
  services/
    api.js
    rsvpService.js
    galleryService.js
```

Handle:

* loading states
* errors
* successful responses

consistently.

---

## Error handling

User-facing errors should be understandable.

Do not expose stack traces or internal server errors to guests.

Prefer messages such as:

> No hemos podido enviar tu respuesta. Inténtalo de nuevo.

instead of technical error strings.

Provide equivalent English messages.

---

## Performance

The website should load quickly on mobile connections.

Avoid:

* unnecessarily large dependencies
* huge uncompressed images
* unnecessary JavaScript
* rendering large components before needed

Lazy-load heavy content when useful, particularly the gallery.

Animations should favour `transform` and `opacity` when possible.

---

## Code quality

When implementing a feature:

* Keep functions small enough to understand.
* Remove unused imports.
* Remove dead code.
* Avoid duplicating logic.
* Avoid unnecessary abstractions.
* Add comments only where they explain something that is not obvious from the code.

Do not add comments that simply repeat what a line of code does.

---

## Testing changes

Before considering a task finished:

1. Run the existing lint command if available.
2. Run the existing tests if available.
3. Run the production build.
4. Fix errors caused by the change.

At minimum, for the Vue frontend verify:

```bash
npm run build
```

Use the project's actual package manager and scripts.

Do not change package managers without a good reason.

---

## Existing behaviour

Do not remove existing working behaviour unless the request explicitly requires it.

When refactoring, preserve the current UX unless a UX change is part of the task.

If an existing implementation is unusual but functional, understand why it exists before replacing it.

---

## Git changes

Keep changes focused on the requested task.

Do not reformat unrelated files.

Do not modify generated files unless required.

Do not commit build output unless the repository already tracks it.

Use clear commit messages when asked to create commits.

Examples:

```text
feat: add bilingual language selector
feat: add wedding countdown
fix: improve envelope animation on mobile
refactor: extract RSVP form fields
style: improve itinerary responsive layout
```

---

## When requirements are unclear

If exact content is missing, prefer creating a configurable placeholder rather than inventing information.

For example, do not fabricate:

* Addresses
* Wedding times
* Bank accounts
* Phone numbers
* Guest instructions

Use clearly identifiable placeholder content instead.

For small implementation decisions, choose the solution that best matches the existing architecture rather than blocking progress.

---

## Priority order

When making technical decisions, prioritise:

1. Correct behaviour
2. Mobile usability
3. Maintainability
4. Accessibility
5. Visual consistency
6. Performance
7. Elegant animations

The website is primarily an invitation and practical information tool for wedding guests.

Visual details matter, but guests must always be able to quickly find and understand the important information.
