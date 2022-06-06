# treasury

Trello to manage work: https://trello.com/b/o1azRgfw/kasama-code-improvements

## How to launch Frontend
`npm install`*


* If you have a challenge with dependency mismatch, just run `npm install --force`
(_this is definitely not the right way to do it, but call it Tech Debt_)

`npm start`

Routing is done via react-router

## How to launch backend

`node index.js`

Currently, this version of the backend does not "hot reload" meaning if any changes are made to the code, you must manually restart the server. Which will cause loss of current backend state.

## Github practices
Any feature work should be worked on a branch that is named `feature/NAME_OF_FEATURE_HERE`

Any bug fixes work should be worked on a branch that is named `hotfix/QUICK_BUG_DETAIL`

!! Do not merge directly to main, create a merge request in `development` and it will be tested before any production merges.

Start your work from the `development` branch as well.