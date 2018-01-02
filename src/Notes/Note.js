import React from "react";

const humanFriendlyDate = date => "Monday";
const createExcerptFromText = text => {
  const body = text.split("\n")[1];
  return body ? body.slice(0, 80) : "No additional text";
};
const createTitleFromText = text => text.split("\n")[0] || "New Note";

const Note = ({ text, creationDate, handleNoteClick, selected }) => {
  const title = createTitleFromText(text);
  const excerpt = createExcerptFromText(text);
  const creationTime = humanFriendlyDate(creationDate);
  return (
    <div
      onClick={handleNoteClick}
      style={{
        backgroundColor: selected ? "grey" : "white"
      }}
    >
      <h2>{title}</h2>
      <span>{creationTime}</span>
      <p>{excerpt}</p>
    </div>
  );
};

export default Note;
