import React from 'react';

const FileItem = ({ file, deleteFile, selectFile, isActive }) => {
  return (
    <div className={`file-item ${isActive ? 'active' : ''}`} onClick={() => selectFile(file.id)}>
      <span>{file.title}</span>
      <button className="delete-file-button" onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }}>🗑️</button>
    </div>
  );
};

export default FileItem;
