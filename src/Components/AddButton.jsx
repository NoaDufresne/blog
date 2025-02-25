import React from 'react';

function AddButton ({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
};

export default AddButton;
