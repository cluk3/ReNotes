import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { NoteEditor } from "./NoteEditor";
import { ENTITIES } from "../constants";

describe("NoteEditor", () => {
  let props;
  beforeEach(() => {
    props = {
      text: `test title\ntest body`,
      activeNote: "note-1337"
    };
  });

  describe("bla", () => {});

  it("should render correctly", () => {
    const output = shallow(<NoteEditor {...props} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("should be initialized with no text if it's a new note", () => {});
  it("should be initialized with no text if folder is empty", () => {});
  it("should be initialized text from the active note", () => {});

  it("should debounce the update to redux", () => {});

  it("should save the text in the state", () => {});

  it("should create a new note if clicked when folder is empty");
  //   describe("when Note is clicked", () => {
  //     it("should set item to delete", () => {
  //       const output = shallow(<NotesList {...props} />);
  //       output
  //         .find("Note")
  //         .first()
  //         .props()
  //         .handleNoteClick();
  //       expect(props.setItemToDelete).toHaveBeenCalledWith(
  //         ENTITIES.NOTES,
  //         props.notes[0].noteId
  //       );
  //     });

  //     it("should set active note", () => {
  //       const output = shallow(<NotesList {...props} />);
  //       output
  //         .find("Note")
  //         .first()
  //         .props()
  //         .handleNoteClick();
  //       expect(props.setActiveNote).toHaveBeenCalledWith(props.notes[0].noteId);
  //     });
  //   });

  //   describe("when New Note button is clicked", () => {
  //     it("should create a new note", () => {
  //       const output = shallow(<NotesList {...props} />);
  //       output
  //         .find("button")
  //         .first()
  //         .simulate("click");
  //       expect(props.createNewNote).toHaveBeenCalledWith(
  //         "testFolder",
  //         expect.stringContaining("note-")
  //       );
  //     });

  //     it("should set item to delete", () => {
  //       const output = shallow(<NotesList {...props} />);
  //       output
  //         .find("button")
  //         .first()
  //         .simulate("click");
  //       expect(props.setItemToDelete).toHaveBeenCalledWith(
  //         ENTITIES.NOTES,
  //         expect.stringContaining("note-")
  //       );
  //     });

  //     it("should set active note", () => {
  //       const output = shallow(<NotesList {...props} />);
  //       output
  //         .find("button")
  //         .first()
  //         .simulate("click");
  //       expect(props.setActiveNote).toHaveBeenCalledWith(
  //         expect.stringContaining("note-")
  //       );
  //     });
  //   });
});
