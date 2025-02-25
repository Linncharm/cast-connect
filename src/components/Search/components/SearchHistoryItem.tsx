import React from 'react';

interface SearchHistoryItemProps {
  item: SearchHistory;
  onClick: () => void;
  onDelete: () => void;
}

interface SearchHistory {
  id: number;
  name: string;
  timestamp: string;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = (props) => {
  const { item, onClick, onDelete } = props
  return (
    <div
      key={`${item.id}-${item.timestamp}`}
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 group"
    >
      <div className="flex-1">
        <span className="text-sm text-gray-200">{item.name}</span>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-200 transition-opacity"
        aria-label="删除历史记录"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default SearchHistoryItem