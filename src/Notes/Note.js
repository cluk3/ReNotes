import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  createExcerptFromText,
  createTitleFromText,
  humanFriendlyDate
} from '../helpers';

const getbackgroundColor = props => {
  if (props.highlighted) {
    return '#fbdb7c';
  } else if (props.selected) {
    return '#dfdfdd';
  }
  return '#f9f9f7';
};

const NoteBody = styled.div`
  font-size: 14px;
  padding: 1em 1em 1em 0;
  border-bottom: #dedede solid 1px;
`;

const Title = styled.h2`
  font-size: 15px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.4;
`;

const Date = styled.span`
  padding-right: 1em;
  white-space: nowrap;
`;

const SecondRaw = styled.div`
  display: flex;
  align-content: flex-start;
`;

const Excerpt = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteContainer = styled.div`
  background-color: ${getbackgroundColor};
  padding-left: 1em;
`;

const Note = ({
  text,
  lastModified,
  handleNoteClick,
  selected,
  highlighted
}) => {
  const title = createTitleFromText(text);
  const excerpt = createExcerptFromText(text);
  const creationTime = humanFriendlyDate(lastModified);
  return (
    <NoteContainer selected={selected} highlighted={highlighted}>
      <NoteBody onClick={handleNoteClick}>
        <Title>{title}</Title>
        <SecondRaw>
          <Date>{creationTime}</Date>
          <Excerpt>{excerpt}</Excerpt>
        </SecondRaw>
      </NoteBody>
    </NoteContainer>
  );
};

Note.propTypes = {
  text: PropTypes.string.isRequired,
  lastModified: PropTypes.number.isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool.isRequired
};

export default Note;
