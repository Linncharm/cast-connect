'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { mockShows } from '@/lib/mockData'
import type { Show } from '@/types'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShows, setSelectedShows] = useState<Show[]>([])
  const [searchResults, setSearchResults] = useState<Show[]>([])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.length > 0) {
      const results = mockShows.filter(show =>
        show.title.toLowerCase().includes(value.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const addShow = (show: Show) => {
    if (!selectedShows.find(s => s.id === show.id)) {
      setSelectedShows([...selectedShows, show])
    }
    setSearchTerm('')
    setSearchResults([])
  }

  const removeShow = (showId: number) => {
    setSelectedShows(selectedShows.filter(show => show.id !== showId))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">CastConnect</h1>
        <h2 className="text-xl text-gray-300 text-center mb-12">发现演员的影视纽带</h2>

        {/* 搜索框 */}
        <div className="relative mb-8">
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
    </main>
  )
}