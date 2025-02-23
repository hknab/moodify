export type TLocation = {
  country: string;
  localtime: string;
  name: string;
  region: string;
};
export type TWeather = {
  temperature?: number;
  condition?: string;
};

export interface TTag {
  id: number;
  title: string;
  createdAt: string;
  updatedAt?: string;
}

export type TFeeling =
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
  updatedAt?: string;
}

export type TMoods = TMood[];

export interface TRecord {
  id: number;
  moods: TMoods;
  tags: TTag[];
  feeling: TFeeling;
  weather?: TWeather;
  location?: TLocation;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type TRecords = TRecord[];

export type TBreadcrumb = {
  title: string;
  link?: string;
};
