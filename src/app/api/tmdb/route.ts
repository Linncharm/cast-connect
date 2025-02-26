import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDB(
  endpoint: string,
  searchParams?: URLSearchParams
) {
  const url = new URL(endpoint, TMDB_BASE_URL);
  console.log('url', url);
  if (searchParams) {
    searchParams.forEach((value, key) => url.searchParams.append(key, value));
  }

  console.log('searchParams!!!!!!', searchParams);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    // next: { revalidate: 3600 } // 1小时缓存
  });

  console.log('response????????', response);

  if (!response.ok) {
    throw new Error('TMDB API request failed');
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint');

  console.log('searchParams', searchParams);
  console.log('endpoint', endpoint);

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
    console.log('data', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from TMDB' },
      { status: 500 }
    );
  }
}