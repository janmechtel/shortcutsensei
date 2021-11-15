<p align="center">
<img src="https://user-images.githubusercontent.com/73364073/141783737-79275213-6e18-4553-808f-3503456ca5ff.png" width="300"/>
</p>

# Description
Shortcut Sensei is a cross-browser extension that teaches users how to use keyboard shortcuts for web apps. It does this by giving instant feedback when the user performs an action with the mouse instead of using the associated keyboard shortcut (see example image below). As of right now, Shortcut Sensei only works with Gmail, but more web apps will be added in the future.

You are encouraged to contribute to the development of Shortcut Sensei. The GNU GPLv3 license offers you permission to copy, modify and distribute the code, provided that your modifications and additions are also open-source. Reporting bugs / giving feedback can be done by sending an email to shortcutsensei@googlegroups.com and is also much appreciated.

# Installation
Download Shortcut Sensei from the [Chrome Web Store](https://chrome.google.com/webstore/detail/shortcut-sensei/ahhliekflgdfbgofmgamanngngnbaibh/related) or the [Firefox Add-Ons Store](https://addons.mozilla.org/en-US/firefox/addon/shortcutsensei/).

![Example](https://user-images.githubusercontent.com/73364073/141782179-6fe6e2fb-1a92-44f9-884f-fe62bb5e0b04.png)

# How to run
1. `npm install`
2. `npm run watch`
3. `web-ext run` for Firefox and `web-ext run -t chromium` for Chrome

# How to build
1. `npm install`
2. `npm run build`
3. `web-ext build`
