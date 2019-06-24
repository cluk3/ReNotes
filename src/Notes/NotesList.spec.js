import React from "react";
import { NotesList } from "./NotesList";
import { ENTITIES } from "../constants";

describe("NotesList", () => {
  let props;
  beforeEach(() => {
    props = {
      notes: [
        {
          lastModified: 1235353245432,
          text: `foo\nbar`,
          noteId: "note-4234"
        }
      ],
      activeFolderName: "testFolder",
      activeNote: "note-4333",
      createNewNote: jest.fn(),
      setItemToDelete: jest.fn(),
      setActiveNote: jest.fn()
    };
  });

  // it("should render correctly", () => {
  //   const output = shallow(<NotesList {...props} />);
  //   expect(shallowToJson(output)).toMatchSnapshot();
  // });

  // describe("when Note is clicked", () => {
  //   it("should set item to delete", () => {
  //     const output = shallow(<NotesList {...props} />);
  //     output
  //       .find("Note")
  //       .first()
  //       .props()
  //       .handleNoteClick();
  //     expect(props.setItemToDelete).toHaveBeenCalledWith(
  //       ENTITIES.NOTES,
  //       props.notes[0].noteId
  //     );
  //   });

  //   it("should set active note", () => {
  //     const output = shallow(<NotesList {...props} />);
  //     output
  //       .find("Note")
  //       .first()
  //       .props()
  //       .handleNoteClick();
  //     expect(props.setActiveNote).toHaveBeenCalledWith(props.notes[0].noteId);
  //   });
  // });

  // describe("when New Note button is clicked", () => {
  //   it("should create a new note", () => {
  //     const output = shallow(<NotesList {...props} />);
  //     output
  //       .find("button")
  //       .first()
  //       .simulate("click");
  //     expect(props.createNewNote).toHaveBeenCalledWith(
  //       "testFolder",
  //       expect.stringContaining("note-")
  //     );
  //   });

  //   it("should set item to delete", () => {
  //     const output = shallow(<NotesList {...props} />);
  //     output
  //       .find("button")
  //       .first()
  //       .simulate("click");
  //     expect(props.setItemToDelete).toHaveBeenCalledWith(
  //       ENTITIES.NOTES,
  //       expect.stringContaining("note-")
  //     );
  //   });

  //   it("should set active note", () => {
  //     const output = shallow(<NotesList {...props} />);
  //     output
  //       .find("button")
  //       .first()
  //       .simulate("click");
  //     expect(props.setActiveNote).toHaveBeenCalledWith(
  //       expect.stringContaining("note-")
  //     );
  //   });
  // });
});
