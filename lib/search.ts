export interface IndexedStudieplan {
  digital: boolean;
  godkjent: number; // Unix timestamp
  innhold: string;
  kategorier: string[];
  nr: string;
  objectID: string;
  org?: string;
  sf: string;
  timer_max?: number;
  timer_min?: number;
  tittel: string;
  version: number; // Unix timestamp
}
