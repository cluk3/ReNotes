import React from "react";
import NoteEditor from "./NoteEditor";
import { renderWithRedux } from '../testRenderWithRedux'
import 'jest-styled-components';

describe("NoteEditor", () => {

  it('works', () => {
    const { container } = renderWithRedux(<NoteEditor />);
    expect(container.firstChild).toMatchSnapshot()
  })

  // it("should be initialized with no text if it's a new note", () => {});
  // it("should be initialized with no text if folder is empty", () => {});
  // it("should be initialized text from the active note", () => {});

  // it("should debounce the update to redux", () => {});

  // it("should save the text in the state", () => {});

  // it("should create a new note if clicked when folder is empty");
  //   describe("when Note is clicked", () => {
  //     it("should set item to delete", () => {

  //     });

  //     it("should set active note", () => {
  //     });
  //   });

  //   describe("when New Note button is clicked", () => {
  //     it("should create a new note", () => {
  //     });

  //     it("should set item to delete", () => {

  //     });

  //     it("should set active note", () => {

  //     });
  //   });
});
