
export interface Game {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  description: string;
}

export enum Page {
  HOME = 'HOME',
  PLAYER = 'PLAYER',
  ABOUT = 'ABOUT'
}
