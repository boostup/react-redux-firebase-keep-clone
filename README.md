**Quick @TODO**

- Where necessary:

  - Define transition/animation effects

- Multiple note selection to :

  - apply/remove tags
  - archive
  - place in the trash

- Define functionality, routes and views for :

  - `Share` a note
  - `Change tags` on a note
  - Admin/CRUD on tags

- All routes should be `permalinkable`

- [Define list of integrations tests](https://www.udemy.com/course/react-redux-tutorial/learn/lecture/16271946#notes)

---

# About this app project

Create a Google Keep clone which brings the missing functionalities badly needed by users with several hundreds notes.

This project will either show that these limitations can be surpassed, or on the contrary, help to understand the technical (or other) backgrounds for these limitations.

## Current limitations found in Google Keep

- Can't view All pinned notes **only** into one list of notes
- Can't search with more than 1 tag
- Search terms are not highlighted within the notes that are found in the search results
- Can't search for an exact phrase : any notes containing any of the words in the search term will be pulled into the search result
- Can't use _**ANY**_ kind of text formatting to compose notes (come on guys !!!!)
- Can't shrink notes to a tiny height, which would allow for shorter scrolling 'distances' when looking for notes
- Initial load time at app launch is really ugly and the app crashes very often during this launching sequence (on iOS, the Google Keep app crashes right after launch, once in 8 to 10 times !)
- And the list goes on and on...

---

# App Specifications

## Progressive Web App

- installable
- offline first
- mobile-first responsive design

## Data persistence

- firebase for signing in Google users only
- firestore for storing user's notes collection data
- localStorage for offline storage
- syncronizes with firestore whenever a connection is available

## About Night Mode

- The combination of `Typography`, `Paper` components, and the theme palettes of the Material-UI package, should allow to easily implement switchable dark/light themes

## About `tags`

- each note can have 0 or more `tags`
- `tags` help :
  - classify notes into collections of tagged notes
  - find collections of notes

## Accessing the app contents

- All routes and functionalities are protected by authentication
  - So, to be clear :
    - if user is not signed in, the Google Sign-in form is the ONLY accessible content
    - until user signs in, no other routes will be accessible

## Once `isSignedIn=true`

- The `AppToolbar` is displayed

- While the `notesCollection` is being requested/synchronized from local/remote storage

  - the `titleBar` displays the name of the app
  - the `notesList` element is hidden
  - **Instead of it**, a `circularLoader` element is displayed

- Once the `notesCollection` is available :

  1. the `circularLoader` element hides
  2. the `notesList` element appears
  3. `titleBar` is hidden by the `searchBar`, **unless** the `settings` specify to display the `pinned` notes on app launch, in which case :
     - the title `Pinned` is displayed in the `titleBar`
     - `searchIconButton` is displayed
     - `searchTextfield` is hidden

## Composition of the `AppToolbar`

### Avatar button

- `Google User profile picture` is displayed in the `avatar` element
- `location in the toolbar` : standard right-most position, all the way to the end
- `onPress` : a menu displays a single option => `Sign out`, which takes user back to the to the `default route`

### Display modes - button

- `location in the toolbar` : right next to the avatar button, on its left
- `onPress` : switches between `standard mode` and `preview mode` for the `notesList` element
- _transition effect_ : `easeIn scaleY`
- in both modes, notes are stacked in a column formation
- the `notesList` selected display mode persists across user sessions
- In `standard mode`
  - notes are displayed in full height
    - notes height in the list therefore varies from one note to the next, according to their own content length
- In `preview mode`
  - only first line of each note is displayed
  - ellipsis masks overflown text
  - every note in the list therefore takes the exact same height
  - in this mode **_ONLY_**, notes can be dragged and dropped in order to change their order in the list
    - this order persists across user sessions

### Regarding the `titleBar` and the `searchTextfield`

- When the `searchTextfield` is hidden, if the `searchIconButton` is pressed, the `searchTextfield` slides left to take available horizontal space, effectively hiding the `titleBar` element, by covering it up.

### Hamburger button - main menu button

- `location in the toolbar` : standard left-most position
- `onPress` :
  - toggles the `DrawerPanel` element in and out of the `viewport`

## Composition of the `DrawerPanel`

Buttons are listed in column formation, top to bottom :

- **Notes**

  - `onPress` : /notes/all

- **Pinned**

  - `onPress` : /notes/pinned

- **Tags**

  - lists a button for each `tag` the user has created
    - for each button with `tagName`, `onPress` : /notes/:tagName

- **Archive**

  - `onPress` : /notes/archive

- **Trash**

  - `onPress` : /notes/trash

- **Settings**
  - `onPress` : /settings

### `DrawerPanel` transition effects

- sliding `IN` _transition effect_ : `easeIn sliding`
- sliding `OUT` _transition effect_ : `easeOut sliding`

### Navigating from the `DrawerPanel` to a `/notes` route

- Once a button in the `DrawerPanel` is pressed :

  1. the `DrawerPanel` slides out of the left of the viewport
  2. **only then**, the selected `notesCollection` start loading into the `notesList` element
     - _transition effect_ of `notesList` element: `subtle fading in / sliding up`

## Routing

### Route : `/signed-off`

- this is the Default / Catch All / 404 route
- it the only route the unauthenticated user can access
- it displays the Firebase Google Sign-in form (not as a pop-up) to allow user to authenticate

### About the various routes starting with `/notes`

- any of the `/notes` routes listed below must reuse the same `notesList` element
  - once the notesCollection is available to this element, each note item is staggered into place
  - _transition effect_ : [examples here](https://css-tricks.com/staggering-animations/)
- for each note in the `notesList` element
  - `onPress` :
    - the height of note goes full screen
    - _transition effect_ : morphing into the `/note/:noteId` route

### Route : `/notes/all`

- displays all the note items found in the user `notesCollection`, apart from `archived` and `trashed` notes
- effects on `AppToolbar` :
  - `titleBar`: hidden
  - `searchIconButton`: hidden
  - `searchTextfield`: displayed

### Route : `/notes/pinned`

- displays the pinned `notesCollection` only
- effects on `AppToolbar` :
  - `titleBar`: displays title `Pinned`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

### Route : `/notes/:tagName`

- displays the `notesCollection` corresponding to the `tagName` only
- effects on `AppToolbar` :
  - `titleBar`: displays title `:tagName` (with first letter capitalized)
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

### Route : `/notes/archive`

- displays the archived `notes collection` only
- `archived notes` are not displayed anywhere else but here in this route
- effects on `AppToolbar` :

  - `titleBar`: displays title `Archive`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

### Route : `/notes/trash`

- displays the trashed `notesCollection` only
- these are note items that were deleted in the previous 30 days or less
- `trashed notes` are not displayed anywhere else but here in this route
- effects on `AppToolbar` :

  - `titleBar`: displays title `Trash`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

##### Message to user

- "deleted notes will be stored in the trash for 30 days"

  - the message appears on top of the trashed notes list, making the list slide down when it appears
  - user can click the close button on the message to make it disappear

- through multiple selection, notes can be :
  - restored
  - permantly deleted
    - ask for user confirmation prior to defnitive deletion

### Route : `/notes/search/:pinned/:tags/:terms`

- displays the `notesCollection` corresponding to the `searchFilters`

- effects on `AppToolbar` :

  - `titleBar`: hidden
  - `searchIconButton`: hidden
  - `searchTextfield`: displayed

- Possible `searchFilters` :

  - `searchTerm` :
    - 1 or more space-delimited strings
  - `pinned` (optional : boolean)
  - `tags` (optional : 0 or more)

- all found instances of `searchTerm` :
  - are exact match only of the complete `searchTerm`, especially if it is composed of 2 or more space-delimited strings
  - are to be highlighted across all note items in the `notesList` element
  - can be cycled through, back and forth

### Route : `/note/:noteId`

- displays the note with `id=noteId` for mardown edition

##### Markdown editor

- notes are written in markdown and displayed as HTML
- only Markdown is editable
- URL links should open \_blank not on same browser tab as this app
- the `markdown text` area scrolls overflown content
- images are inline with text (not all grouped on top of the note like Google Keep)
- images can be pressed for fullscreen view
  - [about implementing the image renderer](https://www.newline.co/@dmitryrogozhny/how-to-render-markdown-in-react-with-react-markdown--5d1c3849)

##### Composition of the `NoteToolbar`

- `location` : on top of the `markdown text` area as a row
- list of buttons, from left to right :
  - `Pin Icon` : toggles `pinned` / `unpinned` state
  - `Archive Icon` : toggles `archived` / `unarchived` state
  - `Preview Icon` : toggles between displaying as HTML or as raw Markdown
  - `Markdown syntax` :
    - displays a `scrollable element` with a complete `Markdown Cheat Sheet`
    - this element can be closed by pressing its `close button`
  - `Close Icon` :
    - closes the note
    - when pressed, the user is redirected to the previous `notes list` found in the navigation history

##### Options menu button (`3 stacked dots`)

- `location` : under the `markdown text` area, on the right bottom corner
- `onPress` : the following options appear
  - `Share options` : captures email address and sends invitation
  - `Get link` : permalink is copied into clipboard
    - a `snackbar notification` informs the user it is now in clipboard
  - `Make a copy` : duplicates the current note
    - the newly duplicated note becomes the note being edited
  - `Change tags` : apply existing or new `tags`
    - new `tags` can be created on the fly
  - `Remove` : sets `trashed` state
    - after pressing the `remove option`, the user is redirected to the previous `notesList` found in the navigation history
      - this should be the `notesList` from which the user arrived at the note item being deleted

##### Adding a new note

- this is done by clicking on the FAB (+) button on the lower right corner of the viewport, present whenever the `notesList` element is displayed, except for `trashed` and `archived` routes
- `onPress` : `/note/:noteId`
  - this becomes just a regular case of editing a note

### Route : `/settings`

- displays the `SettingsPanel` element
- has a back arrow to return to the route that was previously displayed in the navigation history
- **Options**
  - **Night mode**
    - user must be given the possibility to :
      - fill in the :
        - start time for light theme,
        - start time for dark theme
      - a switch to toggle manually between themes at any given moment
  - **Notes**
    - `top/bottom` toggle : new notes are added at the `top/bottom` of the list
  - **App launch**
    - default notes to be displayed : `pinned` note OR `all` notes

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
