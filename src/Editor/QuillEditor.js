import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

const isEmptyValue = value =>
  value.ops.length === 1 && value.ops[0].insert === '';
const quillModulesConf = { toolbar: false };
const QuillEditor = ({ value, onChange }) => {
  const quillEditorRef = useRef();
  useEffect(() => {
    if (isEmptyValue(value)) {
      quillEditorRef.current.focus();
    }
  }, [value]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModulesConf}
      ref={quillEditorRef}
    />
  );
};

export default QuillEditor;
