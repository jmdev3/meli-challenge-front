import { createContext, useContext } from "react";
import { types, Instance, applySnapshot } from "mobx-state-tree";

const Item = types.model("Item", {
  id: "",
  title: "",
  price: types.model({
    currency: "",
    amount: types.number,
    decimals: types.number,
  }),
  picture: "",
  condition: "",
  free_shipping: types.boolean,
  sold_quantity: types.maybe(types.number),
  description: "",
});

export const MainStore = types
  .model("MainStore", {
    author: types.model({
      name: "",
      lastname: "",
    }),
    items: types.array(Item),
    categories: types.array(types.string),
  })
  .actions((self) => {
    function clearStore() {
      self.items.clear();
      self.categories.clear();
    }

    function setItems(items: any) {
      applySnapshot(self.items, items);
    }

    function setCategories(categories: string[]) {
      self.categories.replace(categories);
    }

    function setAuthor(author: { name: string; lastname: string }) {
      self.author = author;
    }

    return {
      clearStore,
      setItems,
      setCategories,
      setAuthor,
    };
  });

export interface IItem extends Instance<typeof Item> {}
export interface IMainStore extends Instance<typeof MainStore> {}
const MainStoreContext = createContext<IMainStore>(null);
export const MainStoreProvider = MainStoreContext.Provider;
export const useMainStore = () => useContext<IMainStore>(MainStoreContext);
