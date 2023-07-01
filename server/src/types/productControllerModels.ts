export interface Range  { $gte: number; $lte: number };
export interface QueryObject  {
  price?: Range;
  area?: Range;
  rooms?: Range | string;
  floor?: Range;
  repair?: string;
};

