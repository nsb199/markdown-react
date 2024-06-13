import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ insertText }) => {
  const [numberedListCount, setNumberedListCount] = useState(0);

  const handleBold = () => insertText('**bold**');
  const handleItalic = () => insertText('_italic_');
  const handleStrikethrough = () => insertText('~~strikethrough~~');
  const handleHeading = (level) => insertText(`${'#'.repeat(level)} Heading\n`);
  const handleLink = () => insertText('[title](http://)');
  const handleImage = () => insertText('![alt text](image.jpg)');
  const handleList = () => insertText('- List item\n');
  const handleNumberedList = () => {
    const newCount = numberedListCount + 1;
    insertText(`${newCount}. List item\n`);
    setNumberedListCount(newCount);
  };
  const handleCode = () => insertText('```\ncode\n```');
  const handleQuote = () => insertText('> quote\n');

  return (
    <div className="navbar">
      <button onClick={handleBold}><b>B</b></button>
      <button onClick={handleItalic}><i>I</i></button>
      <button onClick={handleStrikethrough}><s>S</s></button>
      <button onClick={() => handleHeading(1)}>H1</button>
      <button onClick={() => handleHeading(2)}>H2</button>
      <button onClick={() => handleHeading(3)}>H3</button>
      <button onClick={handleLink}>Link</button>
      <button onClick={handleImage}>Image</button>
      <button onClick={handleList}>List</button>
      <button onClick={handleNumberedList}>Numbered List</button>
      <button onClick={handleCode}>Code</button>
      <button onClick={handleQuote}>Quote</button>
    </div>
  );
};

export default Navbar;
