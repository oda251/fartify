# Fartify
## Overview
Chrome extention to fart. This program add fart effect to your browser.
## Sound from
https://onara-mp3.com/
## Build
1. `pnpm install`
2. `pnpm build`
## Structure
- Using WXT, a JavaScript (TypeScript) framework for building browser extensions, along with React:
1. Background
    - Manages configuration data through `chrome.runtime`.
2. Content
    - Add event listeners to document.
3. Popup
    - Provides a user interface for configuration.
4. Utils
    - Including main logic of fart.
