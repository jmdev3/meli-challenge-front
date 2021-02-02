export interface IItem {
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    description: string;
  };
  categories: string[];
  author: {
    name: string;
    lastname: string;
  };
}
