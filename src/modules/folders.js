const redux = {
  selectedItem: {
    type: "folder",
    id: "some_id"
  },
  folders: {
    byName: {
      "New Folder": {
        notes: [
          /* notes ids */
        ]
      }
    },
    allNames: []
  },
  notes: {
    byId: {},
    allIds: []
  }
};
// Show folder creation input only in creation mode, decouple input from folder
// ACTIONS

// create new folder
// create new note
// delete folder
// delete note
// modify note
// set focused area

// on Notes click -> highlight, set focused area for delete, set active note -> show note text in editor
// on Folder click -> highlight, set focused area for delete, set active folder, show notes list in NoteList section, set first note as active ->  show first note in text editor

// Throttle text save

// Features:

// Undo delete
// Navigate Editor History (save on space, return, delete, tab)

// select note on creation and sync the selected for delete and the highlight/selection (need redux saga)

// put new note on toolbar

// add editor

// a candidate for delete should be elected when: - I create a new note/folder, I delete a note/folder, I click on note/folder
