import observer from './observer';
import { deleteNote } from './notes';

describe('notes observer', () => {
  let previousState;
  let actualState;
  beforeEach(() => {
    previousState = {
      notes: {
        activeNote: null
      }
    };
    actualState = {
      notes: {
        activeNote: 'bar'
      }
    };
  });
  describe('comparer', () => {
    it('should return true if activeNote changes', () => {
      expect(observer.comparer(previousState, actualState)).toEqual(true);
    });
    it('should return false if activeNote does not change', () => {
      expect(observer.comparer(previousState, previousState)).toEqual(false);
    });
  });

  describe('action', () => {
    let dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
    });
    it('should not dispatch if prev activeNote is not set', () => {
      observer.action({ previousState, actualState, dispatch });
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('should dispatch if prev activeNote is empty', () => {
      previousState.notes.byId = {
        testId: {
          editorState: {
            text: '\n'
          }
        }
      };
      previousState.notes.activeNote = 'testId';
      const dispatchedAction = deleteNote('testId');
      observer.action({ previousState, actualState, dispatch });
      expect(dispatch).toHaveBeenCalledWith(dispatchedAction);
      dispatch.mockClear();
      previousState.notes.byId.testId.editorState.text = '';
      observer.action({ previousState, actualState, dispatch });
      expect(dispatch).toHaveBeenCalledWith(dispatchedAction);
    });
    it('should not dispatch if prev activeNote is not empty', () => {
      previousState.notes.byId = {
        testId: {
          editorState: {
            text: 'some text'
          }
        }
      };
      previousState.notes.activeNote = 'testId';
      observer.action({ previousState, actualState, dispatch });
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('should throw if prev activeNote does not exist', () => {
      const t = () => observer.action({ actualState, actualState, dispatch });
      expect(t).toThrow(Error);
    });
  });
});
