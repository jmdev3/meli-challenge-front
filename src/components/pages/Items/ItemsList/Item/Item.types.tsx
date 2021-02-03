import { IItem } from "~/stores/mainStore";

export interface IItemComponent {
  item: IItem;
  navigateToItem: (url: string) => void;
}
