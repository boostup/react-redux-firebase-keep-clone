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

---

# About this app project

Create a Google Keep clone which brings the missing functionalities badly needed by user with several hundreds notes.

This project will either show that these limitations can be surpassed, or on the contrary, help to understand the technical (or other) backgrounds for these limitations.

## Current limitations found in Google Keep

- Can't view All pinned notes only into one list of notes
- Can't search using more than 1 tag
- Search terms are not highlighted within the notes contents that end up in the result list of notes
- Can't search for an exact phrase : any notes with any of the words in the search term will be pulled into the result list of notes
- Can't use ANY kind of text formatting to compose notes (come on guys !!!!)
- Can't shrink notes to a tiny height, which would allow for shorter scrolling 'distances' when looking for notes
- Initial load time at app launch is really ugly and the app crashes very often during this launching sequence (it crashes at launch in about once in 8 to 10 times)
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

- The App toggles in and out of night mode automatically, according to the daylights in user's location
  - must request user's permission for their location

## About `tags`

- each note can have 0 or more `tags`
- `tags` help :
  - classify notes into collections of tagged notes
  - find collections of notes

## Accessing the app contents

- All routes and functionalities are protected by authentication
  - So, to be clear :
    - if user is not signed in, the Google Sign-in form is the accessible content
    - until user signs in, no other routes will be accessible

## Once `isSignedIn=true`

- The App Toolbar is displayed

- While the `notes collection` is being requested/synchronized from local/remote storage

  - the `title bar` displays the name of the app
  - the `notes list view` is hidden. **Instead of it**, a `circular loader view` is displayed

- Once the `notes collection` is available :

  1. the `circular loader view` hides
  2. the `notes list view` appears in the `main view` area
  3. `title bar view` is hidden by the `search bar view`, **unless** the `settings` specify to display the `pinned notes` on app launch, in which case :

  - title `Pinned notes` is displayed in the `title bar view`
  - `search icon button` is displayed
  - `search textfield` is hidden

## Composition of the `AppToolbar`

### Avatar button

`Google User profile picture` is displayed in the `avatar view` on the right top corner

- `onClick` : a menu displays a single option => `Sign out`, which takes user back to the to the `default route`

### Display modes - button

This button toggles `notes list view` display modes. Sits to the left of the avatar button.

- `onClick` : switches between `standard mode` and `preview mode`
- _transition effect_ : `easeIn scaleY`
- in both modes, notes are stacked in a column formation
- `Notes list display mode` persists
- In `standard mode`
  - full notes are displayed
    - full height
    - notes height in the list then varies from one note to the next
- In `preview mode`
  - only first couple of lines of each note are displayed
  - ellipsis masks overflown text
  - every note in the list then takes the exact same height
  - in this mode **only**, notes can be dragged and dropped to change their order
    - this order persists

### Regarding the title bar and the search textfield

- if the `searchTextfield` is hidden, and if the `searchIconButton` is pressed by the user, the `searchTextfield` slide out to take available horizontal space, hiding the `titleBar` by covering it up.

### Hamburger button

Sits on the top left corner.

- `onClick` :
  - toggles `drawer panel` in and out of the `viewport`
  - _transition effect_ : `easeIn sliding`

## Composition of the `Drawer Panel`

Buttons are listed in column formation (top to bottom) :

- **Notes**

  - `onClick` : /notes/all

- **Pinned**

  - `onClick` : /notes/pinned

- **Tags**

  - lists a button for each `tag` the user has created
    - for each button with `tag name`, `onClick` : /notes/:tagId

- **Archive**

  - `onClick` : /notes/archive

- **Trash**

  - `onClick` : /notes/trash

- **Settings**
  - `onClick` : /settings

### Navigating from the `drawer panel`

- Once a button in the `drawer panel` is clicked :

  1. the `drawer panel` slides out of viewport

  - _transition effect_ : `easeOut slide left`

  2. **only then**, the selected `notes collection` start loading into the `notes list view` in the `main view` area

  - _transition effect_ of `main view` area: `subtle fading in / sliding up`

## Routing

### Route : `/signed-off`

- this is the Default / Catch All / 404 route.

### About the various routes starting with `/notes`

- any of the `/notes` routes listed below must reuse the same `notes list view` component.
- for each note in the `notes list view`
  - `onClick` :
    - The height of note goes full screen
    - _transition effect_ : morphing into the `/note/:noteId` route for note edition

