// App.jsx

import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import FileList from './components/FileList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('markdownFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [currentFile, setCurrentFile] = useState(null);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    localStorage.setItem('markdownFiles', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    if (currentFile !== null) {
      const file = files.find((file) => file.id === currentFile);
      setMarkdown(file ? file.content : '');
    } else {
      setMarkdown('');
    }
  }, [currentFile, files]);

  const createNewFile = () => {
    const newFile = {
      id: Date.now(),
      title: 'Untitled',
      content: '',
    };
    setFiles([...files, newFile]);
    setCurrentFile(newFile.id);
  };

  const deleteFile = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
    if (currentFile === fileId) {
      setCurrentFile(null);
    }
  };

  const selectFile = (fileId) => {
    setCurrentFile(fileId);
  };

  const updateCurrentFileContent = (content) => {
    setMarkdown(content);
    setFiles(
      files.map((file) =>
        file.id === currentFile ? { ...file, content } : file
      )
    );
  };

  const updateFileTitle = (fileId, newTitle) => {
    setFiles(
      files.map((file) =>
        file.id === fileId ? { ...file, title: newTitle } : file
      )
    );
  };

  return (
    <div className="app">
      <Navbar insertText={(text) => setMarkdown((prev) => prev + text)} />
      <div className="main-container">
        {files.length === 0 ? (
          <div className="empty-file-list">
            You have not created any file.
            <button className="create-file-button" onClick={createNewFile}>
              CREATE ONE NOW
            </button>
          </div>
        ) : (
          <FileList
            files={files}
            createNewFile={createNewFile}
            deleteFile={deleteFile}
            selectFile={selectFile}
            currentFile={currentFile}
            updateFileTitle={updateFileTitle}
          />
        )}
        <div className="editor-preview-container">
          <Editor markdown={markdown} setMarkdown={updateCurrentFileContent} />
          <Preview markdown={markdown} />
        </div>
      </div>
    </div>
  );
};

export default App;
