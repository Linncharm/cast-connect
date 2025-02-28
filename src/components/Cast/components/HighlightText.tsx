// Helper function to highlight text
import React from 'react';

const HighlightText: React.FC<{ text: string; searchTerm: string }> = ({ text, searchTerm }) => {
  if (!searchTerm.trim()) return <>{text}</>;

  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ?
          <span key={i} className="bg-yellow-200 dark:bg-yellow-700">{part}</span> :
          <span key={i}>{part}</span>
      )}
    </>
  );
};

export default HighlightText;