export interface DrinksCategory {
  drinks: [
    {strCategory: string}
  ];
}

export interface CoctailFillter {
  name: string;
  isChecked: boolean;
}

interface Drink {
  title: string;
  imageUrl: string;
  id: string;
}

export interface FullCategory {
  categoryTitle: string;
  drinks: Drink[];
}
