"use server";

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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

  const response = await axios({
    url: url.href,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${TMDB_API_KEY}`,
    },
    timeout: 10000,
  });


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

  try {
    // 移除endpoint参数，只传递其他参数到TMDB
    searchParams.delete('endpoint');
    const data = await fetchTMDB(endpoint, searchParams);
    return NextResponse.json(data);
  } catch (error) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    );
  }
}
