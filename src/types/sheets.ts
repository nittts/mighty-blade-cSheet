export type statsType = {
  health: string;
  mana: string;
  strength: string;
  agility: string;
  inteligence: string;
  will: string;
  movement: string;
  runSpeed: string;
  capacity: {
    basic: string;
    heavy: string;
    max: string;
  };
};

export type ability = {
  name: string;
  difficuty: string;
  mana: string;
  description: string;
};

export type equipaments = {
  item: string;
  weight: string;
  cost: string;
};

export type combatTypeDefenseList = {
  name: string;
  type: string;
  defense: string;
};

export type combatTypeAttackList = {
  weapon: string;
  damage: string;
  type: string;
};

export type defenseType = {
  block: number;
  dodge: number;
  determination: number;
  list: combatTypeDefenseList[];
};

export type combatType = {
  defense: defenseType;
  attack: {
    list: combatTypeAttackList[];
  };
};

export interface ISheetCardChar {
  id: string;
  name: string;
  race: string;
  class: string;
  age: number | string;
  experience: number | string;
  motivation: string;
  src: string;
  abilities: ability[];
  combat: combatType;
  equipaments: equipaments[];
  stats: statsType;
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
