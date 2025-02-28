import React, { useState } from 'react';

interface FilterModalProps {
  filterModalVisible: boolean;
  setFilterModalVisible: (visible: boolean) => void;
}

const FilterModal:React.FC<FilterModalProps> = ({filterModalVisible,setFilterModalVisible}) => {

  // 关闭筛选模态框
  const closeFilterModal = () => {
    setFilterModalVisible(false);
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  };

  return filterModalVisible ? (
    <>
      {/* Modal Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={closeFilterModal}
      >
        {/* Modal Container - Prevent closing when clicking inside */}
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg max-h-[90vh] overflow-y-auto z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">筛选选项</h2>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Filter Options would go here */}
            <div className="space-y-4">
              {/* Example Filter Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  排序方式
                </label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="default">默认排序</option>
                  <option value="name_asc">姓名 (A-Z)</option>
                  <option value="name_desc">姓名 (Z-A)</option>
                  <option value="episodes_desc">出场集数 (多-少)</option>
                  <option value="episodes_asc">出场集数 (少-多)</option>
                  <option value="popularity">人气值</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  演员类型
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="all-actors" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="all-actors" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      全部演员
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="main-cast" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="main-cast" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      主演
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="guest-stars" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="guest-stars" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      客串
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  出场季数最小值
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 px-1 mt-1">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer with Action Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
            <button
              onClick={closeFilterModal}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              取消
            </button>
            <button
              onClick={() => {
                // 这里是确认筛选的逻辑（未实现）
                closeFilterModal();
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white
                           hover:bg-blue-700 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default FilterModal;