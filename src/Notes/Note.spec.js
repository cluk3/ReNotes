import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Note from "./Note";
describe("Note", () => {
  it("should render correctly", () => {
    const output = shallow(
      <Note
        text={`title\nexcerpt`}
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={false}
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it("should show the correct title", () => {
    const output = shallow(
      <Note
        text="test"
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={false}
      />
    );
    expect(output.find("h2").text()).toEqual("test");
  });

  it("should show the correct creation date info", () => {
    const output = shallow(
      <Note
        text="test"
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={false}
      />
    );
    expect(output.find("span").text()).toEqual("Monday");
  });

  it("should show the default excerpt when note has no body", () => {
    const output = shallow(
      <Note
        text="test"
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={false}
      />
    );
    expect(output.find("p").text()).toEqual("No additional text");
  });

  it("should show the correct title and excerpt with new line", () => {
    const output = shallow(
      <Note
        text={`test title\ntest excerpt`}
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={false}
      />
    );
    expect(output.find("h2").text()).toEqual("test title");
    expect(output.find("p").text()).toEqual("test excerpt");
  });

  it("should have background grey when selected", () => {
    const output = shallow(
      <Note
        text={`title\nexcerpt`}
        lastModified={2314324124123}
        handleNoteClick={jest.fn()}
        selected={true}
      />
    );
    expect(output.first().prop("style").backgroundColor).toEqual("grey");
  });
});
