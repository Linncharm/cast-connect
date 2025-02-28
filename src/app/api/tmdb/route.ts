"use server";

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { LRUCache } from 'lru-cache';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const cache = new LRUCache({
  max: 100,
  ttl: 3600000, // 1 hour in milliseconds
});


async function fetchTMDB(
  endpoint: string,
  searchParams?: URLSearchParams
) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  if (searchParams) {
    searchParams.forEach((value, key) => url.searchParams.append(key, value));
  }

  // const response = await fetch('https://api.themoviedb.org/3/search/tv?query=Breaking&include_adult=false&language=en-US&page=1', {
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${TMDB_API_KEY}`,
  //   },
  // });

  const cacheKey = url.href;

  // Check if we have a cached response
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit for:', cacheKey);
    return cachedData
  }

  console.log('Cache miss for:', cacheKey);

  const response = await axios({
    url: url.href,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${TMDB_API_KEY}`,
    },
    timeout: 10000,
  });

  // Store the response in cache
  cache.set(cacheKey, response.data);

  return response.data;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');


  if (!endpoint) {
    return NextResponse.json(
      { error: 'Endpoint parameter is required' },
      { status: 400 }
    );
  }

  // Add custom header to indicate cache status (for debugging/monitoring)
  const paramsURL = new URL(`${TMDB_BASE_URL}${endpoint}`);
  if (searchParams) {
    searchParams.delete('endpoint');
    searchParams.forEach((value, key) => paramsURL.searchParams.append(key, value));
  }

  try {

    const isCached = cache.has(paramsURL.href);
    const data = await fetchTMDB(endpoint, searchParams);
    const response = NextResponse.json(data, { status: 200 });

    // Add cache-control header
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');


    response.headers.set('X-Cache-Status', isCached ? 'HIT' : 'MISS');

    return response;

  } catch (error) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    );
  }
}