#### Route : `/notes/all`

- displays all the notes in the `notes collection`, apart from `archived` and `trashed` notes
- effects on `AppToolbar` :
  - `titleBar`: hidden
  - `searchIconButton`: hidden
  - `searchTextfield`: displayed

#### Route : `/notes/pinned`

- displays the pinned `notes collection` only
- effects on `AppToolbar` :
  - `titleBar`: displays title `Pinned notes`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

#### Route : `/notes/:tagId`

- displays the `notes collection` corresponding to the `tagId` only
- effects on `AppToolbar` :

  - `titleBar`: displays title `:tagName`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

#### Route : `/notes/archive`

- displays the archived `notes collection` only
- `archived notes` are not displayed anywhere else but here in this route
- effects on `AppToolbar` :

  - `titleBar`: displays title `archive`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden

#### Route : `/notes/trash`

- displays the trashed `notes collection` only
- `trashed notes` are not displayed anywhere else but here in this route
- effects on `AppToolbar` :
  - `titleBar`: displays title `trash`
  - `searchIconButton`: displayed
  - `searchTextfield`: hidden
- displays all notes that were deleted in the previous 30 days or less

- **Message to user**

  - "deleted notes will be stored in the trash for 30 days"
  - the message appears on top of the list, making the list slide down when it appears
  - user can click the close button on the message to make it disappear

- notes in this route are :

- through multiple selection :
  - notes can be restored
  - notes can be permantly deleted

#### Route : `/notes/search-results`

- displays the `notes collection` corresponding to the `search filters`

- effects on `AppToolbar` :

  - `titleBar`: hidden
  - `searchIconButton`: hidden
  - `searchTextfield`: displayed

- all found instances of `search term` :

  - are to be highlighted across all notes in the `notes list` found in the `main view` area
  - can be cycled through, back and forth

- Possible `search filters` :
  - `search term` :
    - 1 or more words/strings
    - exact match only
  - `pinned` (optional : boolean)
  - `tags` (optional : 0 or more)

#### Route : `/note/:noteId`

- displays the note with `id=noteId` for edition

##### Markdown editor

- Notes are written in markdown and displayed as HTML
- Only Markdown is editable

  - [implement the image renderer](https://www.newline.co/@dmitryrogozhny/how-to-render-markdown-in-react-with-react-markdown--5d1c3849)
  - URL links should open \_blank not on same browser tab as this app

- the `markdown text` area scrolls overflown content
- images are inline with text, not on top of the top like Google Keep

##### Note Toolbar

- located on top of the `markdown text` area as a row, from left to right :
- `Pin Icon` : toggles `pinned` / `unpinned` state
- `Archive Icon` : toggles `archived` / `unarchived` state
- `Preview Icon` : toggles between displaying as HTML or as raw Markdown
- `Close Icon` :
  - closes the note
  - the user is redirected to the previous `notes list` found in the navigation history

##### Menu button `vertical 3-dots`

- located under the `markdown text` area, on the right bottom corner
- `onClick` : the following options appear
  - `Share options` : captures email address and sends invitation
  - `Get link` : permalink is copied into clipboard
    - a `snackbar notification` informs the user it is now in clipboard
  - ??? `Make a copy` : duplicates the current note
  - `Change tags` : apply existing or new `tags`
    - New `tags` can be created on the fly
  - `Remove` : places note in the trash for 30 days
    - after pressing the `remove option`, the user is redirected to the previous `notes list` found in the navigation history

#### Route : `/settings`

- displays the `settings view` in the `main view` area
- has a back arrow to return to the view that was previously displayed in the `main view` area
- **Options**
  - **Night mode**
    - user can `toggle automatic night mode`
    - manual toggle ?
  - **Notes**
    - toggle `top/bottom` : new notes are added at the `top/bottom` of the list
  - **App launch**
    - default notes to be displayed : `pinned` note OR `all` notes

#### Home - Signed off

- **Route** : /signed-off
- displays Google Sign In form in none-pop format

## Adding a new note

- this is done by clicking on the FAB (+) button on the lower right corner of the viewport, present in any `notes list view`, apart from `trashed` and `archived` routes
- `onClick` : `/note/:noteId`

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
