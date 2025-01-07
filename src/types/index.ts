export type TWeather = {
  temperature: number;
  condition: string;
};

export interface TTag {
  id: number;
  title: string;
  createdAt: string;
}

export type TScore =
  | 'Very Unpleasant'
  | 'Unpleasant'
  | 'Slightly Unpleasant'
  | 'Natural'
  | 'Slightly Pleasant'
  | 'Pleasant'
  | 'Very Pleasant';
export interface TMood {
  id: number;
  emoji: string;
  title: string;
  createdAt: string;
}

export type TMoods = TMood[];

export interface TRecord {
  id: number;
  moods: TMoods;
  weather: TWeather;
  tags: TTag[];
  score: TScore;
  location: string;
  duration?: number;
  description?: string;
  createdAt: string;
}

export type TRecords = TRecord[];
