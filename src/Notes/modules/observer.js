import { deleteNote } from './notes';
import { isNoteEmpty } from 'helpers';

const notesObserver = {
  comparer(o, n) {
    return o.notes.activeNote !== n.notes.activeNote;
  },
  action({ previousState, actualState, dispatch }) {
    const prevActiveNoteId = previousState.notes.activeNote;
    if (!prevActiveNoteId) return;
    const prevActiveNote = previousState.notes.byId[prevActiveNoteId];
    const prevNoteText = prevActiveNote.editorState.text;

    if (
      isNoteEmpty(prevNoteText) &&
      actualState.notes.allIds.includes(prevActiveNoteId)
    ) {
      dispatch(deleteNote(prevActiveNoteId));
    }
  }
};

export default notesObserver;
