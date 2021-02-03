import { IItem } from "~/stores/mainStore";

export interface IItems {
  isValidating: boolean;
  hasFoundItems: boolean;
  items: IItem[];
}
