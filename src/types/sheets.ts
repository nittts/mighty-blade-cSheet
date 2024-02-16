export interface ISheetCardChar {
  id: string;
  name: string;
  race: string;
  class: string;
  age: number | string;
  experience: number | string;
  motivation: string;
  src: string;
}

export interface createSheetPayload {
  name: string;
  race: string;
  class: string;
  age: number;
  experience: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  motivation: string;
  src: string | Blob;
}
