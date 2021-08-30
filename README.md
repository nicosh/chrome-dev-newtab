# chrome-dev-newtab
A dev friendly new tab for Google Chrome.  

**features** :  
- Show memory and cpu usage ✅
- Google or Stackoverflow search bar ✅
- Easily delete browser data ✅
- Easy access to the browser history ✅
- Javascript sandbox ✅
- Lighthouse integration ✅
- Markdown editor (local storage data persistence) ✅
- Trending posts from CS related subreddits ✅
- Light and dark theme ⏳
- Github ready ⏳


## Installation
- Go to chrome://extensions/ and check the box for Developer mode in the top right.
- Download and unzip the last release
- Drag and drop the `dist` folder into extensions tab
- 
## Development
Since Chrome apis cannot be used outside extension scope (`chrome-extension://`) you cannot run the app as you would normally do with a react application.  

- Go to chrome://extensions/ and check the box for Developer mode in the top right.
- Fork the repo and clone it locally
- Install dependencies with `npm install`.  
- Do a first build `npm run build`
- Run `npm run start`
- In another shell tab run `npm run watch`
- Open extensions tab in google chrome
- drag and drop the `build` folder into extensions tab
- Activate the extension
- Start coding

Every time you make a change inside the `src` folder `npm run watch` will make a new build and you just need to refresh the tab for see changes.
