import React, { useState } from 'react';
import FilterModal from '@/components/Cast/components/FilterModal';
import { FilterHandlers } from '@/components/Cast/types';
import { useTranslations } from 'next-intl';

interface CommonCastSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  allExpanded: boolean;
  handleExpandToggle: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // 传递方向：CommonCastResults -> CommonCastSearch -> FilterModal
  handleFilterModalSubmit: () => void; // 纯介质
  filterHandlers: FilterHandlers; // 纯介质

}

const CommonCastSearch: React.FC<CommonCastSearchProps> = (props) => {

  const t = useTranslations("Filter")
  const {
    searchTerm,
    setSearchTerm,
    allExpanded,
    handleExpandToggle,
    handleSearchChange,
    handleFilterModalSubmit,
    filterHandlers
  } = props;

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 打开筛选模态框
  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    // 添加禁止背景滚动
    document.body.style.overflow = 'hidden';
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  }


  return (
    <>
      <div className="mb-6">

        {/* Clear search button */}
        {searchTerm.trim() && (
          <div className="flex justify-start mb-2">
            <button
              onClick={() => setSearchTerm('')}
              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md
                        text-gray-600 dark:text-gray-300 hover:bg-gray-300
                        dark:hover:bg-gray-600 transition-colors"
            >
              {"Clear search"}
            </button>
          </div>
        )}

        {/* Flex container for search bar and selection options */}
        <div className="flex flex-col md:flex-row gap-2 w-full">
          {/* Search input - takes 1/3 width on desktop */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={"Search actors, characters, or shows..."}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300
                        dark:border-gray-600 bg-white dark:bg-gray-800
                        text-gray-900 dark:text-white focus:outline-none
                        focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Two selection options - each takes 1/3 width on desktop and 1/2 width on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full md:w-1/3">
            {/* Expand All Button */}
            <button
              onClick={handleExpandToggle}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            >
              {allExpanded ? t("collapseAll") : t("expandAll")}
            </button>

            {/* Filter Button */}
            <button
              onClick={openFilterModal}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            >
              {
                t("filterButton")
              }
            </button>
          </div>

        </div>


      </div>

      {/* Filter Modal */}
      <FilterModal
        filterModalVisible={isFilterModalOpen}
        setFilterModalVisible={setIsFilterModalOpen}
        handleFilterModalSubmit={handleFilterModalSubmit}
        filterHandlers={filterHandlers}
      />

    </>
  )
}

export default CommonCastSearch;