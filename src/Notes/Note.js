import React from "react";
import PropTypes from "prop-types";
import {
  createExcerptFromText,
  createTitleFromText,
  humanFriendlyDate
} from "../helpers";

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

Note.propTypes = {
  text: PropTypes.string.isRequired,
  creationDate: PropTypes.number.isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default Note;
