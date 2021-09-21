# Contributing to this repository 
## Getting started 
Since Chrome apis cannot be used outside extension scope (chrome-extension://) you cannot run the app as you would normally do with a react application.


- Go to chrome://extensions/ and check the box for Developer mode in the top right.
- [Fork the repository](https://github.com/nicosh/chrome-dev-newtab/fork) and clone it locally
- Install dependencies with npm install.
- Do a first build  with `npm run build`
- Run `npm run start`
- In another shell tab run `npm run watch`
- Open extensions tab in google chrome
- drag and drop the build folder into extensions tab
- Activate the extension
- Start coding
- Submit a PR