export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  imageUrl?: string;
  slug: string;
  imageHint?: string;
}

export interface ServerInfo {
  id: string;
  name: string;
  ip: string;
  port: number;
  players: number;
  maxPlayers: number;
  mode: string;
  isOnline?: boolean;
  countryFlag?: string; // Placeholder for country flag image/icon (e.g., emoji or SVG path)
}
