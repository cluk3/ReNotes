import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  createExcerptFromText,
  createTitleFromText,
  humanFriendlyDate
} from '../helpers';
import { DragPreviewImage, useDrag } from 'react-dnd';
import noteImage from './noteImage';
import { animated } from 'react-spring';
import { Flipped } from 'react-flip-toolkit';

const getBackgroundColor = props => {
  if (props.highlighted) {
    return '#fbdb7c';
  } else if (props.selected) {
    return '#dfdfdd';
  }
  return 'rgba(249, 249, 247, 0)';
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
  background-color: ${getBackgroundColor};
  padding-left: 1em;
`;

const Note = ({
  text,
  lastModified,
  handleNoteClick,
  selected,
  highlighted,
  noteId,
  parentFolderId,
  style
}) => {
  const [, drag, preview] = useDrag({
    item: { type: 'Note', id: noteId, parentFolderId }
  });
  const title = createTitleFromText(text);
  const excerpt = createExcerptFromText(text);
  const creationTime = humanFriendlyDate(lastModified);
  return (
    <animated.div style={style}>
      <DragPreviewImage connect={preview} src={noteImage} />
      <Flipped
        flipId={noteId}
        spring={{
          stiffness: 160,
          damping: 25
        }}
      >
        <NoteContainer ref={drag} selected={selected} highlighted={highlighted}>
          <NoteBody
            onContextMenu={() => {
              handleNoteClick();
            }}
            onClick={handleNoteClick}
          >
            <Title>{title}</Title>
            <SecondRaw>
              <Date>{creationTime}</Date>
              <Excerpt>{excerpt}</Excerpt>
            </SecondRaw>
          </NoteBody>
        </NoteContainer>
      </Flipped>
    </animated.div>
  );
};

Note.propTypes = {
  text: PropTypes.string.isRequired,
  lastModified: PropTypes.number.isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool.isRequired,
  noteId: PropTypes.string.isRequired,
  parentFolderId: PropTypes.string.isRequired
};

export default Note;
