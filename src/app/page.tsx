'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShows, setSelectedShows] = useState<>([]);
  const [searchResults, setSearchResults] = useState<>([]);
  const [showGraph, setShowGraph] = useState(false);
  const [graphMode, setGraphMode] = useState<'show-centric' | 'actor-centric'>('show-centric');
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const results = shows.filter(show =>
        show.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addShow = (show) => {
    if (!selectedShows.find(s => s.id === show.id)) {
      setSelectedShows([...selectedShows, show]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeShow = (showId: number) => {
    setSelectedShows(selectedShows.filter(show => show.id !== showId));
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* 搜索区域 */}
      <section className="py-8 px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 标题部分 */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">CastConnect</h1>
            <h2 className="text-xl text-gray-300">发现演员的影视纽带</h2>
          </div>

          {/* 搜索和操作区域 */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="搜索剧集..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              />

              {/* 搜索结果下拉框 */}
              {searchResults.length > 0 && (
                <div className="absolute w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                  {searchResults.map(show => (
                    <div
                      key={show.id}
                      onClick={() => addShow(show)}
                      className="p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-700 rounded flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">{show.title}</div>
                          <div className="text-sm text-gray-400">{show.year}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowGraph(true)}
              disabled={selectedShows.length < 2}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              查询关系
            </button>
          </div>

          {/* 已选剧集容器 */}
          <div className="bg-gray-800 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {selectedShows.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                请搜索并选择剧集以开始分析
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedShows.map(show => (
                  <div
                    key={show.id}
                    className="bg-gray-700 rounded-lg p-3 relative group"
                  >
                    <button
                      onClick={() => removeShow(show.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-gray-600 rounded flex-shrink-0"></div>
                      <div>
                        <div className="font-medium">{show.title}</div>
                        <div className="text-sm text-gray-400">{show.year}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 关系图区域 - 新视口 */}
      {showGraph && selectedShows.length >= 2 && (
        <section className="min-h-screen border-t border-gray-700">
          <div className="mx-auto px-8 py-12">
            {/* 视图切换按钮 */}
            <div className="flex justify-end space-x-4 mb-8">
              <button
                onClick={() => setGraphMode('show-centric')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  graphMode === 'show-centric'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                剧集视图
              </button>
              <button
                onClick={() => setGraphMode('actor-centric')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  graphMode === 'actor-centric'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                演员视图
              </button>
            </div>

            {/* 关系图容器 */}
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <MediaGraph layout={layout} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}