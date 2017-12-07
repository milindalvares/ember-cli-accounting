# ember-cli-accounting changelog

### 2.0.2
* [ENHANCEMENT] Updated to ember-cli 2.17.0
* [BUGFIX] Fix issues with rounding causing `-0` to be displayed

### 2.0.1
- [BUGFIX] Do not include /typings folder in published package.

### 2.0.0
* Drop support for node 0.10/0.12 and Ember < 2.4 (if might work, but I don't test it anymore)

### 1.0.2
* Fixed compatibility with Glimmer2

### 1.0.0 Final Release
* [BREAKING CHANGE] Only works with Ember 1.13+ (including Ember 2.0)
* Now that Ember has a stable public API this can be considered stable. Future versions if any
  will track improvements in accounting.js itself.

### 0.1.0
* [BREAKING CHANGE] Only works with HTMLBars. No new functionalities.
  Use 0.0.4 if you need to use it in ember < 1.10.0

### 0.0.4
* [FEATURE] Helpers works with HTMLBars :)
* [ENHALCEMENT] Addon tested simultaneously in release/beta/canary/canary+htmlbars embers

### 0.0.3
* [ENHALCEMENT] Improved readme.
* [BUGFIX] Fix wrong imports in tests.
* [ENHALCEMENT] Add travis badge :)
* [ENHALCEMENT] Added CHANGELOG
* [ENHALCEMENT] Updated to ember-cli 0.1.0
* [DOC] Added yuidoc with examples and live generation with `ember serve --docs`
* [FEATURE] Added htmlbar helpers: `format-number` and `format-money`

### 0.0.2
* [ENHALCEMENT] Use idiomatic addon structure using ember-cli addon generator.
