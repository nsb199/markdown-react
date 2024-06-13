import React from 'react';

const Editor = ({ markdown, setMarkdown }) => {
  return (
    <textarea
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      className="editor"
      placeholder="Type your markdown here..."
    />
  );
};

export default Editor;
