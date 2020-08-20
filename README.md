# Specifications

## Items to be classified / quick todos

- Where necessary :
  - Define Routes
  - Define transitin effect

---

## Progressive Web App

- [ ] installable
- [ ] offline first
- [ ] mobile-first responsive design

## Data persistence

- [ ] firebase for signing in Google users only
- [ ] firestore for storing user's notes collection data
- [ ] localStorage for offline storage
- [ ] syncronizes with firestore whenever a connection is available

## Routing

- [ ] `Default/CatchAll route` is `Home - Signed off`
- [ ] **Route** : `/signed-off`
- [ ] All routes and functionalities are protected by `isSignedIn`
- [ ] To be clear : if user is not signed in, the `/signed-off` route is all user can access

## Launching the app

- While the `notes collection` is being requested/synchronized from local/remote storage

  - the `title bar` displays the name of the app
  - the `notes list view` is hidden, **instead** a `circular loader view` is displayed

- Once the `notes collection` is available :
  1. the `notes list view` appears in the `main view area`
  2. `title bar view` is hidden by the `search bar view`, **unless** the `settings collection` are set to display the `pinned notes` on app launch, in which case :
  - title `Pinned notes` is displayed in the `title bar view`
  - `search icon button` is displayed
  - `search textfield` is hidden

## Night Mode

- [ ] The App toggles in and out of night mode automatically, according daylight corresponding to user's location

## Avatar

- [ ] `Google User profile picture` is displayed in the `avatar view`
  - `onClick` : a menu displays a single option => `Sign out`, which takes user back to the `Home Signed out` route thanks to `Default/CatchAll route`

## Notes list display modes toggle button

- [ ] `Notes list display mode toggle button` is used to switch between `standard mode` and `preview mode`
  - [ ] in both modes, notes are stacked in a column formation
  - [ ] `display mode` persists
  - [ ] In `standard mode`
    - [ ] full notes are displayed
      - full height
      - notes height in the list then varies from one note to the next
  - [ ] In `preview mode`
    - [ ] first couple of lines only are displayed
    - [ ] every note in the list then takes the exact same height
    - [ ] ellipsis masks overflown text
    - [ ] in this mode **only**, notes can be dragged and dropped to change
      - their order persists

## Hamburger menu

- [ ] `onClick`
  - toggles `drawer panel` in and out of the `viewport`
  - _transition effect_ : `easeIn sliding`

## Drawer panel

### Navigation transition from drawer panel

- [ ] Once a button in the `drawer panel` is clicked :
  1. the `drawer panel` slides out of viewport
  - _transition effect_ : `easeOut sliding`
  2. **only then** does the `main view` area starts loading the `notes collection` in the `notes list view`
  - _transition effect_ : subtle faded slide up

### Contents of the drawer panel view

Buttons and section dividers from top to bottom :

- [ ] **Notes** : displays all notes -> the full search bar [textfield + search icon adornment] is displayed

---

- [ ] **Pinned** : displays all pinned notes only

---

- [ ] **Tags section**
  - lists a button for each `tag name` the user has created
  - clicking on a `tag name` button :
    - displays the `notes collection` corresponding to the `tag name`
    - displays the `tag name` in the `title bar`
    - hides the `search bar textfield`
    - displays the `search icon button`
    - if the `search icon button` is pressed, the `search bar textifield` slide out to take available horizontal space, covering/hiding the `tag name` in the `title bar`

---

- [ ] **Archives**

  - displays `archived notes`
  - `archived notes` are not displayed anywhere but here

* [ ] **Trash**
  - Message to user
    - "deleted notes will be stored in the trash for 30 days"
    - the message appears on top of the list, making the list slide down when it appears
    - user can click the message to have it disappear
  - displays all notes that were deleted in the previous 30 days or less
  - notes are displayed in 'preview mode` and are stacked in column as a simple list
  - through multiple selection :
    - notes can be restored
    - notes can be permantly deleted

---

- [ ] **Settings** : displays the `settings view` in the `main view` area

# Routes

## All notes view

- [ ] **Route** : /all

## Pinned notes view

- [ ] **Route** : /pinned

## Tag notes view

- [ ] **Route** : /tag/:tagId

## Archive view

- [ ] **Route** : /archive
- [ ] notes can be unarchived by pressing the `archive toggle button`

## Trash view

- [ ] **Route** : /trash

## Settings view

- [ ] **Route** : /settings
- [ ] Has a back arrow to return to previous view that was displayed in the `main view` area
- [ ] Options
  - **Night mode**
    - User can toggle automatic night mode
    - Manual toggle ?
  - **Notes**
    - Toggle top/bottom : new notes are added at the top/bottom of the list
  - **App launch**
    - Default notes to be displayed : pinned note OR all notes

## Searching for notes

- [ ] All found instances of `search term` :
  - are to be highlighted across all notes in the `notes list` found in the `main view` area
  - can be cycled through, back and forth
- [ ] Possible `search filters` :
  - `pinned` (optional : boolean)
  - `tags` (optional : 0 or more)
  - `search term` :
    - 1 or more words/strings
    - exact match only

### Tags

- [ ] `Tags` help find/classify individual notes
- [ ] Notes can have 0 or more `tags`

## Home - Signed off

- [ ] **Route** : /signed-off
- [ ] displays Google Sign In form in none-pop format

### Clicking on a note in a notes list view

- [ ] The height of note goes full screen
- _transition effect_ : morphing into the `Note - edition` route

## Editing a note

- [ ] **Route** : /note/:noteId

- [ ] the `markdown text area` scrolls overflown content
- [ ] images are inline with text, not on top of the top like Google Keep

- [ ] **Note Toolbar**
  - [ ] located on top of the `markdown text area` as a row
  - [ ] `Pin Icon` : toggles `pinned` / `unpinned` state
  - [ ] `Archive Icon` : toggles `archived` / `unarchived` state
  - [ ] `Preview Icon` : toggles between displaying as HTML or as raw Markdown
- [ ] **Menu options**
  - [ ] located under the `markdown text area` by clicking on the `vertical 3-dots menu button`
  - [ ] `Share options` : captures email address and sends invitation @TODO: view to be defined
  - [ ] `Get link` : permalink is copied into clipboard
    - a `snackbar notification` informs the user it is now in clipboard
  - [ ] ??? `Make a copy` : duplicates the current note
  - [ ] `Change tags` : apply existing or new `tags` @TODO: view to be defined
    - [ ] New `tags` can be created on the fly
  - [ ] `Remove` : places note in the trash bin for 30 days
    - after pressing the `remove option`, the user is navigated back to the `Home - Signed In` route

### Markdown

- [ ] Notes are composed in markdown and displayed as HTML
- [ ] Only Markdown is editable
- [ ] [implement the image renderer](https://www.newline.co/@dmitryrogozhny/how-to-render-markdown-in-react-with-react-markdown--5d1c3849)
- [ ] URL links should open \_blank not on same browser tab as this app

## Adding a new one

- [ ] **Route** : /note/:noteId

---

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---
