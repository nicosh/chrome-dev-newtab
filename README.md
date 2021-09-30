# Chrome Dev Newtab

A dev friendly new tab for Google Chrome.  
Google chrome extension that turn a new tab into a productive dashboard.

![Picture](https://user-images.githubusercontent.com/8511928/135485465-d1ae77b5-b735-4200-a9f1-7a2475930579.PNG)

🚧 **Features** 🚧 :

- Works offline ✅
- Show memory and cpu usage ✅
- Google or Stackoverflow search bar ✅
- Easily delete browser data ✅
- Easy access to the browser history ✅
- Javascript sandbox ✅
- Kanban board (with local storage data persistence) ✅
- Lighthouse integration ✅
- Markdown editor (with local storage data persistence) ✅
- Github ready ✅
- Trending posts from CS related subreddits ✅
- Light and dark theme ⏳

## Installation

- Go to `chrome://extensions/` and check the box for Developer mode in the top right.
- Download and unzip `extension.zip` from the last release
- Drag and drop the `dist` folder into extensions tab
- Activate the extension

## Development

Since Chrome apis cannot be used outside extension scope (`chrome-extension://`) you cannot run the app as you would normally do with a react application.

- Go to `chrome://extensions/` and check the box for Developer mode in the top right.
- Fork the repo and clone it locally
- Install dependencies with `npm install`.
- Do a build first with `npm run build`
- Run `npm run start`
- In another shell tab run `npm run watch`
- Open extensions tab in google chrome
- Drag and drop the `build` folder into extensions tab
- Activate the extension
- Start coding

Every time you make a change inside the `src` folder `npm run watch` will make a new build and you just need to refresh the tab for see changes.
