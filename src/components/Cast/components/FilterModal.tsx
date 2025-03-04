import React, { useEffect } from 'react';
import { useCommonSearch } from '@/hooks/useCommonSearch';
import { FilterHandlers } from '@/components/Cast/types';
import { useTranslations } from 'next-intl';

interface FilterModalProps {
  filterModalVisible: boolean;
  setFilterModalVisible: (visible: boolean) => void;
  handleFilterModalSubmit: () => void
  filterHandlers: FilterHandlers
}


const FilterModal: React.FC<FilterModalProps> = (props) => {

  const {
    filterModalVisible,
    setFilterModalVisible,
    handleFilterModalSubmit,
    filterHandlers
  } = props

  // 不能这样做，会创建新的hook实例，数据无法互通！
  // const {
  //
  //   actorTypes,
  //   sortOrder,
  //   minSeasons,
  //   // handleFilterModalSubmit
  //   // 直接在hook中使用的话获取不到results，只有从父组件中获取才有，怀疑是hook的引用不一致
  // } = useCommonSearch()

  const {
    actorTypes,
    sortOrder,
    minSeasons,
    handleSeasonChange,
    handleCheckboxChange,
    handleSortTypeChange,
    handleSortOrderChange
  } = filterHandlers

  // 当模态框打开时禁用背景滚动
  useEffect(() => {
    if (filterModalVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [filterModalVisible]);

  // 关闭筛选模态框
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };



  const t = useTranslations('FilterModal');

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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('title')}</h2>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Filter Options would go here */}
            <div className="space-y-4">
              {/* 排序选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:text-xs">
                  {t('sortBy.label')}
                </label>
                <div className="flex space-x-2">
                  <select
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={sortOrder[0]}
                    onChange={handleSortTypeChange}
                  >
                    <option value="name">{t('sortBy.name')}</option>
                    <option value="showCount">{t('sortBy.showCount')}</option>
                    <option value="popularity">{t('sortBy.popularity')}</option>
                  </select>
                  <select
                    className="w-36 rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={sortOrder[1]}
                    onChange={handleSortOrderChange}
                  >
                    <option value="asc">{t('sortOrder.asc')}</option>
                    <option value="desc">{t('sortOrder.desc')}</option>
                  </select>
                </div>
              </div>

              {/* 演员类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('actorType.label')}
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="allActors"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={actorTypes.allActors}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="allActors" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('actorType.allActors')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="mainCast"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={actorTypes.mainCast}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="mainCast" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('actorType.mainCast')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="guestStars"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={actorTypes.guestStars}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="guestStars" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('actorType.guestStars')}
                    </label>
                  </div>
                </div>
              </div>

              {/* 季数滑块 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('seasonMinimum.label')}
                  </label>
                  <span
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-0.5 px-2 rounded-full text-xs font-medium">
                  {minSeasons} {t('seasonMinimum.unit')}
                </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={minSeasons}
                  onChange={handleSeasonChange}
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
              {t('buttons.cancel')}
            </button>
            <button
              onClick={()=>{
                handleFilterModalSubmit()
                closeFilterModal()
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white
                       hover:bg-blue-700 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('buttons.confirm')}
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default FilterModal;