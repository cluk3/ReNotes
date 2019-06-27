import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

const quillModulesConf = { toolbar: false };
const QuillEditor = ({ value, onChange }) => (
  <ReactQuill
    theme="snow"
    value={value}
    onChange={onChange}
    modules={quillModulesConf}
  />
);

export default QuillEditor;
