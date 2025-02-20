export interface Show {
  id: number;
  title: string;
  coverImage: string;
  year: number;
}

export interface SearchResult {
  shows: Show[];
}