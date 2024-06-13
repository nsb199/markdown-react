// FileList.jsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './FileList.css';

const FileList = ({ files, createNewFile, deleteFile, selectFile, currentFile, updateFileTitle }) => {
  const [editingFileId, setEditingFileId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (fileId, currentTitle) => {
    setEditingFileId(fileId);
    setNewTitle(currentTitle);
  };

  const handleSave = (fileId) => {
    updateFileTitle(fileId, newTitle);
    setEditingFileId(null);
  };

  return (
    <div className="file-list">
      <h3>Files</h3>
      <button className="add-file-button" onClick={createNewFile}>
        Add New File
      </button>
      <div className="file-items">
        {files.map((file) => (
          <div
            key={file.id}
            className={`file-item ${currentFile === file.id ? 'active' : ''}`}
            onClick={() => selectFile(file.id)}
          >
            {editingFileId === file.id ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => handleSave(file.id)}
                autoFocus
              />
            ) : (
              <>
                <span>{file.title}</span>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="rename-file-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(file.id, file.title);
                  }}
                />
              </>
            )}
            <button
              className="delete-file-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(file.id);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
